import { Song } from './Song';

export interface Playlist {
  id: string;
  name: string;
  songs: Song[];
}
