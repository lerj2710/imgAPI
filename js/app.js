import { formulario } from './selectores.js';
import {ValidarFormulario} from './funciones.js'

window.onload = () =>{
    formulario.addEventListener('submit', ValidarFormulario)
}