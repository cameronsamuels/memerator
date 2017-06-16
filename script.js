var d = function(i) { return document.querySelector(i) }, img, canvas = d('canvas'), r = 0, rt = 0, font = "impac";
canvas.width = 1024, canvas.height = 1024, ctx = canvas.getContext("2d"); // canvas dimensions
d('[type=file]').addEventListener("change", function(event) {
	var url = this.value, ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase(); // file extension checker. proceed if correct.
	if (d('input').files && d('input').files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg" || ext == "tiff" || ext == "bmp")) {
		var reader = new FileReader();
		reader.onloadend = function(e) {
			img = new Image();
			img.onload = function() {
				canvas.width = img.width;
				canvas.height = img.height;
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
				d('#download').id = '';
				d('#advanced').id = '';
				ctx.textAlign = "center", ctx.fillStyle = "#fff", ctx.strokeStyle = '#000',
				ctx.font = (canvas.height / 8) + "px " + font, ctx.lineWidth = canvas.height / 64;
				ctx.strokeText(document.querySelectorAll('input')[1].value, canvas.width / 2, canvas.height / 7);
				ctx.strokeText(document.querySelectorAll('input')[2].value, canvas.width / 2, canvas.height - (canvas.height / 17));
				ctx.fillText(document.querySelectorAll('input')[1].value, canvas.width / 2, canvas.height / 7);
				ctx.fillText(document.querySelectorAll('input')[2].value, canvas.width / 2, canvas.height - (canvas.height / 17));
				d('a').href = canvas.toDataURL();
				$('.row').css('visibility', 'visible');
				$('#upload').html('Replace' + $('#upload').html().replace('Upload', ''));
			}
			img.src = e.target.result;
			canvas.style.background = "url(" + e.target.result + ") no-repeat 100%/cover";
		};
		reader.readAsDataURL(d('[type=file]').files[0]);
	} else { /* not img */ }
}, false);
var ut; function text() { clearTimeout(ut); ut = setTimeout(update, 500) } //fixes lag and on keyup inputs
function update() { //updates text
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    	ctx.translate(canvas.width / 2, canvas.height / 2);
	ctx.rotate(r);
	ctx.drawImage(img, -img.width / 2, -img.height / 2);
	ctx.rotate(-r);
	ctx.translate(-canvas.width / 2, -canvas.height / 2);
	ctx.textAlign = "center", ctx.fillStyle = "#fff", ctx.strokeStyle = '#000',
	ctx.font = (canvas.height / 8) + "px " + font, ctx.lineWidth = canvas.height / 64;
	ctx.strokeText(document.querySelectorAll('input')[1].value, canvas.width / 2, canvas.height / 7);
	ctx.strokeText(document.querySelectorAll('input')[2].value, canvas.width / 2, canvas.height - (canvas.height / 17));
	ctx.fillText(document.querySelectorAll('input')[1].value, canvas.width / 2, canvas.height / 7);
	ctx.fillText(document.querySelectorAll('input')[2].value, canvas.width / 2, canvas.height - (canvas.height / 17));
	d('a').href = canvas.toDataURL();
	canvas.style.background = "url(" + canvas.toDataURL() + ") no-repeat 100%/cover";
	$('.dropdown-content a').html($('.dropdown-content a').html().replace('<i class="material-icons">done</i>', ''));
	$('a[onclick*="' + font + '"]').html("<i class='material-icons'>done</i>"+$('a[onclick*="' + font + '"]').html());
}
function rotate() { // handles rotation on click
	if ($('input[type=text]').css('visibility')=='hidden') return;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	rt = rt==1?0:1;
	if (rt == 1) { canvas.width = img.height; canvas.height = img.width }
	else { canvas.width = img.width; canvas.height = img.height }
	// translate to center-canvas 
    	// the origin [0,0] is now center-canvas
    	ctx.translate(canvas.width / 2, canvas.height / 2);
	// roate the canvas by +90% (==Math.PI/2)
	r += 1.5708;
	ctx.rotate(r);
	// draw the signature
	// since images draw from top-left offset the draw by 1/2 width & height
	ctx.drawImage(img, -img.width / 2, -img.height / 2);
	// un-rotate the canvas by -90% (== -Math.PI/2)
	ctx.rotate(-r);
	// un-translate the canvas back to origin==top-left canvas
	ctx.translate(-canvas.width / 2, -canvas.height / 2);
	ctx.textAlign = "center", ctx.fillStyle = "#fff", ctx.strokeStyle = '#000',
	ctx.font = (canvas.height / 8) + "px " + font, ctx.lineWidth = canvas.height / 64;
	ctx.strokeText(document.querySelectorAll('input')[1].value, canvas.width / 2, canvas.height / 7);
	ctx.strokeText(document.querySelectorAll('input')[2].value, canvas.width / 2, canvas.height - (canvas.height / 17));
	ctx.fillText(document.querySelectorAll('input')[1].value, canvas.width / 2, canvas.height / 7);
	ctx.fillText(document.querySelectorAll('input')[2].value, canvas.width / 2, canvas.height - (canvas.height / 17));
	d('a').href = canvas.toDataURL();
	canvas.style.background = "url(" + canvas.toDataURL() + ") no-repeat 100%/cover";
}
$('input:text:visible:first').keypress(function(e){if(e.which==13)$('input[type=text]')[1].focus()});
