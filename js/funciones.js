import { formulario, resultado, resgistroPagina, paginacion  } from './selectores.js';
let totalPaginas;
let iterador;
let paginaActual;

export const ValidarFormulario = e => {

    e.preventDefault();

    const Buscartermino = document.querySelector('#termino').value;
    if (Buscartermino === '') {
        mostrarAlerta('Agrega un termino de busqueda', 'error');
        return;
    }
    buscarImagenes();
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

async function buscarImagenes() {
    const termino = document.querySelector('#termino').value;    

    const key = '23903726-f6955a57141d6856f725b7c8b';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${resgistroPagina}&page=${paginaActual}`;

    // fetch(url)
    //     .then(respuesta => respuesta.json())
    //     .then(resultado =>{
    //       totalPaginas = calcularPagina(resultado.totalHits);
    //        mostrarImagenes(resultado.hits);
    //     });
    
         try {
             const respuesta = await fetch(url)
            const resultado =  await respuesta.json()
            totalPaginas = calcularPagina(resultado.totalHits);
            mostrarImagenes(resultado.hits);
         } catch (error) {
             console.log(error);
         }
};

//Buen uso de el generador para iterar sobre la cantidad de elementos
function *crearPaginador(total){
    for(let i = 1; i <=total ; i++){
        yield i;
    }
}
const calcularPagina = (total)=>{
 return parseInt(Math.ceil(total / resgistroPagina));
};
const mostrarImagenes = imagenes =>{

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
    //limpiar el html
    while (paginacion.firstChild) {
        paginacion.removeChild(paginacion.firstChild)

    }
    imprimirPaginador()

};

function imprimirPaginador() {
    iterador = crearPaginador(totalPaginas);
    while (true) {
  const {value, done} =  iterador.next();
      if(done) return;

      //en caso contrio crea un parrafo con boton
      const btn = document.createElement('a');
      btn.href ='#';
      btn.dataset.pagina = value;
      btn.classList.add('siguiente', 'bg-yellow-400','px-4', 'py-1', 'mr-2', 'uppercase', 'font-bold', 'rounded', 'mb-4')
      btn.textContent= value;
    btn.onclick = ()=>{
        paginaActual = value;
        buscarImagenes()
    }
      paginacion.appendChild(btn);
  }
}