const router = require('koa-router')();

const { ERRCODE } = require('../common/enum');
const fs = require('fs');

let game_config_path = 'cache/game_config.json';
let game_config = JSON.parse(fs.readFileSync(game_config_path)) || {};

router.prefix('/game_config');

router.get('/', async (ctx, next) => {
    ctx.body = JSON.stringify(game_config);
});

router.get('/set', async (ctx, next) => {
    let quest = ctx.query;
    console.log(quest);
    if (!quest.name || !quest.value || !quest.password) {
        ctx.body = ERRCODE.param_err;
        return;
    }
    if (quest.password != 'cssc@1234') {
        ctx.body = ERRCODE.password_err;
        return;
    }

    game_config[quest.name] = quest.value;
    fs.writeFileSync(game_config_path, JSON.stringify(game_config));
    ctx.body = ERRCODE.ok;
});

module.exports = router;
