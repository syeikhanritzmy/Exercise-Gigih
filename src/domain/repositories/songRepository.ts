import { SongRepository } from '../../application/interfaces/SongInterface';
import { readSong, writeSong } from '../../helpers/SongFileUtil';

export const songRepository: SongRepository = {
  createSong: async (song) => {
    const songs = await readSong();
    songs.push(song);
    await writeSong(songs);
    return song;
  },
  getAllSong: async () => {
    const songs = await readSong();
    return songs;
  },
  getSongById: async (id) => {
    const songs = await readSong();
    return songs.find((dataSong) => dataSong.id === id);
  },
  updateSong: async (song, id) => {
    const songs = await readSong();
    const index = songs.findIndex((dataSong) => dataSong.id === id);
    if (index !== -1) {
      songs[index] = song;
      await writeSong(songs);
      return song;
    }
    return undefined;
  },
  deleteSong: async (id) => {
    const songs = await readSong();
    const index = songs.findIndex((dataSong) => dataSong.id === id);
    if (index !== -1) {
      songs.splice(index, 1);
      await writeSong(songs);
    }
  },
  playSong: async (id) => {
    const songs = await readSong();
    const song = songs.find((song) => song.id === id);
    if (!song) {
      return undefined;
    }
    song.playCount += 1;
    await writeSong(songs);
    return song;
  },
  getSongByPopularity: async () => {
    const songs = await readSong();
    const sortedSongs = songs.sort(
      (songA, songB) => songB.playCount - songA.playCount
    );

    return sortedSongs;
  },
};
