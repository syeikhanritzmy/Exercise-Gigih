import express from 'express';
import { PlaylistRoutes } from './PlaylistRoutes';
import { SongRoutes } from './SongRoutes';

const router = express.Router();

router.use('/', PlaylistRoutes);
router.use('/', SongRoutes);
export { router as Routes };
