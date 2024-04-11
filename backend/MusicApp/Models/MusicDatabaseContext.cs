using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MusicApp.Models;

public partial class MusicDatabaseContext : DbContext
{
    public MusicDatabaseContext()
    {
    }

    public MusicDatabaseContext(DbContextOptions<MusicDatabaseContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Album> Albums { get; set; }

    public virtual DbSet<AlbumSongsArtist> AlbumSongsArtists { get; set; }

    public virtual DbSet<Artist> Artists { get; set; }

    public virtual DbSet<Song> Songs { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=PUN-NB-LED676M\\SQLEXPRESS;Initial Catalog= MusicDatabase;Integrated Security=SSPI; TrustServerCertificate = True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Album>(entity =>
        {
            entity.HasKey(e => e.AlbumId).HasName("PK__Albums__97B4BE370F2CE2E5");

            entity.Property(e => e.AlbumGenre)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.AlbumProducerName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.AlbumTitle)
                .HasMaxLength(60)
                .IsUnicode(false);
            entity.Property(e => e.AlbumYear).HasColumnType("date");
        });

        modelBuilder.Entity<AlbumSongsArtist>(entity =>
        {
            entity.HasKey(e => e.AlbumSongs).HasName("PK__AlbumSon__EF255F68521080C9");

            entity.HasOne(d => d.Album).WithMany(p => p.AlbumSongsArtists)
                .HasForeignKey(d => d.AlbumId)
                .HasConstraintName("FK__AlbumSong__Album__5070F446");

            entity.HasOne(d => d.Song).WithMany(p => p.AlbumSongsArtists)
                .HasForeignKey(d => d.SongId)
                .HasConstraintName("FK__AlbumSong__SongI__5165187F");
        });

        modelBuilder.Entity<Artist>(entity =>
        {
            entity.HasKey(e => e.ArtistId).HasName("PK__Artists__25706B505177F8EA");

            entity.Property(e => e.ArtistCountry)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ArtistDob)
                .HasColumnType("date")
                .HasColumnName("ArtistDOB");
            entity.Property(e => e.ArtistName)
                .HasMaxLength(40)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Song>(entity =>
        {
            entity.HasKey(e => e.SongId).HasName("PK__Songs__12E3D6970EBAC307");

            entity.Property(e => e.SongGenre)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.SongTitle)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.SongYear).HasColumnType("date");

            entity.HasOne(d => d.Artist).WithMany(p => p.Songs)
                .HasForeignKey(d => d.ArtistId)
                .HasConstraintName("FK__Songs__ArtistId__4D94879B");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
