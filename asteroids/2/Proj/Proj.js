/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Proj extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("ball-a", "./Proj/costumes/ball-a.svg", { x: 22, y: 22 }),
      new Costume("ball-b", "./Proj/costumes/ball-b.svg", { x: 22, y: 22 }),
      new Costume("ball-c", "./Proj/costumes/ball-c.svg", { x: 22, y: 22 }),
      new Costume("ball-d", "./Proj/costumes/ball-d.svg", { x: 22, y: 22 }),
      new Costume("ball-e", "./Proj/costumes/ball-e.svg", { x: 22, y: 22 }),
    ];

    this.sounds = [
      new Sound("Boing", "./Proj/sounds/Boing.wav"),
      new Sound("Pop", "./Proj/sounds/Pop.wav"),
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.CLONE_START, this.startAsClone3),
    ];

    this.vars.colliding = 0;
  }

  *whenGreenFlagClicked() {
    this.vars.colliding = 0;
    this.visible = false;
    this.direction = 90;
    this.rotationStyle = Sprite.RotationStyle.ALL_AROUND;
    while (true) {
      this.goto(this.sprites["Dot"].x, this.sprites["Dot"].y);
      if (this.keyPressed("right arrow")) {
        this.direction += this.toNumber(this.stage.vars.turnSpeed);
      }
      if (this.keyPressed("left arrow")) {
        this.direction -= this.toNumber(this.stage.vars.turnSpeed);
      }
      yield;
    }
  }

  *startAsClone() {
    this.visible = true;
    while (true) {
      this.move(10);
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

  *startAsClone2() {
    while (true) {
      if (this.touching(this.sprites[undefined].andClones())) {
        if (this.toNumber(this.vars.colliding) === 0) {
          this.vars.colliding = 1;
        } else {
          this.deleteThisClone();
        }
      }
      yield;
    }
  }

  *startAsClone3() {
    yield* this.wait(1);
    this.deleteThisClone();
  }
}
