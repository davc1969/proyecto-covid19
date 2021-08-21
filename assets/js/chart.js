//**************************************************
// Módulo CHART
//
// Módulo con funciones útiles para graficar la 
// información solicitada
// 
//**************************************************





// Funcion CREATECHART
// Crea el gráfico y lo coloca en el contenedor que está ya puesto en el HTML
// Los gráficos se crean con la librería canvasJS
// Esta función toma como parámetros la data (dataGraph), el ID del html (idLocation), 
// el título del gráfico (strTitle) y opciones para graficar las series (options)
function createChart(dataGraph, idLocation, strTitle, options) {

    console.log("chart opciones: ", options);
    var chart = new CanvasJS.Chart(idLocation, {
        animationEnabled: true,
        title:{
            text: strTitle
        },
        toolTip: {
            shared: true
        },
        data: formatDataToChart(dataGraph, options)
    });

    chart.render();

}


function formatDataToChart(data, options) {
    let newData = [{
        type: "column",
        name: "Casos confirmados",
        showInLegend: true,
        yValueFormatString: "0 casos",
        dataPoints: []
    }, 
    {
        type: "column",
        name: "Fallecidos",
        showInLegend: true,
        yValueFormatString: "0 casos",
        dataPoints: []
    }];

    console.log("en format data ", data.length);
    if (data.length > 1){
        data.forEach(element => {
            newData[0].dataPoints.push(
                {label : element.location,
                 y : element.confirmed
                }
            )
            newData[1].dataPoints.push(
                {label : element.location,
                 y : element.deaths
                }
            )
        });
    } 
    else {
        newData[0].dataPoints.push(
            {label : "Confirmados",
             y : data[0].confirmed }
        );
        newData[1].dataPoints.push(
            {label : "Fallecidos",
             y : data[0].deaths }
        );
    }

    return newData
}


export {createChart, formatDataToChart}

