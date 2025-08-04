let angulo = null

function manejarOrientacion(event) {
  angulo = event.beta
  document.getElementById("inclinacion").innerText = angulo.toFixed(2)

  const altura = parseFloat(document.getElementById("altura").value)
  if (!isNaN(angulo) && !isNaN(altura)) {
    if (angulo > 89.9 || angulo < -89.9) return

    const rad = (angulo * Math.PI) / 180
    const distancia = altura / Math.tan(rad)
    const resultado = Math.abs(distancia.toFixed(2))
    document.getElementById("distancia").innerText = resultado
  }
}

if (
  typeof DeviceOrientationEvent !== "undefined" &&
  typeof DeviceOrientationEvent.requestPermission === "function"
) {
  DeviceOrientationEvent.requestPermission()
    .then((response) => {
      if (response === "granted") {
        window.addEventListener("deviceorientation", manejarOrientacion)
      } else {
        alert("Permiso denegado para usar el sensor de orientación.")
      }
    })
    .catch((error) => {
      console.error("Error solicitando permisos:", error)
    })
} else {
  window.addEventListener("deviceorientation", manejarOrientacion)
}

function enviarDatos() {
  const nombre = document.getElementById("nombre").value
  const altura = parseFloat(document.getElementById("altura").value)
  const distancia = document.getElementById("distancia").innerText

  if (!nombre || isNaN(altura)) {
    alert(
      "Por favor, completa todos los campos y espera que se calcule la distancia."
    )
    return
  }

  const webhookURL =
    "https://script.google.com/macros/s/AKfycbxNccmje5p5Sbyv55uTTBKDjpCMy8hV2tkFpapUS5PBUM533NgB7fCbjf5bXOjnzSmaxQ/exec"

  fetch(webhookURL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: nombre,
      altura: altura,
      distancia: distancia,
    }),
  })

  alert("Datos enviados correctamente")

  document.getElementById("nombre").value = ""
  document.getElementById("distancia").innerText = "--"
}
