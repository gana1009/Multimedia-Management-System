import axios from 'axios'
import { createUrl } from '../utils'
export async function getArtists() {
  const url = createUrl('artist/GetArtists')

  try {
    const response = await axios.get(url)
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function getArtist(artistId) {
  const url = createUrl('artist/GetArtistsById/' + artistId)

  try {
    const response = await axios.get(url)
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function addArtist(artistName, artistDob, artistCountry) {
  const url = createUrl('artist/AddArtist')
  const body = {
    artistName,
    artistDob,
    artistCountry,
  }
  try {
    const response = await axios.post(url, body)
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function updateArtist(
  artistName,
  artistDob,
  artistCountry,
  artistId
) {
  console.log(artistId)
  const url = createUrl('artist/UpdateArtist/' + artistId)
  const body = {
    artistName,
    artistDob,
    artistCountry,
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

export async function deleteArtist(artistsId) {
  const url = createUrl('artist/DeleteArtist/' + artistsId)
  try {
    console.log(url)
    const response = await axios.delete(url)
    console.log(response.data)
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}
