import express from 'express';
import PlaylistController from '../application/controllers/PlaylistController';
import { playlistRepository } from '../domain/repositories/playlistRepository';
const router = express.Router();

const controller = PlaylistController(playlistRepository);

router.post('/playlists/create', controller.createPlaylist);
router.post(
  '/playlists/:playlistId/add-song/:songId',
  controller.addSongToPlaylist
);
router.get('/playlists/', controller.getAllPlaylist);
router.get('/playlists/:id', controller.getPlaylistById);
router.put('/playlists/update/:id', controller.updatePlaylist);
router.delete('/playlists/delete/:id', controller.deletePlaylist);

export { router as PlaylistRoutes };
