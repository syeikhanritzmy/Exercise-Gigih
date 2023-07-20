import { readPlaylist, writePlaylists } from '../../helpers/PlaylistFileUtil';
import { PlaylistRepository } from '../../application/interfaces/PlaylistInterface';
import { songRepository } from './songRepository';

export const playlistRepository: PlaylistRepository = {
  createPlaylist: async (playlist) => {
    try {
      const playlists = await readPlaylist();
      playlists.push(playlist);
      await writePlaylists(playlists);
      return playlist;
    } catch (error) {
      throw new Error('Failed to create playlist');
    }
  },
  addSongToPlaylist: async (playlistId, songId) => {
    const playlists = await readPlaylist();
    const playlistIndex = playlists.findIndex(
      (index) => index.id === playlistId
    );

    if (playlistIndex !== -1) {
      const song = await songRepository.getSongById(songId);
      if (song) {
        playlists[playlistIndex].songs.push(song);
        await writePlaylists(playlists);
        return playlists[playlistIndex];
      }
    }
  },
  getPlaylistAll: async () => {
    try {
      const playlist = await readPlaylist();
      return playlist;
    } catch (error) {
      throw new Error('failed to get all');
    }
  },
  getPlaylistById: async (id) => {
    try {
      const playlists = await readPlaylist();
      return playlists.find((playlist) => playlist.id === id);
    } catch (error) {
      throw new Error('failed to get playlist by ID');
    }
  },
  updatePlaylist: async (playlist, id) => {
    try {
      const playlists = await readPlaylist();
      const index = playlists.findIndex(
        (playlistData) => playlistData.id === id
      );
      if (index !== -1) {
        playlists[index] = playlist;
        await writePlaylists(playlists);
        return playlist;
      }

      return undefined;
    } catch (error) {
      throw new Error('Failed to update playlist');
    }
  },

  deletePlaylist: async (id) => {
    try {
      const playlists = await readPlaylist();
      const index = playlists.findIndex(
        (playlistData) => playlistData.id === id
      );
      if (index !== -1) {
        playlists.splice(index, 1);
        await writePlaylists(playlists);
      }
    } catch (error) {
      throw new Error('Failed to delete playlist');
    }
  },
};
