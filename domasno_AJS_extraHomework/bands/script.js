import {fetchBands, fillTable, fillFilters } from "./bandsHelper.js";

let tbody = document.getElementsByTagName("tbody")[0];
let allBands = [];
let pagination = {
    currentPage: 0,
    itemsPerPage: 6,
    maxPages: 0
}

fetchBands((data) => {
    console.log("Fetched data:", data); 
    allBands = [...data]; 
    pagination.maxPages = Math.ceil(allBands.length / pagination.itemsPerPage);
    let cutProducts = allBands.slice(pagination.currentPage * pagination.itemsPerPage,(pagination.currentPage + 1) * pagination.itemsPerPage);
    document.getElementById("Page").innerHTML = `${pagination.currentPage + 1}/${pagination.maxPages}`;
    fillTable(cutProducts, tbody);
    fillFilters(allBands, document.getElementById("tagFilter"));
});
document.getElementById("searchBtn").addEventListener("click", function(){
    let bandNameInput = document.getElementById("BandInput").value.toLowerCase();
    let tagFilter = document.getElementById("tagFilter").value.toLowerCase();
    let activeFilter = document.getElementById("ActiveFilter").checked;
    let notActiveFilter = document.getElementById("notActiveFilter").checked;
    let filterBands = allBands.filter(band => 
        (bandNameInput === "" || band.name.toLowerCase().includes(bandNameInput)) &&
        (tagFilter === "all" || band.tags.some(tag => tag.toLowerCase().includes(tagFilter))) &&(activeFilter ? band.active === true : true) &&
        (notActiveFilter ? band.active === false : true)
    );
    pagination.maxPages = Math.ceil(filterBands.length / pagination.itemsPerPage);
    if(filterBands.length === 0){
        tbody.innerHTML = `<p>No Bands found matching your criteria</p>`
    }
    else{
        fillTable(filterBands, tbody);
    }
});
document.getElementById("resetBtn").addEventListener("click", function(){
    document.getElementById("BandInput").value = "";
    document.getElementById("tagFilter").value = "All";
    document.getElementById("ActiveFilter").checked = false;
    document.getElementById("notActiveFilter").checked = false;
    fetchBands((data) => {
        allBands = data;
        let cutProducts = allBands.slice(
            pagination.currentPage * pagination.itemsPerPage, 
            (pagination.currentPage + 1) * pagination.itemsPerPage
        );
        fillTable(cutProducts, tbody);
    });
});

document.getElementById("prevPage").addEventListener("click", function(){
    if (pagination.currentPage > 0) {
        pagination.currentPage--;
        fetchBands((data) => {
            allBands = data;
            let cutProducts = allBands.slice(
                pagination.currentPage * pagination.itemsPerPage, 
                (pagination.currentPage + 1) * pagination.itemsPerPage
            );
            fillTable(cutProducts, tbody);
            document.getElementById("Page").innerHTML = `${pagination.currentPage + 1}/${pagination.maxPages}`;
        });
    }
});
document.getElementById("nextPage").addEventListener("click", function(){
    if (pagination.currentPage < pagination.maxPages - 1) {
        pagination.currentPage++;
        fetchBands((data) => {
            allBands = data;
            let cutProducts = allBands.slice(
                pagination.currentPage * pagination.itemsPerPage, 
                (pagination.currentPage + 1) * pagination.itemsPerPage
            );
            fillTable(cutProducts, tbody);
            document.getElementById("Page").innerHTML = `${pagination.currentPage + 1}/${pagination.maxPages}`;
        });
    }
});
let bandAscending = false;
let albumAscending = false;
document.getElementById("nameBand").addEventListener("click", function () {
    allBands.sort((a, b) => bandAscending ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name));
    bandAscending = !bandAscending;
    fillTable(allBands, tbody);
    document.getElementById("nameBand").innerHTML = `Name of the Band ${bandAscending ? "⬆" : "⬇"}`;
});

document.getElementById("albumsBand").addEventListener("click", function () {
    allBands.sort((a, b) => albumAscending ? b.albums.length - a.albums.length : a.albums.length - b.albums.length);
    albumAscending = !albumAscending;
    fillTable(allBands, tbody);
    document.getElementById("albumsBand").innerHTML = `Albums ${albumAscending ? "⬆" : "⬇"}`;
});
