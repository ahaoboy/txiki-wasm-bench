import type from '@txikijs/types'
import { decode } from 'image-rust'
// import fs from 'node:fs';
// const buf = fs.readFileSync('./assets/win.jpg')

(async () => {
  const buf = await tjs.readFile("./assets/win.jpg")
  const { width, height, pixels, channel } = decode(buf)
  console.log(width, height, pixels, channel)
})()

