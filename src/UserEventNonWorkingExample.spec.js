import React, { useState } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const api = () => Promise.resolve('Data')

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

xdescribe('UserEventNonWorkingExample', () => {
  it('should show loading state while data is being fetched', async () => {
    render(<App />)
    await userEvent.click(screen.getByText('Get Data'))
    // fails here unless our mock API uses a timeout
    expect(screen.getByText('Loading')).toBeInTheDocument()
    expect(await screen.findByText('Data')).toBeInTheDocument()
  })

  it('should show loading state while data is being fetched (non async version)', async () => {
    render(<App />)
    // before user-event@13, this would work (notice we are not awaiting `userEvent.click`)
    userEvent.click(screen.getByText('Get Data'))
    expect(screen.getByText('Loading')).toBeInTheDocument()
    expect(await screen.findByText('Data')).toBeInTheDocument()
  })
})
