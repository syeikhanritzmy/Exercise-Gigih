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
exports.songRepository = void 0;
const SongFileUtil_1 = require("../../helpers/SongFileUtil");
exports.songRepository = {
    createSong: (song) => __awaiter(void 0, void 0, void 0, function* () {
        const songs = yield (0, SongFileUtil_1.readSong)();
        songs.push(song);
        yield (0, SongFileUtil_1.writeSong)(songs);
        return song;
    }),
    getAllSong: () => __awaiter(void 0, void 0, void 0, function* () {
        const songs = yield (0, SongFileUtil_1.readSong)();
        return songs;
    }),
    getSongById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const songs = yield (0, SongFileUtil_1.readSong)();
        return songs.find((dataSong) => dataSong.id === id);
    }),
    updateSong: (song, id) => __awaiter(void 0, void 0, void 0, function* () {
        const songs = yield (0, SongFileUtil_1.readSong)();
        const index = songs.findIndex((dataSong) => dataSong.id === id);
        if (index !== -1) {
            songs[index] = song;
            yield (0, SongFileUtil_1.writeSong)(songs);
            return song;
        }
        return undefined;
    }),
    deleteSong: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const songs = yield (0, SongFileUtil_1.readSong)();
        const index = songs.findIndex((dataSong) => dataSong.id === id);
        if (index !== -1) {
            songs.splice(index, 1);
            yield (0, SongFileUtil_1.writeSong)(songs);
        }
    }),
    playSong: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const songs = yield (0, SongFileUtil_1.readSong)();
        const song = songs.find((song) => song.id === id);
        if (!song) {
            return undefined;
        }
        song.playCount += 1;
        yield (0, SongFileUtil_1.writeSong)(songs);
        return song;
    }),
    getSongByPopularity: () => __awaiter(void 0, void 0, void 0, function* () {
        const songs = yield (0, SongFileUtil_1.readSong)();
        const sortedSongs = songs.sort((songA, songB) => songB.playCount - songA.playCount);
        return sortedSongs;
    }),
};
