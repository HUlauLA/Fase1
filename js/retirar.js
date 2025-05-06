const retiroInput = document.getElementById("retiro");

// Keypad para retiro
function agregarDigito(num) {
  if (retiroInput && retiroInput.value.length < 10) {
    retiroInput.value += num;
  }
}

function agregarDecimal() {
  if (retiroInput && !retiroInput.value.includes(".")) {
    retiroInput.value += ".";
  }
}

function limpiarMonto() {
  if (retiroInput) {
    retiroInput.value = "";
  }
}

function confirmarRetiro() {
  const monto = parseFloat(retiroInput.value);
  let saldo = parseFloat(localStorage.getItem("saldo")) || 500;

  if (isNaN(monto) || monto <= 0) {
    Swal.fire("Monto inválido", "Ingrese una cantidad válida", "warning");
    return;
  }

  if (monto % 5 !== 0) {
    Swal.fire("Monto no permitido", "Solo se permiten múltiplos de 5", "info");
    return;
  }

  if (monto > saldo) {
    Swal.fire("Saldo insuficiente", `Tu saldo actual es $${saldo.toFixed(2)}`, "error");
    return;
  }

  saldo -= monto;
  localStorage.setItem("saldo", saldo.toFixed(2));

  // Guardar historial
  let historial = JSON.parse(localStorage.getItem("historial")) || [];
  const fecha = new Date().toLocaleString();
  historial.push({ tipo: "Retiro", monto: monto.toFixed(2), fecha });
  localStorage.setItem("historial", JSON.stringify(historial));

  // Comprobante PDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Pokémon Bank - Comprobante de Retiro", 20, 20);
  doc.text(`Fecha: ${fecha}`, 20, 40);
  doc.text(`Monto retirado: $${monto.toFixed(2)}`, 20, 50);
  doc.text(`Saldo restante: $${saldo.toFixed(2)}`, 20, 60);
  doc.save("comprobante_retiro.pdf");

  Swal.fire("¡Retiro exitoso!", `Has retirado $${monto.toFixed(2)}.\nSaldo actual: $${saldo.toFixed(2)}`, "success")
    .then(() => {
      window.location.href = "menu.html";
    });
}

function confirmarRegreso() {
  Swal.fire({
    title: '¿Deseas regresar al menú?',
    text: 'Se cancelará esta operación',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, volver',
    cancelButtonText: 'No',
    confirmButtonColor: '#e74c3c',
    cancelButtonColor: '#2ecc71'
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "menu.html";
    }
  });
}
