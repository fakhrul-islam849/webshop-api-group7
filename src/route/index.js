const express = require('express');
const authRoute = require('./authRoute');
const CategoryRoute = require('./CategoryRoute');
const brandRoute = require('./brandRoute');
const userAdminRoute = require('./userAdminRoute');
const OrderRoute = require('./OrderRoute');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/Category',
        route: CategoryRoute,
    },

    {
        path: '/brand',
        route: brandRoute,
    },

    ,
    {
        path: '/newsletter',
        route: newsLetterRoute,
    },

    {
        path: '/cart',
        route: cartRoute,
    },

    {
        path: '/user',
        route: userAdminRoute,
    },

    {
        path: '/order',
        route: OrderRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
