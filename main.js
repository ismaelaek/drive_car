let canvas = document.getElementById("canvas");
let game = canvas.getContext("2d");

let carImage = new Image();
carImage.src = "assets/img/maxresdefault .png"; 
let car = {
    x: 210,
    y: 200,
    width: 100,
    height: 80
};
let ornageTreeImage = new Image();
ornageTreeImage.src= "assets/img/Picture3.png"; 

let greenTreeImage = new Image();
greenTreeImage.src= "assets/img/Picture2.png"; 

let bigTreeImage = new Image();
bigTreeImage.src = "assets/img/Picture1.png";

let finishLineImage = new Image();
finishLineImage.src= "assets/img/Picture5.png";


let draw = () => {
    game.clearRect(0, 0, canvas.width, canvas.height);
    game.drawImage(finishLineImage, 0, 35, 80, 100);
    drawTrees();
    game.drawImage(carImage, car.x, car.y, car.width, car.height);

}

let drawTrees = () => {
    game.drawImage(ornageTreeImage, 40, 100, 60, 60);
    game.drawImage(ornageTreeImage, 300, 100, 60, 60);

    game.drawImage(greenTreeImage, 35, -10, 80, 70);
    game.drawImage(greenTreeImage, 300, 0, 80, 70);
    game.drawImage(greenTreeImage, 150, 100, 80, 70);

    game.drawImage(bigTreeImage, 150, -10, 80, 70);
    game.drawImage(bigTreeImage, 300, 200, 80, 70);
    game.drawImage(bigTreeImage, 150, 200, 80, 70);
}

let steps = 5;
let Movement = (event) => {
switch (event.keyCode) {
    // up btn
    case 38: 
        car.y -= steps;
        break;
    // down btn
    case 40: 
        car.y += steps;
        break;
    // left btn
    case 37:
        car.x -= steps;
        break;
    // right btn
    case 39: 
        car.x += steps;
        break;
    }
}
carImage.onload = function() {
    document.addEventListener("keydown", Movement);
    setInterval(draw, 20);
};