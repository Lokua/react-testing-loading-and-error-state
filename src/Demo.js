import React, { useEffect, useState } from 'react'

let renders = 0

export default function Demo() {
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      const inc = (x) => x + 1
      setCount1(inc)
      setCount2(inc)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  renders++
  console.log({
    renders,
    count1,
    count2,
  })

  return (
    <div>
      <h1>count1 is {count1}</h1>
      <h1>count2 is {count2}</h1>
    </div>
  )
}
