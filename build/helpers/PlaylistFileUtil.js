"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writePlaylists = exports.readPlaylist = void 0;
const fs_1 = __importDefault(require("fs"));
const playlistsFilePath = 'data/playlists.json';
const readPlaylist = () => {
    try {
        const playlistsData = fs_1.default.readFileSync(playlistsFilePath, 'utf-8');
        const playlists = JSON.parse(playlistsData);
        return playlists;
    }
    catch (error) {
        console.error(`failed read playlist : ${playlistsFilePath}`, error);
        throw error;
    }
};
exports.readPlaylist = readPlaylist;
const writePlaylists = (playlists) => {
    try {
        fs_1.default.writeFileSync(playlistsFilePath, JSON.stringify(playlists), 'utf-8');
    }
    catch (error) {
        console.error('failed  write  playlists', error);
    }
};
exports.writePlaylists = writePlaylists;
