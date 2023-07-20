import fs from 'fs';
import { Song } from '../domain/models/Song';

const songFilePath = 'data/songs.json';

export const readSong = (): Song[] => {
  try {
    const songsData = fs.readFileSync(songFilePath, 'utf-8');
    const songs = JSON.parse(songsData);
    return songs;
  } catch (error) {
    console.error('failed read songs', songFilePath);
    throw error;
  }
};

export const writeSong = (songs: Song[]): void => {
  try {
    fs.writeFileSync(songFilePath, JSON.stringify(songs), 'utf-8');
  } catch (error) {
    console.error('failed write  song', songFilePath);
  }
};
