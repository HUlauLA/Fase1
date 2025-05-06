function agregarNumero(num) {
  const display = document.getElementById("displayPin");
  if (display.value.length < 4) {
    display.value += num;
  }
}

function cancelar() {
  Swal.fire({
    title: '¿Estás segur@?',
    text: "Se borrará el PIN ingresado",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e74c3c',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, borrar'
  }).then((result) => {
    if (result.isConfirmed) {
      document.getElementById("displayPin").value = "";
    }
  });
}

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

  const validation = validate({ pin: pin }, constraints);

  if (validation) {
    pinInput.value = "";
    Swal.fire({
      icon: 'error',
      title: 'PIN inválido',
      text: validation.pin[0]
    });
  } else if (pin !== "1234") {
    pinInput.value = "";
    Swal.fire({
      icon: 'error',
      title: 'PIN incorrecto',
      text: 'Intenta de nuevo'
    });
  } else {
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
