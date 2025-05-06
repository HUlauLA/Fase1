function mostrarConsulta(tipo) {
  const resultadoDiv = document.getElementById("resultadoConsulta");
  const btnImprimir = document.getElementById("btnImprimir");
  let contenido = "";
  let data = [];

  if (tipo === "saldo") {
    const saldo = parseFloat(localStorage.getItem("saldo")) || 500;
    contenido = `<h5>Tu saldo actual es:</h5><h3 class="text-success">$${saldo.toFixed(2)}</h3>`;
    btnImprimir.style.display = "block";
    btnImprimir.dataset.tipo = "saldo";
  }

  if (tipo === "ingresos") {
    const historial = JSON.parse(localStorage.getItem("historial")) || [];
    data = historial.filter(tx => tx.tipo === "Depósito");

    if (data.length === 0) {
      contenido = `<p>No hay ingresos registrados.</p>`;
      btnImprimir.style.display = "none";
    } else {
      contenido = data.map(tx => `
        <div class="border rounded p-2 d-flex justify-content-between">
          <strong>${tx.fecha}</strong>
          <span class="text-success">+ $${tx.monto}</span>
        </div>
      `).join("");
      btnImprimir.style.display = "block";
      btnImprimir.dataset.tipo = "ingresos";
    }
  }

  if (tipo === "egresos") {
    const historial = JSON.parse(localStorage.getItem("historial")) || [];
    data = historial.filter(tx => tx.tipo === "Retiro");

    if (data.length === 0) {
      contenido = `<p>No hay egresos registrados.</p>`;
      btnImprimir.style.display = "none";
    } else {
      contenido = data.map(tx => `
        <div class="border rounded p-2 d-flex justify-content-between">
          <strong>${tx.fecha}</strong>
          <span class="text-danger">- $${tx.monto}</span>
        </div>
      `).join("");
      btnImprimir.style.display = "block";
      btnImprimir.dataset.tipo = "egresos";
    }
  }

  resultadoDiv.innerHTML = contenido;
}

function imprimirComprobante() {
  const tipo = document.getElementById("btnImprimir").dataset.tipo;
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 20;

  doc.text("Pokémon Bank - Consulta", 20, y); y += 10;

  if (tipo === "saldo") {
    const saldo = parseFloat(localStorage.getItem("saldo")) || 500;
    doc.text(`Saldo actual: $${saldo.toFixed(2)}`, 20, y);
  } else {
    const historial = JSON.parse(localStorage.getItem("historial")) || [];
    const filtrar = tipo === "ingresos" ? "Depósito" : "Retiro";
    const datos = historial.filter(tx => tx.tipo === filtrar);

    datos.forEach(tx => {
      doc.text(`${tx.fecha} - ${filtrar === "Depósito" ? "+" : "-"} $${tx.monto}`, 20, y);
      y += 10;
    });
  }

  doc.save(`consulta_${tipo}.pdf`);
}

function confirmarRegresoConsulta() {
  Swal.fire({
    title: '¿Deseas regresar al menú?',
    text: 'Se cerrará la consulta actual',
    icon: 'question',
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
