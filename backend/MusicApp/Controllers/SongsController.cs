using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.EntityFrameworkCore;
using MusicApp.Models;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Serialization;

namespace MusicApp.Controllers
{
    [Route("api/songs")]
    [ApiController]
    public class SongsController : Controller
    {
        private readonly ILogger<SongsController> _logger;
        IConfiguration _configuration;
        public SongsController(IConfiguration configuration, ILogger<SongsController> logger)
        {
            _configuration = configuration;
            _logger = logger;

        }
        [HttpGet("GetSongs")]
        public async Task<ActionResult<List<Song>>> GetAllSongs()
        {
            try
            {
                using (MusicDatabaseContext context = new MusicDatabaseContext())
                {
                    var Songs = await context.Songs.ToListAsync();
                    return Ok(Songs);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }
        [HttpGet("GetSongsBySearch")]
        public async Task<ActionResult<List<Song>>> GetSongBySearch(string keyword = "")
        {
            try
            {
                using (MusicDatabaseContext context = new MusicDatabaseContext())
                {
                    var Songs = (from sng in context.Songs
                                 join arts in context.Artists on sng.ArtistId equals arts.ArtistId
                                 where sng.SongTitle.ToLower().Contains(keyword.ToLower())
                                 select new
                                 {
                                     SongId = sng.SongId,
                                     SongTitle = sng.SongTitle,
                                     SongYear = sng.SongYear,
                                     SongGenre = sng.SongGenre,
                                     ArtistId = sng.ArtistId,
                                     ArtistName = arts.ArtistName,
                                     ArtistCountry = arts.ArtistCountry,
                                     ArtistDob = arts.ArtistDob

                                 }).ToList();
                    return Ok(Songs);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }

        [HttpGet("GetSongById/{songId}")]
        public async Task<ActionResult> GetSongById(int songId)
        {
            try
            {
                using (MusicDatabaseContext context = new MusicDatabaseContext())
                {
                    var Songs = (from sng in context.Songs
                                 join arts in context.Artists on sng.ArtistId equals arts.ArtistId
                                 where sng.SongId == songId
                                 select new
                                 {
                                     SongId = sng.SongId,
                                     SongTitle = sng.SongTitle,
                                     SongYear = sng.SongYear,
                                     SongGenre = sng.SongGenre,
                                     ArtistId = sng.ArtistId,
                                     ArtistName = arts.ArtistName,
                                     ArtistCountry = arts.ArtistCountry,
                                     ArtistDob = arts.ArtistDob

                                 }).ToList();
                    return Ok(Songs[0]);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }

        [HttpPost("AddSong")]
        public async Task<ActionResult<Song>> AddSong(Song Song)
        {
            try
            {
                using (MusicDatabaseContext context = new MusicDatabaseContext())
                {

                    context.Songs.Add(Song);
                    context.SaveChanges();
                    return Ok("Song Added");
                }

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }

        [HttpPost("AddSongXML")]
        public async Task<IActionResult> AddSong_XMLAsync()
        {
            try
            {
                using (StreamReader reader = new StreamReader(Request.Body))
                {
                    string xmlData = await reader.ReadToEndAsync();

                    var xmlSong = XElement.Parse(xmlData);

                    string songTitle = xmlSong.Element("SongTitle")?.Value;
                    DateTime songYear = DateTime.Parse(xmlSong.Element("SongYear")?.Value);
                    string songGenre = xmlSong.Element("SongGenre")?.Value;
                    int artistId = int.Parse(xmlSong.Element("ArtistId")?.Value);

                    var song = new Song
                    {
                        SongTitle = songTitle,
                        SongYear = songYear,
                        SongGenre = songGenre,
                        ArtistId = artistId
                    };

                    using (MusicDatabaseContext context = new MusicDatabaseContext())
                    {
                        context.Songs.Add(song);
                        await context.SaveChangesAsync();
                    }

                    return Ok("Song Added");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while processing the AddSong_XMLAsync request.");

                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request. Please try again later.");
            }

        }


        [HttpPut("UpdateSong/{songId}")]
        public async Task<ActionResult<Song>> UpdateSong(Song Song, int SongId)
        {
            try
            {
                using (MusicDatabaseContext context = new MusicDatabaseContext())
                {

                    var result = await context.Songs.FindAsync(SongId);

                    if (result == null)
                    {
                        return BadRequest("Song Not Found");
                    }
                    else
                    {
                        result.SongTitle = Song.SongTitle;
                        result.SongGenre = Song.SongGenre;
                        result.SongYear = Song.SongYear;
                        result.ArtistId = Song.ArtistId;
                        context.SaveChanges();
                    }
                    return Ok("Song updated");
                }

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }

        [HttpPut("UpdateSongXML/{songId}")]
        public async Task<IActionResult> UpdateSong_XMLAsync(int songId)
        {
            try
            {
                using (StreamReader reader = new StreamReader(Request.Body))
                {
                    string xmlData = await reader.ReadToEndAsync();

                    var xmlSong = XElement.Parse(xmlData);

                    string songTitle = xmlSong.Element("SongTitle").Value;
                    DateTime songYear = DateTime.Parse(xmlSong.Element("SongYear").Value);
                    string songGenre = xmlSong.Element("SongGenre").Value;
                    int artistId = int.Parse(xmlSong.Element("ArtistId").Value);

                    using (MusicDatabaseContext context = new MusicDatabaseContext())
                    {
                        var song = await context.Songs.FindAsync(songId);
                        if (song == null)
                        {
                            return NotFound();
                        }

                        song.SongTitle = songTitle;
                        song.SongYear = songYear;
                        song.SongGenre = songGenre;
                        song.ArtistId = artistId;

                        await context.SaveChangesAsync();
                    }

                    return Ok("Song updated successfully!");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }

        [HttpDelete("DeleteSong/{songId}")]
        public async Task<ActionResult<Song>> DeleteSong(int songId)
        {
            try
            {
                using (MusicDatabaseContext context = new MusicDatabaseContext())
                {

                    var result = await context.Songs.FindAsync(songId);

                    if (result == null)
                    {
                        return BadRequest("Song Not Found");
                    }
                    else
                    {
                        context.Songs.Remove(result);

                        context.SaveChanges();
                    }
                    return Ok("Song Deleted");
                }

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }
    }
}
    