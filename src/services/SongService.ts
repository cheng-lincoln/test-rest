import _ from "lodash";
import { Song } from "../models/SongModel";

const songs: Song[] = [
  {
    id: '1',
    title: 'One Day More',
    artist: 'Les Miserables',
    likes: 193
  },
  {
    id: '2',
    title: 'Do You Hear the People Sing?',
    artist: 'Les Miserables',
    likes: 303
  },
  {
    id: '3',
    title: 'Lay All Your Love on Me',
    artist: 'Mamma Mia!',
    likes: 245
  },
  {
    id: '4',
    title: 'Dancing Queen',
    artist: 'Mamma Mia!',
    likes: 511
  },
  {
    id: '5',
    title: 'Mamma Mia!',
    artist: 'Mamma Mia!',
    likes: 1002
  },
  {
    id: '6',
    title: 'The Music of the Night',
    artist: 'Phantom of the Opera',
    likes: 92
  }
]

export class SongService {
  public async getSongs(): Promise<Song[]> {
    return songs;
  }

  public async getSong(id: string): Promise<Song | undefined> {
    const res = _.find(songs, song => song.id === id);
    return res;
  }
}
