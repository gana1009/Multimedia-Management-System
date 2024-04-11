using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusicApp.Models;

namespace MusicApp.Controllers
{
    [Route("api/albums")]
    [ApiController]
    public class AlbumsController : Controller
    {
        IConfiguration _configuration;
        public AlbumsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet("GetAlbums")]
        public async Task<ActionResult<List<Album>>> GetAllAlbums()
        {
            try
            {
                using (MusicDatabaseContext context = new MusicDatabaseContext())
                {
                    var Albums = await context.Albums.ToListAsync();

                    return Ok(Albums);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }

        [HttpGet("GetAlbumById/{albumId}")]
        public async Task<ActionResult<List<Album>>> GetAlbumById(int albumId)
        {
            try
            {
                using (MusicDatabaseContext context = new MusicDatabaseContext())
                {
                    #region dynamic object
                    //var Album = (from album in context.Albums
                    //              join albumSong in context.AlbumSongsArtists on album.AlbumId equals albumSong.AlbumId
                    //              join song in context.Songs on albumSong.SongId equals song.SongId
                    //              join artist in context.Artists on song.ArtistId equals artist.ArtistId
                    //              where album.AlbumId == albumId
                    //              select new
                    //              {
                    //                  AlbumTitle = album.AlbumTitle,
                    //                  AlbumYear = album.AlbumYear,
                    //                  AlbumProducerName =album.AlbumProducerName,
                    //                  AlbumGenre =album.AlbumGenre,
                    //                  SongTitle = song.SongTitle,
                    //                  SongGenre =song.SongGenre,
                    //                  SongYear = song.SongYear,
                    //                  ArtistName = artist.ArtistName,
                    //                  ArtistCountry=artist.ArtistCountry,
                    //                  ArtistDOB = artist.ArtistDob
                    //              }).ToList();
                    #endregion
                    var Album = (from album in context.Albums
                                 where album.AlbumId == albumId
                                 select new
                                 {
                                     AlbumTitle = album.AlbumTitle,
                                     AlbumYear = album.AlbumYear,
                                     AlbumProducerName = album.AlbumProducerName,
                                     AlbumGenre = album.AlbumGenre,
                                     Songs = (from albumSong in context.AlbumSongsArtists
                                              join song in context.Songs on albumSong.SongId equals song.SongId
                                              join artist in context.Artists on song.ArtistId equals artist.ArtistId
                                              where albumSong.AlbumId == album.AlbumId
                                              select new
                                              {
                                                  SongId = song.SongId,
                                                  SongTitle = song.SongTitle,
                                                  SongGenre = song.SongGenre,
                                                  SongYear = song.SongYear,
                                                  ArtistName = artist.ArtistName,
                                                  ArtistCountry = artist.ArtistCountry,
                                                  ArtistDob = artist.ArtistDob

                                              }).ToList()
                                 }).SingleOrDefault();
                    return Ok(Album);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }

        [HttpPost("AddAlbum")]
        public async Task<ActionResult<Album>> AddAlbum(Album Album)
        {
            try
            {
                using (MusicDatabaseContext context = new MusicDatabaseContext())
                {

                    context.Albums.Add(Album);


                    context.SaveChanges();
                    return Ok("Album Added");
                }

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }


        [HttpPost("AddSong")]
        public async Task<ActionResult> AddSong(AlbumSongsArtist AlbumSongsArtist)
        {
            try
            {
                using (MusicDatabaseContext context = new MusicDatabaseContext())
                {

                    context.AlbumSongsArtists.Add(AlbumSongsArtist);
                    context.SaveChanges();
                    return Ok("AlbumSongs Added");
                }

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }

        [HttpPut("UpdateAlbum/{albumId}")]
        public async Task<ActionResult<Album>> UpdateAlbum(Album Album, int albumId)
        {
            try
            {
                using (MusicDatabaseContext context = new MusicDatabaseContext())
                {

                    var result = await context.Albums.FindAsync(albumId);

                    if (result == null)
                    {
                        return BadRequest("Album Not Found");
                    }
                    else
                    {
                        result.AlbumTitle = Album.AlbumTitle;
                        result.AlbumGenre = Album.AlbumGenre;
                        result.AlbumYear = Album.AlbumYear;
                        result.AlbumProducerName = Album.AlbumProducerName;
                        context.SaveChanges();
                    }
                    return Ok("Album updated");
                }

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }
        [HttpDelete("DeleteAlbum/{albumId}")]
        public async Task<ActionResult<Album>> DeleteAlbum(int albumId)
        {
            try
            {
                using (MusicDatabaseContext context = new MusicDatabaseContext())
                {

                    var result = await context.Albums.FindAsync(albumId);

                    if (result == null)
                    {
                        return BadRequest("Album Not Found");
                    }
                    else
                    {
                        context.Albums.Remove(result);

                        context.SaveChanges();
                    }
                    return Ok("Album Deleted");
                }

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }
        [HttpDelete("DeleteSongs")]
        public async Task<ActionResult<AlbumSongsArtist>> DeleteSongs(AlbumSongsArtist AlbumSongsArtist)
        {
            try
            {
                using (MusicDatabaseContext context = new MusicDatabaseContext())
                {
                    
                    var result = await context.AlbumSongsArtists.Where(e => e.AlbumId == AlbumSongsArtist.AlbumId && e.SongId == AlbumSongsArtist.SongId).FirstAsync();

                    if (result == null)
                    {
                        return BadRequest("AlbumSong Not Found");
                    }
                    else
                    {
                        context.AlbumSongsArtists.Remove(result);

                        context.SaveChanges();
                    }
                    return Ok("AlbumSong Deleted");
                }

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }
    }
}
