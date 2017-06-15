var d = function(i) { return document.querySelector(i) }, img, canvas = d('canvas');
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
				//if (d("#after").innerHTML == "") d("form").innerHTML = d("form").innerHTML.replace('<div id="after"></div>', '') + '<div class="waves-effect waves-light btn"><a download="meme.png">Download</a></div><div id="after"><p>Top text:</p><input type="text" onkeyup="text()" placeholder="One can simply make" /><p></p><p>Bottom text:</p><input onkeyup="text()" type="text" placeholder="memes with memerator" /></div>';
				ctx.font = (canvas.height / 8) + "px impac";
				ctx.textAlign = "center";
				ctx.lineWidth = canvas.height / 64;
				ctx.fillStyle = "#fff";
				ctx.strokeStyle = '#000';
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
	if ("createEvent" in document) {
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent("change", false, true);
		d('[type=file]').dispatchEvent(evt);
	} else d('[type=file]').fireEvent("onchange");
}
function rotate() { // handles rotation on click
	ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.save();
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.rotate(1.5708);
	var url = d('[type=file]').value,
		ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase(); // same as before
	if (d('input').files && d('input').files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
		var reader = new FileReader();
		reader.onloadend = function(e) {
			img = new Image();
			img.onload = function() {
				ctx.drawImage(img,-img.width/2,-img.width/2);
				ctx.restore();
			}
			img.src = e.target.result;
		};
		reader.readAsDataURL(d('[type=file]').files[0]);
	}
	if ("createEvent" in document) {
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent("change", false, true);
		d('[type=file]').dispatchEvent(evt);
	} else d('[type=file]').fireEvent("onchange");
	// draw the image
	// since the context is rotated, the image will be rotated also
	// we’re done with the rotating so restore the unrotated context
}
