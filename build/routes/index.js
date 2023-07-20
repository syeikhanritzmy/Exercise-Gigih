"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const express_1 = __importDefault(require("express"));
const PlaylistRoutes_1 = require("./PlaylistRoutes");
const SongRoutes_1 = require("./SongRoutes");
const router = express_1.default.Router();
exports.Routes = router;
router.use('/', PlaylistRoutes_1.PlaylistRoutes);
router.use('/', SongRoutes_1.SongRoutes);
