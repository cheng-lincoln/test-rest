import { Song } from "../models/SongModel"
import { SongService } from "../services/SongService";
import {
  Get, Post,
  Controller, Route,
  Body, Path, Query,
  Res, TsoaResponse
} from "tsoa";

@Route("songs")
export class SongController extends Controller {
  @Get("/")
  public async getSongs(
    @Res() songNotFound: TsoaResponse<404, { message: string }>,
    @Query() id? : string
  ): Promise<Readonly<Song[]>> {
    if (id !== undefined) {
      return new SongService()
      .getSong(id)
      .then((song) => {
        return song !== undefined ? song : songNotFound(404, { 'message': 'Song not found' });
      })
    } else {
      return new SongService().getSongs();
    }
  }

  @Get("{songId}")
  public async getSongByParams(
    @Path() songId: string,
    @Res() songNotFound: TsoaResponse<404, { message: string }>,
  ): Promise<Song> {
    return new SongService()
    .getSong(songId)
    .then((song) => {
      return song !== undefined ? song : songNotFound(404, { 'message': 'Song not found' });
    })
  }

  @Post("/")
  public async getSongByBody(
    @Body() body: { id: string },
    @Res() songNotFound: TsoaResponse<404, { message: string }>
  ): Promise<Song> {
    return new SongService()
    .getSong(body.id)
    .then((song) => {
      return song !== undefined ? song : songNotFound(404, { 'message': 'Song not found' });
    })
  }
}
