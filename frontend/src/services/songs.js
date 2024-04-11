import axios from 'axios'
import { createUrl } from '../utils'

export async function getSongs(keyword) {
  try {
    if (keyword === 'Filter Songs' || keyword == null) {
      var url = createUrl('songsOdata/GetSongs')
    } else {
      url = createUrl('songsOdata/GetSongs?' + keyword)
    }
    console.log(url)
    const response = await axios.get(url)
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}
export async function getSearchedSongs(keyword) {
  const url = createUrl('songsOdata/GetSongsBySearch?keyword=' + keyword)

  try {
    const response = await axios.get(url)
    console.log(response.data)
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function getSong(songId) {
  const url = createUrl('songsOdata/GetSongById/' + songId)
  try {
    console.log(url)
    const response = await axios.get(url)
    console.log(response.data)
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function addSong(songTitle, songYear, songGenre, artistId) {
  const url = createUrl('songsOdata/AddSong')
  const body = {
    songTitle,
    songYear,
    songGenre,
    artistId,
  }
  try {
    const response = await axios.post(url, body)
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function updateSong(
  songTitle,
  songYear,
  songGenre,
  artistId,
  songId
) {
  const url = createUrl('songsOdata/UpdateSong/' + songId)
  const body = {
    songTitle,
    songYear,
    songGenre,
    artistId,
  }
  try {
    console.log(url)
    const response = await axios.put(url, body)
    console.log(response.data)
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function deleteSong(songId) {
  const url = createUrl('songsOdata/DeleteSong/' + songId)
  try {
    console.log(url)
    const response = await axios.delete(url)
    console.log(response.data)
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}
