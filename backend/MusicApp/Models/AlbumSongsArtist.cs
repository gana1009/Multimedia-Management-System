using System;
using System.Collections.Generic;

namespace MusicApp.Models;

public partial class AlbumSongsArtist
{
    public int AlbumSongs { get; set; }

    public int? AlbumId { get; set; }

    public int? SongId { get; set; }

    public virtual Album? Album { get; set; }

    public virtual Song? Song { get; set; }
}
