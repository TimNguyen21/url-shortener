export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
    .then(response => response.json())
}

export const addUrl = (newUrl) => {
  return fetch('http://localhost:3001/api/v1/urls',
    {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({long_url: newUrl.urlToShorten, title: newUrl.title}),
    }
  )
    .then(response => response.json())
}
