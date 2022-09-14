var canvas = document.getElementById("platform"),
ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;



loadImage();
generatePos();
var newWidth;
var newHeight;
var refreshCount=0;
function loadImage(){
    var map = new Image();
    map.src = 'worldmap.png';
    // canvas.width = 3729 * 0.6;
    // canvas.height = 2068 * 0.6;    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight;
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
   //console.log(window.devicePixelRatio);
    var width;
    var height;
    map.onload = function(){
        width = this.width;
        height = this.height;

        var scaleWF = canvas.width/width;
        var scaleHF = canvas.height/height;
        //console.log(scaleWF + " scaleWF " + scaleHF + " scaleHF");
        newWidth = canvas.width;
        newHeight = scaleWF * height;
        canvas.height = Math.round(newHeight);
        //console.log(newHeight + "total height");
        ctx.drawImage(map, 0, 0, Math.round(newWidth),Math.round(newHeight));

        //console.log(width + "image width and " + canvas.width + " canvas width and " + canvas.height + " canvas height");
    }
    refreshCount = 0;
}

document.getElementById("platform").addEventListener("click",function(e){checkLocation(canvas,e);});
//scaleHF = 0.42166344294003866
//constants based on image dimensions and one test-case
var totalWidth = 867;
var rightPaddingPercent = 34.8579545468902/totalWidth;
var leftPaddingPercent = (totalWidth-831.8579545468092)/totalWidth;
var gutsW = 1 - rightPaddingPercent - leftPaddingPercent;
var centerWGutsPercent = rightPaddingPercent + gutsW/2;
var points = 0;
var totalHeight = 529;
var bottomPaddingPercent = (totalHeight-485)/totalHeight;
var topPaddingPercent = 47/totalHeight;
var gutsH = 1 - bottomPaddingPercent - topPaddingPercent;
var centerHGutsPercent = topPaddingPercent + gutsH/2;

function getMousePos(canvas, evt) {

    var centerW = canvas.width * centerWGutsPercent;
    var centerH = newHeight * centerHGutsPercent;
    //console.log("CenterW = " + centerW+ " CenterH = " + centerH);
    var lon = Math.round(180/(canvas.width-rightPaddingPercent*canvas.width-centerW)* (evt.clientX-centerW));
    var lat = Math.round(-90/(newHeight-bottomPaddingPercent*newHeight-centerH) * (evt.clientY-centerH));
    var output = [lat, lon];
    //console.log("canvas w " + canvas.width + " - " + rightPaddingPercent + " * " + canvas.width + " - " + centerW );
    //console.log(canvas.width-rightPaddingPercent*canvas.width-centerW);
    //console.log(convertLon(lon) + " longitude");
    //document.getElementById("xyposition").innerHTML = "Click Position: (" + evt.clientY + ", " + convertLon(lon) + ")";
    return output;
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

var targetLat, targetLon;
var tries = 1;
var refreshCount=0;

function generatePos() {
    var latPos = Math.random()*90;
    var lonPos = Math.random()*180;
    var flipDir = Math.random() < 0.5 ? -1 : 1;
    targetLat = Math.round(latPos * flipDir);
    flipDir = Math.random() < 0.5 ? -1 : 1;
    targetLon = Math.round(lonPos * flipDir);
    var latText,lonText;
    if(targetLat<0){latText = Math.abs(targetLat) + "&deg;S";}
    else if(targetLat>0){latText = targetLat + "&deg;N";}
    else latText = targetLat + "&deg;";
    
    if(targetLon<0){lonText = Math.abs(targetLon) + "&deg;W";}
    else if(targetLon>0){lonText = targetLon + "&deg;E";}
    else lonText = targetLon + "&deg;";
    
    console.log(targetLat + " targetLat " + targetLon + " targetLon");
    document.getElementById("target").innerHTML = "Click Position: " + latText + ", " + lonText;
}

var putLeaves = function(e) {
    var bounds = e.target.getBoundingClientRect();
    var x = e.clientX - bounds.left;
    var y = e.clientY - bounds.top;
  
    ctx.beginPath();
    ctx.arc(x,y,10,0,Math.PI*2,false); 
    ctx.strokeStyle ="#000000";
    ctx.stroke();
  }

function checkLocation(canvas, evt){
    var mousePos = getMousePos(canvas, evt);
    putLeaves(evt);
    if(mousePos[0] >= targetLat - 3 && mousePos[0] <= targetLat +3 ){
        if(mousePos[1] >= targetLon - 3 && mousePos[1] <= targetLon +3 ){
            loadImage();
            document.getElementById("message").innerHTML = "Correct in " + tries + " tries.";
            document.querySelectorAll(".target").forEach(item => {item.classList.add("flashcorrect");});
            generatePos();
            tries = 0;
        }
    }
    else {
        tries++;
        refreshCount++;
        document.getElementById("message").innerHTML = "WRONG.";
    }
    if(refreshCount>10){loadImage();}
    console.log(tries);
}
  
window.addEventListener("resize", function(){loadImage()}, true);

document.addEventListener("DOMContentLoaded", addListenForClear);
function addListenForClear(){
    var place = document.getElementById("xyposition");
    var clearIt = function() {
       place.classList.remove("flashwrong");
       place.classList.remove("flashcorrect");
    };
    place.addEventListener("animationend",clearIt);
    console.log("they were made.");
}
