var $ = function(i) { return document.querySelector(i)}, img, canvas = document.querySelector('canvas');
canvas.width = 1024, canvas.height = 1024;
$('[type=file]').addEventListener("change", function(event) {
	var canvas = $('canvas'),
		url = this.value,
		ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
	if ($('input').files && $('input').files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
		var reader = new FileReader();
		reader.onloadend = function(e) {
			var canvas = $("canvas"), ctx = canvas.getContext("2d");
			img = new Image();
			img.onload = function() {
				canvas.width = img.width;
				canvas.height = img.height;
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
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
				$('a').style.display = 'block';
				$('a').href = canvas.toDataURL();
			}
			img.src = e.target.result;
		};
		reader.readAsDataURL($('[type=file]').files[0]);
	} else {
		//not img
	}
}, false);
function text(event) {
	var canvas = $('canvas'),
		ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if ("createEvent" in document) {
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent("change", false, true);
		$('[type=file]').dispatchEvent(evt);
	} else $('[type=file]').fireEvent("onchange");
}
function rotate() {
	var canvas = $('canvas'), context = canvas.getContext("2d");
	    context.clearRect(0,0,canvas.width,canvas.height);

	    // save the unrotated context of the canvas so we can restore it later
	    // the alternative is to untranslate & unrotate after drawing
	    context.save();

	    // move to the center of the canvas
	    context.translate(canvas.width/2,canvas.height/2);

	    // rotate the canvas to the specified degrees
	    context.rotate(degrees*Math.PI/180);

	    // draw the image
	    // since the context is rotated, the image will be rotated also
	    context.drawImage(image,-image.width/2,-image.width/2);

	    // we’re done with the rotating so restore the unrotated context
	    context.restore();
}	
}
document.querySelectorAll('[type=text]')[0].addEventListener("keyup", text, false);
document.querySelectorAll('[type=text]')[1].addEventListener("keyup", text, false);
