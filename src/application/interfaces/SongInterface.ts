import { Request, Response } from 'express';
import { Song } from '../../domain/models/Song';

export interface SongRepository {
  createSong: (song: Song) => Promise<Song>;
  getAllSong: () => Promise<Song[]>;
  getSongById: (id: string) => Promise<Song | undefined>;
  getSongByPopularity: () => Promise<Song[]>;
  updateSong: (song: Song, id: string) => Promise<Song | undefined>;
  deleteSong: (id: string) => Promise<void>;
  playSong: (id: string) => Promise<Song | undefined>;
}

export interface SongController {
  createSong: (req: Request, res: Response) => Promise<Song>;
  getAllSong: (req: Request, res: Response) => Promise<Song>;
  getSongById: (req: Request, res: Response) => Promise<Song>;
  updateSong: (req: Request, res: Response) => Promise<Song>;
  deleteSong: (req: Request, res: Response) => Promise<Song>;
  getSongByPopularity: (req: Request, res: Response) => Promise<Song>;
}

export interface SongUseCase {
  createSong: (song: Song) => Promise<Song>;
  getAllSong: () => Promise<Song[]>;
  getSongById: (id: string) => Promise<Song | undefined>;
  getSongByPopularity: () => Promise<Song[]>;
  updateSong: (song: Song, id: string) => Promise<Song | undefined>;
  deleteSong: (id: string) => Promise<void>;
  playSong: (id: string) => Promise<Song | undefined>;
}
