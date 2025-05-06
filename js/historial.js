document.addEventListener("DOMContentLoaded", () => {
  const historial = JSON.parse(localStorage.getItem("historial")) || [];
  const historialDiv = document.getElementById("historialListado");

  if (historial.length === 0) {//si no hay transacciones muestra este mensaje
    historialDiv.innerHTML = "<p class='text-center'>No hay transacciones registradas.</p>";
    return;
  }

  const contenido = historial.map(tx => {
    const color = tx.tipo.includes("Depósito") ? "text-success"
                : tx.tipo.includes("Retiro") ? "text-danger"
                : "text-primary";
    return `
      <div class="border rounded p-2 mb-2 d-flex justify-content-between align-items-center">
        <div>
          <strong>${tx.tipo}</strong><br>
          <small>${tx.fecha}</small>
        </div>
        <div class="${color}">
          $${tx.monto}
        </div>
      </div>
    `;
  }).join("");

  historialDiv.innerHTML = contenido;
});

//botón para regresar al menú
function volverAlMenuDesdeHistorial() {
  Swal.fire({
    title: '¿Deseas regresar al menú?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No',
    confirmButtonColor: '#2d3436',
    cancelButtonColor: '#27ae60'
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "menu.html";
    }
  });
}
//impresión del comprobante
function imprimirHistorial() {
  const historial = JSON.parse(localStorage.getItem("historial")) || [];

  if (historial.length === 0) {
    Swal.fire("Nada para imprimir", "No hay transacciones registradas", "info"); //si el historial no tiene ningun movimiento sale este mensaje
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 20;

  doc.text("Pokémon Bank - Historial de Transacciones", 20, y); //cabecera del documento
  y += 10;

  historial.forEach(tx => {
    const linea = `${tx.fecha} - ${tx.tipo} - $${tx.monto}`; //se muestra la fecha, tipo de movimiento - monto del movimiento
    doc.text(linea, 20, y);
    y += 10;

    if (y > 280) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save("historial_pokemon_bank.pdf");//nombre del documento
}
