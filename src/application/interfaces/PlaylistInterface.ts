import { Request, Response } from 'express';
import { Playlist } from '../../domain/models/Playlist';
import { Song } from '../../domain/models/Song';

export interface PlaylistRepository {
  createPlaylist: (playlist: Playlist) => Promise<Playlist>;
  getPlaylistAll: () => Promise<Playlist[]>;
  getPlaylistById: (id: string) => Promise<Playlist | undefined>;
  updatePlaylist: (
    playlist: Playlist,
    id: string
  ) => Promise<Playlist | undefined>;
  deletePlaylist: (id: string) => Promise<void>;
  addSongToPlaylist: (
    playlistId: string,
    songId: string
  ) => Promise<Playlist | undefined>;
}

export interface PlaylistController {
  createPlaylist: (req: Request, res: Response) => Promise<void>;
  getPlaylistAll: (req: Request, res: Response) => Promise<void>;
  getPlaylistById: (req: Request, res: Response) => Promise<void>;
  updatePlaylist: (req: Request, res: Response) => Promise<void>;
  deletePlaylist: (req: Request, res: Response) => Promise<void>;
  addSongToPlaylist: (req: Request, res: Response) => Promise<void>;
}

export interface PlaylistUseCase {
  createPlaylist: (playlist: Playlist) => Promise<Playlist>;
  getPlaylistAll: () => Promise<Playlist[]>;
  getPlaylistById: (id: string) => Promise<Playlist | undefined>;
  updatePlaylist: (
    playlist: Playlist,
    id: string
  ) => Promise<Playlist | undefined>;
  deletePlaylist: (id: string) => Promise<void>;
  addSongToPlaylist: (
    playlistId: string,
    songId: string
  ) => Promise<Playlist | undefined>;
}
