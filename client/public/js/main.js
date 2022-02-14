window.addEventListener('DOMContentLoaded', async () => await get())

let allHunts;

async function get() {
    try {
        const listedHuntsStream = await fetch(`http://localhost:5050/list/`);
        const listedHunts = await listedHuntsStream.json();
        allHunts = listedHunts.rows;
        writeHunts(listedHunts);
        buildSelectBoxes();
    } catch(e) {
        console.error(e);
    }
}

function writeHunts(listedHunts) {
    const tableRoot = document.getElementById('tableRoot');
    const tableHeaderRoot = document.getElementById('tableHeaderRoot');
    if (listedHunts.rows.length) {
        tableHeaderRoot.innerHTML = `
            <tr>
                <th class="table-header">Tag</th>
                <th class="table-header">Open</th>
                <th class="table-header">Close</th>
                <th class="table-header">Sex/Antler</th>
                <th class="table-header">Game</th>
                <th class="table-header">Method</th>
                <th class="table-header">Area</th>
            </tr>
        `

        listedHunts.rows.forEach((hunt) => {
            tableRoot.innerHTML += `
                <tr>
                    <td class="table-cell">${hunt.tag}</td>
                    <td class="table-cell">${hunt.open}</td>
                    <td class="table-cell">${hunt.close}</td>
                    <td class="table-cell">${hunt.ornament}</td>
                    <td class="table-cell">${hunt.game}</td>
                    <td class="table-cell">${hunt.method}</td>
                    <td class="table-cell">${hunt.area}</td>
                </tr>
            `;
        })
    }
}

function buildSelectBoxes() {
    const selectBoxes = document.getElementsByClassName('select-box');
    Array.from(selectBoxes).forEach((selectBox) => {
        buildSelectBox(selectBox.id, selectBox);
    })
}

function buildSelectBox(id, selectBox) {
    const selectBoxData = _.uniq(_.map(allHunts, hunt => hunt[id]))

    selectBoxData.forEach((label) => {
        selectBox.innerHTML += `
            <option value="${label}">${label}</option>
        `
    });
}

function filterTable(selectBoxValueList) {

}

function getSelectBoxValueList() {

}
