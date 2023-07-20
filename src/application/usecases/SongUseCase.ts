import { Song } from '../../domain/models/Song';
import { SongRepository, SongUseCase } from '../interfaces/SongInterface';

export const songUseCase = (songRepository: SongRepository): SongUseCase => {
  async function createSong(song: Song): Promise<Song> {
    try {
      if (!song.title) {
        throw new Error(`Song name is required`);
      }
      if (!song.artists) {
        throw new Error('Song artist is required');
      }
      const createdSong = await songRepository.createSong(song);
      return createdSong;
    } catch (error) {
      console.error(`create Song Error ${error}`);
      return Promise.reject(error);
    }
  }
  async function getAllSong(): Promise<Song[]> {
    const songs = await songRepository.getAllSong();
    return songs;
  }

  async function getSongById(id: string): Promise<Song | undefined> {
    try {
      if (!id) {
        throw new Error('id is required');
      }
      const song = await songRepository.getSongById(id);

      if (!song) {
        throw new Error('song not found');
      }
      return song;
    } catch (error) {
      console.error(`get song error ${error}`);
    }
  }

  async function updateSong(song: Song, id: string): Promise<Song | undefined> {
    try {
      if (!song.title) {
        throw new Error('title song is required');
      }

      if (!song.artists) {
        throw new Error(`artist song is required`);
      }

      const updatedSong = await songRepository.updateSong(song, id);
      return updatedSong;
    } catch (error) {
      console.error(`failed update song ${error}`);
    }
  }

  async function deleteSong(id: string): Promise<void> {
    try {
      if (!id) {
        throw new Error(`playlist ID i required`);
      }
      await songRepository.deleteSong(id);
    } catch (error) {
      console.error(`failed delete song ,${error}`);
    }
  }

  async function playSong(id: string): Promise<Song | undefined> {
    try {
      const song = await songRepository.playSong(id);

      if (!song) {
        throw new Error('Song not found');
      }

      return song;
    } catch (error) {
      console.error(`Failed to play the song ${error}`);
    }
  }
  async function getSongByPopularity(): Promise<Song[]> {
    try {
      const songs = await songRepository.getSongByPopularity();
      return songs;
    } catch (error) {
      throw new Error('Failed to get songs sorted by playCount');
    }
  }
  return {
    createSong,
    getSongByPopularity,
    getAllSong,
    getSongById,
    updateSong,
    deleteSong,
    playSong,
  };
};
