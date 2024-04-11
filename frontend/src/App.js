import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import AddAlbum from './pages/addAlbum'
import AddArtist from './pages/addArtist'
import AddSong from './pages/addSong'
import Albums from './pages/albums'
import Artists from './pages/artist'
import EditAlbum from './pages/editAlbum'
import EditArtist from './pages/editArtist'
import EditSong from './pages/editSong'
import Album from './pages/singleAlbum'
import Song from './pages/singleSong'
import Songs from './pages/songs'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Songs />} />
        <Route path='/addSong' element={<AddSong />} />
        <Route path='/editSong/:songId' element={<EditSong />} />
        <Route path='/viewSong/:songId' element={<Song />} />
        <Route path='/artist' element={<Artists />} />
        <Route path='/artist/addArtist' element={<AddArtist />} />
        <Route path='/artist/editArtist/:artistId' element={<EditArtist />} />
        <Route path='/albums' element={<Albums />} />
        <Route path='/albums/addAlbums' element={<AddAlbum />} />
        <Route path='/albums/editAlbum/:albumId' element={<EditAlbum />} />
        <Route path='/albums/viewAlbum/:albumId' element={<Album />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
