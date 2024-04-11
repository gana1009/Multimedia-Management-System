using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Extensions;
using Microsoft.AspNetCore.OData.Formatter;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Results;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MusicApp.Models;
using System.Xml.Linq;

namespace MusicApp.Controllers
{
    [Route("api/songsOdata")]
    [ApiController]
    public class SongsOdataController : ODataController
    {
        IConfiguration _configuration;
        private readonly MusicDatabaseContext _context;


        public SongsOdataController(IConfiguration configuration, MusicDatabaseContext context)
        {
            _configuration = configuration;
            _context = context;

        }

        [HttpGet("GetSongs")]
        [EnableQuery]
        public IQueryable<Song> Get()
        {
            return _context.Songs;
        }

        //[HttpGet("GetSongsDemo")]
        //[EnableQuery]
        //public IActionResult Get()
        //{
        //    return Ok(_context.Songs.AsQueryable());
        //}

        //[HttpGet("GetSongs")]
        //[EnableQuery]
        //public  PageResult<Song> GetSongs(ODataQueryOptions<Song> options)
        //{
        //    ODataQuerySettings settings = new ODataQuerySettings()
        //    {
        //        PageSize = 3
        //    };
        //    IQueryable result = options.ApplyTo(_context.Songs.AsQueryable(), settings);
        //    var count = _context.Songs.Count();
        //    return new PageResult<Song>(
        //        result as IEnumerable<Song>,Request.GetNextPageLink(3, (object)options, null),count);
        //}


        [HttpGet("GetSongsBySearch")]
        [EnableQuery]
        public async Task<ActionResult<List<Song>>> GetSongBySearch([FromQuery]string keyword = "")
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
        [EnableQuery]
        public async Task<ActionResult> GetSongById([FromODataUri] int songId)
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
        [EnableQuery]
        public async Task<ActionResult<Song>> AddSong([FromBody] Song Song)
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


        [HttpPut("UpdateSong/{songId}")]
        [EnableQuery]
        public async Task<ActionResult<Song>> UpdateSong([FromBody] Song Song, int SongId)
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

        [HttpDelete("DeleteSong/{songId}")]
        [EnableQuery]
        public async Task<ActionResult<Song>> DeleteSong([FromODataUri] int songId)
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
