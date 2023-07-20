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
exports.SongController = void 0;
const uuidUtil_1 = require("../../helpers/uuidUtil");
function SongController(songUseCase) {
    function createSong(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const song = {
                    id: (0, uuidUtil_1.generateUUID)(),
                    title: req.body.title,
                    artists: req.body.artists,
                    urlSongs: req.body.urlSongs,
                    playCount: 0,
                };
                if (!song.title) {
                    res.status(400).json(`title song is required`);
                }
                if (!req.body.artists || !req.body.urlSongs) {
                    return res.status(400).json('Artists and urlSongs are required.');
                }
                if (req.body.artists.length === 0 || req.body.urlSongs.length === 0) {
                    return res
                        .status(400)
                        .json({ message: 'Artists and urlSongs must be non-empty arrays.' });
                }
                const createdSong = yield songUseCase.createSong(song);
                return res.status(201).json(createdSong);
            }
            catch (error) {
                res.status(500).json(`Failed to create song :${error}`);
            }
        });
    }
    function getAllSong(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const songs = yield songUseCase.getAllSong();
                res.status(200).json(songs);
            }
            catch (error) {
                res.status(500).json(`failed to get all Song`);
            }
        });
    }
    function getSongById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const songId = req.params.id;
                const songs = yield songUseCase.getSongById(songId);
                if (songs) {
                    res.status(200).json(songs);
                }
                else {
                    res.status(404).json('song not found');
                }
            }
            catch (error) {
                res.status(500).json('Failed to get song');
            }
        });
    }
    function updateSong(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const songId = req.params.id;
                const songupdated = req.body;
                if (!songupdated.hasOwnProperty('title')) {
                    return res.status(400).json({ error: 'Song title is required' });
                }
                const song = yield songUseCase.updateSong(songupdated, songId);
                if (song) {
                    res.status(200).json(song);
                }
                else {
                    res.status(404).json({ error: 'song not found' });
                }
            }
            catch (error) {
                res.status(500).json({ error: `Failed update song ${error}` });
            }
        });
    }
    function deleteSong(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const songId = req.params.id;
                const song = yield songUseCase.getSongById(songId);
                if (!song) {
                    return res.status(404).json({ error: 'Playlist not found' });
                }
                yield songUseCase.deleteSong(songId);
                res.status(204).json('success delete song');
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to delete song' });
            }
        });
    }
    function playSong(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const songId = req.params.id;
                const song = yield songUseCase.playSong(songId);
                if (song) {
                    res.status(200).json(song);
                }
                else {
                    res.status(404).json({ error: 'Song not found' });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to play the song' });
            }
        });
    }
    function getSongsByPopularity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const songs = yield songUseCase.getSongByPopularity();
                res.status(200).json(songs);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: 'Failed to get songs sorted by playCount' });
            }
        });
    }
    return {
        createSong,
        getAllSong,
        getSongById,
        updateSong,
        deleteSong,
        playSong,
        getSongsByPopularity,
    };
}
exports.SongController = SongController;
