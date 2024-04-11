using System;
using System.Collections.Generic;

namespace MusicApp.Models;

public partial class Song
{
    public int SongId { get; set; }

    public string? SongTitle { get; set; }

    public DateTime? SongYear { get; set; }

    public string? SongGenre { get; set; }

    public int? ArtistId { get; set; }

    public virtual ICollection<AlbumSongsArtist> AlbumSongsArtists { get; set; } = new List<AlbumSongsArtist>();

    public virtual Artist? Artist { get; set; }
}
