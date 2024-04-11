import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import NavBar from '../components/navbar'
import { getAlbum, updateAlbum } from '../services/albums'

function EditAlbum() {
  const { albumId } = useParams()
  const [albumTitle, setAlbumTitle] = useState('')
  const [albumYear, setAlbumYear] = useState('')
  const [albumProducerName, setAlbumProducerName] = useState('')
  const [albumGenre, setAlbumGenre] = useState('')
  const navigate = useNavigate()

  const onUpdate = async () => {
    if (albumTitle.length === 0) {
      toast.warn('Please enter title')
    } else if (albumYear.length === 0) {
      toast.warn('Please enter Year')
    } else if (albumGenre.length === 0) {
      toast.warn('Please select Genre')
    } else if (albumProducerName.length === 0) {
      toast.warn('Please enter Producer Name')
    } else {
      const result = await updateAlbum(
        albumTitle,
        albumYear,
        albumProducerName,
        albumGenre,
        albumId
      )
      if (result) {
        toast.success('Successfully updated an album')
        navigate('/albums')
      } else {
        toast.error('Error updating album')
      }
    }
  }

  const loadAlbum = async () => {
    const result = await getAlbum(albumId)
    if (result) {
      setAlbumTitle(result.albumTitle)
      setAlbumYear(result.albumYear)
      setAlbumProducerName(result.albumProducerName)
      setAlbumGenre(result.albumGenre)
    } else {
      toast.error('Error fetching album')
    }
  }

  useEffect(() => {
    loadAlbum()
  }, [])

  const onCancel = () => {
    navigate('/albums')
  }

  return (
    <>
      <NavBar />
      <div className='row mt-4'>
        <h2 className='mb-5 text-center'>Update Album</h2>
        <div className='col'></div>
        <div className='col-5 border border-dark rounded'>
          <div className='form m-5'>
            <div className='mb-3'>
              <label htmlFor=''>Title:</label>
              <input
                onChange={(e) => setAlbumTitle(e.target.value)}
                type='text'
                value={albumTitle}
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>Year:</label>
              <input
                onChange={(e) => setAlbumYear(e.target.value)}
                type='date'
                value={albumYear.split('T')[0]}
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>Producer Name:</label>
              <input
                onChange={(e) => setAlbumProducerName(e.target.value)}
                type='text'
                value={albumProducerName}
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>Genre:</label>
              <input
                onChange={(e) => setAlbumGenre(e.target.value)}
                type='text'
                value={albumGenre}
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
                Update Album
              </button>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </>
  )
}
export default EditAlbum
