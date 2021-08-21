
import fetchData from "./fetchdata.js";
import {createChart, formatDataToChart} from "./chart.js";

//**************************************************
// Módulo MODAL
//
// Módulo para crear y mostrar los modales en la
// la página index.html.
// Hay dos modales, uno para mostrar información 
// del país y otro para pedir las credenciales
// de login para abrir la página chile.html
// 
//**************************************************


const callModalCountry = async (country) => { 

    let arrayData = [];
    const urlCountry = `http://localhost:3000/api/countries/${country}`;

    let modal1 = document.getElementById("modalCountry");
    document.getElementById("modalTitle").innerText = `Casos Covid19: ${country}`;

    const response = await fetchData(urlCountry);
    console.log("en callmodal ", response);    
    if (response) {
        //Destructuración del JSON, este viene de otro link que no es el original
        const { [country]: data, dt, ts } = await response.json();
        if (data) {
            arrayData.push(data)
            console.log("data en el call", data, arrayData);

            // let dataChartCountry = [{

            //     type: "column",
            //     yValueFormatString: "0 casos",
            //     dataPoints: [{
            //         label: "Confirmados",
            //         y : data.confirmed},
            //         {label : "Fallecidos",
            //         y : data.deaths }
            //     ]
            // }]

//            console.log("callModal datachart", dataChartCountry);
            createChart(arrayData,"chartCountry", `Casos Covid19: ${country}`, 3);
        }
        else { 
            console.log("error 333333");
            
        } 
    }

    $("#modalCountry").modal('show');

}


export default callModalCountry;