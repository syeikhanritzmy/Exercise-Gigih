import express from 'express';
import { SongController } from '../application/controllers/SongController';
import { songRepository } from '../domain/repositories/songRepository';

const router = express.Router();

const controller = SongController(songRepository);

router.post('/songs/create', controller.createSong);
router.post('/songs/:id/play', controller.playSong);
router.get('/songs', controller.getAllSong);
router.get('/songs/popular', controller.getSongsByPopularity);
router.get('/songs/:id', controller.getSongById);
router.put('/songs/update/:id', controller.updateSong);
router.delete('/songs/delete/:id', controller.deleteSong);

export { router as SongRoutes };
