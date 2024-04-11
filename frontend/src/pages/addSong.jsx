import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import NavBar from '../components/navbar'
import { getArtists } from '../services/artists'
import { addSong } from '../services/songs'

function AddSong() {
  const [Title, setTitle] = useState('')
  const [Year, setYear] = useState('')
  const [Genre, setGenre] = useState('')
  const [ArtistId, setArtistId] = useState('')
  const [artists, setArtist] = useState([])
  const navigate = useNavigate()

  const onCreate = async () => {
    if (Title.length === 0) {
      toast.warn('Please enter title')
    } else if (Year.length === 0) {
      toast.warn('Please enter Year')
    } else if (Genre.length === 0) {
      toast.warn('Please select Genre')
    } else if (ArtistId.length === 0) {
      toast.warn('Please enter ArtistId')
    } else {
      const result = await addSong(Title, Year, Genre, ArtistId)
      if (result) {
        toast.success('Successfully added a song')
        navigate('/')
      } else {
        toast.error(result['error'])
      }
    }
  }
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
  const onCancel = async () => {
    await navigate('/')
  }
  return (
    <>
      <NavBar />
      <div className='row mt-4  '>
        <h2 className='mb-5 text-center'>Add new Song</h2>
        <div className='col'></div>
        <div className='col-5 border border-dark rounded'>
          <div className='form m-5'>
            <div className='mb-3'>
              <label htmlFor=''>Title :</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type='text'
                className='form-control'
              />
            </div>
          </div>
          <div className='form m-5'>
            <div className='mb-3'>
              <label htmlFor=''>Year :</label>
              <input
                onChange={(e) => setYear(e.target.value)}
                type='date'
                className='form-control'
              />
            </div>
          </div>
          <div className='form m-5'>
            <div className='mb-3'>
              <label htmlFor=''>Genre :</label>
              <input
                onChange={(e) => setGenre(e.target.value)}
                type='text'
                className='form-control'
              />
            </div>
          </div>
          <div className='form m-5'>
            <div className='mb-3'>
              <label htmlFor=''>Artist:</label>
              <select
                onChange={(e) => setArtistId(e.target.value)}
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
          </div>
          <div className='mb-3'>
            <div className='mt-3 d-flex justify-content-around'>
              <button onClick={onCancel} className='btn btn-danger'>
                Cancel
              </button>
              <button onClick={onCreate} className='btn btn-dark'>
                Add Song
              </button>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </>
  )
}
export default AddSong
