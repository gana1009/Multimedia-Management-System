import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import NavBar from '../components/navbar'
import { deleteAlbum } from '../services/albums'

function Albums() {
  const [Albums, setAlbums] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  // const loadAlbum = async () => {
  //   const result = await getAlbums()
  //   if (result.length > 0) {
  //     setAlbums(result)
  //   } else {
  //     toast.error('No album found founds')
  //   }
  // }
  useEffect(() => {
    // Fetch data from the API
    fetch('https://localhost:7193/api/albums/GetAlbums')
      .then((response) => response.json())
      .then((data) => setAlbums(data))
      .catch((error) => console.error(error))
  }, [Albums])

  // Calculate total pages based on data length and items per page
  const totalPages = Math.ceil(Albums.length / itemsPerPage)

  // Calculate start and end index for current page
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  // Get current items for the current page
  const currentItems = Albums.slice(startIndex, endIndex)

  const onDelete = async (albumId) => {
    const result = await deleteAlbum(albumId)
    if (result) {
      toast.success('Album deleted')
    } else {
      toast.error('Error')
    }
    // loadAlbum()
  }
  // useEffect(() => {
  //   loadAlbum()
  // }, [])

  return (
    <>
      <NavBar />
      <div className='row mt-5'>
        <div className='col'></div>
        <div className='col-10'>
          <Link to={'addAlbums'}>
            <div className='btn btn-secondary'>Add Album</div>
          </Link>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Album Title</th>
                <th>Album Year</th>
                <th>Album Genre</th>
                <th>Album Producer</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => {
                return (
                  <tr>
                    <td>{item['albumTitle']}</td>
                    <td>{item['albumYear'].split('T')[0]}</td>
                    <td>{item['albumGenre']}</td>
                    <td>{item['albumProducerName']}</td>
                    <td>
                      <Link to={`viewAlbum/${item.albumId}`}>
                        <button className='btn btn-primary btn-sm me-1'>
                          View Album
                        </button>
                      </Link>
                      <button
                        onClick={() => onDelete(item.albumId)}
                        className='btn btn-danger btn-sm me-1'
                      >
                        Delete Album
                      </button>
                      <Link to={`editAlbum/${item.albumId}`}>
                        <button className='btn btn-success btn-sm me-1'>
                          Edit Album
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

export default Albums
