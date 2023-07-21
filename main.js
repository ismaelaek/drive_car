let canvas = document.getElementById("canvas");
let game = canvas.getContext("2d");

let carImage = new Image();
carImage.src = "assets/img/maxresdefault.png"; 
let car = {
    x: 240,
    y: 320,
    width: 50,
    height: 60,
    starting : false
};
let ornageTreeImage = new Image();
ornageTreeImage.src= "assets/img/Picture3.png"; 

let greenTreeImage = new Image();
greenTreeImage.src= "assets/img/Picture2.png"; 

let bigTreeImage = new Image();
bigTreeImage.src = "assets/img/Picture1.png";

let finishLineImage = new Image();
finishLineImage.src= "assets/img/Picture5.png";

let winner = false;
let draw = () => {
    game.clearRect(0, 0, canvas.width, canvas.height);
    game.drawImage(finishLineImage, 0, 70, 50, 100);
    drawTrees();
    game.drawImage(carImage, car.x, car.y, car.width, car.height);

    // win message
    if (!winner && car.x === 0 && car.y >= 70 && car.y <= 100) {
        // Display "You won" message
        game.font = "30px times";
        game.fillStyle = "black";
        game.fillText("You won!", canvas.width / 2 - 60, canvas.height / 2);
        winner = true;
        car.starting = false; // to stop the car movement

        // restart after 5 seconds
        setTimeout(restartGame, 3000); 
    }
}

let restartGame = () => {
    car.x = 240;
    car.y = 320;
    car.starting = false;
    winner = false;

    setInterval(draw, 20);
};

let drawTrees = () => {
    game.drawImage(ornageTreeImage, 40, 160, 60, 60);
    game.drawImage(ornageTreeImage, 300, 160, 60, 60);

    game.drawImage(greenTreeImage, 35, 0, 80, 70);
    game.drawImage(greenTreeImage, 270, 10, 80, 70);
    game.drawImage(greenTreeImage, 150, 150, 80, 70);

    game.drawImage(bigTreeImage, 150, 0, 80, 70);
    game.drawImage(bigTreeImage, 300, 260, 80, 70);
    game.drawImage(bigTreeImage, 150, 260, 80, 70);
}

let carEngingStartSound = new Audio();
carEngingStartSound.src = "assets/sounds/car-engine-starting.mp3";

let carTurnOffSound = new Audio();
carTurnOffSound.src = "assets/sounds/car-turn-off.mp3";

let checkCollision = (x, y) => {
    // 
    let trees = [
        // orange trees 
        { x: 40, y: 160, width: 60, height: 60 },
        { x: 300, y: 160, width: 60, height: 60 },
        // green trees
        { x: 35, y: 0, width: 80, height: 70 },
        { x: 270, y: 10, width: 80, height: 70 },
        { x: 150, y: 150, width: 80, height: 70 },
        // big trees
        {x: 150, y: 0, width: 80, height: 70 },
        {x: 300, y: 260, width: 80, height: 70 },
        {x: 150, y: 260, width: 80, height: 70 },
    ];

    for (let tree of trees) {
        if (
            x < tree.x + tree.width &&
            x + car.width > tree.x &&
            y < tree.y + tree.height &&
            y + car.height > tree.y
        ) {
            return true; 
        }
    }
    return false; 
};

let steps = 5;
let Movement = (event) => {
    if (car.starting === true) {
        let carDx = car.x;
        let carDy = car.y;

        switch (event.keyCode) {
            // up btn
            case 38:
                carDy -= steps;
                break;
            // down btn
            case 40:
                carDy += steps;
                break;
            // left btn
            case 37:
                carDx -= steps;
                break;
            // right btn
            case 39:
                carDx += steps;
                break;
        }
        if (carDx >= 0 && carDx + car.width <= canvas.width && carDy >= 0 && carDy + car.height <= canvas.height) {
            if (!checkCollision(carDx, carDy)) {
                car.x = carDx;
                car.y = carDy;
            }
        }
    }
};

let carEngine = () => {
    if (car.starting === false) {
        carEngingStartSound.play();
        car.starting = true;
    } else {
        carTurnOffSound.play()
        car.starting = false;
    }
};

canvas.addEventListener("dblclick", carEngine);

carImage.onload = function() {
    document.addEventListener("keydown", Movement);
    setInterval(draw, 20);
};