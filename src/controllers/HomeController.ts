import { Get, Controller, Route, Request } from "tsoa";
import express from "express";

@Route("")
export class HomeController extends Controller {
  /**
   * Returns the <html> for the home page
   */
  @Get("/")
  public async home(
    @Request() request: express.Request
  ): Promise<null> {
    const response = (<any>request).res as express.Response;
    this.setStatus(200);
    response.contentType('text/html');
    response.send(`
      <html>
        <style>
          table, th, td {
            border: 1px solid black;
          }
        </style>
        <body>
          <h1>Welcome to Song API, created for students to try calling REST APIs.</h1>
          <div>
            <h2>Try out the following endpoints:</h2>
            <h3>
              <table>
                <tr>
                  <th>Endpoint</th>
                  <th>Description</th>
                </tr>
                <tr>
                  <td>GET /songs</td>
                  <td>Returns an array of all songs</td>
                </tr>
                <tr>
                  <td>GET /songs<b>?id=4</b></td>
                  <td>Returns song whose song ID == 4. This is an example of using <b>query paramaters</b>.</td>
                </tr>
                <tr>
                  <td>GET /songs<b>/4</b></td>
                  <td>Returns a song whose song ID == 4. This is an example of using <b>path parameters</b>.</td>
                </tr>
                <tr>
                  <td><b>POST</b> /songs<br>where <b>body = { "id": "4" }</b></td>
                  <td>Returns a song whose song ID == 4. This is an example of using a <b>JSON body</b> in a <b>POST request</b>.</td>
                </tr>
              </table>
            </h3>
          </div>
        </body>

        <footer>
          Created by: <a href="https://www.linkedin.com/in/lincoln-cheng/" target="_blank">Lincoln Cheng</a>
        </footer>
      </html>
    `).end();
    return null; // Found via #44
  }
}
