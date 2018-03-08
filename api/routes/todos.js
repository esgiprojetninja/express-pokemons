const Router = require('koa-router');
const router = new Router();
const Ctrl = require('../controllers/todos');

router.get('/', Ctrl.all);

module.exports = router.routes();
