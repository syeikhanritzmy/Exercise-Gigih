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
exports.playlistRepository = void 0;
const PlaylistFileUtil_1 = require("../../helpers/PlaylistFileUtil");
const songRepository_1 = require("./songRepository");
exports.playlistRepository = {
    createPlaylist: (playlist) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const playlists = yield (0, PlaylistFileUtil_1.readPlaylist)();
            playlists.push(playlist);
            yield (0, PlaylistFileUtil_1.writePlaylists)(playlists);
            return playlist;
        }
        catch (error) {
            throw new Error('Failed to create playlist');
        }
    }),
    addSongToPlaylist: (playlistId, songId) => __awaiter(void 0, void 0, void 0, function* () {
        const playlists = yield (0, PlaylistFileUtil_1.readPlaylist)();
        const playlistIndex = playlists.findIndex((index) => index.id === playlistId);
        if (playlistIndex !== -1) {
            const song = yield songRepository_1.songRepository.getSongById(songId);
            if (song) {
                playlists[playlistIndex].songs.push(song);
                yield (0, PlaylistFileUtil_1.writePlaylists)(playlists);
                return playlists[playlistIndex];
            }
        }
    }),
    getPlaylistAll: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const playlist = yield (0, PlaylistFileUtil_1.readPlaylist)();
            return playlist;
        }
        catch (error) {
            throw new Error('failed to get all');
        }
    }),
    getPlaylistById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const playlists = yield (0, PlaylistFileUtil_1.readPlaylist)();
            return playlists.find((playlist) => playlist.id === id);
        }
        catch (error) {
            throw new Error('failed to get playlist by ID');
        }
    }),
    updatePlaylist: (playlist, id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const playlists = yield (0, PlaylistFileUtil_1.readPlaylist)();
            const index = playlists.findIndex((playlistData) => playlistData.id === id);
            if (index !== -1) {
                playlists[index] = playlist;
                yield (0, PlaylistFileUtil_1.writePlaylists)(playlists);
                return playlist;
            }
            return undefined;
        }
        catch (error) {
            throw new Error('Failed to update playlist');
        }
    }),
    deletePlaylist: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const playlists = yield (0, PlaylistFileUtil_1.readPlaylist)();
            const index = playlists.findIndex((playlistData) => playlistData.id === id);
            if (index !== -1) {
                playlists.splice(index, 1);
                yield (0, PlaylistFileUtil_1.writePlaylists)(playlists);
            }
        }
        catch (error) {
            throw new Error('Failed to delete playlist');
        }
    }),
};
