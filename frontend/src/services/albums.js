import axios from 'axios'
import { createUrl } from '../utils'
export async function getAlbums() {
  const url = createUrl('albums/GetAlbums')

  try {
    const response = await axios.get(url)
    console.log(response.data)
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function getAlbum(albumId) {
  const url = createUrl('albums/GetAlbumById/' + albumId)
  console.log(url)
  try {
    const response = await axios.get(url)
    console.log(response.data)
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function addAlbum(
  albumTitle,
  albumYear,
  albumProducerName,
  albumGenre
) {
  const url = createUrl('albums/AddAlbum')
  const body = {
    albumTitle,
    albumYear,
    albumProducerName,
    albumGenre,
  }
  try {
    const response = await axios.post(url, body)
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function updateAlbum(
  albumTitle,
  albumYear,
  albumProducerName,
  albumGenre,
  albumId
) {
  const url = createUrl('albums/UpdateAlbum/' + albumId)
  const body = {
    albumTitle,
    albumYear,
    albumProducerName,
    albumGenre,
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

export async function deleteAlbum(albumId) {
  const url = createUrl('albums/DeleteAlbum/' + albumId)
  try {
    console.log(url)
    const response = await axios.delete(url)
    console.log(response.data)
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function addSongToAlbum(albumId, songId) {
  const url = createUrl('albums/AddSong')
  const body = {
    albumId,
    songId,
  }
  try {
    console.log(body)
    const response = await axios.post(url, body)
    console.log(response.data)
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}
export async function deleteSongFromAlbum(songId, albumId) {
  const url = createUrl('albums/DeleteSongs')
  const body = {
    albumId,
    songId,
  }
  try {
    const response = await axios.delete(url, {
      data: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(response.data)
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}
