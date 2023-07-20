"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeSong = exports.readSong = void 0;
const fs_1 = __importDefault(require("fs"));
const songFilePath = 'data/songs.json';
const readSong = () => {
    try {
        const songsData = fs_1.default.readFileSync(songFilePath, 'utf-8');
        const songs = JSON.parse(songsData);
        return songs;
    }
    catch (error) {
        console.error('failed read songs', songFilePath);
        throw error;
    }
};
exports.readSong = readSong;
const writeSong = (songs) => {
    try {
        fs_1.default.writeFileSync(songFilePath, JSON.stringify(songs), 'utf-8');
    }
    catch (error) {
        console.error('failed write  song', songFilePath);
    }
};
exports.writeSong = writeSong;
