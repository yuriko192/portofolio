var besar, atas, kanan, bombs;
var fields;

function setup() {
    atas = 10
    kanan = 10
    besar = 40
    bombs = 10
    createCanvas(kanan * besar + 1, atas * besar + 1)
    fields = new Board(kanan, atas, besar, bombs)
}

function draw() {
    background(100)
    fields.show()
}

function mousePressed() {
    if (!fields.unplayable) {
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