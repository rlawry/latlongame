var canvas = document.getElementById("platform"),
ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;



loadImage();

function loadImage(){
    var map = new Image();
    map.src = 'worldmap.png';
    canvas.width = 3729 * 0.6;
    canvas.height = 2068 * 0.6;
    console.log(window.devicePixelRatio);

    map.onload = function(){
        ctx.drawImage(map, 0, 0, canvas.width,canvas.height);
    }

}

document.getElementById("platform").addEventListener("click",function(e){getMousePos(canvas, e);});

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    document.getElementById("xyposition").innerHTML = "Click Position: (" + (evt.clientX - rect.left) + ", " + (evt.clientY - rect.top) + ")";
    var obj = {x: evt.clientX - rect.left, y: evt.clientY - rect.top}
    convertLatLon(obj);

}

function convertLatLon(obj){
    var lat = 0;
    var lon = 0;
    lat = -1 * ( 2475 - obj.x );
    lon = 0; 
}