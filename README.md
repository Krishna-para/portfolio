# Krishna Para — Portfolio (v2)

A portfolio built as a circuit board you can power on. React + Vite, no UI libraries.

## Run it locally

```bash
npm install
npm run dev
```

## Edit your content

Everything (bio, stats, projects, skills, links) lives in **`src/data.js`**.
Fill in the lines marked `TODO`:

- `live` for InterviewIQ and Vingo: their deployed URLs

Any link left as `""` hides its button automatically.

To add a resume button later, put a link in `profile.resume`.

## Link preview image

`public/og-image.png` is the picture LinkedIn and WhatsApp show when you share the link.
It uses the address in `.env` (`VITE_SITE_URL`). If your site ends up on a different URL, change that line and redeploy.

## Deploy to Netlify

1. Push this folder to a new GitHub repo.
2. In Netlify: Add new site → Import an existing project → pick the repo.
3. Build settings are already in `netlify.toml` (build: `npm run build`, publish: `dist`). Click Deploy.

To reuse your old URL: rename your old Netlify site first (Site configuration → Change site name), then rename the new site to `krishnaparaportfolio1`.

## Deploy to Vercel (alternative)

Import the repo on vercel.com. It detects Vite automatically. Click Deploy.

## Easter eggs

- Flip SW1 in the hero to power the board.
- Press `~` (or the "Open terminal" button) and try `help`, `whoami`, `hire`, or `sudo hire krishna`.
