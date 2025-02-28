import { fetchBands} from "../bandsHelper.js";
let table1 = document.getElementById("table-band");
let table2 = document.getElementById("table-album");
let allBands = [];

fetchBands((data) => {
    allBands = data;
    fillFilters(allBands);
    fillTableBand(allBands);
});
function fillTableBand(data) {
    let html = "";
    for(let i=0;i<data.length;i++){
        let band = data[i];
        let {firstYear, lastYear, yearsActive} = calculateAlbumYears(band.albums);
        let {studioAlbums, liveAlbums, compilationAlbums} = albumSummaryType(band.albums);
        let row = `<tr>
            <td>${i + 1}</td>
            <td>${band.name}</td>
            <td>${band.active ? "✅" : "❌"}</td>
            <td>${yearsActive} Years Active</td>
            <td>${band.members.filter(member => member.former === true).map(member => member.name).join(", ")}</td>
            <td>${band.albums.length} Albums, first Album Year: ${firstYear}  Last Album Year: ${lastYear} </td>
            <td>Studio Albums: ${studioAlbums}, Live Albums: ${liveAlbums}, Compilation Albums: ${compilationAlbums}</td>
        </tr>`;
        html += row;
    }
    table2.innerHTML = html;
}
function fillFilters(bands) {
    let dropdown = document.getElementById("show-band");
    dropdown.innerHTML = `<option value="All">All</option>`;
    let bandNames =[...new Set(bands.map(band => band.name))];
    for(let band of bandNames){
        dropdown.innerHTML += `<option value="${band}">${band}</option>`;
    }
}
function fillTableAlbum(data){
    let html = "";
    for(let i=0;i<data.length;i++){
        let band = data[i];
        for(let album of band.albums){
            let row = `<tr>
            <td>${album.name}</td>
            <td>${album.year}</td>`;
        html += row;
        }  
    }
    table1.innerHTML = html;
}
function calculateAlbumYears(data){
    let albumYears = [];
    data.forEach(x => {
            albumYears.push(x.year);
    });
    let firstYear = Math.min(...albumYears);
    let lastYear = Math.max(...albumYears);
    let yearsActive = lastYear - firstYear;
    return {firstYear,lastYear,yearsActive};
}
function albumSummaryType(data){
    let studioAlbums = 0;
    let liveAlbums = 0;
    let compilationAlbums = 0;
    data.forEach(x => {
        if(x.type === "studio"){
            studioAlbums++;
        }
        if(x.type === "live"){
            liveAlbums++;
        }
        if(x.type === "compilation"){
            compilationAlbums++;
        }
    });
    return {studioAlbums, liveAlbums, compilationAlbums};
}
document.getElementById("show-band").addEventListener("change", () => {
    let selectedBand = document.getElementById("show-band").value;
    if(selectedBand === "All"){
        fillTableBand(allBands);
    }
    else{
        let filtertedData = allBands.filter(band => band.name === selectedBand);
        console.log(filtertedData);
        fillTableBand(filtertedData);
        fillTableAlbum(filtertedData);
    }
})