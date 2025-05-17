const montoInput = document.getElementById("montoServicio");
// Keypad para ingresar el monto a pagar
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
function pagarServicio() {
  //acá se declaran las variables
  const servicio = document.getElementById("servicio").value;
  const idServicio = document.getElementById("idServicio").value.trim();
  const monto = parseFloat(document.getElementById("montoServicio").value);
  let saldo = parseFloat(localStorage.getItem("saldo")) || 500;

  if (!servicio) {
    //si no se elige el servicio nos da un mensaje de advertencia
    Swal.fire(
      "Servicio requerido",
      "Seleccione un tipo de servicio",
      "warning"
    );
    return;
  }

  if (idServicio === "") {
    //si no se elige el servicio nos da un mensaje de advertencia
    Swal.fire("ID requerido", "Debe ingresar el ID del servicio", "warning");
    return;
  }

  if (isNaN(monto) || monto <= 0) {
    //si no se elige el servicio nos da un mensaje de advertencia
    Swal.fire("Monto inválido", "Ingrese un monto mayor a 0", "warning");
    return;
  }

  if (monto > saldo) {
    Swal.fire(
      "Saldo insuficiente",
      `Tu saldo es $${saldo.toFixed(2)}`,
      "error"
    ); //acá se valida si el monto a pagar es mayor al saldo actual, entonces nos muestra un error
    return;
  }

  saldo -= monto; //acá se resta el saldo - el monto
  localStorage.setItem("saldo", saldo.toFixed(2)); //acá se actualiza el saldo

  // Guardar en historial
  let historial = JSON.parse(localStorage.getItem("historial")) || [];
  const fecha = new Date().toLocaleString();
  historial.push({
    tipo: `Servicio - ${servicio}`,
    monto: monto.toFixed(2),
    fecha,
    id: idServicio,
  }); //El nombre con el cual se guarda el movimiento y que servicio fue
  localStorage.setItem("historial", JSON.stringify(historial));

  // Generar comprobante PDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Pokémon Bank - Pago de Servicio", 20, 20); //los datos generales del banco y movimiento hecho
  doc.text(`Servicio: ${servicio}`, 20, 40); //El servicio que se pagó
  doc.text(`ID Servicio: ${idServicio}`, 20, 50); //El ID del servicio que se pagó
  doc.text(`Monto pagado: $${monto.toFixed(2)}`, 20, 60); //el monto de la transacción
  doc.text(`Saldo restante: $${saldo.toFixed(2)}`, 20, 70); //el saldo actualizado
  doc.text(`Fecha: ${fecha}`, 20, 80); //la fecha de la transacción
  doc.save(`comprobante_servicio_${servicio}.pdf`); //nombre con el que se genera el comprobante

  //mensaje de transacción exitosa y me redirige al menú
  Swal.fire(
    "¡Pago realizado!",
    `Servicio de ${servicio} pagado con éxito.`,
    "success"
  ).then(() => {
    window.location.href = "menu.html";
  });
}

//botón volver al menú
function cancelarPago() {
  Swal.fire({
    title: "¿Cancelar el pago?",
    text: "Perderás los datos ingresados",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí, volver",
    cancelButtonText: "Seguir aquí",
    confirmButtonColor: "#e74c3c",
    cancelButtonColor: "#2ecc71",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "menu.html";
    }
  });
}
