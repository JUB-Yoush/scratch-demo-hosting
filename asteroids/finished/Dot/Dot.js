/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Dot extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("dot-a", "./Dot/costumes/dot-a.svg", { x: 52, y: 67 }),
      new Costume("dot-b", "./Dot/costumes/dot-b.svg", { x: 65, y: 67 }),
      new Costume("dot-c", "./Dot/costumes/dot-c.svg", {
        x: 50.53907824990836,
        y: 68.96764994984302,
      }),
      new Costume("dot-d", "./Dot/costumes/dot-d.svg", {
        x: 56.58074394930321,
        y: 66.76919584395038,
      }),
    ];

    this.sounds = [
      new Sound("Crunch", "./Dot/sounds/Crunch.wav"),
      new Sound("Dog2", "./Dot/sounds/Dog2.wav"),
      new Sound("Cymbal", "./Dot/sounds/Cymbal.wav"),
      new Sound("Jungle", "./Dot/sounds/Jungle.wav"),
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked4),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked5),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked6),
    ];

    this.vars.velocity = 0;
    this.vars.colliding = 0;
  }

  *whenGreenFlagClicked() {
    this.direction = 90;
    this.goto(0, 0);
    while (true) {
      if (
        this.keyPressed("up arrow") &&
        this.compare(this.vars.velocity, this.stage.vars.maxVelocity) < 0
      ) {
        this.vars.velocity += this.toNumber(this.stage.vars.speed);
      }
      if (this.keyPressed("right arrow")) {
        this.direction += this.toNumber(this.stage.vars.turnSpeed);
      }
      if (this.keyPressed("left arrow")) {
        this.direction -= this.toNumber(this.stage.vars.turnSpeed);
      }
      if (this.compare(this.vars.velocity, 0) > 0) {
        this.vars.velocity += -1 * this.toNumber(this.stage.vars.friction);
      } else {
        this.vars.velocity = 0;
      }
      this.move(this.toNumber(this.vars.velocity));
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    this.stage.vars.lives = 3;
    this.stage.vars.turnSpeed = 5;
    this.stage.vars.speed = 0.5;
    this.stage.vars.maxVelocity = 20;
    this.stage.vars.friction = 0.2;
    this.vars.velocity = 0;
    this.vars.colliding = 0;
  }

  *whenGreenFlagClicked3() {
    this.rotationStyle = Sprite.RotationStyle.ALL_AROUND;
    while (true) {
      if (this.touching("edge")) {
        if (this.compare(Math.abs(this.x), 238) > 0) {
          this.x = -1 * this.x;
        }
        if (this.compare(Math.abs(this.y), 178) > 0) {
          this.y = -1 * this.y;
        }
      }
      yield;
    }
  }

  *whenGreenFlagClicked4() {
    while (true) {
      if (this.keyPressed("z")) {
        this.sprites["Proj"].createClone();
        yield* this.playSoundUntilDone("Dog2");
        yield* this.wait(0.3);
      }
      yield;
    }
  }

  *animate() {
    if (this.compare(this.vars.velocity, 1) > 0) {
      this.costume = "dot-b";
      yield* this.wait(0.5 / this.toNumber(this.vars.velocity));
      this.costume = "dot-c";
      yield* this.wait(0.5 / this.toNumber(this.vars.velocity));
    } else {
      this.costume = "dot-a";
    }
  }

  *whenGreenFlagClicked5() {
    while (true) {
      yield* this.animate();
      if (this.keyPressed("z")) {
        this.costume = "dot-d";
        yield* this.wait(0.3);
        this.costume = "dot-a";
      }
      yield;
    }
  }

  *whenGreenFlagClicked6() {
    while (true) {
      if (this.touching(this.sprites["Asteroid"].andClones())) {
        if (this.toNumber(this.vars.colliding) === 0) {
          this.vars.colliding = 1;
          this.stage.vars.lives--;
          yield* this.startSound("Crunch");
          this.broadcast("got_hit");
        }
      } else {
        yield* this.wait(0.5);
        this.vars.colliding = 0;
      }
      yield;
    }
  }
}
