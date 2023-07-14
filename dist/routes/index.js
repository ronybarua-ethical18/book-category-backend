"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("../modules/auth/auth.route"));
const users_route_1 = __importDefault(require("../modules/users/users.route"));
const cows_route_1 = __importDefault(require("../modules/cows/cows.route"));
const orders_route_1 = __importDefault(require("../modules/orders/orders.route"));
const admin_route_1 = __importDefault(require("../modules/admin/admin.route"));
const router = express_1.default.Router();
const adminRouteList = [
    {
        path: '/admins',
        route: admin_route_1.default,
    },
];
adminRouteList.forEach(route => {
    router.use(route.path, route.route);
});
const routeList = [
    {
        path: '/auth',
        route: auth_route_1.default,
    },
    {
        path: '/users',
        route: users_route_1.default,
    },
    {
        path: '/cows',
        route: cows_route_1.default,
    },
    {
        path: '/orders',
        route: orders_route_1.default,
    },
];
routeList.forEach(route => {
    router.use(route.path, route.route);
});
exports.default = router;
