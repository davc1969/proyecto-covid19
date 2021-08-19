//**************************************************
// Módulo FETCHDATA
//
// Módulo para leer los datos del servidor, 
// hace un fetch a una url pasada como parámetro
// y hace el try/catch para manejarla.
// 
// Esta función retorna un objeto RESPONSE
//**************************************************

const { response } = require("express");


function fetchData = async (url) => {
// url del API donde se van a leer los datos

    try {
        const response = await fetch('http://localhost:3000/api/total');
    }
    catch (err) {
        localStorage.clear()
        console.error(`Error: ${err}`)

    }

    return response
}