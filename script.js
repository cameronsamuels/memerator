var d = function(i) { return document.querySelector(i)}, img, canvas = document.querySelector('canvas');
canvas.width = 1024, canvas.height = 1024; // canvas dimensions
d('[type=file]').addEventListener("change", function(event) {
	var canvas = d('canvas'),
		url = this.value,
		ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase(); // file extension checker. proceed if correct.
	if (d('input').files && d('input').files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
		var reader = new FileReader();
		reader.onloadend = function(e) {
			var canvas = d("canvas"), ctx = canvas.getContext("2d");
			img = new Image();
			img.onload = function() {
				canvas.width = img.width;
				canvas.height = img.height;
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
				if (d("#after").innerHTML == "") d("form").innerHTML = d("form").innerHTML.replace('<div id="after"></div>', '') + '<a download="meme.png" class="waves-effect waves-light btn">Download</a><div id="after"><p>Top text:</p><input type="text" onkeyup="text()" placeholder="One can simply make" /><p></p><p>Bottom text:</p><input onkeyup="text()" type="text" placeholder="memes with memerator" /></div>';
				ctx.font = (canvas.height / 8) + "px impac";
				ctx.textAlign = "center";
				ctx.lineWidth = canvas.height / 64;
				ctx.shadowColor = "black";
				ctx.shadowOffsetX = 1; 
				ctx.shadowOffsetY = 2; 
				ctx.shadowBlur = 1;
				ctx.fillStyle = "#fff";
				ctx.strokeStyle = '#000';
				ctx.strokeText(document.querySelectorAll('input')[1].value, canvas.width / 2, canvas.height / 7);
				ctx.strokeText(document.querySelectorAll('input')[2].value, canvas.width / 2, canvas.height - (canvas.height / 17));
				ctx.fillText(document.querySelectorAll('input')[1].value, canvas.width / 2, canvas.height / 7);
				ctx.fillText(document.querySelectorAll('input')[2].value, canvas.width / 2, canvas.height - (canvas.height / 17));
				d('a').href = canvas.toDataURL();
// 				document.querySelectorAll('[type=text]')[0].addEventListener("keyup", text, false);
// 				document.querySelectorAll('[type=text]')[1].addEventListener("keyup", text, false);
			}
			img.src = e.target.result;
		};
		reader.readAsDataURL(d('[type=file]').files[0]);
	} else {
		// not img
	}
}, false);
function text(event) { // handles the text side of the meme
	var canvas = d('canvas'),
		ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if ("createEvent" in document) {
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent("change", false, true);
		d('[type=file]').dispatchEvent(evt);
	} else d('[type=file]').fireEvent("onchange");
}
function rotate(degrees) { // handles rotation
	var canvas = d('canvas'), context = canvas.getContext("2d");
	    context.clearRect(0,0,canvas.width,canvas.height);

	    // save the unrotated context of the canvas so we can restore it later
	    // the alternative is to untranslate & unrotate after drawing

	    // move to the center of the canvas
	    context.translate(canvas.width/2,canvas.height/2);
	    // rotate the canvas to the specified degrees
	    context.rotate(1.5708);
	context.translate(-canvas.width/2, -canvas.height/2);
	
		var url = d('[type=file]').value,
		ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase(); // same as before
	if (d('input').files && d('input').files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
		var reader = new FileReader();
		reader.onloadend = function(e) {
			img = new Image();
			img.onload = function() {
				context.drawImage(img,0,0);
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
