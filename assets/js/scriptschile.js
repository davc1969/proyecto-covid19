function closeSession() {
    localStorage.removeItem("jwt-token");
    console.log("cerrar sesion");
}


window.onload =  async function(){

    let dataConfirmed;
    let dataDeaths;
    let dataRecovered;

    const jwt = localStorage.getItem("jwt-token");

    try {
        console.log("entrando al try");
        const response = await fetch('http://localhost:3000/api/confirmed',
        {
            method:'GET',
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        let {data}   = await response.json();

        if (data) {
            dataConfirmed = await data;

            const response = await fetch('http://localhost:3000/api/deaths',
            {
                method:'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });

            data = await response.json();

            if (data) {
                dataDeaths = await data;

                const response = await fetch('http://localhost:3000/api/recovered',
                {
                    method:'GET',
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                });
                data = await response.json();

                if (data) {
                    dataRecovered = await data;
                }
            }
        }

    }
    catch (err) {
        localStorage.clear();
        alert("problema, en catch")
        console.error(`Error: ${err}`)
    }

    if (dataRecovered) {
        const newData = createDataPoints(dataConfirmed, dataDeaths, dataRecovered);
        createChartCountry(newData);
    }
    else {
        alert ("No se encontró la data")
    }
};


const createDataPoints = (confirmed, dead, recovered) => {

    let newData = [{
        type: "line",
        name: "Confirmados",
        showInLegend: true,
        yValueFormatString: "0 casos",
        dataPoints: []
    }, 
    {
        type: "line",
        name: "Fallecidos",
        showInLegend: true,
        yValueFormatString: "0 casos",
        dataPoints: []
    }, 
    {
        type: "line",
        name: "Recuperados",
        showInLegend: true,
        yValueFormatString: "0 casos",
        dataPoints: []
    }];

    confirmed.forEach(element => {
        newData[0].dataPoints.push({
            x : formatDate(element.date),
            y : element.total
        });
    })

    dead.data.forEach((element, index) => {
        newData[1].dataPoints.push({
            x : formatDate(element.date),
            y : element.total
        });
    })

    recovered.data.forEach((element, index) => {
        newData[2].dataPoints.push({
            x : formatDate(element.date),
            y : (element.total > 0 ? element.total : null)
        });
    })

    console.log("nd ", newData);

    const dataToGraph = {
        exportEnabled: true,
        animationEnabled: true,
        title:{
            text: "Histórico de casos: Chile"
        },
        toolTip: {
            shared: true
        },
        data: newData
    }

    return dataToGraph;

}

function createChartCountry(dataToGraph) {


//    const savedData = JSON.stringify(dataToGraph);
//    localStorage.setItem("data-Graph", savedData);

    var chart = new CanvasJS.Chart("chartContainer", dataToGraph);

    chart.render();

}


function formatDate(stringDate) {

    const splittedDate = stringDate.split("/");
    return new Date(splittedDate[2] * 1  + 2000, splittedDate[0] * 1 - 1 , splittedDate[1] * 1)

}