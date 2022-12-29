const router = require('koa-router')();

const { ERRCODE } = require('../common/enum');
const fs = require('fs');

let game_config_path = 'cache/game_config.json';
let game_config = JSON.parse(fs.readFileSync(game_config_path)) || {};
let game_config_str = JSON.stringify(game_config);

router.prefix('/game_config');

router.get('/', async (ctx, next) => {
    ctx.body = game_config_str;
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
    game_config_str = JSON.stringify(game_config);
    fs.writeFileSync(game_config_path, game_config_str);

    ctx.body = ERRCODE.ok;
});

module.exports = router;
