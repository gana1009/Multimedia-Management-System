using System;
using System.Collections.Generic;

namespace MusicApp.Models;

public partial class Album
{
    public int AlbumId { get; set; }

    public string? AlbumTitle { get; set; }

    public DateTime? AlbumYear { get; set; }

    public string? AlbumProducerName { get; set; }

    public string? AlbumGenre { get; set; }

    public virtual ICollection<AlbumSongsArtist> AlbumSongsArtists { get; set; } = new List<AlbumSongsArtist>();
}
