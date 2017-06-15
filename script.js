var d = function(i) { return document.querySelector(i) }, img, canvas = d('canvas'), r = 0;
canvas.width = 1024, canvas.height = 1024, ctx = canvas.getContext("2d"); // canvas dimensions
d('[type=file]').addEventListener("change", function(event) {
	var url = this.value, ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase(); // file extension checker. proceed if correct.
	if (d('input').files && d('input').files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
		var reader = new FileReader();
		reader.onloadend = function(e) {
			img = new Image();
			img.onload = function() {
				canvas.width = img.width;
				canvas.height = img.height;
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
				d('form div:nth-child(2)').id = '';
				ctx.textAlign = "center", ctx.fillStyle = "#fff", ctx.strokeStyle = '#000',
				ctx.font = (canvas.height / 8) + "px impac", ctx.lineWidth = canvas.height / 64;
				ctx.strokeText(document.querySelectorAll('input')[1].value, canvas.width / 2, canvas.height / 7);
				ctx.strokeText(document.querySelectorAll('input')[2].value, canvas.width / 2, canvas.height - (canvas.height / 17));
				ctx.fillText(document.querySelectorAll('input')[1].value, canvas.width / 2, canvas.height / 7);
				ctx.fillText(document.querySelectorAll('input')[2].value, canvas.width / 2, canvas.height - (canvas.height / 17));
				d('a').href = canvas.toDataURL();
				$('.row').css('visibility', 'visible');
			}
			img.src = e.target.result;
			canvas.style.background = "url(" + e.target.result + ") no-repeat 100%/cover";
		};
		reader.readAsDataURL(d('[type=file]').files[0]);
	} else { /* not img */ }
}, false);
var ut; function text() { clearTimeout(ut); ut = setTimeout(update, 500) } //fixes lag and on keyup inputs
function update() { //updates text
	canvas.style.background = "url(" + canvas.toDataURL() + ") no-repeat 100%/cover";
	ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(r);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
	if (r%1.5708 != 0) {
		var width = canvas.width;
		canvas.width = canvas.height;
		canvas.height = width;
	}
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
	ctx.rotate(-r);
	ctx.textAlign = "center", ctx.fillStyle = "#fff", ctx.strokeStyle = '#000',
	ctx.font = (canvas.height / 8) + "px impac", ctx.lineWidth = canvas.height / 64;
	ctx.strokeText(document.querySelectorAll('input')[1].value, canvas.width / 2, canvas.height / 7);
	ctx.strokeText(document.querySelectorAll('input')[2].value, canvas.width / 2, canvas.height - (canvas.height / 17));
	ctx.fillText(document.querySelectorAll('input')[1].value, canvas.width / 2, canvas.height / 7);
	ctx.fillText(document.querySelectorAll('input')[2].value, canvas.width / 2, canvas.height - (canvas.height / 17));
	d('a').href = canvas.toDataURL();
}
function rotate() { // handles rotation on click
	ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(1.5708);
	r += 1.5708;
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
	if (r%1.5708 != 0) {
		var width = canvas.width;
		canvas.width = canvas.height;
		canvas.height = width;
	}
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
	ctx.rotate(-r);
	ctx.textAlign = "center", ctx.fillStyle = "#fff", ctx.strokeStyle = '#000',
	ctx.font = (canvas.height / 8) + "px impac", ctx.lineWidth = canvas.height / 64;
	ctx.strokeText(document.querySelectorAll('input')[1].value, canvas.width / 2, canvas.height / 7);
	ctx.strokeText(document.querySelectorAll('input')[2].value, canvas.width / 2, canvas.height - (canvas.height / 17));
	ctx.fillText(document.querySelectorAll('input')[1].value, canvas.width / 2, canvas.height / 7);
	ctx.fillText(document.querySelectorAll('input')[2].value, canvas.width / 2, canvas.height - (canvas.height / 17));
	d('a').href = canvas.toDataURL();
	canvas.style.background = "url(" + canvas.toDataURL() + ") no-repeat 100%/cover";
}
