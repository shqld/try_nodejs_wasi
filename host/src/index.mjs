import { resolve } from 'path'
import * as fs from 'fs'
import { readFile } from 'fs/promises'
import { WASI } from 'wasi'
import { argv, env } from 'process'
import { PerformanceObserver, performance } from 'perf_hooks'

async function main() {
  new PerformanceObserver((items) => {
    console.log(items.getEntries())
  }).observe({ entryTypes: ['function'] })

  await run_js_module()
  await run_wasi_module()
}

const js_module_path = new URL(resolve('src/content.mjs'), import.meta.url)
const js_module = await import(js_module_path)
const run_js_module = performance.timerify(js_module.main_js)

const wasi_module_path = new URL(resolve('..', process.argv.pop()), import.meta.url)
const wasi_module = await WebAssembly.compile(await readFile(wasi_module_path))
const run_wasi_module = performance.timerify(async function main_wasi() {
  const wasi = new WASI({
    args: argv,
    env,
    preopens: {},
    stdout: 4, // Suppress stdout
  })

  const importObject = { wasi_snapshot_preview1: wasi.wasiImport }

  const instance = await WebAssembly.instantiate(wasi_module, importObject)
  wasi.start(instance)
})

await main()
