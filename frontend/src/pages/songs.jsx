import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import NavBar from '../components/navbar'
import { deleteSong, getSearchedSongs, getSongs } from '../services/songs'

function Songs() {
  const [Songs, setSongs] = useState([])
  const [Filter, setFilter] = useState()
  const [Keyword, setKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  // eslint-disable-next-line no-unused-vars
  const [itemsPerPage, setItemsPerPage] = useState(5)

  const loadSongs = async (Filter) => {
    const result = await getSongs(Filter)
    if (result) {
      setSongs(result)
    } else {
      toast.error('No song founds')
    }
  }

  // useEffect(() => {
  //   // Fetch data from the API
  //   fetch('https://localhost:7193/api/songs/GetSongs' + Filter)
  //     .then((response) => response.json())
  //     .then((data) => setSongs(data))
  //     .catch((error) => console.error(error))
  // }, [Songs])

  // Calculate total pages based on data length and items per page
  const totalPages = Math.ceil(Songs.length / itemsPerPage)

  // Calculate start and end index for current page
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  // Get current items for the current page
  const currentItems = Songs.slice(startIndex, endIndex)

  const onDelete = async (songId) => {
    const result = await deleteSong(songId)
    if (result) {
      toast.success('song deleted')
    } else {
      toast.error('Error')
    }
    loadSongs()
  }
  const onSearch = async () => {
    const result = Keyword
      ? await getSearchedSongs(Keyword)
      : await getSongs(Filter)
    if (result) {
      setSongs(result)
    } else {
      toast.error('No songs found')
    }
  }

  useEffect(() => {
    loadSongs()
  }, [Filter])
  return (
    <>
      <NavBar />
      <div className='row mt-5'>
        <div className='col'></div>
        <div className='col-10'>
          <div className='d-flex'>
            <Link to={'addSong'}>
              <div className='btn btn-secondary'>Add Song</div>
            </Link>
            <div className='ms-3 d-flex'>
              <select
                className='form-select form-select-sm'
                aria-label='.form-select-sm example'
                onChange={(e) => setFilter(e.target.value)}
              >
                <option defaultValue='Filter Songs'>Filter Songs</option>
                <option value='$orderby=SongTitle'>Title Ascending</option>
                <option value='$orderby=SongTitle desc'>
                  Title Descending
                </option>
                <option value='$orderby=SongYear'>Date Ascending </option>
                <option value='$orderby=SongYear desc'>Date Descending </option>
              </select>
              <button
                className='btn btn-outline-success btn-sm ms-3'
                onClick={(e) => loadSongs(Filter)}
              >
                Filter
              </button>
            </div>
            <div className='ms-3 d-flex'>
              <input
                class='form-control mr-sm-2'
                type='search'
                placeholder='Search Songs'
                aria-label='Search'
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button
                class='btn btn-outline-success ms-3 my-2 my-sm-0'
                type='submit'
                onClick={(e) => onSearch()}
              >
                Search
              </button>
            </div>
          </div>
          {currentItems.length > 0 ? (
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>Song Title</th>
                  <th>SongYear</th>
                  <th>SongGenre</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => {
                  return (
                    <tr>
                      <td>{item['songTitle']}</td>
                      <td>{item['songYear'].split('T')[0]}</td>
                      <td>{item['songGenre']}</td>
                      <td>
                        <Link to={`viewSong/${item.songId}`}>
                          <button className='btn btn-primary btn-sm me-1'>
                            View Song
                          </button>
                        </Link>
                        <button
                          onClick={() => onDelete(item.songId)}
                          className='btn btn-danger btn-sm me-1'
                        >
                          Delete Song
                        </button>
                        <Link to={`editSong/${item.songId}`}>
                          <button className='btn btn-success btn-sm me-1'>
                            Edit Song
                          </button>
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            <h2 className='mt-3 text-center'>No songs found</h2>
          )}
          <div className='d-flex justify-content-center mt-5'>
            <button
              className='btn btn-sm btn-outline-info me-3'
              onClick={() => setCurrentPage(currentPage - 1)}
              hidden={currentPage === 1}
              style={{ position: 'fixed', top: 450, left: 110 }}
            >
              Previous
            </button>
            <span style={{ position: 'fixed', top: 450, left: 600 }}>
              {totalPages === 0
                ? `Page 1 of 1`
                : `Page ${currentPage} of ${totalPages}`}
            </span>
            <button
              className='btn btn-sm btn-outline-info ms-3'
              onClick={() => setCurrentPage(currentPage + 1)}
              hidden={
                currentPage >= totalPages || (currentPage && totalPages === 0)
              }
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

export default Songs
