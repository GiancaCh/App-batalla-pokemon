// Los queryselector
const primer_poke_buscador = document.querySelector('#primer_poke_buscador');
const segundo_poke_buscador = document.querySelector('#segundo_poke_buscador');
const primer_poke_mensaje = document.querySelector('#primer_poke_mensaje');
const segundo_poke_mensaje = document.querySelector('#segundo_poke_mensaje');

const primer_poke_elegido = document.querySelector('#primer_poke_elegido');
const primer_poke_foto_elegido = document.querySelector('#primer_poke_foto_elegido');
const primer_poke_nombre_elegido = document.querySelector('#primer_poke_nombre_elegido');
const primer_poke_vida_elegido = document.querySelector('#primer_poke_vida_elegido');

const segundo_poke_elegido = document.querySelector('#segundo_poke_elegido');
const segundo_poke_foto_elegido = document.querySelector('#segundo_poke_foto_elegido');
const segundo_poke_nombre_elegido = document.querySelector('#segundo_poke_nombre_elegido');
const segundo_poke_vida_elegido = document.querySelector('#segundo_poke_vida_elegido');

const boton_empezar = document.querySelector('#boton_empezar');

const pantalla_inicio = document.querySelector('#pantalla_inicio');
const pantalla_batalla = document.querySelector('#pantalla_batalla');
const pantalla_final = document.querySelector('#pantalla_final');

const primer_poke_nombre = document.querySelector('#primer_poke_nombre');
const primer_poke_foto = document.querySelector('#primer_poke_foto');
const primer_poke_barra = document.querySelector('#primer_poke_barra');
const primer_poke_vida = document.querySelector('#primer_poke_vida');
const primer_poke_ataques = document.querySelector('#primer_poke_ataques');

const segundo_poke_nombre = document.querySelector('#segundo_poke_nombre');
const segundo_poke_foto = document.querySelector('#segundo_poke_foto');
const segundo_poke_barra = document.querySelector('#segundo_poke_barra');
const segundo_poke_vida = document.querySelector('#segundo_poke_vida');
const segundo_poke_ataques = document.querySelector('#segundo_poke_ataques');

const primer_poke_nombre_final = document.querySelector('#primer_poke_nombre_final');
const primer_poke_foto_final = document.querySelector('#primer_poke_foto_final');
const primer_poke_barra_final = document.querySelector('#primer_poke_barra_final');
const primer_poke_vida_final = document.querySelector('#primer_poke_vida_final');

const segundo_poke_nombre_final = document.querySelector('#segundo_poke_nombre_final');
const segundo_poke_foto_final = document.querySelector('#segundo_poke_foto_final');
const segundo_poke_barra_final = document.querySelector('#segundo_poke_barra_final');
const segundo_poke_vida_final = document.querySelector('#segundo_poke_vida_final');

const texto_ganador = document.querySelector('#texto_ganador');
const boton_reiniciar = document.querySelector('#boton_reiniciar');

// Datos de cada pokemon elegido 
let primer_poke = null;
let segundo_poke = null;

// Temporizadores para el debounce de cada buscador (Hecho con ayuda de IA)
let temporizador_primero;
let temporizador_segundo;

// Funcion para cambiar entre las pantallas
function cambiar_pantalla(pantalla_a_mostrar) {
  pantalla_inicio.classList.add('oculto');
  pantalla_batalla.classList.add('oculto');
  pantalla_final.classList.add('oculto');

  pantalla_a_mostrar.classList.remove('oculto');
}

// Funcion que solo hace el fetch a la API 
async function buscar_pokemon(nombre) {
  try {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);

    if (!respuesta.ok) {
      return null;
    }

    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    return null;
  }
}

// Funcion que agarra los datos de la API 
function armar_pokemon(datos) {
  let vida = 0;

  for (let i = 0; i < datos.stats.length; i++) {
    if (datos.stats[i].stat.name === 'hp') {
      vida = datos.stats[i].base_stat;
    }
  }

  const movimientos = [];
  const cantidad_movimientos = 4;

  for (let i = 0; i < cantidad_movimientos; i++) {
    if (datos.moves[i]) {
      movimientos.push(datos.moves[i].move.name);
    }
  }

  const pokemon = {
    nombre: datos.name,
    imagen: datos.sprites.front_default,
    vida_maxima: vida,
    vida_actual: vida,
    movimientos: movimientos
  };

  return pokemon;
}

// Habilita el boton de empezar solo si los dos pokemon estan listos
function revisar_listos() {
  if (primer_poke !== null && segundo_poke !== null) {
    boton_empezar.disabled = false;
  } else {
    boton_empezar.disabled = true;
  }
}

// Busca un pokemon por nombre y lo muestra en la pantalla de inicio
// Aca la IA me ayudó a poner los mensajes de guía como "buscando" o "no encontrado" al momento de escribir para buscar algun pokemon
async function elegir_pokemon(nombre, numero) {
  let mensaje;
  let div_elegido;
  let foto_elegido;
  let nombre_elegido;
  let vida_elegido;

  if (numero === 1) {
    mensaje = primer_poke_mensaje;
    div_elegido = primer_poke_elegido;
    foto_elegido = primer_poke_foto_elegido;
    nombre_elegido = primer_poke_nombre_elegido;
    vida_elegido = primer_poke_vida_elegido;
  } else {
    mensaje = segundo_poke_mensaje;
    div_elegido = segundo_poke_elegido;
    foto_elegido = segundo_poke_foto_elegido;
    nombre_elegido = segundo_poke_nombre_elegido;
    vida_elegido = segundo_poke_vida_elegido;
  }

  // Mensajes con ayuda de la IA
  mensaje.textContent = 'Buscando...';
  div_elegido.classList.add('oculto');

  const datos = await buscar_pokemon(nombre);

  if (datos === null) {
    mensaje.textContent = 'Pokémon no encontrado';

    if (numero === 1) {
      primer_poke = null;
    } else {
      segundo_poke = null;
    }

    revisar_listos();
    return;
  }

  const pokemon = armar_pokemon(datos);

  if (numero === 1) {
    primer_poke = pokemon;
  } else {
    segundo_poke = pokemon;
  }

  mensaje.textContent = '';
  foto_elegido.src = pokemon.imagen;
  nombre_elegido.textContent = pokemon.nombre;
  vida_elegido.textContent = 'Vida: ' + pokemon.vida_maxima;
  div_elegido.classList.remove('oculto');

  revisar_listos();
}

// Los 4 botones de ataque de un pokemon
function mostrar_ataques(numero) {
  let poke;
  let contenedor;
  let numero_rival;

  if (numero === 1) {
    poke = primer_poke;
    contenedor = primer_poke_ataques;
    numero_rival = 2;
  } else {
    poke = segundo_poke;
    contenedor = segundo_poke_ataques;
    numero_rival = 1;
  }

  contenedor.innerHTML = '';

  for (let i = 0; i < poke.movimientos.length; i++) {
    const nombre_movimiento = poke.movimientos[i];

    const boton_ataque = document.createElement('button');
    boton_ataque.textContent = nombre_movimiento;

    boton_ataque.addEventListener('click', function () {
      atacar(numero_rival);
    });

    contenedor.appendChild(boton_ataque);
  }
}

// Actualiza la barra y el texto de vida durante la batalla
function actualizar_barra(numero) {
  let poke;
  let barra;
  let texto_vida;

  if (numero === 1) {
    poke = primer_poke;
    barra = primer_poke_barra;
    texto_vida = primer_poke_vida;
  } else {
    poke = segundo_poke;
    barra = segundo_poke_barra;
    texto_vida = segundo_poke_vida;
  }

  const porcentaje = (poke.vida_actual / poke.vida_maxima) * 100;

  barra.style.width = porcentaje + '%';
  texto_vida.textContent = poke.vida_actual + ' / ' + poke.vida_maxima;

  if (porcentaje <= 25) {
    barra.style.backgroundColor = 'red';
  } else {
    barra.style.backgroundColor = 'green';
  }
}

// Le baja la vida al rival cuando se le da click a un ataque
function atacar(numero_rival) {
  const dano = Math.floor(Math.random() * 20) + 10;

  if (numero_rival === 1) {
    primer_poke.vida_actual = primer_poke.vida_actual - dano;

    if (primer_poke.vida_actual < 0) {
      primer_poke.vida_actual = 0;
    }
  } else {
    segundo_poke.vida_actual = segundo_poke.vida_actual - dano;

    if (segundo_poke.vida_actual < 0) {
      segundo_poke.vida_actual = 0;
    }
  }

  actualizar_barra(numero_rival);

  if (primer_poke.vida_actual === 0 || segundo_poke.vida_actual === 0) {
    terminar_batalla();
  }
}

// Pasa de la pantalla de inicio a la de batalla
function empezar_batalla() {
  primer_poke.vida_actual = primer_poke.vida_maxima;
  segundo_poke.vida_actual = segundo_poke.vida_maxima;

  primer_poke_nombre.textContent = primer_poke.nombre;
  primer_poke_foto.src = primer_poke.imagen;

  segundo_poke_nombre.textContent = segundo_poke.nombre;
  segundo_poke_foto.src = segundo_poke.imagen;

  actualizar_barra(1);
  actualizar_barra(2);

  mostrar_ataques(1);
  mostrar_ataques(2);

  cambiar_pantalla(pantalla_batalla);
}

// Actualiza la barra y el texto de vida en la pantalla final
function actualizar_barra_final(numero) {
  let poke;
  let barra;
  let texto_vida;

  if (numero === 1) {
    poke = primer_poke;
    barra = primer_poke_barra_final;
    texto_vida = primer_poke_vida_final;
  } else {
    poke = segundo_poke;
    barra = segundo_poke_barra_final;
    texto_vida = segundo_poke_vida_final;
  }

  const porcentaje = (poke.vida_actual / poke.vida_maxima) * 100;

  barra.style.width = porcentaje + '%';
  texto_vida.textContent = poke.vida_actual + ' / ' + poke.vida_maxima;
}

// Muestra la pantalla final con el ganador
function terminar_batalla() {
  let texto;

  if (primer_poke.vida_actual === 0) {
    texto = segundo_poke.nombre + ' ha ganado la batalla';
  } else {
    texto = primer_poke.nombre + ' ha ganado la batalla';
  }

  texto_ganador.textContent = texto;

  primer_poke_nombre_final.textContent = primer_poke.nombre;
  primer_poke_foto_final.src = primer_poke.imagen;

  segundo_poke_nombre_final.textContent = segundo_poke.nombre;
  segundo_poke_foto_final.src = segundo_poke.imagen;

  actualizar_barra_final(1);
  actualizar_barra_final(2);

  cambiar_pantalla(pantalla_final);
}

// Vuelve todo al estado inicial para jugar de nuevo
function reiniciar() {
  primer_poke = null;
  segundo_poke = null;

  primer_poke_buscador.value = '';
  segundo_poke_buscador.value = '';

  primer_poke_mensaje.textContent = '';
  segundo_poke_mensaje.textContent = '';

  primer_poke_elegido.classList.add('oculto');
  segundo_poke_elegido.classList.add('oculto');

  boton_empezar.disabled = true;

  cambiar_pantalla(pantalla_inicio);
}

// Eventos de los buscadores 
primer_poke_buscador.addEventListener('input', function () {
  clearTimeout(temporizador_primero);

  temporizador_primero = setTimeout(function () {
    const nombre_escrito = primer_poke_buscador.value.trim().toLowerCase();

    if (nombre_escrito === '') {
      return;
    }

    elegir_pokemon(nombre_escrito, 1);
  }, 500);
});

segundo_poke_buscador.addEventListener('input', function () {
  clearTimeout(temporizador_segundo);

  temporizador_segundo = setTimeout(function () {
    const nombre_escrito = segundo_poke_buscador.value.trim().toLowerCase();

    if (nombre_escrito === '') {
      return;
    }

    elegir_pokemon(nombre_escrito, 2);
  }, 500);
});

// Eventos de botones
boton_empezar.addEventListener('click', function () {
  empezar_batalla();
});

boton_reiniciar.addEventListener('click', function () {
  reiniciar();
});