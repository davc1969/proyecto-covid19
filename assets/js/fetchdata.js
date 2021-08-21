//**************************************************
// Módulo FETCHDATA
//
// Módulo para leer los datos del servidor, 
// hace un fetch a una url pasada como parámetro
// y hace el try/catch para manejarla.
// 
//**************************************************


// Funcion FETCHDATA
// toma como parámetro el url del API donde se van a leer los datos
// Esta función retorna un objeto RESPONSE
const fetchData = async (url) => {

    try {
        const response = await fetch(url);
        console.log("funcion fetchData", response);
        return response;
    }
    catch (err) {
        alert("allgo mal")
        localStorage.clear()
        console.error(`Error: ${err}`)

    }

    
}

export default fetchData;
