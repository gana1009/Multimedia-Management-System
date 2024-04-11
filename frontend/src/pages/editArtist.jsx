import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import NavBar from '../components/navbar'
import { getArtist, updateArtist } from '../services/artists'

function EditArtist() {
  const { artistId } = useParams()
  const [artistName, setArtistName] = useState('')
  const [artistDob, setArtistDob] = useState('')
  const [artistCountry, setArtistCountry] = useState('')
  const navigate = useNavigate()

  const onUpdate = async () => {
    if (artistName.length === 0) {
      toast.warn('Please enter title')
    } else if (artistDob.length === 0) {
      toast.warn('Please enter Year')
    } else if (artistCountry.length === 0) {
      toast.warn('Please select Genre')
    } else {
      console.log(artistId)
      const result = await updateArtist(
        artistName,
        artistDob,
        artistCountry,
        artistId
      )
      if (result) {
        toast.success('Successfully updated a Artist')
        navigate('/artist')
      } else {
        toast.error('Error updating artist')
      }
    }
  }

  const loadArtist = async () => {
    const result = await getArtist(artistId)
    if (result) {
      setArtistName(result.artistName)
      setArtistDob(result.artistDob)
      setArtistCountry(result.artistCountry)
    } else {
      toast.error('Error fetching artist')
    }
  }
  useEffect(() => {
    loadArtist()
  }, [])

  const onCancel = () => {
    navigate('/artist')
  }

  return (
    <>
      <NavBar />
      <div className='row mt-4'>
        <h2 className='mb-5 text-center'>Update Artist</h2>{' '}
        <div className='col'></div>
        <div className='col-5 border border-dark rounded'>
          <div className='form m-5'>
            <div className='mb-3'>
              <label htmlFor=''>Title:</label>
              <input
                onChange={(e) => setArtistName(e.target.value)}
                type='text'
                value={artistName}
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>Year:</label>
              <input
                onChange={(e) => setArtistDob(e.target.value)}
                type='date'
                value={artistDob ? artistDob.split('T')[0] : ''}
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>Genre:</label>
              <input
                onChange={(e) => setArtistCountry(e.target.value)}
                type='text'
                value={artistCountry}
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
                Update Artist
              </button>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </>
  )
}
export default EditArtist
