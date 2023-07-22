"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("../modules/auth/auth.route"));
const books_route_1 = __importDefault(require("../modules/books/books.route"));
const users_route_1 = __importDefault(require("../modules/users/users.route"));
const router = express_1.default.Router();
const routeList = [
    {
        path: '/auth',
        route: auth_route_1.default,
    },
    {
        path: '/books',
        route: books_route_1.default,
    },
    {
        path: '/users',
        route: users_route_1.default,
    },
];
routeList.forEach(route => {
    router.use(route.path, route.route);
});
exports.default = router;
