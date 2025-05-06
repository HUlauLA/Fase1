const montoInput = document.getElementById("monto");

// Funciones del keypad
function agregarDigito(digito) {
  if (montoInput && montoInput.value.length < 10) {
    montoInput.value += digito;
  }
}

//Esta función nos habilita el ingreso de datos decimales
function agregarDecimal() {
  if (montoInput && !montoInput.value.includes(".")) {
    montoInput.value += ".";
  }
}

//función para limpiar el display
function limpiarMonto() {
  if (montoInput) {
    montoInput.value = "";
  }
}

function confirmarDeposito() {
  const monto = parseFloat(montoInput.value);

  if (isNaN(monto) || monto <= 0) {
    Swal.fire("Monto inválido", "Ingrese un monto válido mayor a 0", "warning"); //acá validamos si el display está vacío o hay caracteres que no son numéricos
    return;
  }

  let saldo = parseFloat(localStorage.getItem("saldo")) || 500; //acá establecemos que el monto inicial es 500
  saldo += monto; //acá se suma el depósito + el saldo incial
  localStorage.setItem("saldo", saldo.toFixed(2)); //acá se actualiza el saldo

  // Agregar al historial
  let historial = JSON.parse(localStorage.getItem("historial")) || [];
  const fecha = new Date().toLocaleString();
  historial.push({ tipo: "Depósito", monto: monto.toFixed(2), fecha }); //El nombre con el cual se guarda en el historial
  localStorage.setItem("historial", JSON.stringify(historial));

  // Acá se crea el comprobante con jsPDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Pokémon Bank - Comprobante de Depósito", 20, 20); //los datos generales del banco y movimiento hecho
  doc.text(`Fecha: ${fecha}`, 20, 40); //la fecha de la transacción
  doc.text(`Monto depositado: $${monto.toFixed(2)}`, 20, 50); //el monto de la transacción
  doc.text(`Saldo actual: $${saldo.toFixed(2)}`, 20, 60); //el saldo actualizado
  doc.save("comprobante_deposito.pdf");//nombre con el que se genera el comprobante

  //mensaje de transacción exitosa y me redirige al menú
  Swal.fire("¡Depósito exitoso!", `Se depositó $${monto.toFixed(2)} correctamente.`, "success").then(() => {
    window.location.href = "menu.html";
  });
}

//botón volver al menú
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
