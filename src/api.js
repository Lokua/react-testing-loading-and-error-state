export const getData = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello, world!')
    }, 5000)
  })
