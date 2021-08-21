import callModalCountry from "./modal.js"



//**************************************************
// Módulo TABLES
//
// Módulo para crear una tabla de datos, 
// se utiliza la libreria dataTables
// 
//**************************************************


function fillTable (data, idLocation) {
    let tableToBeFilled = document.getElementById(idLocation);

    data.forEach( (element, index) => {
        let row = document.createElement('tr')
        let dataTD = ""
        dataTD += `  <td scope="row">${index + 1}</td>`;
        dataTD += `  <td>${element.location}</td>`;
        dataTD += `  <td>${element.confirmed}</td>`;
        dataTD += `  <td>${element.deaths}</td>`;
        //dataTD += `  <td><button onclick=callModal("${element.location.replaceAll(" ", "_")}")>Ver detalle</button></td>`;
        row.innerHTML = dataTD;
        tableToBeFilled.appendChild(row)
    });

    console.log("are we here?");
    const table = $('#countryDataTable').DataTable(
        {
        "lengthChange": false,
        "pageLength": 25,
        "language": {
            "info": "Mostrando _START_ a _END_ de _TOTAL_ países",
            "search":         "Buscar:",
            "paginate": {
                "first":      "Primero",
                "last":       "Último",
                "next":       "Siguiente",
                "previous":   "Anterior"
            },
          }
        } 
    );
    
    $('#countryDataTable tbody').on('click', 'tr', function () {
        const data = table.row( this ).data();
        callModalCountry(data[1].replaceAll(" ", "_"));
    } );
}

export default fillTable;