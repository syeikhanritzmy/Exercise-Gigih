import { Request, Response } from 'express';
import { Playlist } from '../../domain/models/Playlist';
import { PlaylistUseCase } from '../interfaces/PlaylistInterface';

export function PlaylistController(PlaylistUseCase: PlaylistUseCase) {
  async function createPlaylist(req: Request, res: Response) {
    try {
      const playlist: Playlist = req.body;
      playlist.songs = [];
      if (!playlist.name) {
        res.status(400).json('Playlist name is required.');
      }

      const createdPlaylist = await PlaylistUseCase.createPlaylist(playlist);
      res.status(201).json(createdPlaylist);
    } catch (error) {
      res.status(500).json({ error: `Failed to create playlist ${error}` });
    }
  }
  async function getAllPlaylist(req: Request, res: Response) {
    try {
      const readedPlaylist = await PlaylistUseCase.getPlaylistAll();
      res.status(200).json(readedPlaylist);
    } catch (error) {
      res.status(500).json({ error: `Failed to read all playlist ${error}` });
    }
  }
  async function getPlaylistById(req: Request, res: Response) {
    try {
      const playlistId: string = req.params.id;

      const playlist = await PlaylistUseCase.getPlaylistById(playlistId);

      if (playlist) {
        res.status(200).json(playlist);
      } else {
        res.status(404).json('Playlist not found');
      }
    } catch (error) {
      res.status(500).json('Failed to get playlist');
    }
  }
  async function updatePlaylist(req: Request, res: Response) {
    try {
      const playlistId: string = req.params.id;
      const updatedPlaylist: Playlist = req.body;

      if (!updatedPlaylist.hasOwnProperty('name')) {
        return res.status(400).json({ error: 'Playlist name is required' });
      }

      const playlist = await PlaylistUseCase.updatePlaylist(
        updatedPlaylist,
        playlistId
      );
      if (playlist) {
        res.status(200).json(playlist);
      } else {
        res.status(404).json({ error: 'playlist not found' });
      }
    } catch (error) {
      res.status(500).json({ error: `Failed update playlist ${error}` });
    }
  }

  async function deletePlaylist(req: Request, res: Response) {
    try {
      const playlistId: string = req.params.id;
      const playlist = await PlaylistUseCase.getPlaylistById(playlistId);

      if (!playlist) {
        return res.status(404).json({ error: 'Playlist not found' });
      }

      await PlaylistUseCase.deletePlaylist(playlistId);

      res.status(204).json('success delete playlist');
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete playlist' });
    }
  }
  async function addSongToPlaylist(req: Request, res: Response) {
    try {
      const playlistId: string = req.params.playlistId;
      const songId: string = req.params.songId;

      const playlist = await PlaylistUseCase.addSongToPlaylist(
        playlistId,
        songId
      );
      console.log(playlistId,songId);
      if (playlist) {
        res.status(200).json(playlist);
      } else {
        res.status(404).json({ error: 'Playlist not found or Song not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to add song to playlist' });
    }
  }

  return {
    createPlaylist,
    getAllPlaylist,
    getPlaylistById,
    updatePlaylist,
    deletePlaylist,
    addSongToPlaylist,
  };
}

export default PlaylistController;
