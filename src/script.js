let servers = {};
let currentServer;

// Charger les serveurs depuis la DB
fetch("get_servers.php")
    .then(res => res.json())
    .then(data => {
        const select = document.getElementById("server-select");

        data.forEach(server => {
            servers[server.id] = {
                timestamp: parseInt(server.timestamp),
                location: parseInt(server.starting_point),
                description: server.server_description
            };
            const option = document.createElement("option");
            option.value = server.id;
            option.textContent = server.server_description;
            select.appendChild(option);
        });

        const firstId = data[0].id;
        currentServer = servers[firstId];
        select.value = firstId;

        updateServerInfo();
        updateTimer();
    })
    .catch(err => console.error("Erreur fetch serveurs:", err));

// Changement serveur
document.getElementById("server-select").addEventListener("change", e => {
    currentServer = servers[e.target.value];
    updateServerInfo();
    updateTimer();
});

// Met à jour le bloc serveur
function updateServerInfo() {
    if (!currentServer) return;
    document.getElementById("current-server").textContent =
        "Current server : " + currentServer.description;

    const date = new Date(currentServer.timestamp * 1000);
    document.getElementById("last-update").textContent =
        "Last update : " + date.toString();
}

function updateTimer() {
    if (!currentServer) return;

    const now = Math.floor(Date.now() / 1000);
    const initialTimestamp = currentServer.timestamp;
    const initialLocationCode = currentServer.location;

    // elapsed total depuis timestamp initial
    let elapsed = now - initialTimestamp;

    // cycles de 3669s et position dans le cycle
    let cycles = Math.floor(elapsed / 3669);
    let currentPosition = elapsed - cycles * 3669;            // secondes depuis début du cycle
    let adjustedPosition = currentPosition + Math.floor(cycles / 2);

    // positionInLoop = secondes écoulées dans le loop courant (après retrait d'offsets)
    let loop, positionInLoop = adjustedPosition;

    // Détermination du loop selon point de départ (initialLocationCode)
    switch (initialLocationCode) {
        case 1: // Sailing to Solis
            if (adjustedPosition <= 648) { loop = 1; }
            else if (adjustedPosition <= 1848) { loop = 2; positionInLoop -= 648; }
            else if (adjustedPosition <= 2469) { loop = 3; positionInLoop -= 1848; }
            else if (adjustedPosition <= 3669) { loop = 4; positionInLoop -= 2469; }
            else { loop = 1; positionInLoop -= 3669; }
            break;

        case 2: // Docked at Solis
            if (adjustedPosition <= 1200) { loop = 2; }
            else if (adjustedPosition <= 1821) { loop = 3; positionInLoop -= 1200; }
            else if (adjustedPosition <= 3021) { loop = 4; positionInLoop -= 1821; }
            else if (adjustedPosition <= 3669) { loop = 1; positionInLoop -= 3021; }
            else { loop = 2; positionInLoop -= 3669; }
            break;

        case 3: // Sailing to Two Crowns
            if (adjustedPosition <= 621) { loop = 3; }
            else if (adjustedPosition <= 1821) { loop = 4; positionInLoop -= 621; }
            else if (adjustedPosition <= 2469) { loop = 1; positionInLoop -= 1821; }
            else if (adjustedPosition <= 3669) { loop = 2; positionInLoop -= 2469; }
            else { loop = 3; positionInLoop -= 3669; }
            break;

        case 4: // Docked at Two Crowns
            if (adjustedPosition <= 1200) { loop = 4; }
            else if (adjustedPosition <= 1848) { loop = 1; positionInLoop -= 1200; }
            else if (adjustedPosition <= 3048) { loop = 2; positionInLoop -= 1848; }
            else if (adjustedPosition <= 3669) { loop = 3; positionInLoop -= 3048; }
            else { loop = 4; positionInLoop -= 3669; }
            break;

        default:
            loop = 1;
    }

    // arrival = timestamp d'arrivée du loop courant
    const arrival = now - positionInLoop;

    // Calcule departure & next stops correctement (Solis/TwoCrowns)
    let departure, nextTwoCrowns, nextSolis;
    switch (loop) {
        case 1: // Sailing to Solis
            departure = arrival + 648;
            nextTwoCrowns = departure;          // Two Crowns next is at departure (as spec)
            nextSolis = departure + 1821;
            break;

        case 2: // Docked at Solis
            departure = arrival + 1200;
            nextTwoCrowns = departure + 2469;  // <- CORRECTION : arrival at Two Crowns = departure + 2469
            nextSolis = departure + 621;
            break;

        case 3: // Sailing to Two Crowns
            departure = arrival + 621;
            nextTwoCrowns = departure + 1848;
            nextSolis = departure;             // Solis next is at departure
            break;

        case 4: // Docked at Two Crowns
            departure = arrival + 1200;
            nextTwoCrowns = departure + 648;
            nextSolis = departure + 2469;
            break;
    }

    function formatTime(ts) {
        return new Date(ts * 1000).toLocaleTimeString("en-GB");
    }

    function formatRemaining(ts) {
        const diff = ts - now;
        if (diff <= 0) return "--";
        if (diff < 60) return "less than 1 minute";
        if (diff < 120) return "in 1 minute";
        return `in ${Math.floor(diff / 60)} minutes`;
    }

    // -------------------------
    // Bordure colorée (cargo-timer)
    // -------------------------
    const cargoBox = document.getElementById("cargo-timer");
    cargoBox.classList.remove("timer-blue", "timer-red", "timer-green");

    const shipLocationElem = document.getElementById("ship-location");
    if (loop === 1) {
        cargoBox.classList.add("timer-blue");
        shipLocationElem.style.color = "#007bff";
        shipLocationElem.textContent = "Sailing to Solis";
    } else if (loop === 2) {
        cargoBox.classList.add("timer-red");
        shipLocationElem.style.color = "#dc3545";
        shipLocationElem.textContent = "Docked at Solis";
    } else if (loop === 3) {
        cargoBox.classList.add("timer-blue");
        shipLocationElem.style.color = "#007bff";
        shipLocationElem.textContent = "Sailing to Two Crowns";
    } else { // loop === 4
        cargoBox.classList.add("timer-green");
        shipLocationElem.style.color = "#28a745";
        shipLocationElem.textContent = "Docked at Two Crowns";
    }

    // -------------------------
    // Progress bar (utilise positionInLoop pour être sûr)
    // -------------------------
    const totalDuration = loop === 1 ? 648 : loop === 2 ? 1200 : loop === 3 ? 621 : 1200;
    const elapsedInLoop = positionInLoop; // secondes écoulées dans le loop courant
    const percent = Math.min(100, (elapsedInLoop / totalDuration) * 100);

    const progress = document.getElementById("progress");
    progress.style.width = `${percent}%`;

    // couleur progress uniquement si Docked (2 ou 4)
    progress.classList.remove("yellow", "red");
    if (loop === 2 || loop === 4) {
        const remainingDeparture = departure - now;
        if (remainingDeparture <= 60) progress.classList.add("red");
        else if (remainingDeparture <= 300) progress.classList.add("yellow");
    }

    // -------------------------
    // Affichage tables (IDs existants dans votre HTML)
    // -------------------------
    // Arrival / Departure
    // Inversion affichage : si Sailing on veut départ affiché où arrive etc.
    if (loop === 1 || loop === 3) {
        // Sailing: show Departure (soon) as arrival-time cell, Arrival as departure-time cell
        document.getElementById("arr-time").textContent = formatTime(departure);
        document.getElementById("arr-diff").textContent = formatRemaining(departure);

        document.getElementById("dep-time").textContent = formatTime(arrival);
        document.getElementById("dep-diff").textContent = formatRemaining(arrival);
    } else {
        // Docked: normal
        document.getElementById("arr-time").textContent = formatTime(arrival);
        document.getElementById("arr-diff").textContent = formatRemaining(arrival);

        document.getElementById("dep-time").textContent = formatTime(departure);
        document.getElementById("dep-diff").textContent = formatRemaining(departure);
    }

    // Next arrivals (Two Crowns / Solis)
    document.getElementById("next-tc-time").textContent = formatTime(nextSolis);
    document.getElementById("next-solis-time").textContent = formatTime(nextTwoCrowns);

    document.getElementById("next-tc-diff").textContent = formatRemaining(nextSolis);
    document.getElementById("next-solis-diff").textContent = formatRemaining(nextTwoCrowns);

    // Mettre à jour les labels en haut de la barre
    if (loop === 1 || loop === 3) { // Sailing
        document.getElementById("dep-label").textContent = formatTime(arrival);
        document.getElementById("arr-label").textContent = formatTime(departure);
    } else { // Docked
        document.getElementById("dep-label").textContent = formatTime(departure);
        document.getElementById("arr-label").textContent = formatTime(arrival);
    }

    // Label central de la barre
    const remainingLabel = document.getElementById("remaining-label");

    if (loop === 1 || loop === 3) { // Sailing
        remainingLabel.textContent = document.getElementById("arr-diff").textContent;
    } else { // Docked
        remainingLabel.textContent = document.getElementById("dep-diff").textContent;
    }

    updateMap(loop, positionInLoop);

}

// Mise à jour chaque seconde
setInterval(() => {
    if (currentServer) updateTimer();
}, 1000);
