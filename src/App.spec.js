import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import React from 'react'
import App from './App'
import { getData } from './api'

jest.mock('./api', () => ({
  getData: jest.fn(
    () =>
      new Promise((resolve) => {
        resolve('Data')
      })
  ),
}))

describe('App', () => {
  it('should show loading state while data is being fetched', async () => {
    render(<App />)
    expect(screen.getByText('Loading')).toBeInTheDocument()
    expect(await screen.findByText('Data')).toBeInTheDocument()
  })

  it('should show error when API fails', async () => {
    getData.mockImplementationOnce(
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
