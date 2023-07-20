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
exports.PlaylistController = void 0;
const uuidUtil_1 = require("../../helpers/uuidUtil");
function PlaylistController(PlaylistUseCase) {
    function createPlaylist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const playlist = {
                    id: (0, uuidUtil_1.generateUUID)(),
                    name: req.body.name,
                    songs: [],
                };
                if (!playlist.name) {
                    res.status(400).json('Playlist name is required.');
                }
                const createdPlaylist = yield PlaylistUseCase.createPlaylist(playlist);
                res.status(201).json(createdPlaylist);
            }
            catch (error) {
                res.status(500).json({ error: `Failed to create playlist ${error}` });
            }
        });
    }
    function getAllPlaylist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const readedPlaylist = yield PlaylistUseCase.getPlaylistAll();
                res.status(200).json(readedPlaylist);
            }
            catch (error) {
                res.status(500).json({ error: `Failed to read all playlist ${error}` });
            }
        });
    }
    function getPlaylistById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const playlistId = req.params.id;
                const playlist = yield PlaylistUseCase.getPlaylistById(playlistId);
                if (playlist) {
                    res.status(200).json(playlist);
                }
                else {
                    res.status(404).json('Playlist not found');
                }
            }
            catch (error) {
                res.status(500).json('Failed to get playlist');
            }
        });
    }
    function updatePlaylist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const playlistId = req.params.id;
                const updatedPlaylist = req.body;
                if (!updatedPlaylist.hasOwnProperty('name')) {
                    return res.status(400).json({ error: 'Playlist name is required' });
                }
                const playlist = yield PlaylistUseCase.updatePlaylist(updatedPlaylist, playlistId);
                if (playlist) {
                    res.status(200).json(playlist);
                }
                else {
                    res.status(404).json({ error: 'playlist not found' });
                }
            }
            catch (error) {
                res.status(500).json({ error: `Failed update playlist ${error}` });
            }
        });
    }
    function deletePlaylist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const playlistId = req.params.id;
                const playlist = yield PlaylistUseCase.getPlaylistById(playlistId);
                if (!playlist) {
                    return res.status(404).json({ error: 'Playlist not found' });
                }
                yield PlaylistUseCase.deletePlaylist(playlistId);
                res.status(204).json('success delete playlist');
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to delete playlist' });
            }
        });
    }
    function addSongToPlaylist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const playlistId = req.params.playlistId;
                const songId = req.params.songId;
                const playlist = yield PlaylistUseCase.addSongToPlaylist(playlistId, songId);
                console.log(playlistId, songId);
                if (playlist) {
                    res.status(200).json(playlist);
                }
                else {
                    res.status(404).json({ error: 'Playlist not found or Song not found' });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to add song to playlist' });
            }
        });
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
exports.PlaylistController = PlaylistController;
exports.default = PlaylistController;
