import fs from 'fs';
import { Playlist } from '../domain/models/Playlist';

const playlistsFilePath = 'data/playlists.json';

export const readPlaylist = (): Playlist[] => {
  try {
    const playlistsData = fs.readFileSync(playlistsFilePath, 'utf-8');
    const playlists = JSON.parse(playlistsData);
    return playlists;
  } catch (error) {
    console.error(`failed read playlist : ${playlistsFilePath}`, error);
    throw error;
  }
};

export const writePlaylists = (playlists: Playlist[]): void => {
  try {
    fs.writeFileSync(playlistsFilePath, JSON.stringify(playlists), 'utf-8');
  } catch (error) {
    console.error('failed  write  playlists', error);
  }
};
