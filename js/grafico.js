document.addEventListener("DOMContentLoaded", () => {
  const historial = JSON.parse(localStorage.getItem("historial")) || [];

  const ingresos = historial.filter(tx => tx.tipo === "Depósito")
    .reduce((total, tx) => total + parseFloat(tx.monto), 0);

  const egresos = historial
    .filter(tx => tx.tipo.includes("Retiro") || tx.tipo.includes("Servicio"))
    .reduce((total, tx) => total + parseFloat(tx.monto), 0);

  const ctx = document.getElementById("graficoTransacciones").getContext("2d");

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Ingresos', 'Egresos'],
      datasets: [{
        data: [ingresos, egresos],
        backgroundColor: ['#2ecc71', '#e74c3c'],
        borderColor: ['#27ae60', '#c0392b'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              return `$${context.raw.toFixed(2)}`;
            }
          }
        }
      }
    }
  });
});

function volverAlMenuDesdeGrafico() {
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
