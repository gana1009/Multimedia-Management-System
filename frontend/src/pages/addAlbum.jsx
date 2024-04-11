import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import NavBar from '../components/navbar'
import { addAlbum } from '../services/albums'

function AddAlbum() {
  const [Title, setTitle] = useState('')
  const [Year, setYear] = useState('')
  const [Producer, setProducer] = useState('')
  const [Genre, setGenre] = useState('')
  const navigate = useNavigate()

  const onCreate = async () => {
    if (Title.length == 0) {
      toast.warn('Please enter title')
    } else if (Year.length == 0) {
      toast.warn('Please enter Year')
    } else if (Genre.length == 0) {
      toast.warn('Please select Genre')
    } else if (Producer.length == 0) {
      toast.warn('Please enter ArtistId')
    } else {
      const result = await addAlbum(Title, Year, Producer, Genre)
      if (result) {
        toast.success('Successfully added a album')
        navigate('/albums')
      } else {
        toast.error('error')
      }
    }
  }
  const onCancel = async () => {
    await navigate('/albums')
  }
  return (
    <>
      <NavBar />
      <div className='row mt-4  '>
        <h2 className='mb-5 text-center'>Add new Album</h2>
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
              <label htmlFor=''>Producer :</label>
              <input
                onChange={(e) => setProducer(e.target.value)}
                type='text'
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
          <div className='mb-3'>
            <div className='mt-3 d-flex justify-content-around'>
              <button onClick={onCancel} className='btn btn-danger'>
                Cancel
              </button>
              <button onClick={onCreate} className='btn btn-dark'>
                Add Album
              </button>
            </div>
          </div>

          <div className='col'></div>
        </div>
        <div className='col'></div>
      </div>
    </>
  )
}
export default AddAlbum
