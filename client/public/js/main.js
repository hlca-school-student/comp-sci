async function get() {
    try {
        const listedHuntsStream = await fetch('http://localhost:5050/list');
        const listedHunts = await listedHuntsStream.json();
        console.log(listedHunts);
    } catch(e) {
        console.error(e);
    }
}

