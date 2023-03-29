import React from 'react'
import styled from 'styled-components'
import { render, screen } from '@testing-library/react'

const colorsByLevel = {
  warning: 'orange',
  danger: 'red',
}

const ImportantMessage = styled.p`
  color: ${(p) => colorsByLevel[p.level]};
  background-color: blue;
`

function Component({ level }) {
  return (
    <div>
      <ImportantMessage level={level}>Urgent!</ImportantMessage>
    </div>
  )
}

test('Component', () => {
  render(<Component level="danger" />)
  expect(screen.getByText('Urgent!')).toHaveStyle({
    color: 'red',
  })
})
