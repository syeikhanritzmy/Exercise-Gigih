import { Request, Response } from 'express';
import { SongUseCase } from '../interfaces/SongInterface';
import { Song } from '../../domain/models/Song';

export function SongController(songUseCase: SongUseCase) {
  async function createSong(req: Request, res: Response) {
    try {
      const song: Song = req.body;
      song.playCount = 0;
      if (!song.title) {
        res.status(400).json(`title song is required`);
      }
      const createdSong = await songUseCase.createSong(song);
      return res.status(201).json(createdSong);
    } catch (error) {
      res.status(500).json(`Failed to create song :${error}`);
    }
  }

  async function getAllSong(req: Request, res: Response) {
    try {
      const songs = await songUseCase.getAllSong();
      res.status(200).json(songs);
    } catch (error) {
      res.status(500).json(`failed to get all Song`);
    }
  }

  async function getSongById(req: Request, res: Response) {
    try {
      const songId: string = req.params.id;

      const songs = await songUseCase.getSongById(songId);
      if (songs) {
        res.status(200).json(songs);
      } else {
        res.status(404).json('song not found');
      }
    } catch (error) {
      res.status(500).json('Failed to get song');
    }
  }

  async function updateSong(req: Request, res: Response) {
    try {
      const songId: string = req.params.id;
      const songupdated: Song = req.body;
      if (!songupdated.hasOwnProperty('title')) {
        return res.status(400).json({ error: 'Song title is required' });
      }

      const song = await songUseCase.updateSong(songupdated, songId);

      if (song) {
        res.status(200).json(song);
      } else {
        res.status(404).json({ error: 'song not found' });
      }
    } catch (error) {
      res.status(500).json({ error: `Failed update song ${error}` });
    }
  }

  async function deleteSong(req: Request, res: Response) {
    try {
      const songId: string = req.params.id;
      const song = await songUseCase.getSongById(songId);

      if (!song) {
        return res.status(404).json({ error: 'Playlist not found' });
      }

      await songUseCase.deleteSong(songId);

      res.status(204).json('success delete song');
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete song' });
    }
  }

  async function playSong(req: Request, res: Response) {
    try {
      const songId: string = req.params.id;

      const song = await songUseCase.playSong(songId);

      if (song) {
        res.status(200).json(song);
      } else {
        res.status(404).json({ error: 'Song not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to play the song' });
    }
  }

  async function getSongsByPopularity(req: Request, res: Response) {
    try {
      const songs = await songUseCase.getSongByPopularity();
      res.status(200).json(songs);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to get songs sorted by playCount' });
    }
  }
  return {
    createSong,
    getAllSong,
    getSongById,
    updateSong,
    deleteSong,
    playSong,
    getSongsByPopularity,
  };
}
