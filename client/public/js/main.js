async function get() {
    try {
        const listedHuntsStream = await fetch('http://localhost:5050/list');
        const listedHunts = await listedHuntsStream.json();
        writeHunts(listedHunts);
    } catch(e) {
        console.error(e);
    }
}

function writeHunts(listedHunts) {
    const tableRoot = document.getElementById('tableRoot');

    if (listedHunts.rows.length) {
        listedHunts.rows.forEach((hunt) => {
            tableRoot.innerHTML += `
                <tr>
                    <td>${hunt.tag}</td>
                    <td>${hunt.open}</td>
                    <td>${hunt.close}</td>
                    <td>${hunt.ornament}</td>
                    <td>${hunt.game}</td>
                    <td>${hunt.method}</td>
                    <td>${hunt.area}</td>
                </tr>
            `;
        })
    }
}
