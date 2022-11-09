import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import React from 'react'
import App from './App'
import { getData } from './api'

jest.mock('./api', () => ({
  getData: jest.fn(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve('Data')
        }, 100)
      })
  ),
}))

describe('App', () => {
  const TIMEOUT_DURATION = 100

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should show loading state while data is being fetched', async () => {
    render(<App />)
    expect(screen.getByText('Loading')).toBeInTheDocument()
    jest.advanceTimersByTime(TIMEOUT_DURATION)
    expect(await screen.findByText('Data')).toBeInTheDocument()
  })

  it('should show error when API fails', async () => {
    getData.mockImplementationOnce(
      () =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(new Error())
          }, 100)
        })
    )
    render(<App />)
    expect(screen.getByText('Loading')).toBeInTheDocument()
    jest.advanceTimersByTime(TIMEOUT_DURATION)
    expect(await screen.findByText('Error')).toBeInTheDocument()
  })
})
