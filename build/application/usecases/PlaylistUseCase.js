"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistUsecase = void 0;
const PlaylistUsecase = (playlistRepository) => {
    function createPlaylist(playlist) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!playlist.name) {
                    throw new Error('Playlist name is required');
                }
                if (playlist.name.length <= 3) {
                    throw new Error('Playlist name less than 3 character');
                }
                const createdPlaylist = yield playlistRepository.createPlaylist(playlist);
                return createdPlaylist;
            }
            catch (error) {
                throw new Error('Failed to create playlist');
            }
        });
    }
    function getPlaylistAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const readPlaylist = yield playlistRepository.getPlaylistAll();
                return readPlaylist;
            }
            catch (error) {
                throw new Error('failed to read all playlist');
            }
        });
    }
    function getPlaylistById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id) {
                    throw new Error('Playlist ID is required');
                }
                const playlist = yield playlistRepository.getPlaylistById(id);
                if (!playlist) {
                    throw new Error('Playlist not found');
                }
                return playlist;
            }
            catch (error) {
                throw new Error('failed to get playlist');
            }
        });
    }
    function updatePlaylist(playlist, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!playlist.name) {
                    throw new Error('Playlist name is required for update');
                }
                const updatedPlaylist = yield playlistRepository.updatePlaylist(playlist, id);
                return updatedPlaylist;
            }
            catch (error) {
                throw new Error('Failed to update playlist');
            }
        });
    }
    function deletePlaylist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id) {
                    throw new Error('Playlist ID is required');
                }
                yield playlistRepository.deletePlaylist(id);
            }
            catch (error) {
                throw new Error('Failed to delete playlist');
            }
        });
    }
    function addSongToPlaylist(playlistId, songId) {
        return __awaiter(this, void 0, void 0, function* () {
            const playlist = yield playlistRepository.addSongToPlaylist(playlistId, songId);
            return playlist;
        });
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
exports.PlaylistUsecase = PlaylistUsecase;
