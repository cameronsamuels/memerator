var d = function(i) { return document.querySelector(i) },
img, cv = $('canvas')[0], r = 0, rt = 0, font = "impac", color = "#fff", ut, mrk = 1;
cv.width = 1024, cv.height = 1024, cx = cv.getContext("2d");
d('[type=file]').addEventListener("change", function() {
    var url = this.value, ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    if (d('input').files && d('input').files[0] && ["gif", "png", "jpeg", "jpg", "tiff", "bmp"].indexOf(ext) != -1) {
        var rdr = new FileReader();
        rdr.onloadend = function(e) {
            img = new Image();
            img.onload = function() {
                if (Math.min(img.height, img.width) < 256) mrk = 0;
                cv.width = img.width, cv.height = img.height;
                cx.drawImage(img, 0, 0, cv.width, cv.height, 0, 0, cv.width, cv.height);
                d('#download').id = '', d('#advanced').id = '';
                color = $('.jscolor').css('background-color');
                cx.textAlign = "center", cx.fillStyle = color, cx.strokeStyle = '#000',
                cx.font = (cv.height / 8) + "px " + font, cx.lineWidth = cv.height / 64;
                cx.strokeText($('input')[1].value, cv.width / 2, cv.height / 7),
                cx.strokeText($('input')[2].value, cv.width / 2, cv.height - (cv.height / 17)),
                cx.fillText($('input')[1].value, cv.width / 2, cv.height / 7),
                cx.fillText($('input')[2].value, cv.width / 2, cv.height - (cv.height / 17));
                d('a').href = cv.toDataURL();
                if (Math.min(img.height, img.width) < 768) $('a[href]').attr('download', 'meme.png');
                $('.row').css('visibility', 'visible'), $('#upload').html('Replace' + $('#upload').html().replace('Upload', ''));
                $('.jscolor').click(function() {
                    $('body>div:last-child').on('mouseleave touchend mouseup', function() { setTimeout(update, 200) })
                });
                $('#font').css('font-family', font);
            }
            img.src = e.target.result;
            cv.style.background = "url(" + img.src + ") no-repeat 100%/cover";
        };
        rdr.readAsDataURL(d('[type=file]').files[0]);
    } else alert('This file is not compatible.\nUpload a GIF, PNG, JPEG, JPG, TIFF, or BMP file');
}, false);
function text() {
    clearTimeout(ut);
    ut = setTimeout(update, 500)
}
function update() {
    cx.clearRect(0, 0, cv.width, cv.height), cx.translate(cv.width / 2, cv.height / 2),
    cx.rotate(r), cx.drawImage(img, -img.width / 2, -img.height / 2),
    cx.rotate(-r), cx.translate(-cv.width / 2, -cv.height / 2);
    color = $('.jscolor').css('background-color');
    cx.textAlign = "center", cx.fillStyle = color, cx.strokeStyle = '#000',
    cx.font = (cv.height / 8) + "px " + font, cx.lineWidth = cv.height / 64;
    cx.strokeText($('input')[1].value, cv.width / 2, cv.height / 7),
    cx.strokeText($('input')[2].value, cv.width / 2, cv.height - (cv.height / 17)),
    cx.fillText($('input')[1].value, cv.width / 2, cv.height / 7),
    cx.fillText($('input')[2].value, cv.width / 2, cv.height - (cv.height / 17));
    cx.textAlign = "start", cx.fillStyle = "#fff", cx.font = (cv.height / 32) + "px arial ", cx.lineWidth = cv.height / 256;
    if (mrk) cx.strokeText('memerator.tk', 5, cv.height - (cv.height / 67)), cx.fillText('memerator.tk', 5, cv.height - (cv.height / 67));
    d('a').href = cv.toDataURL();
    cv.style.background = "url(" + cv.toDataURL() + ") no-repeat 100%/cover";
    $(".dropdown-content a").html(function(i, t) { return t.replace('<i class="material-icons">done</i>', "") });
    $('a[onclick*=\'"' + font + '"\']').html("<i class='material-icons'>done</i>" + $('a[onclick*=\'"' + font + '"\']').html());
    $('#font').css('font-family', font);
}
function rotate() {
    if ($('input[type=text]').css('visibility') == 'hidden') return;
    cx.clearRect(0, 0, cv.width, cv.height);
    rt = rt == 1 ? 0 : 1;
    if (rt) cv.width = img.height, cv.height = img.width;
    else cv.width = img.width, cv.height = img.height;
    cx.translate(cv.width / 2, cv.height / 2);
    r -= 1.5708;
    cx.rotate(r), cx.drawImage(img, -img.width / 2, -img.height / 2), cx.rotate(-r), cx.translate(-cv.width / 2, -cv.height / 2);
    color = $('.jscolor').css('background-color');
    cx.textAlign = "center", cx.fillStyle = color, cx.strokeStyle = '#000',
    cx.font = (cv.height / 8) + "px " + font, cx.lineWidth = cv.height / 64;
    cx.strokeText($('input')[1].value, cv.width / 2, cv.height / 7),
    cx.strokeText($('input')[2].value, cv.width / 2, cv.height - (cv.height / 17)),
    cx.fillText($('input')[1].value, cv.width / 2, cv.height / 7),
    cx.fillText($('input')[2].value, cv.width / 2, cv.height - (cv.height / 17));
    cx.textAlign = "start", cx.fillStyle = "#fff", cx.font = (cv.height / 32) + "px arial ", cx.lineWidth = cv.height / 256;
    if (mrk) cx.strokeText('memerator.tk', 5, cv.height - (cv.height / 67)), cx.fillText('memerator.tk', 5, cv.height - (cv.height / 67));
    d('a').href = cv.toDataURL();
    cv.style.background = "url(" + cv.toDataURL() + ") no-repeat 100%/cover";
}
$('input:text:visible:first').keypress(function(e) { if (e.which == 13) $('input[type=text]')[1].focus() });