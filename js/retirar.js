const retiroInput = document.getElementById("retiro");

// Keypad para retiro
function agregarDigito(num) {
  if (retiroInput && retiroInput.value.length < 10) {
    retiroInput.value += num;
  }
}

//Esta función nos habilita el ingreso de datos decimales
function agregarDecimal() {
  if (retiroInput && !retiroInput.value.includes(".")) {
    retiroInput.value += ".";
  }
}

//función para limpiar el display
function limpiarMonto() {
  if (retiroInput) {
    retiroInput.value = "";
  }
}

function confirmarRetiro() {
  const monto = parseFloat(retiroInput.value);
  let saldo = parseFloat(localStorage.getItem("saldo")) || 500;

  if (isNaN(monto) || monto <= 0) {
    Swal.fire("Monto inválido", "Ingrese una cantidad válida", "warning"); //acá validamos si el display está vacío o hay caracteres que no son numéricos
    return;
  }

  if (monto % 5 !== 0) {
    Swal.fire("Monto no permitido", "Solo se permiten múltiplos de 5", "info"); //se verifica que el monto sea múltiplo de 5
    return;
  }

  if (monto > saldo) {
    Swal.fire("Saldo insuficiente", `Tu saldo actual es $${saldo.toFixed(2)}`, "error"); //acá se valida si el monto a retirar es mayor al saldo actual, entonces nos muestra un error
    return;
  }

  saldo -= monto; //acá se resta el saldo - el monto
  localStorage.setItem("saldo", saldo.toFixed(2)); //acá se actualiza el saldo

// Agregar al historial
  let historial = JSON.parse(localStorage.getItem("historial")) || [];
  const fecha = new Date().toLocaleString();
  historial.push({ tipo: "Retiro", monto: monto.toFixed(2), fecha }); //El nombre con el cual se guarda el movimiento
  localStorage.setItem("historial", JSON.stringify(historial));

  // Acá se crea el comprobante con jsPDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Pokémon Bank - Comprobante de Retiro", 20, 20); //los datos generales del banco y movimiento hecho
  doc.text(`Fecha: ${fecha}`, 20, 40); //la fecha de la transacción
  doc.text(`Monto retirado: $${monto.toFixed(2)}`, 20, 50); //el monto de la transacción
  doc.text(`Saldo restante: $${saldo.toFixed(2)}`, 20, 60); //el saldo actualizado
  doc.save("comprobante_retiro.pdf"); //nombre con el que se genera el comprobante

   //mensaje de transacción exitosa y me redirige al menú
  Swal.fire("¡Retiro exitoso!", `Has retirado $${monto.toFixed(2)}.\nSaldo actual: $${saldo.toFixed(2)}`, "success")
    .then(() => {
      window.location.href = "menu.html";
    });
}

//botón volver al menú
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
