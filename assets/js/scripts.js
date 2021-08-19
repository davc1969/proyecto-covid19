const callModal2 =  (country) => { 

    $("#modalCredentials").modal('show');

}


function closeSession() {
    localStorage.removeItem("jwt-token");
    window.reload;
}

window.onload =  async function(){

    const topMenu = document.getElementById("menuOptions")
    const existsToken = localStorage.getItem("jwt-token");
    if (existsToken) {
        topMenu.innerHTML += `<a class="nav-item nav-link active" href="chile.html">Situación Chile</a>`
        topMenu.innerHTML += `<btn class="nav-item nav-link" href="" id="closeSession" style="cursor: pointer;" onclick="closeSession()">Cerrar Sesión</btn>`
    } else {
        topMenu.innerHTML += `<btn class="nav-item nav-link" href="" id="linkSession" style="cursor: pointer;" onclick="callModal2('chile')">Iniciar Sesión</btn>`
    }


    try {
        const response = await fetch('http://localhost:3000/api/total');
        const {data}   = await response.json()

        if (data) {

            const filteredData = data.filter(item => {return item.confirmed >= 1000000})
            const chartData = formatDataToChart(filteredData);
            createChart(chartData,"chartCanvas");
            fillTable(data, "tableBody");
        }
    } 
    catch (err) {
        localStorage.clear()
        console.error(`Error: ${err}`)
    }

};

function formatDataToChart(data) {
    let newData = [{
        type: "column",
        name: "Casos Activos",
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

    return newData
}


function createChart(dataGraph, idLocation) {


    var chart = new CanvasJS.Chart("chartContainer", {
        exportEnabled: true,
        animationEnabled: true,
        title:{
            text: "Países con mas de 1.000.000 casos activos de Covid19"
        },
        toolTip: {
            shared: true
        },
        data: dataGraph
    });

    console.log("chart:", idLocation, dataGraph);
    chart.render();

}

function createChartCountry(dataGraph, idLocation) {


    var chart = new CanvasJS.Chart("chartCountry", {
        animationEnabled: true,
        width: 450,
        height: 300,
        title:{
            text: "confirmados y fallecidos"
        },
        toolTip: {
            shared: true
        },
        data: dataGraph
    });

    console.log("chart:", idLocation, dataGraph);
    chart.render();

}

{/* <tr>
    <th scope="row">1</th>
    <td>Mark</td>
    <td>Otto</td>
    <td>@mdo</td>
    <td><a href="">Ver detalle</a></td>
</tr> */}

function fillTable(data, idLocation) {
    let tableToBeFilled = document.getElementById(idLocation);
//    console.log("fillTable: ", data);
    data.forEach( (element, index) => {
        let row = document.createElement('tr')
        let dataTD = ""
        dataTD += `  <td scope="row">${index + 1}</td>`;
        dataTD += `  <td>${element.location}</td>`;
        dataTD += `  <td>${element.confirmed}</td>`;
        dataTD += `  <td>${element.deaths}</td>`;
        dataTD += `  <td><button onclick=callModal("${element.location.replaceAll(" ", "_")}")>Ver detalle</button></td>`;
        row.innerHTML = dataTD;
        tableToBeFilled.appendChild(row)
    });
    
}

const callModal = async (country) => { 


    let modal1 = document.getElementById("modalCountry");
    document.getElementById("modalTitle").innerText = `Casos Covid19: ${country}`

    try {
        const urlCountry = `http://localhost:3000/api/countries/${country}`;

        const response = await fetch(urlCountry);
        console.log("callModal response ", response);

        const { [country]: data, dt, ts } = await response.json();
        console.log("callModal data ", data);

        if (data) {

            let dataChartCountry = [{

                type: "column",
                yValueFormatString: "0 casos",
                dataPoints: [{
                    label: "Confirmados",
                    y : data.confirmed},
                    {label : "Fallecidos",
                    y : data.deaths }
                ]
            }]

            console.log("callModal datachart", dataChartCountry);
            createChartCountry(dataChartCountry,"chartCountry");
        }
        else { 
            console.log("error 333333");
            throw 404;
        }
    } 
    catch (err) {
        alert ("Información no disponible para el país seleccionado");
        console.error(err)
    }


    $("#modalCountry").modal('show');

}




const getUserToken = async (email, password) => {
    try {
        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            body: JSON.stringify({ email: email, password: password }),
        });
        const { token } = await response.json();
        console.log("getUserToken: ", token);
        localStorage.setItem('jwt-token',token);
        return token;
    } catch (err) {
        console.error(`Error: ${err}`);
    }
}



document.getElementById("formUserInput").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const userEmail    = document.getElementById("userEmail").value;
    const userPassword = document.getElementById("userPassword").value;
    console.log("Submit: ", userEmail, userPassword);

    //Enviar esa información al procecdimiento donde se busca el usuario en la BD
    try {
        const JWT = await getUserToken(userEmail, userPassword);
        console.log("Submit: ", JWT);
        $("#modalCredentials").modal('hide');
        location.href = "chile.html";
    }
    catch {
        alert ("Error, intente nuevamente: " + Error(err));
        $("#modalCredentials").modal('hide');
    }


})


const openSessionModal = async () => {
    await $("#modalCredentials").modal('show');
}


