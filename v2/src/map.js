const canvas = document.getElementById("mapCanvas");
const ctx = canvas.getContext("2d");

// Charger l'image de fond (carte)
const bgImage = new Image();
bgImage.src = "map.jpg";

// Paramètres bateau
const shipRadius = 5;
const shipColor = "red";

// Positions selon loop
const shipPaths = {
    1: [ {x:50,y:50}, {x:60,y:55}, {x:72,y:63}, {x:85,y:75} ],
    2: [ {x:85,y:75} ],
    3: [ {x:50,y:300}, {x:55,y:295}, {x:60,y:290} ],
    4: [ {x:60,y:290} ]
};

function drawShip(loop, frame) {
    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner fond
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    const path = shipPaths[loop];
    if (!path || path.length === 0) return;

    // Si c'est un loop docked, on prend toujours la première position
    const pos = (loop === 2 || loop === 4) ? path[0] : path[Math.min(frame, path.length - 1)];

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, shipRadius, 0, 2*Math.PI);
    ctx.fillStyle = shipColor;
    ctx.fill();
    ctx.closePath();
}

function updateMap(loop, positionInLoop) {
    let frame = 0;
    if (loop === 1 || loop === 3) {
        // On avance de 1 frame toutes les 5 secondes
        frame = Math.floor(positionInLoop / 5);
    }
    drawShip(loop, frame);
}

// Exporte la fonction pour être utilisée depuis script.js
window.updateMap = updateMap;
