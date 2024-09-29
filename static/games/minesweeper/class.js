class Tile {
    constructor(x, y) {
        this.xloc = x
        this.yloc = y
        this.reveal = false;
        this.flagged = false;
        this.val = 0; // -1==bomb
    }
}

class Board {
    constructor(x, y, besar, bombs) {
        if (bombs >= x * y) {
            console.log("Bombs have to be less than field size")
            return -1;
        }

        this.fields = new Array(y)
        for (let i = 0; i < y; i++) {
            this.fields[i] = new Array(x);
            for (let ii = 0; ii < x; ii++) {
                this.fields[i][ii] = new Tile(ii * besar, i * besar)
            }
        }
        this.x = x
        this.y = y
        this.besar = besar
        this.clickedd = true;
        this.bombs = bombs
        this.unplayable = false
        this.bombarr = []
    }

    reveal() {
        for (let i = 0; i < this.bombs; i++) {
            let x = this.bombarr[i][0]
            let y = this.bombarr[i][1]
            this.fields[y][x].reveal =true
            fill(255)
            rect(0, 0, this.x * this.besar, this.y * this.besar)
            textAlign(CENTER);
            textSize(50)
            fill(0)
            text("GAMEOVER", this.x * this.besar / 2, this.y * this.besar / 2)

        }
    }

    show() {
        for (let i = 0; i < this.y; i++) {
            for (let ii = 0; ii < this.x; ii++) {
                let x = this.fields[i][ii].xloc
                let y = this.fields[i][ii].yloc
                if (this.fields[i][ii].reveal) {
                    if (this.fields[i][ii].val == -1) {
                        fill(10)
                        rect(x, y, this.besar, this.besar)
                    } else {
                        fill(125)
                        rect(x, y, this.besar, this.besar)
                        textAlign(CENTER);
                        textSize(25)
                        fill(0)
                        text(this.fields[i][ii].val, x + this.besar / 2, y + this.besar / 9 + (this.besar / 2))
                    }
                } else if (this.fields[i][ii].flagged) {
                    fill(50)
                    rect(x, y, this.besar, this.besar)
                } else {
                    fill(225)
                    rect(x, y, this.besar, this.besar)
                }

            }
        }
    }
    make(x, y) {
        let options = [];
        for (let i = 0; i < this.y; i++) {
            for (let j = 0; j < this.x; j++) {
                options.push([j, i]);
            }
        }
        for (let i = 0; i < this.bombs; i++) {
            let index = floor(random(options.length));
            let xx = options[index][0];
            let yy = options[index][1];
            options.splice(index, 1);
            if (xx == x && yy == y) {
                i -= 1
                continue
            }
            this.fields[yy][xx].val = -1;
            this.bombarr.push([xx, yy]);
        }

    }
    fill(x, y) {
        for (let xx = x - 1; xx < x + 2; xx++) {
            for (let yy = y - 1; yy < y + 2; yy++) {
                if (xx == x && yy == y) {
                    continue
                }
                if (xx < 0 || yy < 0 || xx >= this.x || yy >= this.y) {
                    continue
                }
                this.check(xx, yy)
            }
        }

    }

    check(x, y) {
        if (this.fields[y][x].reveal) {
            return
        }
        this.fields[y][x].reveal = true
        for (let xx = x - 1; xx < x + 2; xx++) {
            for (let yy = y - 1; yy < y + 2; yy++) {
                if (xx == x && yy == y) {
                    continue
                }
                if (xx < 0 || yy < 0 || xx >= this.x || yy >= this.y) {
                    continue
                }
                if (this.fields[yy][xx].val == -1) {
                    this.fields[y][x].val += 1
                }
            }
        }
        if (this.fields[y][x].val == 0) {
            this.fill(x, y)
        }

    }

    clicks(x, y, button) {

        try {
            this.fields[floor(y / this.besar)][floor(x / this.besar)].val
        }
        catch (err) {
            return
        }

        if (button) {
            this.fields[floor(y / this.besar)][floor(x / this.besar)].flagged = !this.fields[floor(y / this.besar)][floor(x / this.besar)].flagged
            return
        }

        if (this.fields[floor(y / this.besar)][floor(x / this.besar)].flagged) {
            return
        }
        if (this.clickedd) {
            this.make(floor(x / this.besar), floor(y / this.besar))
            this.clickedd = false
        }
        if (this.fields[floor(y / this.besar)][floor(x / this.besar)].val == -1) {
            this.fields[floor(y / this.besar)][floor(x / this.besar)].reveal = true
            this.unplayable = true
            this.reveal()
            console.log("GAMEOVER")
            return

        }

        this.check(floor(x / this.besar), floor(y / this.besar))
    }

    wins() {
        let checkk = true;
        for (let i = 0; i < this.bombs; i++) {
            let x = this.bombarr[i][0]
            let y = this.bombarr[i][1]
            if (!this.fields[y][x].flagged) {
                checkk = false
            }
        }
        if (checkk) {
            this.unplayable = true
            fill(237, 34, 93)
            rect(0, 0, this.x * this.besar, this.y * this.besar)
            textAlign(CENTER);
            textSize(100)
            fill(0)
            text("You Win", this.x * this.besar / 2, this.y * this.besar / 2)
            console.log("You Win")
        }
        return checkk
    }
}