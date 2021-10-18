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
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=60`;
    fetch(url)
        .then(resultado => resultado.json())
        .then(respuesta =>{
           mostrarImagenes(respuesta.hits);
        })
};
const mostrarImagenes = imagenes =>{
    console.log(imagenes);
while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
}
    imagenes.forEach(imagen => {
        const {views, previewURL, largeImageURL , likes}= imagen
        resultado.innerHTML += `
        <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
            <div class="bg-white">
                <img src="${previewURL}" class="w-full">
                
                <div class="p-4">
                    <p class="font-bold"> ${likes} <span class="font-light">Me gusta </span></p>
                    <p class="font-bold"> ${views} <span class="font-light">Visto </span></p>
                    <a
                        class="block w-full bg-blue-800 hover:bg-blue-500 text-white font-bold uppercase text-center p-1 rounded mt-5"
                         href="${largeImageURL}" target="_blank" rel="noopener noreferrer">ver Imagen
                    <a/>            
                </div>
            </div>
        </div>
        `;
    });

};