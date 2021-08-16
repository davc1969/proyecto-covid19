function closeSession() {
    localStorage.removeItem("jwt-token");
//    location.href = "index.html";
    console.log("cerrar sesion");
    alert("chile, cerrar")
}




window.onload =  async function(){

    let dataConfirmed;
    let dataDeaths;
    let dataRecovered;

    const jwt = localStorage.getItem("jwt-token");
    console.log("inicio", jwt);

    try {
        console.log("entrando al try");
        const response = await fetch('http://localhost:3000/api/confirmed',
        {
            method:'GET',
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        console.log("response confirmed ", response);
        let {data}   = await response.json();

        if (data) {
            //console.log("datos confirmados ", data);
            //console.log("tipo de confirmados data", typeof data);
            dataConfirmed = await data;
            //console.log("se obtuvo data confirmados ", dataConfirmed);

            const response = await fetch('http://localhost:3000/api/deaths',
            {
                method:'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("try dead response", response);
            
            data = await response.json();

            console.log("dead data ", data);

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

    console.log("createData", confirmed);
    console.log("createData ", dead);

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
            y : element.total
        });
    })


    console.log("newdata ", newData);
    return newData;
}

function createChartCountry(dataGraph) {


    var chart = new CanvasJS.Chart("chartContainer", {
        exportEnabled: true,
        animationEnabled: true,
        title:{
            text: "Histórico de casos: Chile"
        },
        toolTip: {
            shared: true
        },
        data: dataGraph
    });


    chart.render();

}


function formatDate(stringDate) {

    const splittedDate = stringDate.split("/");
    //console.log("fecha separada", splittedDate);
    return new Date(splittedDate[2] * 1 + 2000, splittedDate[0] * 1 , splittedDate[1] * 1)

}