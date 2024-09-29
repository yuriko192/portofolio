/*
ad UI, menu, game over screen
add sound effect
add lighting effect
//line clear effect:
    for each line cleared
    set line to grey
    create a white flash along the line
    unshift line

add simple scoring system:
    for each line cleared
    add 1 to the counter
    for each line cleared counter
    sum the total of line cleared

    if a line is not cleared on drop, reset counter

*/

//Constant for option
const QUEUE_LENGTH = 4;
const CANVAS_SIZE = 80; //hold and queue canvas sizes
const HOLD_BLOCK_SIZE = CANVAS_SIZE / 4;
const HIDDEN_ROWS = 3.8;

//get html elements
const canvas = document.getElementById("mainarea");
canvas.width = board.size * board.width;
canvas.height = (board.size - HIDDEN_ROWS) * board.height;
const g = canvas.getContext("2d");

const queue_canvas = [];
const queue_g = [];
for (let i = 0; i < QUEUE_LENGTH; i++) {
    queue_canvas.push(document.getElementById("q" + (i + 1)));
    queue_canvas[i].width = CANVAS_SIZE;
    queue_canvas[i].height = CANVAS_SIZE;
    queue_g.push(queue_canvas[i].getContext("2d"));
}
const hold_canvas = document.getElementById("holded");
hold_canvas.width = CANVAS_SIZE;
hold_canvas.height = CANVAS_SIZE;
const g_hold = hold_canvas.getContext("2d");

//screen refresh utility worker
const screen_update = new Worker("screen.js");
screen_update.onmessage = (e) => {
    drawboard();
    draw_shadow();
    draw();
};

//initialize variable
let r = board.size;
let poss = {
    x: board.width / 2 - 2,
    y: 0,
    shadow: board.height - 1,
};
let curr, tetri_queue, hold, filled, rotation, seed;
let put_counter; // block placer timer worker
let bag = [];

//start program
initial();
update();

//=========================Drawing Utility Function=============================
function drawboard() {
    g.clearRect(0, 0, canvas.width, canvas.height);
    g.strokeStyle = "black";
    for (let ii = 0; ii < board.width; ii++) {
        g.strokeRect(ii * r, 0, r, 0.2 * r);
        g.fillStyle =
            board.arr[Math.floor(HIDDEN_ROWS)][ii] === ""
                ? "grey"
                : board.arr[Math.floor(HIDDEN_ROWS)][ii];
        g.fillRect(ii * r, 0, r, 0.2 * r);
    }

    for (let i = 3; i < board.height; i++) {
        for (let ii = 0; ii < board.width; ii++) {
            g.strokeRect(ii * r, (i - HIDDEN_ROWS) * r, r, r);
            g.fillStyle = board.arr[i][ii] === "" ? "grey" : board.arr[i][ii];
            g.fillRect(ii * r, (i - HIDDEN_ROWS) * r, r, r);
        }
    }
}

function draw() {
    //draw floating piece
    let x = poss.x,
        y = poss.y;
    g.fillStyle = tetrimos_list[curr].color;
    let bit = 0x8000;

    for (let i = 0; i < 4; i++) {
        for (let ii = 0; ii < 4; ii++) {
            if (tetrimos_list[curr].blocks[rotation] & bit) {
                g.fillRect((x + ii) * r, (y + i - HIDDEN_ROWS) * r, r, r);
            }
            bit = bit >> 1;
        }
    }
}

//function to draw on queue / hold canvas
function draw_on(brush, tetrimos) {
    let x;
    switch (tetrimos) {
        case 0:
            x = 0;
            break;
        case 3:
            x = CANVAS_SIZE / 4;
            break;
        default:
            x = CANVAS_SIZE / 8;
    }
    let y = tetrimos == 0 ? CANVAS_SIZE / 8 : CANVAS_SIZE / 4;
    brush.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    brush.fillStyle = tetrimos_list[tetrimos].color;
    let bit = 0x8000;
    for (let i = 0; i < 4; i++) {
        for (let ii = 0; ii < 4; ii++) {
            if (tetrimos_list[tetrimos].blocks[0] & bit) {
                brush.fillRect(
                    x + ii * HOLD_BLOCK_SIZE,
                    y + i * HOLD_BLOCK_SIZE,
                    HOLD_BLOCK_SIZE,
                    HOLD_BLOCK_SIZE
                );
            }
            bit = bit >> 1;
        }
    }
}

function draw_queue() {
    for (let j = 0; j < QUEUE_LENGTH; j++) {
        draw_on(queue_g[j], tetri_queue[j]);
    }
}

function draw_shadow() {
    let x = poss.x,
        y = poss.shadow;
    g.fillStyle = "#969696";
    let bit = 0x8000;

    for (let i = 0; i < 4; i++) {
        for (let ii = 0; ii < 4; ii++) {
            if (tetrimos_list[curr].blocks[rotation] & bit) {
                g.fillRect((x + ii) * r, (y + i - HIDDEN_ROWS) * r, r, r);
            }
            bit = bit >> 1;
        }
    }
}

//==============================Utility Function================================
function initial() {
    //initialize utils
    filled = false;
    board.arr = [];
    tetri_queue = [];
    hold = undefined;
    seed = Math.random();

    //initialize board
    for (let i = 0; i < board.height; i++) {
        let arr = new Array();
        for (let ii = 0; ii < board.width; ii++) {
            arr.push("");
        }
        board.arr.push(arr);
    }
    g_hold.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    //create new tetrismos queue
    for (let i = 0; i < QUEUE_LENGTH; i++) {
        tetri_queue.push(taketetrimos());
    }
    //initialize first tetrimos
    curr = pop(tetri_queue);
    update_shadow();
}

function update() {
    move(0, 1);

    setTimeout("update()", 100);
}

function taketetrimos() {
    if (bag.length == 0) {
        bag = [0, 1, 2, 3, 4, 5, 6];
    }
    let randd = Math.sin(seed++) * 10000;
    let x = Math.floor((randd - Math.floor(randd)) * bag.length);
    let y = bag[x];
    bag.splice(x, 1);
    return y;
}

function lose(temp) {
    if (!checkposition(tetrimos_list[temp].blocks[rotation])) {
        console.log("lost");
        initial();
    }
}

//get tetrimo from queue, and add queue
function pop(x) {
    x.unshift(taketetrimos());
    let temp = x.pop();
    resetloc(temp);
    //check win/lose here
    console.log(curr);
    lose(temp);
    draw_queue();
    return temp;
}
//insert current block to the board
function fillblock() {
    let x = poss.x;
    let y = poss.y;
    let bit = 0x8000;

    for (let i = 0; i < 4; i++) {
        for (let ii = 0; ii < 4; ii++) {
            if (tetrimos_list[curr].blocks[rotation] & bit) {
                board.arr[y + i][x + ii] = tetrimos_list[curr].color;
            }

            bit = bit >> 1;
        }
    }

    curr = pop(tetri_queue);
    checkline();
    update_shadow();
}
//check lines that are full
function checkline() {
    for (let i = 0; i < board.height; i++) {
        let cond = true;

        for (let ii = 0; ii < board.width; ii++) {
            if (board.arr[i][ii] === "") {
                cond = false;
                break;
            }
        }

        if (cond) {
            board.arr.splice(i, 1);
            let arr = new Array();

            for (let ii = 0; ii < board.width; ii++) {
                arr.push("");
            }

            board.arr.unshift(arr);
        }
    }
}

function test_location(x, y) {
    let bit = 0x8000;

    for (let i = 0; i < 4; i++) {
        for (let ii = 0; ii < 4; ii++) {
            if (tetrimos_list[curr].blocks[rotation] & bit) {
                try {
                    if (board.arr[y + i][x + ii] != "") {
                        return false;
                    }
                } catch (exc) {
                    return false;
                }
            }
            bit = bit >> 1;
        }
    }
    return true;
}

function update_shadow() {
    let x = poss.x,
        y = poss.y < 0 ? 0 : poss.y;
    while (test_location(x, y) && y < board.height) {
        y++;
    }
    poss.shadow = y - 1;
}

//==============================Movement Function===============================
function resetloc(block) {
    rotation = 0;

    poss.y = 2;

    if (block == 3) {
        poss.x = Math.floor(board.width / 2 - 1);
    } else {
        poss.x = Math.floor(board.width / 2 - 2);
    }
}

function move(newx, newy) {
    let x = poss.x;
    let y = poss.y;
    let condd = [true, true, true]; // LRD
    let curr_tetrimos = tetrimos_list[curr].blocks[rotation];
    let bit = 0x8000;

    for (let i = 0; i < 4; i++) {
        for (let ii = 0; ii < 4; ii++) {
            if (curr_tetrimos & bit) {
                //Left block checker
                if (x + ii >= 0 && condd[0]) {
                    if (x + ii == 0) {
                        //block is in left most of board
                        condd[0] = false;
                    } else if (
                        ([32768, 2048, 128, 8].includes(bit) ||
                            (curr_tetrimos & (bit << 1)) == 0) &&
                        y + i >= 0
                    ) {
                        if (board.arr[y + i][x + ii - 1] != "") {
                            condd[0] = false;
                        }
                    }
                }

                //right block checker
                if (x + ii <= board.width - 1 && condd[1]) {
                    if (x + ii == board.width - 1) {
                        //block is the rightmost of board
                        condd[1] = false;
                    } else if (
                        ([4096, 256, 16, 1].includes(bit) ||
                            (curr_tetrimos & (bit >> 1)) == 0) &&
                        y + i >= 0
                    ) {
                        if (board.arr[y + i][x + ii + 1] != "") {
                            condd[1] = false;
                        }
                    }
                }

                //bottom block checker
                if (y + i < board.height && y + i >= 0) {
                    if ((curr_tetrimos & (bit >> 4)) == 0 || bit < 10) {
                        if (y + i + 1 >= board.height) {
                            //block is on bottom of board
                            condd[2] = false;
                        } else if (board.arr[y + i + 1][x + ii] != "") {
                            condd[2] = false;
                        }
                    }
                } else {
                }
            }
            bit = bit >> 1;
        }
    }

    //check LR movement possibility
    if (newx == -1 && condd[0]) {
        x -= 1;
        if (put_counter) {
            put_counter.terminate();
            put_counter = undefined;
        }
    } else if (newx == 1 && condd[1]) {
        x += 1;
        if (put_counter) {
            put_counter.terminate();
            put_counter = undefined;
        }
    }

    //check bottom movement possibility
    if (newy == 1) {
        if (condd[2]) {
            y += 1;
            if (put_counter) {
                put_counter.terminate();
                put_counter = undefined;
            }
        } else {
            //bottom movement impossible, start block filler timer
            if (put_counter == undefined) {
                put_counter = new Worker("timer.js");
                put_counter.onmessage = (e) => {
                    fillblock();
                    try {
                        put_counter.terminate();
                        put_counter = undefined;
                    } catch (exc) {}
                };
            }
        }
    }
    poss.x = x;
    poss.y = y;
}

function checkposition(new_tetrimos) {
    let x = poss.x;
    let y = poss.y;
    let bit = 0x8000;

    for (let ii = 0; ii < 4; ii++) {
        for (let i = 0; i < 4; i++) {
            if (new_tetrimos & bit) {
                try {
                    if (board.arr[y + ii][x + i] != "") {
                        return false;
                    }
                } catch (exc) {
                    return false;
                }
            }

            bit = bit >> 1;
        }
    }

    return true;
}

function rotate() {
    if (tetrimos_list[curr] == O) {
        //O tetrimos does'nt rotate
        return success_rot();
    }
    //will check 5 possible test case location
    let newrotation = (rotation + 1) % 4;
    let new_tetrimos = tetrimos_list[curr].blocks[newrotation];
    let oldpos = {
        x: poss.x,
        y: poss.y,
    };

    if (curr == 0) {
        //special test case for I blocks
        for (let i = 0; i < 5; i++) {
            poss.x = oldpos.x + i_rot_test_case[newrotation][i][0];
            poss.y = oldpos.y + i_rot_test_case[newrotation][i][1];

            if (checkposition(new_tetrimos)) {
                return success_rot();
            }
        }
    } else {
        for (let i = 0; i < 5; i++) {
            poss.x = oldpos.x + rot_test_case[newrotation][i][0];
            poss.y = oldpos.y + rot_test_case[newrotation][i][1];

            if (checkposition(new_tetrimos)) {
                return success_rot();
            }
        }
    }
    poss = oldpos;
    return false;
}

function success_rot() {
    //rotation possible, stopping timer
    if (put_counter) {
        put_counter.terminate();
        put_counter = undefined;
    }
    rotation = (rotation + 1) % 4;
    return true;
}

//==============================Input Function==================================
document.addEventListener("keydown", function (ev) {
    switch (ev.keyCode) {
        case 37:
            //Left
            move(-1, 0);
            update_shadow();
            break;
        case 39:
            //Right
            move(1, 0);
            update_shadow();
            break;
        case 38:
            //Up
            rotate();
            update_shadow();
            break;
        case 40:
            //Down
            move(0, 1);
            break;
        case 67:
            //C
            swap();
            update_shadow();
            break;
        case 32:
            //Down
            poss.y = poss.shadow;
            if (put_counter) {
                put_counter.terminate();
                put_counter = undefined;
            }
            fillblock();
            break;
    }
});

function swap() {
    if (hold == undefined) {
        //for first swap
        hold = curr;
        curr = pop(tetri_queue);
    } else {
        let temp = hold;
        hold = curr;
        curr = temp;
    }
    resetloc(curr);
    draw_on(g_hold, hold);
}
