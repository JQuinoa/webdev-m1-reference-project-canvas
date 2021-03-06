'use strict';

function Player (ctx, side, canvasWidth, canvasHeight, width, height, borderWidth, scoreOffsetX, scoreOffsetY) {
  this.ctx = ctx;
  this.side = side;
  this.canvasHeight = canvasHeight;
  this.canvasWidth = canvasWidth;
  this.y = canvasHeight / 2;
  this.width = width;
  this.height = height;
  this.speed = 0;
  this.score = 0;
  this.direction = null;
  this.borderWidth = borderWidth;
  this.writeScoreOffsetX = scoreOffsetX;
  this.writeScoreOffsetY = scoreOffsetY;

  if (this.side === 'left') {
    this.x = this.borderWidth;
  } else if (this.side === 'right') {
    this.x = canvasWidth - this.borderWidth;
  } else {
    throw new Error('Invalid side' + this.side);
  }
}

Player.prototype.draw = function () {
  this.ctx.beginPath();
  this.ctx.fillStyle = 'white';
  this.ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  this.ctx.fillStyle = 'grey';
  this.ctx.font = '150px Arial';
  if (this.side === 'left') {
    this.ctx.fillText(this.score, this.canvasWidth / 2 - this.writeScoreOffsetX, this.writeScoreOffsetY);
  } else {
    this.ctx.fillText(this.score, this.canvasWidth / 2 + this.writeScoreOffsetX, this.writeScoreOffsetY);
  }
}

Player.prototype.setSpeed = function (speed) {
  this.speed = speed;
}

Player.prototype.setDirection = function (direction) {
  this.direction = direction;
}

Player.prototype.update = function () {
  switch (this.direction) {
  case 'up':
    this.moveUp();
    break;
  case 'down':
    this.moveDown();
    break;
  }
}

Player.prototype.moveUp = function () {
  this.y -= this.speed;
}

Player.prototype.moveDown = function () {
  this.y += this.speed;
}

Player.prototype.setPosition = function (boundary) {
  if (boundary === 'top') {
    this.y = this.borderWidth + this.height / 2;
  } else {
    this.y = this.canvasHeight - this.borderWidth - this.height / 2;
  }
}