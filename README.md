# Icecast / Caster.fm Now Playing Display

A lightweight, single-page "Now Playing" display for internet radio stations on **Caster.fm** (fully supported) or **Live365** (experimental — see below). It polls your stream host for the current track, looks up cover art via the iTunes Search API, and shows a full-screen display with the album art (blurred as a background), song title, and artist — perfect for a lobby TV, OBS overlay, or embedding on your station's website.

No backend, database, or build step required — it's plain HTML/CSS/JS that runs entirely in the browser.

## Features

-  **Automatic track detection** — polls your Icecast/Caster.fm stream stats on an interval you set
-  **Automatic cover art** — fetches high-res artwork from the iTunes Search API
-  **Station ID / jingle detection** — automatically shows your logo when no song is playing
-  **Explicit artist blur list** — optionally blur cover art for specific artists
-  **Configurable header banner** — static, scrolling marquee, or alternating between both
-  **Single config file** — no need to touch the HTML/JS to customize your station

## Demo / How it looks

The display shows:
- A blurred, full-screen version of the current album art as the background
- The album art itself, centered
- Song title and artist
- A header banner with your station name/call letters (and optional scrolling info)
![Demo](https://i.imgur.com/dyBPqc8.png)
## Requirements

- A stream hosted on **Caster.fm** (fully supported), or **Live365** (experimental — see below)
- Any static web host (GitHub Pages, Netlify, Vercel, a folder on your own web server, or even just opening the file locally)

## Setup

1. **Download (Easier) or clone this repository**

   ```bash
   git clone https://github.com/nevin/icecast-nowplay-display.git
   cd icecast-nowplay-display
   ```

2. **Edit `config.js`**

   Open `config.js` and update at least the following:

   | Setting | Description |
   |---|---|
   | `STATION_NAME` | Your station's name (e.g. `"WBAB 102.3FM"`). Set this once — it automatically fills in `ID_MODE_TEXT`, `HEADER_STATIC_TEXT`, `HEADER_SCROLLING_TEXT`, and the browser tab title for you, so you don't have to repeat it everywhere. |
   | `STREAM_HOST_TYPE` | `"caster"` (default, fully supported) or `"live365"` (experimental — see [Live365 support](#live365-support-experimental) below) |
   | `STATS_URL` | The JSON stats URL for your Caster.fm stream, e.g. `https://<yourserver>.caster.fm:<port>/admin/publicstats.json` (only used when `STREAM_HOST_TYPE` is `"caster"`) |
   | `HEADER_STATIC_TEXT` / `HEADER_SCROLLING_TEXT` | Header banner text — defaults to using `STATION_NAME`, but can be overridden individually with your own wording (e.g. to add a phone number or call letters) |
   | `ID_MODE_TEXT` | Text shown when a station ID/jingle is playing instead of a song — also defaults to using `STATION_NAME` |
   | `ID_KEYWORDS` | Optional list of keywords (e.g. `"Station ID"`, `"Jingle"`) that identify a station ID/jingle by name. When matched, shows `placeholder.jpg` on a blank background instead of the logo. |
   | `CUSTOM_EXPLICIT_LIST` | Optional list of artists whose artwork should be blurred |

   All available options are documented with comments directly in `config.js`.

   > 💡 **Quickest path to a working setup:** just set `STATION_NAME` and `STATS_URL` (or `LIVE365_STATION_ID`) — every other text setting has a sensible default built from `STATION_NAME`. You only need to touch the rest if you want custom wording.

   > **⚠️ Caster.fm is the only fully-supported host.** Live365 works but is experimental — see the dedicated section below before relying on it.

3. **Replace the images**

   Swap out `logo.jpg` (shown during station IDs) and `placeholder.jpg` (shown when no artwork is found) with your own station's branding. Keep the same filenames, or update `LOGO_COVER` / `FALLBACK_COVER` in `config.js` if you rename them.

4. **Run it**

   - **Locally:** just open `index.html` in a browser (some browsers restrict `fetch` on `file://` URLs — if the stats don't load, serve it locally instead, e.g. `npx serve .` or `python3 -m http.server`)
   - **Deploy:** upload `index.html`, `config.js`, and your images to any static host. GitHub Pages works great — just enable Pages on this repo and point it at the branch/folder.

## Live365 support (experimental)

Live365 does **not** offer an official, documented public API for now-playing data. Broadcasters have been asking Live365 for one since 2019, and as of this writing it's still listed as "under consideration" on Live365's own feedback board.

This uses the actual endpoint Live365's own website and embed player call internally (found via the browser network tab):

```
https://api.live365.com/station/{your-station-id}
```

It returns structured artist/title data plus matched cover art directly — so for Live365 stations, this project skips the iTunes lookup entirely and uses Live365's own art.

Caveats:

- **It's undocumented.** Live365 could change its response shape or restrict access to this endpoint at any time, with no notice, since it isn't a published/supported integration.
- Since it isn't official, don't build critical infrastructure around it — treat it as best-effort.

**To use it:**

In `config.js`, set:
```js
const STREAM_HOST_TYPE = "live365";
const LIVE365_STATION_ID = "a12345"; // from your streaming URL, e.g. https://streaming.live365.com/a12345
```

If Live365 ever ships an official API, this project should switch to that instead — PRs welcome.

## File structure

```
icecast-nowplay-display/
├── index.html            # The display page — do not need to edit this
├── config.js             # Your station's configuration — edit this
├── logo.jpg              # Shown during station IDs/jingles
├── placeholder.jpg       # Fallback cover art / keyword-ID image
├── LICENSE
└── README.md
```

## How it works

1. Every `UPDATE_INTERVAL` milliseconds, the page fetches now-playing data from your configured stream host — Caster.fm's JSON stats endpoint, or (experimentally) Live365's undocumented station endpoint — and extracts the current track info.
2. For Caster.fm, that raw string is parsed into an artist/title guess (splitting on `-`, or falling back to first-word-is-artist). Live365 already returns artist and title as separate fields, so this parsing step is skipped for Live365.
3. For Caster.fm, the artist/title is then queried against the iTunes Search API to find matching metadata and high-resolution cover art. (Live365 already provides matched cover art directly, so this step is skipped for Live365 — see [Live365 support](#live365-support-experimental).)
4. The page updates the on-screen title, artist, and background art.
5. If no real song can be parsed (e.g. during a station ID or jingle), the display switches to "ID mode" and shows your logo instead.
6. If the artist matches your `CUSTOM_EXPLICIT_LIST`, the cover art is blurred.

## Customization

Everything user-facing lives in `config.js` — you shouldn't need to touch `index.html` for typical setups. If you want to change fonts, colors, or layout beyond what's exposed in the config, the CSS is all inline in `index.html`.

## Contributing

Issues and pull requests are welcome — especially for:
- Keeping Live365 support working if/when Live365 changes their undocumented endpoint, or migrating to an official API if one ever ships
- Native support for plain Icecast servers (`status-json.xsl`)
- Additional metadata sources beyond iTunes
- Accessibility improvements

## License

Released under the [MIT License](LICENSE) — free to use, modify, and deploy for your own station.

## Disclaimer

This is an independent, unofficial project and is not affiliated with, endorsed by, or sponsored by Caster.fm, Live365, Apple Inc., or Icecast/Xiph.Org. All product names, logos, and brands referenced (including "Caster.fm," "Live365," "iTunes," and "Icecast") are trademarks of their respective owners, used here only to describe compatibility with those services.
