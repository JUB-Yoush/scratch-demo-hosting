import {
  Project,
  Sprite,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Dot from "./Dot/Dot.js";
import Proj from "./Proj/Proj.js";

const stage = new Stage({ costumeNumber: 2 });

const sprites = {
  Dot: new Dot({
    x: 173.5990873033531,
    y: -57.70469409286204,
    direction: 140,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 25,
    visible: true,
    layerOrder: 2,
  }),
  Proj: new Proj({
    x: 173.5990873033531,
    y: -57.70469409286204,
    direction: 140,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 20,
    visible: false,
    layerOrder: 1,
  }),
};

const project = new Project(stage, sprites, {
  frameRate: 30, // Set to 60 to make your project run faster
});
export default project;
