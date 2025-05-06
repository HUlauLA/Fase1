//Esta función me ayuda a hacer funcional el keypad de la pantalla login
function agregarNumero(num) {
  const display = document.getElementById("displayPin");
  if (display.value.length < 4) {
    display.value += num;
  }
}

//esta función es la del botón cancelar
function cancelar() {
  Swal.fire({ //sweet alert
    title: '¿Estás segur@?', //Este es el título del mensaje
    text: "Se borrará el PIN ingresado", //el mensaje
    icon: 'warning', // el ícono
    showCancelButton: true,
    confirmButtonColor: '#e74c3c', // el color del botón confirmar
    cancelButtonColor: '#3085d6', // el color del botón cancelar
    confirmButtonText: 'Sí, borrar' // texto del botón confirmar
  }).then((result) => {
    if (result.isConfirmed) {
      document.getElementById("displayPin").value = ""; // si el resultado es confirmar, entonces el display del Pin se limpia
    }
  });
}

//función para enviar el pin
function enviarPin() {
  const pinInput = document.getElementById("displayPin");
  const pin = pinInput.value.trim();

  const constraints = {
    pin: {
      presence: { allowEmpty: false },
      format: {
        pattern: "^[0-9]{4}$",
        message: "debe tener exactamente 4 dígitos numéricos"
      }
    }
  };

  //aquí valido las credenciales
  const validation = validate({ pin: pin }, constraints);

  if (validation) {
    pinInput.value = ""; //acá se valida si el display está vacío, en este caso nos muestra el mensaje PIN inválido
    Swal.fire({
      icon: 'error',
      title: 'PIN inválido',
      text: validation.pin[0]
    });
  } else if (pin !== "1234") { // aquí se valida si el PIN ingresado es diferente a 1234 muestra el mensje PIN incorrecto
    pinInput.value = "";
    Swal.fire({
      icon: 'error',
      title: 'PIN incorrecto',
      text: 'Intenta de nuevo'
    });
  } else { //de lo contrario, se procede a acceder a la cuenta con los datos ya guardados localmente como el nombre de usuario y el número de cuenta
    // Guardar datos
    localStorage.setItem("nombre", "Ash Ketchum");
    localStorage.setItem("cuenta", "0987654321");
    Swal.fire({
      icon: 'success',
      title: 'Acceso correcto',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      window.location.href = "menu.html";
    });
  }
}
