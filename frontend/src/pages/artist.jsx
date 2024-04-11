import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import NavBar from '../components/navbar'
import { deleteArtist } from '../services/artists'

function Artists() {
  const [Artists, setArtists] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  // const loadArtists = async () => {
  //   const result = await getArtists()
  //   if (result) {
  //     setArtists(result)
  //   } else {
  //     toast.error('No artist founds')
  //   }
  // }

  useEffect(() => {
    // Fetch data from the API
    fetch('https://localhost:7193/api/artist/GetArtists')
      .then((response) => response.json())
      .then((data) => setArtists(data))
      .catch((error) => console.error(error))
  }, [Artists])

  // Calculate total pages based on data length and items per page
  const totalPages = Math.ceil(Artists.length / itemsPerPage)

  // Calculate start and end index for current page
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  // Get current items for the current page
  const currentItems = Artists.slice(startIndex, endIndex)

  const onDelete = async (artistId) => {
    const result = await deleteArtist(artistId)
    if (result) {
      toast.success('Artist deleted')
    } else {
      toast.error('Error')
    }
    // loadArtists()
  }
  // useEffect(() => {
  //   loadArtists()
  // }, [])

  return (
    <>
      <NavBar />
      <div className='row mt-5'>
        <div className='col'></div>
        <div className='col-10'>
          <Link to={'addArtist'}>
            <div className='btn btn-secondary'>Add Artist</div>
          </Link>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Artist Name</th>
                <th>Artist DOB</th>
                <th>Artist Country</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => {
                return (
                  <tr>
                    <td>{item['artistName']}</td>
                    <td>{item['artistDob'].split('T')[0]}</td>
                    <td>{item['artistCountry']}</td>
                    <td>
                      <button
                        onClick={() => onDelete(item.artistId)}
                        className='btn btn-danger btn-sm me-1'
                      >
                        Delete Artist
                      </button>
                      <Link to={`editArtist/${item.artistId}`}>
                        <button className='btn btn-primary btn-sm me-1'>
                          Edit Artist
                        </button>
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className='d-flex justify-content-center mt-5'>
            <button
              className='btn btn-sm btn-outline-info me-3'
              onClick={() => setCurrentPage(currentPage - 1)}
              hidden={currentPage === 1}
              style={{ position: 'fixed', top: 450, left: 110 }}
            >
              Previous
            </button>
            <span
              style={{ position: 'fixed', top: 450, left: 600 }}
            >{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              className='btn btn-sm btn-outline-info ms-3'
              onClick={() => setCurrentPage(currentPage + 1)}
              hidden={currentPage === totalPages}
              style={{ position: 'fixed', top: 450, left: 1100 }}
            >
              Next
            </button>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </>
  )
}

export default Artists
