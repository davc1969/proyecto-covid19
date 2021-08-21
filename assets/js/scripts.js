
import fetchData from "./fetchdata.js";
import filterData from "./formatData.js"
import {createChart, formatDataToChart} from "./chart.js";
import fillTable from "./tables.js"

// filteredData es una variable Global que me permite filtlrar los datos a mostrar en el gráfico principal y cambair dinámicamente el gráfico
let dataGlobal;

// chartOptions es una variable global que me permite ver opciones sobre qué hay que graficar, tiene 4 valores posibles:
// 0: no se grafica nada, 1: solo confirmados, 2: solo fallecidos, 3: ambas series de datos
let chartOptions = 3;


window.onload =  async function(){

    const topMenu = document.getElementById("menuOptions")
    const existsToken = localStorage.getItem("jwt-token");
    if (existsToken) {
        topMenu.innerHTML += `<a class="nav-item nav-link active" href="chile.html">Situación Chile</a>`
        topMenu.innerHTML += `<btn class="nav-item nav-link" href="" id="closeSession" style="cursor: pointer;" onclick="closeSession()">Cerrar Sesión</btn>`
    } else {
        topMenu.innerHTML += `<btn class="nav-item nav-link" href="" id="linkSession" style="cursor: pointer;" onclick="callModal2('chile')">Iniciar Sesión</btn>`
    }

    const response = await fetchData('http://localhost:3000/api/total');
    if (response) {
        const {data} = await response.json();

        if (data) {
            dataGlobal = data;
            const limit = 1000000;
            const filteredData = filterData(dataGlobal, limit);
            createChart(filteredData, "chartContainer", `Países con mas de ${limit} casos confirmados de Covid19`, chartOptions);

            fillTable(data, "tableBody");
            
        }
    } 
};





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



const dropDownCases = document.getElementById("casesSelection");
dropDownCases.addEventListener("change", (event) => {

    const limit = parseInt(dropDownCases.value);
    const filteredData = filterData(dataGlobal, limit);
    createChart(filteredData, "chartContainer", `Países con mas de ${limit} casos confirmados de Covid19`, chartOptions);

});

const optionConfirmed = document.getElementById("confirmedCases");
optionConfirmed.addEventListener("change", (event) => {

    if (optionConfirmed.checked) {      //Está seleccionado
        if (chartOptions == 0 || chartOptions == 2) {
            chartOptions += 1;
        }
    } else {
        if (chartOptions == 1 || chartOptions == 3) {
            chartOptions -= 1;
        }
    }

    const limit = parseInt(dropDownCases.value);
    const filteredData = filterData(dataGlobal, limit);
    createChart(filteredData, "chartContainer", `Países con mas de ${limit} casos confirmados de Covid19`, chartOptions);
});

const optionDeaths = document.getElementById("deathCases");
optionDeaths.addEventListener("change", (event) => {

    if (optionDeaths.checked) {      //Está seleccionado
        if (chartOptions == 0 || chartOptions == 1) {
            chartOptions += 2;
        }
    } else {
        if (chartOptions == 2 || chartOptions == 3) {
            chartOptions -= 2;
        }
    }

    const limit = parseInt(dropDownCases.value);
    const filteredData = filterData(dataGlobal, limit);
    createChart(filteredData, "chartContainer", `Países con mas de ${limit} casos confirmados de Covid19`, chartOptions);
});



const callModalCountry =  (country) => { 

    $("#modalCredentials").modal('show');

}


function closeSession() {
    localStorage.removeItem("jwt-token");
    window.reload;
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

