# 🤍 A Birthday Letter That You Can Walk Through

> *"Not a normal website with navbar, cards, and buttons... but a cinematic interactive story."*

This is a customized, deeply emotional, mobile-first birthday experience crafted with high aesthetic standards: midnight tones, warm candlelight glow, authentic scrapbook polaroids, interactive letters, constellation timeline, generative ambient audio, and slow poetic animations.

---

## 📁 Project Structure

```
D:\for her\
│
├── index.html              # The 12-chapter cinematic experience
├── config.js               # ⚡ Single file to customize names, dates, letters & photos!
├── README.md               # Instructions and customization guide
│
├── css/
│   ├── style.css           # Core aesthetic styles, colors & typography
│   ├── animations.css      # Smooth cinematic keyframes (stars, glow, blur)
│   └── responsive.css      # Mobile-first responsiveness (iPhone/Android ready)
│
├── js/
│   ├── main.js             # Orchestrator for the 12 story chapters
│   ├── music.js            # Ambient piano engine (Web Audio API) + MP3 player
│   ├── memories.js         # Scrapbook polaroids with natural tilt & modal zoom
│   ├── countdown.js        # Real-time countdown & midnight celebration trigger
│   └── animations.js       # Twinkling celestial canvas & stardust confetti
│
└── assets/
    ├── photos/             # Place her photos here (memory-01.jpg, etc.)
    └── music/              # (Optional) Drop birthday-song.mp3 here
```

---

## 🚀 How to Run & Preview

1. **Locally on your computer**:
   - Simply double-click `index.html` or open it in Google Chrome, Edge, Safari, or Brave.
   - Alternatively, right-click `index.html` and choose **"Open with Live Server"** in VS Code.

2. **Send it to her phone (Free Hosting)**:
   - **Option A (GitHub Pages)**:
     Create a repository on GitHub, upload these files, and turn on GitHub Pages in repository settings.
   - **Option B (Vercel / Netlify)**:
     Drag and drop this entire `for her` folder directly into [Netlify Drop](https://app.netlify.com/drop) or [Vercel](https://vercel.com). You will get a private link (e.g. `https://for-ananya.vercel.app`) in 30 seconds!

---

## ✍️ How to Personalize Everything (in `config.js`)

Open `config.js` in any text editor. Everything is neatly organized with clear labels:

### 1. Names, Cities & Distance
```javascript
herName: "Sarah",              // Her name or pet nickname
yourName: "Alex",              // Your name
herCity: "San Francisco",      // Her city
yourCity: "New York",          // Your city
distanceText: "2,570 miles",   // e.g. "980 km" or "2,570 miles"
```

### 2. Birthday Date & Countdown
```javascript
birthdayDate: "2026-10-15T00:00:00", // YYYY-MM-DD
alwaysShowCelebration: false,        // Set to true to display the celebration banner immediately
```

### 3. Adding Your Photos
Place your images inside `assets/photos/` with the filenames:
- `memory-01.jpg`
- `memory-02.jpg`
- `memory-03.jpg`
- `memory-04.jpg`
- `memory-05.jpg`
- `memory-06.jpg`

*(Note: If you don't add photos right away, the site automatically displays elegant artistic gradients and motifs, so it will never look empty or broken!)*

### 4. Background Music
- By default, the website has a **built-in generative ambient piano synthesizer** created via Web Audio API. It plays soothing, emotional piano chords without requiring any external files!
- If you have a specific song that means a lot to both of you:
  Convert it to `.mp3` and place it at: `assets/music/birthday-song.mp3`. The website will automatically play your custom song!

---

## 🌙 The 12 Chapters in this Experience

1. **01 — The Secret Door**: Dark, minimal opening with tactile `"Open Your Surprise"` button. Music softly fades in.
2. **02 — The Opening**: A glowing celestial particle expands; slow typewriter text reveals her name with quiet emotion.
3. **03 — "If I Were There"**: Constellation map connecting your city and hers, with touching humor.
4. **04 — Floating Memories**: Tactile polaroid cards tilted organically with handwritten captions.
5. **05 — Things I Never Say Enough**: 4 interactive envelopes that unfold into intimate letters.
6. **06 — A Timeline of "Us"**: Glowing constellation path with milestone moments and stories.
7. **07 — Reasons You Are Special**: Zero-gravity floating pills ("Your chaos", "Your smile") that expand when tapped.
8. **08 — The Same Moon 🌙**: Atmospheric realistic moon reminding her that you both share the exact same sky.
9. **09 — Midnight Hour / Countdown**: Live countdown or golden celebration sparkle.
10. **10 — The Main Birthday Letter**: Delicate parchment letter with wax seal.
11. **11 — "One Last Thing"**: Ambient pause, secret glowing button, and a breathtaking explosion of stardust & confetti.
12. **12 — Final Keepsake**: Signature, cities, and a replay button to re-live the magic.

Made with all the love and detailing she deserves. 🤍
