/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Hono } from 'hono'

const app = new Hono()

app.get('/api/requirements', async c => {
    const { results } = await c.env.DB.prepare(`select * from requirements`).all()
    return c.json(results)
})

app.post('/api/requirements/create', async c => {
    const { comment, nfo_id, nfo_source, library_id } = await c.req.json()

    const { success } = await c.env.DB.prepare(`insert into requirements (comment, nfo_id, nfo_source, library_id, status) values (?, ?, ?, ?, ?)`).bind(comment, nfo_id, nfo_source, library_id, 0).run()

    if (success) {
        c.status(201)
        return c.text("Created")
    } else {
        c.status(500)
        return c.text("Something went wrong")
    }
})

export default app
