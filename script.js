const listaSimbolos = [
  {
    archivo: "diamante.png",
    nombre: "Diamante"
  },
  {
    archivo: "siete.png",
    nombre: "Siete"
  },
  {
    archivo: "cerezas.png",
    nombre: "Cerezas"
  },
  {
    archivo: "bar.png",
    nombre: "Bar"
  }
];

// lista de imagenes-simbolos

const rodillos = document.querySelectorAll(".simbolo");
const ventanas = document.querySelectorAll(".ventanaRodillo");
const boton = document.getElementById("boton");
const bigwin = document.getElementById("bigwin");
const mensajePerdida = document.getElementById("mensajePerdida");

// Escoge una imagen aleatoria 

function cambiarSimbolo(imagen) {
  const numero = Math.floor(
    Math.random() * listaSimbolos.length
  );

  const simboloElegido = listaSimbolos[numero];

  imagen.src = "assets/" + simboloElegido.archivo;
  imagen.alt = simboloElegido.nombre;
}

// Hace girar los tres espacios cuando se pulsa SPIN.

function girarTragamonedas() {

  if (boton.disabled) {
    return;
  }

  boton.disabled = true;
  bigwin.hidden = true;
  mensajePerdida.hidden = true;

  // Activa el movimiento de los símbolos.

  ventanas.forEach(function (ventana) {
    ventana.classList.add("girando");
  });

  const intervalos = [];

  // Cambia los símbolos repetidamente mientras giran.

  rodillos.forEach(function (imagen, indice) {

    const intervalo = setInterval(function () {
      cambiarSimbolo(imagen);
    }, 70);

    intervalos.push(intervalo);

    // Detiene cada espacio en un momento diferente.

    setTimeout(function () {

      clearInterval(intervalos[indice]);

      cambiarSimbolo(imagen);

      ventanas[indice].classList.remove("girando");

      // Reactiva el botón cuando los tres han parado.

      if (indice === rodillos.length - 1) {
        const conteoSimbolos = new Map();

        rodillos.forEach(function (rodillo) {
          const cantidad = conteoSimbolos.get(rodillo.alt) || 0;
          conteoSimbolos.set(rodillo.alt, cantidad + 1);
        });

        const hayRepetidos = Array.from(conteoSimbolos.values()).some(function (cantidad) {
          return cantidad >= 2;
        });

        bigwin.hidden = !hayRepetidos;
        mensajePerdida.hidden = hayRepetidos;

        boton.disabled = false;
      }

    }, 650 + indice * 250);

  });

}


boton.addEventListener("click", girarTragamonedas);

// Al abrir la página, muestra las imagenes de manera aleatoria.

rodillos.forEach(function (imagen) {
  cambiarSimbolo(imagen);
});