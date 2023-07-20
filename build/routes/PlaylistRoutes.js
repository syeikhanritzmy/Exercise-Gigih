"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistRoutes = void 0;
const express_1 = __importDefault(require("express"));
const PlaylistController_1 = __importDefault(require("../application/controllers/PlaylistController"));
const playlistRepository_1 = require("../domain/repositories/playlistRepository");
const router = express_1.default.Router();
exports.PlaylistRoutes = router;
const controller = (0, PlaylistController_1.default)(playlistRepository_1.playlistRepository);
router.post('/playlists/create', controller.createPlaylist);
router.post('/playlists/:playlistId/add-song/:songId', controller.addSongToPlaylist);
router.get('/playlists/', controller.getAllPlaylist);
router.get('/playlists/:id', controller.getPlaylistById);
router.put('/playlists/update/:id', controller.updatePlaylist);
router.delete('/playlists/delete/:id', controller.deletePlaylist);
