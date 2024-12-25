let rows = document.getElementById("rows");
let columns = document.getElementById("columns");
let btn = document.getElementById("btn");

function createTable() {
    let rowsInput = parseInt(rows.value);
    let columnsInput = parseInt(columns.value);
    if (rowsInput <= 0 || columnsInput <= 0) {
        console.log("Vnesi pozitiven broj")
        return;
    }
    let table = '<table border="1">';
    for (let i = 1; i <= rowsInput; i++) {
        table += '<tr>';
        for (let j = 1; j <= columnsInput; j++) {
            table += `<td>Informacija</td>`;
        }
        table += '</tr>';
    }
    table += '</table>';
    document.getElementById('tableContainer').innerHTML = table;
}
btn.addEventListener("click", createTable);