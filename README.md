# Tourist Safety Dashboard (Hackathon MVP)

This is a polished React dashboard demo for the "Smart Tourist Safety Monitoring & Incident Response System".
It is an authority-facing dashboard (police/tourism department) showing active tourists, alerts, heatmaps and e-FIR generation.

## Quick start (local)
1. Install dependencies:
   ```
   npm install
   ```



   If you don't have a Mapbox token, the app falls back to a placeholder map panel.

2. Start dev server:
   ```
   npm start
   ```

3. Open http://localhost:3000 and login with:
   - username: `admin`
   - password: `1234`

## Notes
- This project uses TailwindCSS for styling.
- Mapbox is optional for demo; you can still demo the dashboard without tiles.
- The project is prepared for hackathon demo: mock data is in `src/data/` and features include:
  - Map with tourist markers and danger zone polygons
  - Sidebar with active tourists
  - Alerts panel with e-FIR PDF generation
  - Calamity feed
  - Responsive, modern UI built with Tailwind

Good luck at the hackathon — polish the demo script and rehearse the 3-minute flow!

