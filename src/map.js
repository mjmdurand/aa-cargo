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
    1: [ {x:113,y:358},{x:115,y:357},{x:117,y:357},{x:120,y:359},{x:119,y:362},{x:116,y:364},{x:113,y:366},{x:110,y:369},{x:108,y:372},{x:107,y:375},{x:107,y:379},{x:107,y:382},{x:107,y:386},{x:107,y:390},{x:107,y:394},{x:107,y:396},{x:107,y:401},{x:107,y:405},{x:106,y:408},{x:107,y:412},{x:106,y:415},{x:107,y:420},{x:106,y:423},{x:106,y:427},{x:108,y:430},{x:109,y:434},{x:111,y:436},{x:114,y:437},{x:118,y:437},{x:121,y:437},{x:125,y:437},{x:129,y:436},{x:132,y:436},{x:136,y:435},{x:140,y:435},{x:144,y:433},{x:147,y:433},{x:151,y:434},{x:155,y:433},{x:158,y:433},{x:162,y:434},{x:165,y:435},{x:169,y:437},{x:173,y:439},{x:175,y:440},{x:178,y:442},{x:181,y:444},{x:185,y:446},{x:189,y:448},{x:191,y:449},{x:195,y:450},{x:198,y:453},{x:201,y:455},{x:204,y:457},{x:208,y:458},{x:211,y:460},{x:214,y:462},{x:218,y:463},{x:221,y:464},{x:225,y:464},{x:228,y:465},{x:232,y:465},{x:236,y:466},{x:240,y:466},{x:243,y:468},{x:247,y:469},{x:251,y:469},{x:254,y:469},{x:258,y:469},{x:262,y:472},{x:265,y:473},{x:268,y:476},{x:270,y:477},{x:273,y:481},{x:276,y:482},{x:279,y:486},{x:281,y:488},{x:285,y:490},{x:289,y:490},{x:292,y:491},{x:296,y:490},{x:299,y:490},{x:304,y:490},{x:306,y:489},{x:310,y:487},{x:314,y:485},{x:317,y:485},{x:321,y:484},{x:325,y:481},{x:328,y:481},{x:332,y:480},{x:335,y:478},{x:338,y:478},{x:341,y:475},{x:345,y:473},{x:348,y:472},{x:351,y:469},{x:354,y:468},{x:358,y:468},{x:362,y:465},{x:365,y:466},{x:369,y:465},{x:373,y:464},{x:376,y:463},{x:381,y:462},{x:383,y:461},{x:387,y:460},{x:391,y:458},{x:394,y:458},{x:398,y:457},{x:401,y:458},{x:405,y:458},{x:409,y:461},{x:412,y:462},{x:416,y:464},{x:417,y:467},{x:419,y:470},{x:422,y:473},{x:424,y:476},{x:426,y:480},{x:426,y:482},{x:426,y:487},{x:427,y:490},{x:431,y:490},{x:433,y:489},{x:434,y:487}],
    2: [ {x:434,y:487}],
    3: [ {x:432,y:485},{x:431,y:484},{x:428,y:482},{x:426,y:478},{x:424,y:476},{x:421,y:473},{x:419,y:470},{x:417,y:468},{x:415,y:465},{x:412,y:462},{x:408,y:461},{x:405,y:460},{x:401,y:459},{x:398,y:458},{x:395,y:459},{x:391,y:460},{x:387,y:461},{x:385,y:461},{x:381,y:463},{x:378,y:462},{x:373,y:464},{x:369,y:465},{x:367,y:465},{x:362,y:466},{x:358,y:467},{x:355,y:469},{x:352,y:471},{x:349,y:473},{x:345,y:474},{x:342,y:477},{x:339,y:477},{x:336,y:479},{x:331,y:481},{x:328,y:482},{x:325,y:483},{x:321,y:485},{x:318,y:485},{x:314,y:487},{x:310,y:487},{x:307,y:489},{x:304,y:491},{x:300,y:490},{x:296,y:490},{x:292,y:491},{x:289,y:491},{x:285,y:491},{x:281,y:488},{x:278,y:487},{x:276,y:485},{x:273,y:481},{x:270,y:478},{x:267,y:477},{x:265,y:474},{x:261,y:473},{x:258,y:472},{x:254,y:471},{x:251,y:470},{x:247,y:469},{x:243,y:469},{x:240,y:467},{x:236,y:468},{x:232,y:466},{x:229,y:466},{x:225,y:466},{x:221,y:464},{x:218,y:463},{x:214,y:463},{x:211,y:461},{x:207,y:459},{x:205,y:457},{x:201,y:455},{x:198,y:454},{x:195,y:452},{x:191,y:451},{x:189,y:449},{x:185,y:447},{x:181,y:444},{x:178,y:442},{x:175,y:441},{x:173,y:440},{x:168,y:437},{x:165,y:436},{x:162,y:434},{x:158,y:433},{x:155,y:434},{x:151,y:433},{x:148,y:434},{x:144,y:435},{x:140,y:436},{x:136,y:436},{x:132,y:437},{x:129,y:437},{x:125,y:438},{x:122,y:438},{x:118,y:439},{x:114,y:439},{x:111,y:437},{x:108,y:434},{x:106,y:432},{x:105,y:428},{x:105,y:424},{x:105,y:420},{x:105,y:417},{x:106,y:413},{x:105,y:409},{x:105,y:405},{x:107,y:401},{x:107,y:398},{x:106,y:395},{x:106,y:391},{x:106,y:387},{x:106,y:383},{x:106,y:380},{x:107,y:375},{x:107,y:372},{x:108,y:369},{x:109,y:365},{x:110,y:361},{x:112,y:359} ],
    4: [ {x:112,y:359}]
};

// Variables globales pour garder la dernière position
window.currentLoop = 1;
window.currentPosition = 0;

// Redimensionner canvas avec taille max
function resizeCanvas() {
    const containerWidth = Math.min(window.innerWidth * 0.9, 945); // max 945px
    const aspectRatio = 945 / 576;

    canvas.width = containerWidth;
    canvas.height = containerWidth / aspectRatio;

    drawCurrentFrame();
}

// Dessiner le bateau
function drawShip(loop, frame) {
    const path = shipPaths[loop];
    if (!path || path.length === 0) return;

    const pos = (loop === 2 || loop === 4) ? path[0] : path[Math.min(frame, path.length - 1)];

    const scaleX = canvas.width / 945;
    const scaleY = canvas.height / 576;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(pos.x * scaleX, pos.y * scaleY, shipRadius, 0, 2 * Math.PI);
    ctx.fillStyle = shipColor;
    ctx.fill();
    ctx.closePath();
}

// Redessiner le frame actuel
function drawCurrentFrame() {
    drawShip(window.currentLoop, window.currentPosition);
}

// Mettre à jour la position depuis script.js
function updateMap(loop, positionInLoop) {
    window.currentLoop = loop;
    window.currentPosition = (loop === 1 || loop === 3) ? Math.floor(positionInLoop / 5) : 0;
    drawShip(loop, window.currentPosition);
}

function resizeCanvas() {
    const containerWidth = Math.min(window.innerWidth * 0.9, 945); 
    const aspectRatio = 945 / 576;

    canvas.width = containerWidth;
    canvas.height = containerWidth / aspectRatio;

    // Centrer le canvas visuellement
    canvas.style.margin = "0 auto";

    drawCurrentFrame();
}

// Listeners
window.addEventListener("resize", resizeCanvas);
bgImage.onload = () => resizeCanvas();

window.updateMap = updateMap;
