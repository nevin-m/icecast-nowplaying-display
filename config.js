// ============================================================
//  Icecast / Caster.fm Now Playing Display — Configuration
//  Edit THIS file (after renaming to config.js) to customize
//  your station's behavior. No changes needed in index.html.
// ============================================================
//
//  SETUP:
//    1. Copy this file and rename the copy to "config.js"
//    2. Edit the values below to match your station
//    3. Open index.html in a browser (or deploy it — see README)
//
// ============================================================


// ---  STATION NAME ---
// Set this once — it's automatically used to fill in the header text,
// station ID text, and browser tab title below, so you don't have to
// repeat your station name in multiple places. You can still override
// any of those individually further down if you want different wording.
const STATION_NAME = "Your Station 88.5FM";


// ---  STREAM / API SETTINGS ---

// Which stream host to pull now-playing metadata from. Choose ONE:
//   "caster"   — Caster.fm (fully supported)
//   "live365"  — Live365 (EXPERIMENTAL — see note below)
const STREAM_HOST_TYPE = "caster";

// The JSON stats endpoint for your stream host (Caster.fm only —
// ignored if STREAM_HOST_TYPE is "live365").
// For Caster.fm this looks like:
//   https://<yourserver>.caster.fm:<port>/admin/publicstats.json
const STATS_URL        = "https://your-stream-host.example.com:8000/admin/publicstats.json";

// --- LIVE365 SETTINGS (EXPERIMENTAL, only used if STREAM_HOST_TYPE = "live365") ---
//
// ⚠️  Live365 does not offer an official, documented public API for
// now-playing data. This uses the actual endpoint Live365's own website/
// embed player calls internally (found via the browser network tab):
//   https://api.live365.com/station/{your-station-id}
// It returns structured artist/title data plus matched cover art directly,
// so no iTunes lookup is needed for Live365 stations.
//
// Because it's undocumented, Live365 could change its shape or access
// rules at any time without notice.

// Your Live365 station ID (the "a12345"-style code from your streaming
// URL, e.g. https://streaming.live365.com/a12345 → LIVE365_STATION_ID = "a12345")
const LIVE365_STATION_ID = "a12345";

const FALLBACK_COVER   = "placeholder.jpg";   // Shown when artwork can't be found
const LOGO_COVER       = "logo.jpg";          // Shown during station IDs / jingles
const UPDATE_INTERVAL  = 10000;               // How often to poll for a new song (ms)


// ---  API TOGGLES ---
// Set to false to disable an API without deleting anything.
const API_STATUS = {
    iTunes: true,
};


// ---  EXPLICIT ARTISTS LIST (optional) ---
// Any song whose artist matches an entry below will have its cover art
// blurred on screen. Matching is case-insensitive and ignores
// punctuation/spaces. Leave the array empty ( [] ) to disable this
// feature entirely. Add or remove artists freely — one per line.
const CUSTOM_EXPLICIT_LIST = [

    // Example:
    // { artist: "Example Artist" },

];


// --- STATION ID / JINGLE MODE ---
// Text shown (in place of the title) when the stream is airing a
// station ID or jingle with no real song info to parse.
// Defaults to using STATION_NAME above — override with your own wording
// if you want something different here specifically.
const ID_MODE_TEXT = `You're Listening To ${STATION_NAME}`;

// Optional: keywords that identify a station ID/jingle by name, checked
// against the raw title (Caster.fm) or combined artist+title (Live365),
// case-insensitive, substring match. Useful when your auto-DJ software
// tags station IDs/jingles with a specific name/label rather than leaving
// them unparseable. When matched, the display shows placeholder.jpg on a
// blank background (instead of the logo used for the generic ID mode)
// with ID_MODE_TEXT above.
// Leave as an empty array ( [] ) to disable this and rely only on the
// generic single-word/no-data detection.
const ID_KEYWORDS = [

    // Examples:
    // "120 Second Ad Break",
    // "Jingle",

];


// --- HEADER TEXT OPTIONS ---
// Choose ONE:
// const HEADER_TEXT_MODE = "static";
// const HEADER_TEXT_MODE = "scrolling";
// const HEADER_TEXT_MODE = "alternating";

const HEADER_TEXT_MODE = "static";

// Text to display in the header (used depending on the mode above)
// Both default to using STATION_NAME above — override with your own
// wording if you want something different here specifically.
const HEADER_STATIC_TEXT    = `Now Playing on ${STATION_NAME}`;
const HEADER_SCROLLING_TEXT = `Now Playing on ${STATION_NAME} | Call Us at 555-555-5555 | Stream Online At your-stream-url.example.com`;

// Header text color (any valid CSS color: hex, rgb, named color, etc.)
const HEADER_TEXT_COLOR = "#ffffff";

// Scrolling speed in pixels per second (only used in "scrolling"/"alternating"
// modes). Higher = faster. The loop is seamless and continuous regardless
// of text length. Default: 120
const HEADER_SCROLL_SPEED = 120;

// --- ALTERNATING MODE SETTINGS (only used if HEADER_TEXT_MODE = "alternating") ---
// How long to show static text (in seconds)
const HEADER_STATIC_DURATION = 10;

// How long to show scrolling text (in seconds)
const HEADER_SCROLLING_DURATION = 20;
