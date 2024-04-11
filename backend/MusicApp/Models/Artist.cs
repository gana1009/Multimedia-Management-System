using System;
using System.Collections.Generic;

namespace MusicApp.Models;

public partial class Artist
{
    public int ArtistId { get; set; }

    public string? ArtistName { get; set; }

    public string? ArtistCountry { get; set; }

    public DateTime? ArtistDob { get; set; }

    public virtual ICollection<Song> Songs { get; set; } = new List<Song>();
}
