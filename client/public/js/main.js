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
                    <td style="border:1px solid black;">${hunt.tag}</td>
                    <td style="border:1px solid black;">${hunt.open}</td>
                    <td style="border:1px solid black;">${hunt.close}</td>
                    <td style="border:1px solid black;">${hunt.ornament}</td>
                    <td style="border:1px solid black;">${hunt.game}</td>
                    <td style="border:1px solid black;">${hunt.method}</td>
                    <td style="border:1px solid black;">${hunt.area}</td>
                </tr>
            `;
        })
    }
}
