var animation;
var rotationAngle = 0;
var rotAngle=0;
var rotationSpeed = 0.018;
var rotSpeed=0.02;
var translationX = 0;
var transX=0;
var translationSpeed = 0.003;
var transXSpeed=0.0035;
var translationRange = 0.70;
var transRange = 0.9;
var direction = 1;
var dir=1;

// let shootingStarActive = false;
// let shootingStarTime = 0;
// let shootingStarInterval = 7; // Shooting star every 7 seconds
// var shootingStarDuration = 1; // Duration of the shooting star in seconds

function animate() {
    rotationAngle -= rotationSpeed;
    rotAngle += rotSpeed;
    translationX += translationSpeed * direction;
    transX += transXSpeed * dir;
    if (Math.abs(translationX) > translationRange) {
        direction *= -1;
    }
    if(Math.abs(transX)>transRange){
        dir *= -1;
    }
    drawScene();

    // Request the next animation frame
    animation = window.requestAnimationFrame(animate);
}

function drawScene() {
    let mMatrix = mat4.create();
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clearColor(0.95, 0.95, 0.95, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if (animation) {
        window.cancelAnimationFrame(animation);
    }

    drawSky();
    drawMoon(rotAngle);
    drawCloud();
    drawStar();
    // drawShootingStar(time);
    drawMountains();
    drawGround();
    drawRoad();
    drawRiver();
    drawTrees();
    drawSmallBoat(transX);
    drawBoat(translationX);
    drawSmallFan(rotationAngle);
    drawFan(rotationAngle);
    drawBushes();
    drawHouse();
    drawCar();

    animation = window.requestAnimationFrame(animate);
}

function changeView(m) {
    mode = m;
    drawScene();
}
