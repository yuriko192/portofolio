// var besar, height, kanan, bombs;
var fields;

function setup() {
    const height = 10
    const width = 10
    const cellSize = 40
    const bombs = 10
    createCanvas(width * cellSize + 1, height * cellSize + 1)
    fields = new Board(width, height, cellSize, bombs)
}

function draw() {
    background(100)
    fields.show()
}

function mousePressed() {
    if (!fields.unplayable) {
        // from p5js
        if (mouseButton == LEFT) {
            fields.clicks(mouseX, mouseY, false)
        } else {
            fields.clicks(mouseX, mouseY, true)
        }
    }
    try {
        if (fields.wins()) {
            noLoop();
        } else if (fields.unplayable) {
            fields.reveal()
            noLoop();
        }
    }
    catch (err) {

    }

}