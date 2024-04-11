using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusicApp.Models;

namespace MusicApp.Controllers
{
    [Route("api/artist")]
    [ApiController]
    public class ArtistsController : Controller
    {
        IConfiguration _configuration;
        public ArtistsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("GetArtists")]
        public async Task<ActionResult<List<Artist>>> GetAllArtists()
        {
            try
            {
                using (MusicDatabaseContext context = new MusicDatabaseContext())
                {
                    var artists = await context.Artists.ToListAsync();

                    return Ok(artists);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }
        [HttpGet("GetArtistsById/{artistId}")]
        public async Task<ActionResult<Artist>> GetAllArtistById(int artistId)
        {
            try
            {
                using (MusicDatabaseContext context = new MusicDatabaseContext())
                {
                    var result = await context.Artists.FindAsync(artistId);

                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }
        [HttpPost("AddArtist")]
        public async Task<ActionResult<Artist>> AddArtist(Artist artist)
        {
            try
            {
                using (MusicDatabaseContext context = new MusicDatabaseContext())
                {

                    context.Artists.Add(artist);


                    context.SaveChanges();
                    return Ok("Artist Added");
                }

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }
        [HttpPut("UpdateArtist/{artistId}")]
        public async Task<ActionResult<Artist>> UpdateArtist(Artist artist, int artistId)
        {
            try
            {
                using (MusicDatabaseContext context = new MusicDatabaseContext())
                {

                    var result = await context.Artists.FindAsync(artistId);

                    if (result == null)
                    {
                        return BadRequest("Artiest Not Found");
                    }
                    else
                    {
                        result.ArtistName = artist.ArtistName;
                        result.ArtistCountry = artist.ArtistCountry;
                        result.ArtistDob = artist.ArtistDob;

                        context.SaveChanges();
                    }
                    return Ok("Artiest updated");
                }

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }
        [HttpDelete("DeleteArtist/{artistId}")]
        public async Task<ActionResult<Artist>> DeleteArtist(int artistId)
        {
            try
            {
                using (MusicDatabaseContext context = new MusicDatabaseContext())
                {

                    var result = await context.Artists.FindAsync(artistId);

                    if (result == null)
                    {
                        return BadRequest("Artiest Not Found");
                    }
                    else
                    {
                        context.Artists.Remove(result);

                        context.SaveChanges();
                    }
                    return Ok("Artiest Deleted");
                }

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }
    }
}
