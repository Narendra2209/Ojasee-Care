import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_FILE = path.join(__dirname, 'src', 'data', 'initialData.js')

/** Vite plugin: exposes /api/sync-data so the browser can write to initialData.js */
function syncDataPlugin() {
  return {
    name: 'sync-data-plugin',
    configureServer(server) {
      // Parse JSON bodies manually (no express needed)
      const readBody = (req) =>
        new Promise((resolve) => {
          let data = ''
          req.on('data', (chunk) => (data += chunk))
          req.on('end', () => {
            try { resolve(JSON.parse(data)) }
            catch { resolve({}) }
          })
        })

      server.middlewares.use('/api/sync-data', async (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

        if (req.method === 'OPTIONS') {
          res.statusCode = 204
          res.end()
          return
        }

        if (req.method === 'GET') {
          // Return current initialData as JSON so the client can read it
          try {
            const raw = fs.readFileSync(DATA_FILE, 'utf-8')
            // Extract the JS arrays with a simple regex approach – we'll just
            // re-evaluate by importing (can't dynamic-import ESM source easily here),
            // so instead we return a "ok" and let the client use its own module data.
            res.statusCode = 200
            res.end(JSON.stringify({ ok: true, message: 'use module imports' }))
          } catch (e) {
            res.statusCode = 500
            res.end(JSON.stringify({ ok: false, error: e.message }))
          }
          return
        }

        if (req.method === 'POST') {
          try {
            const body = await readBody(req)
            const { products, offers } = body

            if (!Array.isArray(products) || !Array.isArray(offers)) {
              res.statusCode = 400
              res.end(JSON.stringify({ ok: false, error: 'products and offers must be arrays' }))
              return
            }

            // Build the new initialData.js content
            const content = `export const initialProducts = ${JSON.stringify(products, null, 4)};\n\nexport const initialOffers = ${JSON.stringify(offers, null, 4)};\n`
            fs.writeFileSync(DATA_FILE, content, 'utf-8')

            console.log(`\x1b[32m✓ initialData.js updated: ${products.length} products, ${offers.length} offers\x1b[0m`)
            res.statusCode = 200
            res.end(JSON.stringify({ ok: true }))
          } catch (e) {
            console.error('❌ sync-data error:', e)
            res.statusCode = 500
            res.end(JSON.stringify({ ok: false, error: e.message }))
          }
          return
        }

        res.statusCode = 405
        res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }))
      })
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), syncDataPlugin()],
  build: {
    outDir: 'build'
  },
  base: '/',
})
