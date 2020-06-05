export const getUrls = async () => {
  return await fetch('http://localhost:3001/api/v1/urls')
    .then(response => response.json())
}

export const addUrl = async (newUrl) => {
  return await fetch('http://localhost:3001/api/v1/urls',
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

export const deleteUrl = async (id) => {
  return await fetch('http://localhost:3001/api/v1/urls/'+id, {
    method: 'DELETE'
  })
}
