# HostelHub

HostelHub is a React + Vite student hostel management app with:

- a full-stack mode powered by Express + SQLite
- a GitHub Pages demo mode powered by browser `localStorage`

## Local development

Run the backend and frontend together:

```bash
npm install
npm run dev:full
```

The API runs on `http://localhost:4000` and Vite runs on `http://localhost:5173`.

## View the database

To print the `students` table from the SQLite database:

```bash
npm run show-db
```

The database file lives at [server/data/hostelhub.db](C:\Users\RAKSHIT\Downloads\HostelHub\HostelHub\server\data\hostelhub.db).

## Deployment targets

### 1. GitHub Pages demo

GitHub Pages cannot run the Node backend, so the Pages build uses demo mode:

- routing switches to `HashRouter`
- data is stored in the browser via `localStorage`
- changes persist for that browser only

Build it locally with:

```bash
npm run build:pages
```

The GitHub Actions workflow at [.github/workflows/deploy-pages.yml](C:\Users\RAKSHIT\Downloads\HostelHub\HostelHub\.github\workflows\deploy-pages.yml) deploys this demo automatically from the `main` branch.

Expected Pages URL:

`https://rakshit-thareja.github.io/HostelHub/`

Live demo route:

`https://rakshit-thareja.github.io/HostelHub/#/`

### 2. Full-stack hosted app

The full-stack app uses:

- React frontend
- Express backend
- SQLite database

The backend serves the built frontend in production through [server/server.js](C:\Users\RAKSHIT\Downloads\HostelHub\HostelHub\server\server.js), and [render.yaml](C:\Users\RAKSHIT\Downloads\HostelHub\HostelHub\render.yaml) is included for easy deployment on Render.

Render settings:

- Build command: `npm install && npm run build`
- Start command: `npm run server`
- Persistent disk: mounted at `/var/data`
- Database path env var: `DB_PATH=/var/data/hostelhub.db`

After connecting the GitHub repo in Render, the full app will run from a single web service and keep student records on the mounted disk between deploys.

Recommended Render steps:

1. Create a new `Web Service` from this GitHub repo.
2. Let Render detect [render.yaml](C:\Users\RAKSHIT\Downloads\HostelHub\HostelHub\render.yaml).
3. Confirm the service name and create it.
4. Wait for the first deploy to finish.
5. Open the generated Render URL.

## Notes

- GitHub Pages is for demo use only.
- The SQLite-backed version should be hosted on a Node-capable platform such as Render or Railway.
- A hosted full-stack URL cannot be created from this machine alone because it requires access to your hosting account to create the actual service.
