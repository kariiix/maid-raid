import { Application, Assets, Container, Sprite } from './scripts/pixi.min.mjs';

const tileWidth = 64;
const tileHeight = 32;

const mapSize = [64, 64];

(async () => {
    const app = new Application();
    await app.init({ resizeTo: window });

    const texture = await Assets.load('../assets/test_tile.png');
    const mapContainer = new Container();
    for (let i = 0; i < mapSize[0]; i++) {
        for (let j = 0; j < mapSize[1]; j++) {
            const x = (i - j) * tileWidth / 2;
            const y = (i + j) * -tileHeight / 2;

            const tile = new Sprite({
                texture: texture,
                x: x,
                y: y,
            });
            tile.anchor.set(0.5);
            mapContainer.addChild(tile);
        }
    }
    app.stage.addChild(mapContainer);

    const playerTexture = await Assets.load('../assets/blank_character.png');
    const player = new Sprite({
        texture: playerTexture,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
    });
    player.anchor.set(0.5, 1);
    app.stage.addChild(player);
    mapContainer.position.set(player.x, player.y);

    document.body.appendChild(app.canvas);
})();