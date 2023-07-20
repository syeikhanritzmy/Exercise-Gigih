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
exports.songUseCase = void 0;
const songUseCase = (songRepository) => {
    function createSong(song) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!song.title) {
                    throw new Error(`Song name is required`);
                }
                if (!song.artists) {
                    throw new Error('Song artist is required');
                }
                const createdSong = yield songRepository.createSong(song);
                return createdSong;
            }
            catch (error) {
                console.error(`create Song Error ${error}`);
                return Promise.reject(error);
            }
        });
    }
    function getAllSong() {
        return __awaiter(this, void 0, void 0, function* () {
            const songs = yield songRepository.getAllSong();
            return songs;
        });
    }
    function getSongById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id) {
                    throw new Error('id is required');
                }
                const song = yield songRepository.getSongById(id);
                if (!song) {
                    throw new Error('song not found');
                }
                return song;
            }
            catch (error) {
                console.error(`get song error ${error}`);
            }
        });
    }
    function updateSong(song, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!song.title) {
                    throw new Error('title song is required');
                }
                if (!song.artists) {
                    throw new Error(`artist song is required`);
                }
                const updatedSong = yield songRepository.updateSong(song, id);
                return updatedSong;
            }
            catch (error) {
                console.error(`failed update song ${error}`);
            }
        });
    }
    function deleteSong(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id) {
                    throw new Error(`playlist ID i required`);
                }
                yield songRepository.deleteSong(id);
            }
            catch (error) {
                console.error(`failed delete song ,${error}`);
            }
        });
    }
    function playSong(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const song = yield songRepository.playSong(id);
                if (!song) {
                    throw new Error('Song not found');
                }
                return song;
            }
            catch (error) {
                console.error(`Failed to play the song ${error}`);
            }
        });
    }
    function getSongByPopularity() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const songs = yield songRepository.getSongByPopularity();
                return songs;
            }
            catch (error) {
                throw new Error('Failed to get songs sorted by playCount');
            }
        });
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
exports.songUseCase = songUseCase;
