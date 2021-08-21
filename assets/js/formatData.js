//**************************************************
// Módulo FORMATDATA
//
// Módulo con funciones útiles para dar formato a 
// los datos que hay que graficar.
// Tambien tiene otras funciones putiles de datos
// como el filtro de lo que se va a graficar
// 
//**************************************************


// Funcion FILTERDATA
// toma como parámetro un array y un entero que indica el límite 
// mínimo de los datos a gráficar que serán tomados del array
const filterData = (arreglo, minLimit) => {
    return arreglo.filter(item => {return item.confirmed >= minLimit})
}


export default filterData
