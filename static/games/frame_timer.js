const fps = 1000/60
function update() {
	postMessage(true);
	setTimeout("update()",  fps);
}
update();