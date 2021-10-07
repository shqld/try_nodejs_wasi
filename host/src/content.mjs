import { Console } from 'console'
import * as fs from 'fs'

const console = new Console({
  stdout: fs.createWriteStream('/dev/null'), // Suppress stdout
})

export function main_js() {
  let i = 1000
  while (i--) {
    console.log('Hello, world! j')
  }
}
