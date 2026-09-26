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

// Datos de cada pokemon elegido (se llenan cuando se busca uno válido)
let primer_poke = null;
let segundo_poke = null;

// Temporizadores para el debounce de cada buscador
let temporizador_primero;
let temporizador_segundo;

// Funcion para cambiar entre las pantallas
function cambiar_pantalla(pantalla_a_mostrar) {
  pantalla_inicio.classList.add('oculto');
  pantalla_batalla.classList.add('oculto');
  pantalla_final.classList.add('oculto');

  pantalla_a_mostrar.classList.remove('oculto');
}
