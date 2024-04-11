const config = {
  serverUrl: 'https://localhost:7193/api',
}

export function createUrl(path) {
  return `${config.serverUrl}/${path}`
}
