var d = function(i) { return document.querySelector(i) },
img, canvas = d('canvas'), r = 0, rt = 0, font = "impac", color = "#fff", ut, watermark = 1;
canvas.width = 1024, canvas.height = 1024, ctx = canvas.getContext("2d"); // canvas dimensions
d('[type=file]').addEventListener("change", function(event) {
    var url = this.value,
        ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase(); // file extension checker. proceed if correct.
    if (d('input').files && d('input').files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg" || ext == "tiff" || ext == "bmp")) {
        var reader = new FileReader();
        reader.onloadend = function(e) {
            img = new Image();
            img.onload = function() {
                if (Math.min(img.height, img.width) < 256) watermark = 0;
                canvas.width = img.width, canvas.height = img.height;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
                d('#download').id = '', d('#advanced').id = '';
                color = $('.jscolor').css('background-color');
                ctx.textAlign = "center", ctx.fillStyle = color, ctx.strokeStyle = '#000',
                ctx.font = (canvas.height / 8) + "px " + font, ctx.lineWidth = canvas.height / 64;
                ctx.strokeText(document.querySelectorAll('input')[1].value, canvas.width / 2, canvas.height / 7);
                ctx.strokeText(document.querySelectorAll('input')[2].value, canvas.width / 2, canvas.height - (canvas.height / 17));
                ctx.fillText(document.querySelectorAll('input')[1].value, canvas.width / 2, canvas.height / 7);
                ctx.fillText(document.querySelectorAll('input')[2].value, canvas.width / 2, canvas.height - (canvas.height / 17));
                d('a').href = canvas.toDataURL();
                $('.row').css('visibility', 'visible');
                $('#upload').html('Replace' + $('#upload').html().replace('Upload', ''));
                $('.jscolor').click(function(){$('body>div:last-child').mouseup(function(){setTimeout(update,500)})})
            }
            img.src = e.target.result;
            canvas.style.background = "url(" + img.src + ") no-repeat 100%/cover";
        };
        reader.readAsDataURL(d('[type=file]').files[0]);
    } else alert('This file is not a compatible file.\nYou may upload a .GIF, .PNG, .JPEG, .JPG, .TIFF, or .BMP currently.\nWe will add support for more later on.');
}, false);
function text() {
    clearTimeout(ut);
    ut = setTimeout(update, 500)
} //fixes lag and on keyup inputs
function update() { //updates text
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(r);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    ctx.rotate(-r);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    color = $('.jscolor').css('background-color');
    ctx.textAlign = "center", ctx.fillStyle = color, ctx.strokeStyle = '#000',
        ctx.font = (canvas.height / 8) + "px " + font, ctx.lineWidth = canvas.height / 64;
    ctx.strokeText(document.querySelectorAll('input')[1].value, canvas.width / 2, canvas.height / 7);
    ctx.strokeText(document.querySelectorAll('input')[2].value, canvas.width / 2, canvas.height - (canvas.height / 17));
    ctx.fillText(document.querySelectorAll('input')[1].value, canvas.width / 2, canvas.height / 7);
    ctx.fillText(document.querySelectorAll('input')[2].value, canvas.width / 2, canvas.height - (canvas.height / 17));
    ctx.textAlign = "start", ctx.fillStyle = "#fff", ctx.font = (canvas.height / 32) + "px arial ", ctx.lineWidth = canvas.height / 256;
    if (watermark) ctx.strokeText('www.memerator.tk', 5, canvas.height - (canvas.height / 67)),
    ctx.fillText('www.memerator.tk', 5, canvas.height - (canvas.height / 67));
    d('a').href = canvas.toDataURL();
    canvas.style.background = "url(" + canvas.toDataURL() + ") no-repeat 100%/cover";
    $(".dropdown-content a").html(function(index, text) {
        return text.replace('<i class="material-icons">done</i>', "");
    });
    $('a[onclick*=\'"' + font + '"\']').html("<i class='material-icons'>done</i>" + $('a[onclick*=\'"' + font + '"\']').html());
    $('#font').css('font-family', font);
}

function rotate() { // handles rotation on click
    if ($('input[type=text]').css('visibility') == 'hidden') return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rt = rt == 1 ? 0 : 1;
    if (rt) canvas.width = img.height, canvas.height = img.width;
    else canvas.width = img.width, canvas.height = img.height;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    r -= 1.5708;
    ctx.rotate(r);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    ctx.rotate(-r);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    color = $('.jscolor').css('background-color');
    ctx.textAlign = "center", ctx.fillStyle = color, ctx.strokeStyle = '#000',
    ctx.font = (canvas.height / 8) + "px " + font, ctx.lineWidth = canvas.height / 64;
    ctx.strokeText(document.querySelectorAll('input')[1].value, canvas.width / 2, canvas.height / 7);
    ctx.strokeText(document.querySelectorAll('input')[2].value, canvas.width / 2, canvas.height - (canvas.height / 17));
    ctx.fillText(document.querySelectorAll('input')[1].value, canvas.width / 2, canvas.height / 7);
    ctx.fillText(document.querySelectorAll('input')[2].value, canvas.width / 2, canvas.height - (canvas.height / 17));
    ctx.textAlign = "start", ctx.fillStyle = "#fff", ctx.font = (canvas.height / 32) + "px arial ", ctx.lineWidth = canvas.height / 256;
    if (watermark) ctx.strokeText('www.memerator.tk', 5, canvas.height - (canvas.height / 67)),
    ctx.fillText('www.memerator.tk', 5, canvas.height - (canvas.height / 67));
    d('a').href = canvas.toDataURL();
    canvas.style.background = "url(" + canvas.toDataURL() + ") no-repeat 100%/cover";
}
$('input:text:visible:first').keypress(function(e) {
    if (e.which == 13) $('input[type=text]')[1].focus()
});
