// Mostrar saludo con datos del usuario
document.addEventListener("DOMContentLoaded", () => {
  const nombre = localStorage.getItem("nombre") || "Usuario";
  const cuenta = localStorage.getItem("cuenta") || "0000000000";

  const saludo = document.getElementById("saludo");
  const cuentaElemento = document.getElementById("cuenta");

  if (saludo) saludo.textContent = `Bienvenido ${nombre}`;
  if (cuentaElemento) cuentaElemento.textContent = `Cuenta N.º: ${cuenta}`;
});

// Función para salir de la sesión
function salir() {
  Swal.fire({
    title: '¿Deseas cerrar sesión?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No',
    confirmButtonColor: '#e74c3c',
    cancelButtonColor: '#3085d6'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("nombre");
      localStorage.removeItem("cuenta");
      window.location.href = "Login.html";
    }
  });
}

// Navegación entre pantallas
function deposito() {
  window.location.href = "Depositar.html";
}

function retiro() {
  window.location.href = "Retirar.html";
}

function consulta() {
  window.location.href = "Consultar.html";
}

function historial() {
  window.location.href = "Historial.html";
}

function servicio() {
  window.location.href = "Servicio.html";
}

function grafico() {
  window.location.href = "Grafico.html";
}
