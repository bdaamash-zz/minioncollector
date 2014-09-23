// Configs
var counter = 0;
var countdown_timer;

// Total Minions in farm
var totalMinions = 100;

// Game COFIGS
var startGame = true;
var gameSpeed = 5; // starting slow


var minionsKilled = 0;

var rankingMessage;





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
modal.style.width = '800px';
modal.style.height = '400px';
modal.style.borderRadius = '10px';
modal.style.marginTop = '-200px';
modal.style.marginLeft = '-400px';
modal.style.fontFamily = 'Open Sans';
modal.style.padding = '10px';
modal.style.visibility = 'hidden';


var gameOverTitle = document.createElement('h2');
gameOverTitle.style.fontFamily = 'Open Sans';
gameOverTitle.style.fontSize = '40px';
gameOverTitle.style.color = '#000';
gameOverTitle.style.marginBottom = '50px';
gameOverTitle.textContent = 'Game Over';
gameOverTitle.style.textAlign = 'center';

var rankingText = document.createElement('h4');
rankingText.style.color = "#000";
rankingText.style.fontSize = '40px';
rankingText.style.margin = '0';
rankingText.style.fontWeight = 'bold';
rankingText.style.textAlign = 'center';


var collectedMinionsText = document.createElement('h4');
collectedMinionsText.style.color = "#fff";
collectedMinionsText.style.fontSize = '60px';
collectedMinionsText.style.margin = '0';
collectedMinionsText.style.fontWeight = 'bold';
collectedMinionsText.style.textAlign = 'center';


var playAgainButton = document.createElement('h4');
playAgainButton.style.color = "#fff";
playAgainButton.style.fontSize = '30px';
playAgainButton.style.marginTop = '40px';
playAgainButton.style.padding = '10px';
playAgainButton.style.fontWeight = 'bold';
playAgainButton.style.textAlign = 'center';
playAgainButton.style.background = 'blue';
playAgainButton.style.cursor = 'pointer';
playAgainButton.style.width = '200px';
playAgainButton.style.left = '50%';
playAgainButton.style.marginLeft = '-100px';
playAgainButton.style.position = 'relative';
playAgainButton.textContent = "Play Again";

playAgainButton.addEventListener('click', function(){ location.reload(); });



modal.appendChild(gameOverTitle);
modal.appendChild(rankingText);
modal.appendChild(collectedMinionsText);
modal.appendChild(playAgainButton);
document.body.appendChild(modal);    




var counterDiv = document.createElement('DIV');
counterDiv.style.position = 'absolute';
counterDiv.style.bottom = '30px';
counterDiv.style.left = '60px';
counterDiv.style.color = '#f1c40f';
counterDiv.style.background = '#000';
counterDiv.style.borderRadius = '10px';
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
countdownDiv.style.right = '30px';
countdownDiv.style.color = '#f1c40f';
countdownDiv.style.background = '#000';
countdownDiv.style.borderRadius = '10px';
countdownDiv.style.padding = '10px';
countdownDiv.style.fontFamily = 'Arial';
countdownDiv.style.fontSize = '24px';
countdownDiv.style.fontWeight = 'bold';


countdownDiv.innerHTML = 'Time Left: ';



var countdownSpan = document.createElement('SPAN');
countdownSpan.id = 'countdown_timer';


countdownDiv.appendChild(countdownSpan);
document.body.appendChild(countdownDiv);    





    
// Creating Timer

var seconds=30;

var timeCounter=setInterval(timer, 1000); //1000 will  run it every 1 second

function timer()
{
  seconds=seconds-1;
  if (seconds <= 0)
  {
     seconds = 0;
     document.getElementById("countdown_timer").innerHTML=seconds + " secs";
     clearInterval(timeCounter);
     //counter ended
     overlay.style.visibility = 'visible';
     modal.style.visibility = 'visible';
     startGame = false
     return;
  }

   document.getElementById("countdown_timer").innerHTML=seconds + " secs"; // watch for spelling

}






//var gameStart = new PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
var renderer = new PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.view);


var stage1 = new PIXI.Stage(0xFFFFFF);
var stage = new PIXI.Stage(0xFFFFFF);




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
        // change game speed based on time
        if(startGame){
            var fasterBy = 1;

            if ( seconds < 20){
                fasterBy = 1.5;
            } if (seconds < 15) {
                fasterBy = 2.3;
            }

            // iterate throught the minion array and update the posiotion, direction and speed of each mionion
            for (var i = 0; i < minionsArray.length; i++)
             {
                  var minion = minionsArray[i];
                  minion.direction += minion.turningSpeed * 0.03;
                  minion.position.x += Math.sin(minion.direction) * minion.speed * fasterBy;
                  minion.position.y += Math.cos(minion.direction) * minion.speed * fasterBy;
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
            
            if(counter == 0){
                rankingMessage = 'You gotta try at least once!';
            }
            if(counter > 0 && counter <= 20){
                rankingMessage = 'Not bad for a begginer!';
            }
            if(counter > 20 && counter <= 40){
                rankingMessage = 'There is more clicking inside of you!';
            }
            if(counter >40 && counter <= 60){
                rankingMessage = 'You are a minion lover!';
            }
            if(counter > 60 && counter <= 80){
                rankingMessage = 'Are you seriously taking all those minions home? !';
            }
            if( counter > 80 && counter <= 100){
                rankingMessage = 'Okay! How are your fingers doing?';
            }
            
            rankingText.textContent = rankingMessage;
            collectedMinionsText.textContent = "Collected: " + counter;
            
            renderer.render(stage);  
            requestAnimationFrame(game);
    }
}

