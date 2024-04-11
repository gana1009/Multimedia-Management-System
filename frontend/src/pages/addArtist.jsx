import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import NavBar from '../components/navbar'
import { addArtist } from '../services/artists'

function AddArtist() {
  const [Name, setName] = useState('')
  const [DOB, setDOB] = useState('')
  const [Country, setCountry] = useState('')
  const navigate = useNavigate()

  const onCreate = async () => {
    if (Name.length == 0) {
      toast.warn('Please enter Name')
    } else if (DOB.length == 0) {
      toast.warn('Please enter DOB')
    } else if (Country.length == 0) {
      toast.warn('Please select Country')
    } else {
      const result = await addArtist(Name, DOB, Country)
      if (result) {
        toast.success('Successfully added a artist')
        navigate('/artist')
      } else {
        toast.error(result['error'])
      }
    }
  }
  const onCancel = async () => {
    await navigate('/artist')
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
              <label htmlFor=''>Name :</label>
              <input
                onChange={(e) => setName(e.target.value)}
                type='text'
                className='form-control'
              />
            </div>
          </div>
          <div className='form m-5'>
            <div className='mb-3'>
              <label htmlFor=''>Date of Birth :</label>
              <input
                onChange={(e) => setDOB(e.target.value)}
                type='date'
                className='form-control'
              />
            </div>
          </div>
          <div className='form m-5'>
            <div className='mb-3'>
              <label htmlFor=''>Country :</label>
              <input
                onChange={(e) => setCountry(e.target.value)}
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
                Add Artist
              </button>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </>
  )
}
export default AddArtist
