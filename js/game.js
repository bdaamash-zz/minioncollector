// Elements on the page;
var overlay = document.createElement('DIV');
overlay.style.position = 'absolute';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.background = '#000';
overlay.style.zIndex = '10';
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.opacity = '0.5';
overlay.style.visibility = 'hidden';

document.body.appendChild(overlay);    


// Modal
var modal = document.createElement('DIV');
modal.style.position = 'fixed';
modal.style.top = '50%';
modal.style.left = '50%';
modal.style.background = '#f1c40f';
modal.style.zIndex = '11';
modal.style.width = '300px';
modal.style.height = '200px';
modal.style.borderRadius = '5px';
modal.style.marginTop = '-100px';
modal.style.marginLeft = '-150px';
modal.style.fontFamily = 'Open Sans';
modal.style.lineHeight = '200px';
modal.style.padding = '10px';
modal.style.visibility = 'hidden';


modal.innerHTML = 'This is a Demo, Please refresh the page to play again';

document.body.appendChild(modal);    




var counterDiv = document.createElement('DIV');
counterDiv.style.position = 'absolute';
counterDiv.style.bottom = '30px';
counterDiv.style.left = '60px';
counterDiv.style.background = '#ccc';
counterDiv.style.padding = '10px';
counterDiv.style.fontFamily = 'Arial';
counterDiv.style.fontSize = '24px';
counterDiv.style.fontWeight = 'bold';


counterDiv.innerHTML = 'Minions Collected: ';



var counterSpan = document.createElement('SPAN');
counterSpan.innerHTML = '0';


counterDiv.appendChild(counterSpan);
document.body.appendChild(counterDiv);


var countdownDiv = document.createElement('DIV');
countdownDiv.style.position = 'absolute';
countdownDiv.style.top = '30px';
countdownDiv.style.right = '60px';
countdownDiv.style.background = '#ccc';
countdownDiv.style.padding = '10px';
countdownDiv.style.fontFamily = 'Arial';
countdownDiv.style.fontSize = '24px';
countdownDiv.style.fontWeight = 'bold';
countdownDiv.id = ''

countdownDiv.innerHTML = 'Time Left: ';



var countdownSpan = document.createElement('SPAN');
countdownSpan.id = 'countdown_timer';


countdownDiv.appendChild(countdownSpan);
document.body.appendChild(countdownDiv);    





    
// Creating Timer

var count=30;

var counter=setInterval(timer, 1000); //1000 will  run it every 1 second

function timer()
{
  count=count-1;
  if (count <= 0)
  {
     count = 0;
     document.getElementById("countdown_timer").innerHTML=count + " secs";
     clearInterval(counter);
     //counter ended
     overlay.style.visibility = 'visible';
     modal.style.visibility = 'visible';
     return;
  }

   document.getElementById("countdown_timer").innerHTML=count + " secs"; // watch for spelling

}


// Configs
var counter = 0;
var countdown_timer;




//var gameStart = new PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
var renderer = new PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.view);


var stage1 = new PIXI.Stage(0xFFFFFF);
var stage = new PIXI.Stage(0xFFFFFF);

// Total Minions in farm
var totalMinions = 100;

// Game COFIGS
var startGame = false;
var gameSpeed = 5; // starting slow

var minionsKilled = 0;



//start button
var buttonTexture = PIXI.Texture.fromImage('images/play.png');
var button = new PIXI.Sprite(buttonTexture);

button.anchor.x = button.anchor.y = 0.5;
button.position.x = window.innerWidth / 2 - 150;
button.position.y = window.innerHeight / 2 - 80;
button.interactive = true;
button.buttonMode = true;
button.click = function () {
    startGame = true;
    //stage1.visible = false;
    stage.removeChild(this);
    requestAnimationFrame(game);
}

//uncomment to add start button
//stage.addChild(button);

//generate PIXI textures
var minionsArray= [];



for(var i=0; i < totalMinions; i++){
    //generate the minion id based on the number of minions in image folder
    var minionID = i % 7;
    minionID +=1;
    
    var imagePath= 'images/minion'+minionID+'.png';
    
    var minionTexture = PIXI.Texture.fromImage(imagePath);
    var minion = new PIXI.Sprite(minionTexture);
    
    //center the anchor to the middle of sprite
    minion.anchor.x = minion.anchor.y= 0.5;
    
    //randomly giving the minion different sizes ( why not)
    minion.scale.x = minion.scale.y = 0.7 + Math.random() *0.4;
    
    // scatter the minions around the stage / window
    minion.position.x = Math.random() * window.innerWidth;
    minion.position.y = Math.random() * window.innerHeight;
    
    //if(startGame){
        stage.addChild(minion);
    //}
    //creating a different direction for each minion
    
    minion.direction = Math.random() * Math.PI * 2;
    
    // turnit around 
    minion.turningSpeed = Math.random() - 0.8;
    
    minion.speed = 2 + Math.random() * gameSpeed;
    
    minionsArray.push(minion);
    
}

//Creating bounding boxes for the minions

var minionBoundsPadding = 50;
var minionBounds = new PIXI.Rectangle(-minionBoundsPadding,
                     -minionBoundsPadding,
                     window.innerWidth + minionBoundsPadding * 2,
                     window.innerHeight + minionBoundsPadding * 2);



renderer.render(stage);  
requestAnimationFrame(game);


function game() {
    
        // iterate throught the minion array and update the posiotion, direction and speed of each mionion
        for (var i = 0; i < minionsArray.length; i++)
         {
              var minion = minionsArray[i];
              minion.direction += minion.turningSpeed * 0.01;
              minion.position.x += Math.sin(minion.direction) * minion.speed;
              minion.position.y += Math.cos(minion.direction) * minion.speed;
              minion.rotation = -minion.direction - Math.PI/2;
              // wrap the minion by testing there bounds..
              if(minion.position.x < minionBounds.x)minion.position.x += minionBounds.width;
              else if(minion.position.x > minionBounds.x + minionBounds. width)minion.position.x -= minionBounds.width
              if(minion.position.y < minionBounds.y)minion.position.y += minionBounds.height;
              else if(minion.position.y > minionBounds.y + minionBounds. height)minion.position.y -= minionBounds.height

              minion.interactive= true;
              minion.click = function(){
                  counter++;
                  stage.removeChild(this);
                  
                  counterSpan.innerHTML = ' '+counter;                  

              }
              minion.touchstart = function(){
                  counter++;
                  stage.removeChild(this);
                  
                  counterSpan.innerHTML = ' '+counter;                  

              }
          }
 
    renderer.render(stage);  
    requestAnimationFrame(game);

}

