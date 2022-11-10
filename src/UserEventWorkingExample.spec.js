import React, { useState } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const api = () =>
  new Promise((resolve) => {
    // but a real API will not use timeouts!
    // this means we are relying on javascript capabilities that
    // are not actually present in the source code, but are in the tests!
    // timeouts and promises use different queues etc.
    // this fact has made tests relying on timeouts and even worse mock timeout mechanisms extremely
    // difficult to maintain
    // ----
    // but anyway, this is how you need to mock your api client calls
    setTimeout(() => {
      resolve('Data')
    })
  })

export default function App() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  async function onClickGetData() {
    try {
      setLoading(true)
      const data = await api()
      setData(data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {loading ? 'Loading' : data ? 'Data' : null}
      <button onClick={onClickGetData}>Get Data</button>
    </div>
  )
}

describe('App', () => {
  it('should show loading state while data is being fetched', async () => {
    render(<App />)
    await userEvent.click(screen.getByText('Get Data'))
    expect(screen.getByText('Loading')).toBeInTheDocument()
    expect(await screen.findByText('Data')).toBeInTheDocument()
  })
})
