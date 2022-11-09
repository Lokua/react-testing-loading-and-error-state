import { useEffect, useState } from 'react'
import { getData } from './api'

export default function App() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const data = await getData()
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
