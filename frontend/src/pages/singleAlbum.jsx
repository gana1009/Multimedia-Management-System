import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import NavBar from '../components/navbar'
import {
  addSongToAlbum,
  deleteSongFromAlbum,
  getAlbum,
} from '../services/albums'
import { getSongs } from '../services/songs'

function Album() {
  const { albumId } = useParams()
  const [album, setAlbum] = useState(null)
  const [songs, setSongs] = useState([])
  const [addSong, setAddSong] = useState('')
  const fetchSongs = async () => {
    try {
      const res = await getSongs()
      if (res) {
        setSongs(res)
      }
    } catch (error) {
      console.error('Error fetching songs:', error)
    }
  }
  const fetchAlbum = async () => {
    try {
      const result = await getAlbum(albumId)
      if (result) {
        setAlbum(result)
      }
    } catch (error) {
      console.error('Error fetching Album:', error)
    }
  }

  useEffect(() => {
    fetchAlbum()
    fetchSongs()
  }, [albumId])

  const onAddSong = async () => {
    try {
      console.log(addSong, albumId)
      const result = await addSongToAlbum(albumId, addSong)
      if (result) {
        window.location.reload()
        toast.success('Song added to album')
      }
    } catch (error) {
      console.error('Error fetching Album:', error)
    }
  }
  const onDelete = async (songId) => {
    try {
      const albumID = parseInt(albumId)
      const result = await deleteSongFromAlbum(songId, albumID)
      if (result) {
        window.location.reload()
        toast.success('Song deleted from album')
      }
    } catch (error) {
      console.error('Error fetching Album:', error)
    }
  }

  return (
    <div>
      <NavBar />
      <div className='container'>
        <Link
          className='btn btn-dark mt-2'
          to='/albums'
          style={{ position: 'relative', top: '40px' }}
        >
          Back
        </Link>
        {album && ( // Conditionally render if album exists
          <div className='border mt-5 d-flex justify-content-center'>
            <div className='mt-3'>
              <h5 className='mt-3 text-center'>Title: {album['albumTitle']}</h5>
              <div className='mt-3'>
                <strong>Year:</strong> {album['albumYear'].split('T')[0]}
              </div>
              <div className='mt-3'>
                <strong>Producer: </strong>
                {album['albumProducerName']}
              </div>
              <div className='mt-3'>
                <strong>Genre:</strong> {album['albumGenre']}
              </div>
              <div className='mt-3 d-flex'>
                <label htmlFor=''>
                  <strong>Add song to album:</strong>
                </label>
                <select
                  onChange={(e) => setAddSong(e.target.value)}
                  className='form-control ms-3'
                  style={{ width: 400 }}
                >
                  <option value=''>Select Song</option>
                  {songs.map((song) => {
                    return <option value={song.songId}>{song.songTitle}</option>
                  })}
                </select>
                <button onClick={onAddSong} className='btn btn-success ms-3'>
                  Add song
                </button>
              </div>
              <div className='mt-3'>
                <table className='table table-striped border'>
                  <thead>
                    <tr>
                      <th>Song Title</th>
                      <th>Song Genre</th>
                      <th>Artist Name</th>
                      <th>Song Year</th>
                      <th>Artist Country</th>
                      <th>Acion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {album &&
                      album['songs'] &&
                      album['songs'].map((item) => {
                        return (
                          <tr key={item.songId}>
                            <td>{item.songTitle}</td>
                            <td>{item.songGenre}</td>
                            <td>{item.artistName}</td>
                            <td>{item.songYear.split('T')[0]}</td>
                            <td>{item.artistCountry}</td>
                            <td>
                              <button
                                className='btn btn-danger'
                                onClick={() => onDelete(item.songId)}
                              >
                                Delete from Album
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Album
