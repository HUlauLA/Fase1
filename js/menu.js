// acá se buscan y se leen los datos almacenados localmente con las variables "nombre" y "cuenta"
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
      localStorage.removeItem("nombre");//aquí si cerramos sesión se limpian los datos del localStorage y nos redirige a la pantalla Login
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
