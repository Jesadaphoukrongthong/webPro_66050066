const API_URL = 'http://localhost:3001/products'

async function parseResponse(response) {
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export async function getProducts() {
  const response = await fetch(API_URL)
  return parseResponse(response)
}

export async function createProduct(product) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })

  return parseResponse(response)
}

export async function updateProduct(id, product) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })

  return parseResponse(response)
}

export async function deleteProduct(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  return parseResponse(response)
}
