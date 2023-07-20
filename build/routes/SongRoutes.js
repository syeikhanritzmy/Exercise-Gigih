"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongRoutes = void 0;
const express_1 = __importDefault(require("express"));
const SongController_1 = require("../application/controllers/SongController");
const songRepository_1 = require("../domain/repositories/songRepository");
const router = express_1.default.Router();
exports.SongRoutes = router;
const controller = (0, SongController_1.SongController)(songRepository_1.songRepository);
router.post('/songs/create', controller.createSong);
router.post('/songs/:id/play', controller.playSong);
router.get('/songs', controller.getAllSong);
router.get('/songs/:id', controller.getSongById);
router.get('/songs/popular', controller.getSongsByPopularity);
router.put('/songs/update/:id', controller.updateSong);
router.delete('/songs/delete/:id', controller.deleteSong);
