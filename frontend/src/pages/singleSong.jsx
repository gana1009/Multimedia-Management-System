import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import NavBar from '../components/navbar'
import { getSong } from '../services/songs'

function Song() {
  const { songId } = useParams()
  const [song, setSong] = useState(null)

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const result = await getSong(songId)
        if (result) {
          setSong(result)
        }
      } catch (error) {
        console.error('Error fetching Song:', error)
      }
    }

    fetchSong()
  }, [songId])

  return (
    <div>
      <NavBar />
      <div className='container'>
        <Link
          className='btn btn-dark mt-2'
          to='/'
          style={{ position: 'relative', top: '40px' }}
        >
          Back
        </Link>
        <div
          className='border rounded mt-5 d-flex justify-content-center'
          style={{ width: 500 }}
        >
          <div className='mt-3'>
            {song && (
              <>
                <h5 className='mt-3 text-center'>
                  <strong>Title:</strong> {song.songTitle}
                </h5>
                <div className='mt-3'>
                  <strong>Year:</strong> {song.songYear}
                </div>
                <div className='mt-3'>
                  <strong>Genre:</strong> {song.songGenre}
                </div>
                <div className='mt-3'>
                  <strong>Artist Name:</strong> {song.artistName}
                </div>
                <div className='mt-3'>
                  <strong>Artist Country: </strong>
                  {song.artistCountry}
                </div>
                <div className='mt-3 mb-3'>
                  <strong>Artist DOB: </strong>
                  {song.artistDob.split('T')[0]}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Song
