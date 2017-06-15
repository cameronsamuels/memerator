function getOrientation(file, callback) {
				  var reader = new FileReader();
				  reader.onload = function(e) {

				    var view = new DataView(e.target.result);
				    if (view.getUint16(0, false) != 0xFFD8) return callback(-2);
				    var length = view.byteLength, offset = 2;
				    while (offset < length) {
				      var marker = view.getUint16(offset, false);
				      offset += 2;
				      if (marker == 0xFFE1) {
					if (view.getUint32(offset += 2, false) != 0x45786966) return callback(-1);
					var little = view.getUint16(offset += 6, false) == 0x4949;
					offset += view.getUint32(offset + 4, little);
					var tags = view.getUint16(offset, little);
					offset += 2;
					for (var i = 0; i < tags; i++)
					  if (view.getUint16(offset + (i * 12), little) == 0x0112)
					    return callback(view.getUint16(offset + (i * 12) + 8, little));
				      }
				      else if ((marker & 0xFF00) != 0xFF00) break;
				      else offset += view.getUint16(offset, false);
				    }
				    return callback(-1);
				  };
				  reader.readAsArrayBuffer(file);
				}
			var $ = function(i){return document.querySelector(i)}, img, canvas = document.querySelector('canvas');
			canvas.width = 1024, canvas.height = 1024;
			$('[type=file]').addEventListener("change", function(event) {
				var canvas = $('canvas'), url = this.value, ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
				if ($('input').files && $('input').files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
					var reader = new FileReader();
					reader.onloadend = function(e) {
						var canvas = $("canvas"), ctx = canvas.getContext("2d"), oc = document.createElement('canvas'), octx = oc.getContext('2d');
						getOrientation($('[type=file]').files[0], function(orientation) {
						   switch(orientation){
						   case 8:
						   ctx.rotate(90*Math.PI/180);
						   octx.rotate(90*Math.PI/180);
						   break;
						   case 3:
						   ctx.rotate(180*Math.PI/180);
						   octx.rotate(180*Math.PI/180);
						   break;
						   case 6:
						   ctx.rotate(-90*Math.PI/180);
						   octx.rotate(-90*Math.PI/180);	
						   break;
						   case 7:
						   ctx.rotate(90*Math.PI/180);
						   octx.rotate(90*Math.PI/180);
						   break;
						   case 4:
						   ctx.rotate(180*Math.PI/180);
						   octx.rotate(180*Math.PI/180);
						   break;
						   case 5:
						   ctx.rotate(-90*Math.PI/180);
						   octx.rotate(-90*Math.PI/180);	
						   break;
							   default:
						}
						  });
						// 						var exif = EXIF.readFromBinaryFile(new BinaryFile(this.result));
						img = new Image();
						img.onload = function() {
							canvas.width = img.width;
							canvas.height = img.height;
							ctx.drawImage(img, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
						}
						img.src = e.target.result;
					};
					reader.readAsDataURL($('[type=file]').files[0]);
				} else {
					//not img
				}
			}, false);

			function text(event) {
				var canvas = $('canvas'), ctx = canvas.getContext("2d");
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				if ("createEvent" in document) {
					var evt = document.createEvent("HTMLEvents");
					evt.initEvent("change", false, true);
					$('[type=file]').dispatchEvent(evt);
				} else $('[type=file]').fireEvent("onchange");
				setTimeout(function() {
					ctx.font = (canvas.height/8) + "px impact";
					ctx.textAlign="center";
					ctx.lineWidth = canvas.height/64;
					ctx.fillStyle = "#fff";
					ctx.strokeStyle = '#000';
					ctx.strokeText(document.querySelectorAll('input')[1].value, canvas.width/2, canvas.height/7);
					ctx.strokeText(document.querySelectorAll('input')[2].value, canvas.width/2, canvas.height-(canvas.height/17));
					ctx.fillText(document.querySelectorAll('input')[1].value, canvas.width/2, canvas.height/7);
					ctx.fillText(document.querySelectorAll('input')[2].value, canvas.width/2, canvas.height-(canvas.height/17));
				}, 1000);
			}
			document.querySelectorAll('[type=text]')[0].addEventListener("keyup", text, false);
			document.querySelectorAll('[type=text]')[1].addEventListener("keyup", text, false);
			document.ontouchmove = function(e){e.preventDefault()};
