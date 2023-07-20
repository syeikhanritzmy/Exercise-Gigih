import { Playlist } from '../../domain/models/Playlist';
import { PlaylistUseCase } from '../interfaces/PlaylistInterface';
import { PlaylistRepository } from '../interfaces/PlaylistInterface';

export const PlaylistUsecase = (
  playlistRepository: PlaylistRepository
): PlaylistUseCase => {
  async function createPlaylist(playlist: Playlist): Promise<Playlist> {
    try {
      if (!playlist.name) {
        throw new Error('Playlist name is required');
      }
      if (playlist.name.length <= 3) {
        throw new Error('Playlist name less than 3 character');
      }

      const createdPlaylist = await playlistRepository.createPlaylist(playlist);
      return createdPlaylist;
    } catch (error) {
      throw new Error('Failed to create playlist');
    }
  }

  async function getPlaylistAll(): Promise<Playlist[]> {
    try {
      const readPlaylist = await playlistRepository.getPlaylistAll();
      return readPlaylist;
    } catch (error) {
      throw new Error('failed to read all playlist');
    }
  }

  async function getPlaylistById(id: string): Promise<Playlist | undefined> {
    try {
      if (!id) {
        throw new Error('Playlist ID is required');
      }
      const playlist = await playlistRepository.getPlaylistById(id);

      if (!playlist) {
        throw new Error('Playlist not found');
      }
      return playlist;
    } catch (error) {
      throw new Error('failed to get playlist');
    }
  }
  async function updatePlaylist(
    playlist: Playlist,
    id: string
  ): Promise<Playlist | undefined> {
    try {
      if (!playlist.name) {
        throw new Error('Playlist name is required for update');
      }

      const updatedPlaylist = await playlistRepository.updatePlaylist(
        playlist,
        id
      );
      return updatedPlaylist;
    } catch (error) {
      throw new Error('Failed to update playlist');
    }
  }

  async function deletePlaylist(id: string): Promise<void> {
    try {
      if (!id) {
        throw new Error('Playlist ID is required');
      }
      await playlistRepository.deletePlaylist(id);
    } catch (error) {
      throw new Error('Failed to delete playlist');
    }
  }

  async function addSongToPlaylist(
    playlistId: string,
    songId: string
  ): Promise<Playlist | undefined> {
    const playlist = await playlistRepository.addSongToPlaylist(
      playlistId,
      songId
    );
    return playlist;
  }

  return {
    createPlaylist,
    getPlaylistAll,
    getPlaylistById,
    deletePlaylist,
    updatePlaylist,
    addSongToPlaylist,
  };
};
