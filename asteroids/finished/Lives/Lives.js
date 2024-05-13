/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Lives extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("1", "./Lives/costumes/1.svg", {
        x: 31.388271713474666,
        y: 66.71217683226618,
      }),
      new Costume("2", "./Lives/costumes/2.svg", {
        x: 31.388273426949354,
        y: 66.7121736645324,
      }),
      new Costume("3", "./Lives/costumes/3.svg", {
        x: 31.388275140423985,
        y: 66.71218049679862,
      }),
    ];

    this.sounds = [new Sound("bark", "./Lives/sounds/bark.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "got_hit" },
        this.whenIReceiveGotHit
      ),
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = true;
    this.goto(141, 151);
    this.costume = this.stage.vars.lives;
  }

  *whenIReceiveGotHit() {
    if (this.toNumber(this.stage.vars.lives) === 0) {
      yield* this.broadcastAndWait("game_ended");
      /* TODO: Implement stop all */ null;
    }
    this.costume = this.stage.vars.lives;
  }
}
