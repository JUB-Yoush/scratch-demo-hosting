/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 240,
        y: 180,
      }),
      new Costume("Neon Tunnel", "./Stage/costumes/Neon Tunnel.png", {
        x: 480,
        y: 360,
      }),
      new Costume("backdrop2", "./Stage/costumes/backdrop2.svg", {
        x: 0,
        y: 0,
      }),
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [];

    this.vars.friction = 0.2;
    this.vars.acceleration = 0;
    this.vars.speed = 0.5;
    this.vars.turnSpeed = 5;
    this.vars.maxVelocity = 20;
    this.vars.maxSpeed = 2;
    this.vars.rng = 1;
    this.vars.lives = 3;
  }
}
