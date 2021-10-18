import { formulario, resultado } from './selectores.js';


export function ValidarFormulario(e) {
    e.preventDefault();

    const Buscartermino = document.querySelector('#termino').value;
    if (Buscartermino === '') {
        mostrarAlerta('Agrega un termino de busqueda', 'error');
        return;
    }
    buscarImagenes(Buscartermino);
}
const mostrarAlerta = (mensaje) =>{
    
        const existeAlerta = document.querySelector('.bg-red-100');
        if (!existeAlerta) {
            const mensajeError = document.createElement('p');
            mensajeError.classList.add('bg-red-100','border-red-400','text-red-700','px-5','mt-4','rounded',
            'max-w-md', 'mx-auto','mt-6','text-center');
            mensajeError.innerHTML =`
          <strong class="font-bold">Error!!</strong>
          <span class="block sm:inline">${mensaje}</span>
            `;

            formulario.appendChild(mensajeError)
            setTimeout(()=>{
                mensajeError.remove();
            },3000)
        
       
    }

    
};

const buscarImagenes = termino => {
    const key = '23903726-f6955a57141d6856f725b7c8b';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}`;
    fetch(url)
        .then(resultado => resultado.json())
        .then(respuesta =>{
           mostrarImagenes(respuesta.hits);
        })
};
const mostrarImagenes = imagenes =>{
    console.log(imagenes);
while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild)
    imagenes.forEach(imagen => {
    //  const {}= imagen
    });

}
};