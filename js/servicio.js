function pagarServicio() {
  const servicio = document.getElementById("servicio").value;
  const idServicio = document.getElementById("idServicio").value.trim();
  const monto = parseFloat(document.getElementById("montoServicio").value);
  let saldo = parseFloat(localStorage.getItem("saldo")) || 500;

  if (!servicio) {
    Swal.fire("Servicio requerido", "Seleccione un tipo de servicio", "warning");
    return;
  }

  if (idServicio === "") {
    Swal.fire("ID requerido", "Debe ingresar el ID del servicio", "warning");
    return;
  }

  if (isNaN(monto) || monto <= 0) {
    Swal.fire("Monto inválido", "Ingrese un monto mayor a 0", "warning");
    return;
  }

  if (monto > saldo) {
    Swal.fire("Saldo insuficiente", `Tu saldo es $${saldo.toFixed(2)}`, "error");
    return;
  }

  // Restar saldo
  saldo -= monto;
  localStorage.setItem("saldo", saldo.toFixed(2));

  // Guardar en historial
  let historial = JSON.parse(localStorage.getItem("historial")) || [];
  const fecha = new Date().toLocaleString();
  historial.push({ tipo: `Servicio - ${servicio}`, monto: monto.toFixed(2), fecha, id: idServicio });
  localStorage.setItem("historial", JSON.stringify(historial));

  // Generar comprobante PDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Pokémon Bank - Pago de Servicio", 20, 20);
  doc.text(`Servicio: ${servicio}`, 20, 40);
  doc.text(`ID Servicio: ${idServicio}`, 20, 50);
  doc.text(`Monto pagado: $${monto.toFixed(2)}`, 20, 60);
  doc.text(`Saldo restante: $${saldo.toFixed(2)}`, 20, 70);
  doc.text(`Fecha: ${fecha}`, 20, 80);
  doc.save(`comprobante_servicio_${servicio}.pdf`);

  Swal.fire("¡Pago realizado!", `Servicio de ${servicio} pagado con éxito.`, "success").then(() => {
    window.location.href = "menu.html";
  });
}

function cancelarPago() {
  Swal.fire({
    title: '¿Cancelar el pago?',
    text: 'Perderás los datos ingresados',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, volver',
    cancelButtonText: 'Seguir aquí',
    confirmButtonColor: '#e74c3c',
    cancelButtonColor: '#2ecc71'
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "menu.html";
    }
  });
}
