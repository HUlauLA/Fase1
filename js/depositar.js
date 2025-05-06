const montoInput = document.getElementById("monto");

// Funciones del keypad
function agregarDigito(digito) {
  if (montoInput && montoInput.value.length < 10) {
    montoInput.value += digito;
  }
}

function agregarDecimal() {
  if (montoInput && !montoInput.value.includes(".")) {
    montoInput.value += ".";
  }
}

function limpiarMonto() {
  if (montoInput) {
    montoInput.value = "";
  }
}

function confirmarDeposito() {
  const monto = parseFloat(montoInput.value);

  if (isNaN(monto) || monto <= 0) {
    Swal.fire("Monto inválido", "Ingrese un monto válido mayor a 0", "warning");
    return;
  }

  let saldo = parseFloat(localStorage.getItem("saldo")) || 500;
  saldo += monto;
  localStorage.setItem("saldo", saldo.toFixed(2));

  // Agregar al historial
  let historial = JSON.parse(localStorage.getItem("historial")) || [];
  const fecha = new Date().toLocaleString();
  historial.push({ tipo: "Depósito", monto: monto.toFixed(2), fecha });
  localStorage.setItem("historial", JSON.stringify(historial));

  // Crear comprobante con jsPDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Pokémon Bank - Comprobante de Depósito", 20, 20);
  doc.text(`Fecha: ${fecha}`, 20, 40);
  doc.text(`Monto depositado: $${monto.toFixed(2)}`, 20, 50);
  doc.text(`Saldo actual: $${saldo.toFixed(2)}`, 20, 60);
  doc.save("comprobante_deposito.pdf");

  Swal.fire("¡Depósito exitoso!", `Se depositó $${monto.toFixed(2)} correctamente.`, "success").then(() => {
    window.location.href = "menu.html";
  });
}

function confirmarRegreso() {
  Swal.fire({
    title: '¿Deseas regresar al menú?',
    text: 'Se perderá el monto que hayas ingresado',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, regresar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#2d3436',
    cancelButtonColor: '#27ae60'
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "menu.html";
    }
  });
}
