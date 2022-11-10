import React, { useEffect, useState } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

const api = jest.fn(() => Promise.resolve('Data'))

function App() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const data = await api()
        setData(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return loading ? 'Loading' : data ? 'Data' : error ? 'Error' : null
}

describe('App', () => {
  it('should show loading state while data is being fetched', async () => {
    render(<App />)
    expect(screen.getByText('Loading')).toBeInTheDocument()
    expect(await screen.findByText('Data')).toBeInTheDocument()
  })

  it('should show error when API fails', async () => {
    api.mockImplementationOnce(
      () =>
        new Promise((resolve, reject) => {
          reject(new Error())
        })
    )
    render(<App />)
    expect(screen.getByText('Loading')).toBeInTheDocument()
    expect(await screen.findByText('Error')).toBeInTheDocument()
  })
})
