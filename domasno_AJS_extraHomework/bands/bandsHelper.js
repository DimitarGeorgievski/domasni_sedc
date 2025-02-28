export const url = "https://raw.githubusercontent.com/sedc-codecademy/sedc6-frontend-exam/master/band-data.json";
export function fetchBands(callback) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            callback(data);
        })
}
export function fillTable(data,container){
    let html = "";
    for (let i = 0; i < data.length; i++) {
        let band = data[i];
        let row = `<tr>
            <td>${i + 1}</td>
            <td>${band.name}</td>
            <td>${band.active ? "✅" : "❌"}</td>
            <td>${band.tags.join(", ")}</td>
            <td>${band.members.map(member => member.name).join(", ")}</td>
            <td>${band.albums.length}</td>
        </tr>`;
        html += row;
    }
    container.innerHTML = html;
}
export function fillFilters(bands, dropdown) {
    dropdown.innerHTML = `<option value="All">All</option>`;
    let uniqueTags = [...new Set(bands.flatMap(band => band.tags))];
    for (let tag of uniqueTags) {
        dropdown.innerHTML += `<option value="${tag}">${tag}</option>`;
    }
}