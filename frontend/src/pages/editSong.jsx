import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import NavBar from '../components/navbar'
import { getArtists } from '../services/artists'
import { getSong, updateSong } from '../services/songs'

function EditSong() {
  const { songId } = useParams()
  const [songTitle, setSongTitle] = useState('')
  const [songYear, setSongYear] = useState('')
  const [artistId, setSongArtistId] = useState('')
  const [songGenre, setSongGenre] = useState('')
  const [artists, setArtist] = useState([])

  const navigate = useNavigate()

  const onUpdate = async () => {
    if (songTitle.length === 0) {
      toast.warn('Please enter title')
    } else if (songYear.length === 0) {
      toast.warn('Please enter Year')
    } else if (songGenre.length === 0) {
      toast.warn('Please select Genre')
    } else if (artistId.length === 0) {
      toast.warn('Please enter Artist id')
    } else {
      const result = await updateSong(
        songTitle,
        songYear,
        songGenre,
        artistId,
        songId
      )
      if (result) {
        toast.success('Successfully updated a song')
        navigate('/')
      } else {
        toast.error('Error updating song')
      }
    }
  }

  const loadSong = async () => {
    console.log(songId)
    const result = await getSong(songId)
    if (result) {
      setSongTitle(result.songTitle)
      setSongYear(result.songYear)
      setSongArtistId(result.artistId)
      setSongGenre(result.songGenre)
    } else {
      toast.error('Error fetching song')
    }
  }
  useEffect(() => {
    loadSong()
  }, [])
  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const res = await getArtists()
        if (res) {
          console.log(res)
          setArtist(res)
        }
      } catch (error) {
        console.error('Error fetching songs:', error)
      }
    }

    fetchArtist()
  }, [])
  const onCancel = () => {
    navigate('/')
  }

  return (
    <>
      <NavBar />
      <div className='row mt-4'>
        <h2 className='mb-5 text-center'>Update Song</h2>{' '}
        <div className='col'></div>
        <div className='col-5 border border-dark rounded'>
          <div className='form m-5'>
            <div className='mb-3'>
              <label htmlFor=''>Title:</label>
              <input
                onChange={(e) => setSongTitle(e.target.value)}
                type='text'
                value={songTitle}
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>Year:</label>
              <input
                onChange={(e) => setSongYear(e.target.value)}
                type='date'
                value={songYear.split('T')[0]}
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>Artist:</label>
              <select
                onChange={(e) => setSongArtistId(e.target.value)}
                className='form-control ms-3'
                style={{ width: 400 }}
              >
                <option value=''>Select Artist</option>
                {artists.map((artist) => {
                  return (
                    <option value={artist.artistId}>{artist.artistName}</option>
                  )
                })}
              </select>
            </div>
            <div className='mb-3'>
              <label htmlFor=''>Genre:</label>
              <input
                onChange={(e) => setSongGenre(e.target.value)}
                type='text'
                value={songGenre}
                className='form-control'
              />
            </div>
          </div>
          <div className='mb-3'>
            <div className='mt-3 d-flex justify-content-around'>
              <button onClick={onCancel} className='btn btn-danger'>
                Cancel
              </button>
              <button onClick={onUpdate} className='btn btn-dark'>
                Update Song
              </button>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </>
  )
}
export default EditSong
