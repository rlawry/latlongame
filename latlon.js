var canvas = document.getElementById("platform"),
ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

var tmpCanvas = document.createElement('canvas'),
tmpCtx = tmpCanvas.getContext('2d');
var img;
var newWidth;
var newHeight;
var refreshCount=0;

var bruh = new Audio('bruh.mp3');
var yeah = new Audio('yeah.mp3');

var correctArray = [];
var incorrectArray = [];
function loadArrays() {
    correctArray.push(new Audio("correct1.mp3"));
    correctArray.push(new Audio("correct2.mp3"));       
    correctArray.push(new Audio("correct3.mp3"));       
    correctArray.push(new Audio("correct4.mp3"));       
    correctArray.push(new Audio("correct5.mp3"));       
    correctArray.push(new Audio("correct6.mp3"));       
    correctArray.push(new Audio("correct7.mp3"));       
    correctArray.push(new Audio("correct8.mp3"));                        
    incorrectArray.push(new Audio("incorrect.mp3"));
    incorrectArray.push(new Audio("incorrect1.mp3"));  
    incorrectArray.push(new Audio("incorrect2.mp3"));  
    incorrectArray.push(new Audio("incorrect3.mp3"));  
    incorrectArray.push(new Audio("incorrect4.mp3"));  
    incorrectArray.push(new Audio("incorrect5.mp3"));  
    incorrectArray.push(new Audio("incorrect6.mp3"));  
    incorrectArray.push(new Audio("incorrect7.mp3"));  
    incorrectArray.push(new Audio("incorrect8.mp3"));  
    incorrectArray.push(new Audio("incorrect9.mp3"));  
    incorrectArray.push(new Audio("incorrect10.mp3"));  
    incorrectArray.push(new Audio("incorrect11.mp3"));  
    incorrectArray.push(new Audio("incorrect12.mp3"));
    incorrectArray.push(new Audio("incorrect13.mp3"));  
    incorrectArray.push(new Audio("incorrect14.mp3"));  
    incorrectArray.push(new Audio("incorrect15.mp3"));  
    incorrectArray.push(new Audio("incorrect16.mp3"));    
}
loadArrays();
function initialize(){
    
    img = new Image();
    img.src = "worldmap.png";
    canvas.width = window.innerWidth;
    console.log(window.innerWidth);
    console.log(canvas.width);
    canvas.height = window.innerHeight;
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    tmpCanvas.width = window.innerWidth
    tmpCanvas.height = window.innerHeight;
    tmpCtx.canvas.width  = window.innerWidth;
    tmpCtx.canvas.height = window.innerHeight;
    var width;
    var height;

    img.onload = function() {
        
            width = this.width;
            height = this.height;
    
            var scaleWF = canvas.width/width;
            var scaleHF = canvas.height/height;
            //console.log(scaleWF + " scaleWF " + scaleHF + " scaleHF");
            newWidth = Math.round(canvas.width);
            newHeight = Math.round(scaleWF * height);
            canvas.height = newHeight;
            tmpCanvas.height = newHeight;
            tmpCtx.drawImage(img, 0, 0, newWidth,newHeight);
            ctx.drawImage(tmpCtx.canvas, 0, 0);
    };
    generatePos();
}
function refreshImage(){
    ctx.drawImage(tmpCtx.canvas, 0, 0);
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
var stars = 0;

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
    document.getElementById("target").innerHTML = "Find this location: " + latText + ", " + lonText;
}

var putLeaves = function(e) {
    var bounds = e.target.getBoundingClientRect();
    var x = e.clientX - bounds.left;
    var y = e.clientY - bounds.top;
  
    ctx.beginPath();
    ctx.lineWidth = 3
    ctx.arc(x,y,10,0,Math.PI*2,false); 
    ctx.strokeStyle ="#000000";
    ctx.stroke();
  }

var putCorrect = function(e){
    var bounds = e.target.getBoundingClientRect();
    var x = e.clientX - bounds.left;
    var y = e.clientY - bounds.top;

    ctx.beginPath();
    drawStar(x,y,5,4,10,ctx);
    drawStar(x,y,5,4,10,tmpCtx);
}

function drawStar(cx,cy,spikes,outerRadius,innerRadius, context){
    var rot=Math.PI/2*2;
    var x=cx;
    var y=cy;
    var step=Math.PI/spikes;

    context.beginPath();
    context.moveTo(cx,cy-outerRadius)
    for(i=0;i<spikes;i++){
      x=cx+Math.cos(rot)*outerRadius;
      y=cy+Math.sin(rot)*outerRadius;
      context.lineTo(x,y)
      rot+=step

      x=cx+Math.cos(rot)*innerRadius;
      y=cy+Math.sin(rot)*innerRadius;
      context.lineTo(x,y)
      rot+=step
    }
    context.lineTo(cx,cy-outerRadius);
    context.closePath();
    context.lineWidth=5;
    context.strokeStyle='blue';
    context.stroke();
    context.fillStyle='yellow';
    context.fill();
}
  
function checkLocation(canvas, evt){
    var mousePos = getMousePos(canvas, evt);
    if(refreshCount>10){refreshImage();}
    putLeaves(evt);
    if(mousePos[0] >= targetLat - 3 && mousePos[0] <= targetLat +3 ){
        if(mousePos[1] >= targetLon - 3 && mousePos[1] <= targetLon +3 ){
            refreshImage();
            document.getElementById("message").innerHTML = "Correct in " + tries + " tries.";
            document.querySelectorAll(".xyposition").forEach(item => {item.classList.add("flashcorrect");});
            generatePos();
            tries = 1;
            putCorrect(evt);
            var rightSound = Math.floor(Math.random()*correctArray.length);
            correctArray[rightSound].currentTime = 0;
            correctArray[rightSound].play();
            stars++;
            document.getElementById("stars").innerHTML = stars + " stars";
        }
        else {
            tries++;
            refreshCount++;
            document.getElementById("message").innerHTML = "WRONG.";
            var wrongSound = Math.floor(Math.random()*incorrectArray.length);
            incorrectArray[wrongSound].currentTime = 0;
            incorrectArray[wrongSound].play();
            document.querySelectorAll(".xyposition").forEach(item => {item.classList.add("flashwrong");});
        }
    }
    else {
        tries++;
        refreshCount++;
        document.getElementById("message").innerHTML = "WRONG.";
        var wrongSound = Math.floor(Math.random()*incorrectArray.length);
        incorrectArray[wrongSound].currentTime = 0;
        incorrectArray[wrongSound].play();
        document.querySelectorAll(".xyposition").forEach(item => {item.classList.add("flashwrong");});
    }
    
    console.log(tries);
}
  
window.addEventListener("resize", function(){initialize()}, true);

document.addEventListener("DOMContentLoaded", function(){
    addListenForClear();
    initialize();
});

function addListenForClear(){
    var place = document.getElementById("target");
    var clearIt = function() {
       place.classList.remove("flashwrong");
       place.classList.remove("flashcorrect");
    };
    place.addEventListener("animationend",clearIt);
    console.log("they were made.");
}
