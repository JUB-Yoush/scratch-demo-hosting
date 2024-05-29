/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Asteroid extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("cheesy puffs", "./Asteroid/costumes/cheesy puffs.png", {
        x: 87,
        y: 72,
      }),
    ];

    this.sounds = [
      new Sound("pop", "./Asteroid/sounds/pop.wav"),
      new Sound("Cymbal", "./Asteroid/sounds/Cymbal.wav"),
    ];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.CLONE_START, this.startAsClone3),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "got_hit" },
        this.whenIReceiveGotHit
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
    ];

    this.vars.minSpeed = -2;
    this.vars.turnAngle = 0;
    this.vars.cheeseVeloY = 2;
    this.vars.cheeseVeloX = 0;
    this.vars.cooldown = 3;
    this.vars.cooldownDecrement = 0.2;
    this.vars.minCooldown = 3;
    this.vars.alive = 0;
  }

  *startAsClone() {
    this.vars.alive = 1;
    this.vars.minSpeed = -2;
    this.stage.vars.maxSpeed = 2;
    this.stage.vars.acceleration = 0;
    this.vars.turnAngle = this.random(-1, 1);
    this.vars.cheeseVeloX = this.random(
      this.toNumber(this.stage.vars.maxSpeed),
      this.toNumber(this.vars.minSpeed)
    );
    this.vars.cheeseVeloY = this.random(
      this.toNumber(this.stage.vars.maxSpeed),
      this.toNumber(this.vars.minSpeed)
    );
    this.visible = true;
    while (true) {
      this.x += this.toNumber(this.vars.cheeseVeloX);
      this.y += this.toNumber(this.vars.cheeseVeloY);
      if (this.touching(this.sprites["Proj"].andClones())) {
        this.size = this.size / 2;
        if (this.compare(this.size, 15) > 0) {
          this.createClone();
          this.createClone();
        }
        this.deleteThisClone();
      }
      yield;
    }
  }

  *startAsClone2() {
    while (true) {
      if (this.compare(Math.abs(this.x), 230) > 0) {
        this.x = -1 * this.x;
      } else {
        null;
      }
      if (this.compare(Math.abs(this.y), 150) > 0) {
        this.y = -1 * this.y;
      } else {
        null;
      }
      yield;
    }
  }

  *startAsClone3() {
    yield* this.wait(15);
    this.deleteThisClone();
  }

  *whenGreenFlagClicked() {
    this.vars.cooldown = 3;
    this.vars.cooldownDecrement = 0.2;
    this.vars.minCooldown = 3;
    while (true) {
      yield* this.makeAsteroid();
      if (this.compare(this.vars.cooldown, this.vars.minCooldown) > 0) {
        this.vars.cooldown += this.toNumber(this.vars.cooldownDecrement);
      }
      yield* this.wait(this.toNumber(this.vars.cooldown));
      yield;
    }
  }

  *makeAsteroid() {
    this.stage.vars.rng = this.random(1, 4);
    if (this.toNumber(this.stage.vars.rng) === 1) {
      this.goto(-190, -120);
    }
    if (this.toNumber(this.stage.vars.rng) === 2) {
      this.goto(190, 120);
    }
    if (this.toNumber(this.stage.vars.rng) === 3) {
      this.goto(-190, 120);
    }
    if (this.toNumber(this.stage.vars.rng) === 4) {
      this.goto(190, -120);
    }
    this.createClone();
  }

  *whenIReceiveGotHit() {}

  *whenGreenFlagClicked2() {
    this.visible = false;
  }
}
