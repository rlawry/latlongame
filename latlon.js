var canvas = document.getElementById("platform"),
ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;



loadImage();
var newWidth;
var newHeight;
function loadImage(){
    var map = new Image();
    map.src = 'worldmap.png';
    canvas.width = 3729 * 0.6;
    canvas.height = 2068 * 0.6;
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    console.log(window.devicePixelRatio);
    var width;
    var height;
    map.onload = function(){
        width = this.width;
        height = this.height;

        var scaleWF = canvas.width/width;
        newWidth = canvas.width;
        newHeight = scaleWF * height;
        console.log(newHeight + "total height");
        ctx.drawImage(map, 0, 0, Math.round(newWidth),Math.round(newHeight));
        console.log(width + "image width and " + canvas.width + " canvas width and " + canvas.height + " canvas height");
    }

}

document.getElementById("platform").addEventListener("click",function(e){getMousePos(canvas, e);});

//constants based on image dimensions and one test-case
var totalWidth = 867;
var rightPaddingPercent = 34.8579545468902/totalWidth;
var leftPaddingPercent = (totalWidth-831.8579545468092)/totalWidth;
var gutsW = 1 - rightPaddingPercent - leftPaddingPercent;
var centerWGutsPercent = rightPaddingPercent + gutsW/2;

var totalHeight = 480.8141592920354;
var bottomPaddingPercent = 440/totalWidth;
var topPaddingPercent = (totalHeight-42)/totalHeight;
var gutsH = 1 - bottomPaddingPercent - topPaddingPercent;
var centerHGutsPercent = bottomPaddingPercent + gutsH/2;

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    var centerW = canvas.width * centerWGutsPercent;
    var centerH = newHeight * centerHGutsPercent;
    console.log("CenterW = " + centerW+ " CenterH = " + centerH);
    var lon = Math.round(180/(canvas.width-rightPaddingPercent*canvas.width-centerW)* (evt.clientX-centerW));
    var lat = Math.round(-90/(newHeight-bottomPaddingPercent*newHeight-centerH) * (evt.clientY-centerH));
    console.log("canvas w " + canvas.width + " - " + rightPaddingPercent + " * " + canvas.width + " - " + centerW );
    console.log(canvas.width-rightPaddingPercent*canvas.width-centerW);
    console.log(convertLon(lon) + " longitude");
    //document.getElementById("xyposition").innerHTML = "Click Position: (" + evt.clientY + ", " + convertLon(lon) + ")";
    document.getElementById("xyposition").innerHTML = "Click Position: (" + convertLat(lat) + ", " + convertLon(lon) + ")";
}

function convertLon(obj){
    if(obj<0){
        return Math.abs(obj)+"&deg;W";
    }
    else if(obj>0){
        return Math.abs(obj)+"&deg;E";
    }
    else return obj;
}

function convertLat(obj){
    if(obj<0){
        return Math.abs(obj)+"&deg;S";
    }
    else if(obj>0){
        return Math.abs(obj)+"&deg;N";
    }
    else return obj;
}

function draw() {

//
}

window.addEventListener("resize", function(){loadImage()}, true);