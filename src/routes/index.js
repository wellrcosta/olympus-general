const { Router } = require('express');
const helmet = require('helmet');
const { getRoutes } = require('./routes');

const router = Router();
const routes = getRoutes();

router.use(helmet());

routes.forEach((route) => {
    if (!route || !route.method || !route.path || !route.controller) {
        throw new Error(`Invalid route object: ${JSON.stringify(route)}`);
    }

    const sanitizedPath = route.path.replace(/[<>]/g, '');
    const sanitizedRoute = {
        method: route.method,
        path: sanitizedPath,
        middlewares: route.middlewares || [],
        controller: route.controller
    };

    router[sanitizedRoute.method](
        sanitizedRoute.path,
        sanitizedRoute.middlewares,
        sanitizedRoute.controller
    );
});

module.exports = router;
