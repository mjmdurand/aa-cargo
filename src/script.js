let servers = {};
let currentServer;

// --- UTILS ---
function formatTime(ts) {
    return new Date(ts * 1000).toLocaleTimeString("en-GB");
}

function formatRemaining(ts, now) {
    const diff = ts - now;
    if (diff <= 0) return "--";
    if (diff < 60) return "less than 1 minute";
    if (diff < 120) return "in 1 minute";
    return `in ${Math.floor(diff / 60)} minutes`;
}

function calculateLoopAndPosition(server, now) {
    const elapsed = now - server.timestamp;
    const cycles = Math.floor(elapsed / 3669);
    let position = elapsed - cycles * 3669 + Math.floor(cycles / 2);

    let loop;
    let posInLoop = position;

    switch (server.location) {
        case 1:
            if (position <= 648) loop = 1;
            else if (position <= 1848) { loop = 2; posInLoop -= 648; }
            else if (position <= 2469) { loop = 3; posInLoop -= 1848; }
            else { loop = 4; posInLoop -= 2469; }
            break;
        case 2:
            if (position <= 1200) loop = 2;
            else if (position <= 1821) { loop = 3; posInLoop -= 1200; }
            else if (position <= 3021) { loop = 4; posInLoop -= 1821; }
            else { loop = 1; posInLoop -= 3021; }
            break;
        case 3:
            if (position <= 621) loop = 3;
            else if (position <= 1821) { loop = 4; posInLoop -= 621; }
            else if (position <= 2469) { loop = 1; posInLoop -= 1821; }
            else { loop = 2; posInLoop -= 2469; }
            break;
        case 4:
            if (position <= 1200) loop = 4;
            else if (position <= 1848) { loop = 1; posInLoop -= 1200; }
            else if (position <= 3048) { loop = 2; posInLoop -= 1848; }
            else { loop = 3; posInLoop -= 3048; }
            break;
        default:
            loop = 1;
    }

    return { loop, posInLoop };
}

// --- FETCH SERVERS ---
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

        currentServer = servers[data[0].id];
        select.value = data[0].id;

        updateServerInfo();
        updateTimer();
    })
    .catch(err => console.error("Erreur fetch serveurs:", err));

// --- CHANGE SERVER ---
document.getElementById("server-select").addEventListener("change", e => {
    currentServer = servers[e.target.value];
    updateServerInfo();
    updateTimer();
});

// --- UPDATE SERVER INFO ---
function updateServerInfo() {
    if (!currentServer) return;
    document.getElementById("current-server").textContent =
        "Current server : " + currentServer.description;

    const date = new Date(currentServer.timestamp * 1000);
    document.getElementById("last-update").textContent =
        "Last update : " + date.toString();
}

// --- UPDATE TIMER ---
function updateTimer() {
    if (!currentServer) return;
    const now = Math.floor(Date.now() / 1000);
    const { loop, posInLoop } = calculateLoopAndPosition(currentServer, now);

    const arrival = now - posInLoop;

    // Determine departure and next stops
    let departure, nextTwoCrowns, nextSolis;
    switch (loop) {
        case 1:
            departure = arrival + 648;
            nextTwoCrowns = departure;
            nextSolis = departure + 1821;
            break;
        case 2:
            departure = arrival + 1200;
            nextTwoCrowns = departure + 2469;
            nextSolis = departure + 621;
            break;
        case 3:
            departure = arrival + 621;
            nextTwoCrowns = departure + 1848;
            nextSolis = departure;
            break;
        case 4:
            departure = arrival + 1200;
            nextTwoCrowns = departure + 648;
            nextSolis = departure + 2469;
            break;
    }

    const cargoBox = document.getElementById("cargo-timer");
    const shipLocationElem = document.getElementById("ship-location");

    cargoBox.classList.remove("timer-blue", "timer-red", "timer-green");
    if (loop === 1) { cargoBox.classList.add("timer-blue"); shipLocationElem.textContent = "Sailing to Solis"; shipLocationElem.style.color="#007bff"; }
    else if (loop === 2) { cargoBox.classList.add("timer-red"); shipLocationElem.textContent = "Docked at Solis"; shipLocationElem.style.color="#dc3545"; }
    else if (loop === 3) { cargoBox.classList.add("timer-blue"); shipLocationElem.textContent = "Sailing to Two Crowns"; shipLocationElem.style.color="#007bff"; }
    else { cargoBox.classList.add("timer-green"); shipLocationElem.textContent = "Docked at Two Crowns"; shipLocationElem.style.color="#28a745"; }

    // Progress bar
    const totalDuration = loop === 1 ? 648 : loop === 2 ? 1200 : loop === 3 ? 621 : 1200;
    const percent = Math.min(100, (posInLoop / totalDuration) * 100);
    const progress = document.getElementById("progress");
    progress.style.width = percent + "%";
    progress.classList.remove("yellow", "red");
    if (loop === 2 || loop === 4) {
        const remainingDeparture = departure - now;
        if (remainingDeparture <= 60) progress.classList.add("red");
        else if (remainingDeparture <= 300) progress.classList.add("yellow");
    }

    // Update tables
    const arrTimeElem = document.getElementById("arr-time");
    const depTimeElem = document.getElementById("dep-time");
    const arrDiffElem = document.getElementById("arr-diff");
    const depDiffElem = document.getElementById("dep-diff");

    if (loop === 1 || loop === 3) {
        depTimeElem.textContent = formatTime(arrival);
        depDiffElem.textContent = formatRemaining(arrival, now);
        arrTimeElem.textContent = formatTime(departure);
        arrDiffElem.textContent = formatRemaining(departure, now);
    } else {
        depTimeElem.textContent = formatTime(departure);
        depDiffElem.textContent = formatRemaining(departure, now);
        arrTimeElem.textContent = formatTime(arrival);
        arrDiffElem.textContent = formatRemaining(arrival, now);
    }

    document.getElementById("next-tc-time").textContent = formatTime(nextSolis);
    document.getElementById("next-solis-time").textContent = formatTime(nextTwoCrowns);
    document.getElementById("next-tc-diff").textContent = formatRemaining(nextSolis, now);
    document.getElementById("next-solis-diff").textContent = formatRemaining(nextTwoCrowns, now);

    // Labels progress bar
    const remainingLabel = document.getElementById("remaining-label");
    document.getElementById("dep-label").textContent = depTimeElem.textContent;
    document.getElementById("arr-label").textContent = arrTimeElem.textContent;
    remainingLabel.textContent = arrDiffElem.textContent;

    // Update map
    if (window.updateMap) window.updateMap(loop, posInLoop);
}

// --- INTERVAL ---
setInterval(() => { if (currentServer) updateTimer(); }, 1000);

// --- TOGGLE MAP ---
const toggleBtn = document.getElementById("toggle-map");
const mapWrapper = document.getElementById("map-wrapper");
toggleBtn.addEventListener("click", () => {
    mapWrapper.classList.toggle("show");
    toggleBtn.textContent = mapWrapper.classList.contains("show") ? "Hide Live Map" : "Show Live Map";
    updateTimer(); // Met à jour la map lors du toggle
});
