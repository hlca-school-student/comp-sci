window.addEventListener('DOMContentLoaded', async () => await get())

let allHunts;

async function get() {
    try {
        const listedHuntsStream = await fetch(`http://localhost:5050/list/`);
        const listedHunts = await listedHuntsStream.json();
        allHunts = listedHunts.rows;
        writeHunts();
        buildSelectBoxes();
    } catch(e) {
        console.error(e);
    }
}

function writeHunts() {
    const tableRoot = getTableRoot();
    const tableHeaderRoot = document.getElementById('tableHeaderRoot');
    if (allHunts.length) {
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
        tableRoot.innerHTML = '';
        allHunts.forEach((hunt) => {
            tableRoot.innerHTML += makeHuntRow(hunt);
        })
    }
}

function buildSelectBoxes() {
    const selectBoxes = getSelectBoxes();
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
    const selectBoxes = Array.from(getSelectBoxes());
    const selectBoxTypesAndValues = selectBoxes.map((selectBox) => ({
        [selectBox.id]: selectBox.value,
    })).filter((val) => !!val);

    const selectBoxMap = makeSelectBoxMap(selectBoxTypesAndValues);
    const selectBoxKeys = Object.keys(selectBoxMap)

    const filteredHunts = allHunts.filter((huntRow) => {
        return filterOnCondition(huntRow, selectBoxKeys, selectBoxMap)
    })

    writeHunts({ rows: filteredHunts });
}

function filterOnCondition(huntRow, selectBoxKeys, selectBoxMap) {
    let testResult = false;
    Object.keys(huntRow).forEach((columnName) => {
        if(selectBoxKeys.includes(columnName) && (huntRow[columnName] === selectBoxMap[columnName])) {
            testResult = true;
        }
    })

    return testResult;
}

function makeSelectBoxMap(selectBoxTypesAndValues) {
    const selectBoxMap = {};

    selectBoxTypesAndValues.forEach((selectBoxTypeAndValue) => {
        selectBoxMap[Object.keys(selectBoxTypeAndValue)[0]] = selectBoxTypeAndValue[Object.keys(selectBoxTypeAndValue)[0]];
    });

    return selectBoxMap;
}

function getSelectBoxes() {
    return document.getElementsByClassName('select-box');
}

function getTableRoot() {
    return document.getElementById('tableRoot');
}

function makeHuntRow(hunt) {
    return `
        <tr>
            <td class="table-cell">${hunt.tag}</td>
            <td class="table-cell">${hunt.open}</td>
            <td class="table-cell">${hunt.close}</td>
            <td class="table-cell">${hunt.ornament}</td>
            <td class="table-cell">${hunt.game}</td>
            <td class="table-cell">${hunt.method}</td>
            <td class="table-cell">${hunt.area}</td>
        </tr>
    `
}
