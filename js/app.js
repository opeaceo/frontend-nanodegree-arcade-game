const PLAYERX = 200;
const PLAYERY = 400;
const ENEMY_WIDTH = 85;
const PLAYER_WIDTH = 65;
const ENEMY_HEIGHT = 68;
const PLAYER_HEIGHT = 76;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x >= 505) {
        this.x = -100;
    }

    // check for collision betweeen the player and the enemy
    if (player.x < this.x + ENEMY_WIDTH && player.x + PLAYER_WIDTH > this.x &&
      player.y < this.y + ENEMY_HEIGHT && PLAYER_HEIGHT + player.y > this.y) {
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.score = 0;
    this.sprite = 'images/char-boy.png';
};

// Update the player's position,and keep the player within the board, required method for game
Player.prototype.update = function() {
  if (this.x < 0) {
      this.x = 0;
  } else if (this.x > 400) {
      this.x = 400;
  } else if (this.y > 400) {
      this.y = 400;
  } else if (this.y <= 0) {
      this.score++;
      player.reset();
  }
}

//resets the player's position back to the starting position
Player.prototype.reset = function () {
    this.x = PLAYERX;
    this.y = PLAYERY;
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

//Determine the player's movement based on the input
Player.prototype.handleInput = function (key) {
    if (key === 'up') {
        this.y -= 83;
    } else if (key === 'down') {
        this.y += 83;
    } else if (key === 'right') {
        this.x += 100;
    } else if (key === 'left') {
        this.x -= 100;
    }

}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (let i = 0; i < 3; i++) {
    var speed = 50 * Math.ceil(Math.random() * 10 + 3);
    allEnemies.push(new Enemy(0, 60 + (85 * i), speed));
}
var player = new Player(PLAYERX, PLAYERY);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Detect Mouse Coordinates on Canvas
// function initCanvas(){
//   ctx.canvas.addEventListener('mousemove', function(event){
//       var mouseX = event.clientX - ctx.canvas.offsetLeft;
//       var mouseY = event.clientY  - 140;
//       var status = document.getElementById('status');
//       status.innerHTML = mouseX+" | "+mouseY;
//   });
// }
