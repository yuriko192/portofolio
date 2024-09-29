function update() {
    postMessage(true);
    setTimeout("update()", 1000 / 60);
}

update();
