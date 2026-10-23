# Devaansh Dental Clinic: Website

React + Vite single-page site with Framer Motion animation and a React Three Fiber 3D tooth. Appointments are **WhatsApp only**.

## 1. Prerequisites
Node.js 18 or newer (https://nodejs.org) and VS Code.

## 2. Extract and open
Right-click `devaansh-dental-clinic.zip` > Extract All. In VS Code: File > Open Folder > select `devaansh-dental-clinic`. Open a terminal (Ctrl+`).

## 3. Install, run, build
```
npm install
npm run dev        # development server (http://localhost:5173)
npm run build      # production build into /dist
npm run preview    # preview the production build
```

## 4. Where to edit things
Everything is in `src/config/clinicData.js`: clinic name, phone, WhatsApp number, address, Maps links, opening hours (`hours`), services, reviews, dentist details, gallery. Images live in `src/assets/images/` (import them at the top of `clinicData.js`). Colours are CSS variables at the top of `src/index.css`.

To add the dentist photo: save it in `src/assets/images/`, import it in `clinicData.js`, and set `dentist.photo`.
To show a live map: Google Maps > Share > Embed a map, copy the `src` URL into `mapsEmbed` (or `VITE_MAPS_EMBED_URL`).

## 5. WhatsApp links
`src/utils/whatsapp.js` builds `https://wa.me/919999003555?text=<encodeURIComponent(message)>`. Every button (navbar, hero, service cards, dentist, contact, footer, floating button) uses it. A service card fills "Preferred Treatment" automatically. No booking is confirmed by the site; the clinic confirms on WhatsApp.

## 6. Deploy on Vercel
Push the folder to GitHub, import it on vercel.com, framework "Vite" (build `npm run build`, output `dist`). Or run `npx vercel`.

## Verify before going live
Official spelling of the dentist's name, qualifications, full weekly hours, the clinic's own Google Maps link, and the service list (taken from the entrance signboard).
