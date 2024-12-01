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
  /**
   * Retrieves all songs if no query param is given, else returns the specified song.
   * @param id (optional) The ID of the song to retrieve. If not provided, all songs are retrieved.
   * @returns All songs if id param is not provided, else retrieves the specified song.
   */
  @Get("/")
  public async getSongs(
    @Res() songNotFound: TsoaResponse<404, { message: string }>,
    @Query() id? : string
  ): Promise<Song[]> {
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

  /**
   * Retrieves a song given its ID.
   * @param songId the ID of the song to retrieve
   * @returns The specified song
   */
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

  /**
   * Retrieves a song by its ID
   * @param body Example: { "id": "4" } will return a song with ID == 4.
   * @returns The specified song
   */
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
