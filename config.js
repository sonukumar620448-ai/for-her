/**
 * ====================================================================
 *  🤍 "A BIRTHDAY LETTER THAT YOU CAN WALK THROUGH" - CONFIGURATION
 * ====================================================================
 * 
 * Specifically configured for Anu with deeply heartfelt Hinglish messages,
 * 4 curated Unspoken Thoughts with photos, and Sahiba soundtrack.
 */

const SURPRISE_CONFIG = {
  // ── 1. The Basics ──────────────────────────────────────────────────
  herName: "Anu",                
  yourName: "With all my love",  

  // ── 2. Birthday Date & Time ────────────────────────────────────────
  birthdayDate: "2026-10-05T00:00:00",
  alwaysShowCelebration: false,

  // ── 3. Audio & Music ───────────────────────────────────────────────
  customAudioPath: "assets/music/sahiba.webm",
  musicTitle: "Sahiba 🤍 (Jasleen Royal & Stebin Ben)",

  // ── 4. Memories On The Rope (Scene 04) ─────────────────────────────
  // Pure, beautiful photos connected along the glowing fairy-light rope
  memories: [
    { image: "assets/photos/anu-01.jpg" },
    { image: "assets/photos/anu-02.jpg" },
    { image: "assets/photos/anu-03.jpg" },
    { image: "assets/photos/anu-04.jpg" },
    { image: "assets/photos/anu-05.jpg" },
    { image: "assets/photos/anu-06.jpg" },
    { image: "assets/photos/anu-07.jpg" },
    { image: "assets/photos/anu-08.jpg" },
    { image: "assets/photos/anu-09.jpg" },
    { image: "assets/photos/anu-10.jpg" },
    { image: "assets/photos/anu-11.jpg" },
    { image: "assets/photos/anu-12.jpg" },
    { image: "assets/photos/anu-13.jpg" },
    { image: "assets/photos/anu-14.jpg" },
    { image: "assets/photos/anu-15.jpg" },
    { image: "assets/photos/anu-16.jpg" },
    { image: "assets/photos/anu-17.jpg" },
    { image: "assets/photos/anu-18.jpg" },
    { image: "assets/photos/anu-19.jpg" },
    { image: "assets/photos/anu-20.jpg" },
    { image: "assets/photos/anu-21.jpg" },
    { image: "assets/photos/anu-22.jpg" },
    { image: "assets/photos/anu-23.jpg" },
    { image: "assets/photos/anu-24.jpg" }
  ],

  // ── 5. Unspoken Thoughts (Scene 05 - Envelopes with Photos) ─────────
  letters: [
    {
      number: "01",
      preview: "🌸 Simplicity & Innocence",
      heading: "Yeh pehli baat...",
      image: "assets/photos/unspoken-01.jpg",
      moodTag: "Soft • Peaceful • Innocent",
      message: "Pata nahi kyun… is photo ko dekhte hi dil thoda ruk sa jaata hai.\n\nTumhe shayad kabhi bataya nahi, but tumhari simplicity mein bhi ek alag si khoobsurti hai.\n\nTum bas saamne hoti ho… aur pata nahi kaise, sab kuch thoda sa better lagne lagta hai.\n\nKaash kabhi tum meri aankhon se khud ko dekh pao… shayad tab samajh paogi ki tum mere liye kitni special ho."
    },
    {
      number: "02",
      preview: "💙 That Special Feeling",
      heading: "Sach bolun toh...",
      image: "assets/photos/unspoken-02.jpg",
      moodTag: "Beautiful • Playful • Magnetic",
      message: "Sach kahun toh tumhe dekhne ka bhi ek problem hai… jitni baar dekho, utni baar lagta hai ek baar aur dekh loon.\n\nAur shayad tumhe idea bhi nahi hai ki tumhari ek simple si photo kisi ke poore din ka mood badal sakti hai.\n\nTum khoobsurat ho… ye toh sab bol sakte hain. Par mere liye baat sirf khoobsurti ki kabhi thi hi nahi.\n\nIt's the feeling I get when I see you."
    },
    {
      number: "03",
      preview: "💜 Your Magical Smile",
      heading: "Tumhari Smile...",
      image: "assets/photos/unspoken-03.jpg",
      moodTag: "Warmth • Joy • Pure Magic",
      message: "Tumhari smile ke baare mein main kya hi bolun…\n\nKabhi kabhi bas tumhari smile dekh kar lagta hai ki duniya mein sab kuch theek hai. Tumhe shayad pata bhi nahi hota, but tumhari ek smile kisi ke liye poora comfort ban sakti hai.\n\nAur haan… main ye kabhi properly bol nahi paaya, but I really hope life never takes that smile away from you.\n\nKyunki tum jab smile karti ho na… tab tum sirf beautiful nahi lagti, tum khushiyon jaisi lagti ho."
    },
    {
      number: "04",
      preview: "🌿 Distance & Deep Thoughts",
      heading: "Jab tum paas nahi hoti...",
      image: "assets/photos/unspoken-04.jpg",
      moodTag: "Deep • Thoughtful • Eternal",
      message: "Kabhi kabhi tumhari photos dekhta hoon… aur bas sochta reh jaata hoon.\n\nKitni ajeeb baat hai na… ek insaan itni door hoke bhi kisi ke thoughts mein itna paas kaise ho sakta hai.\n\nTum apni life mein busy hogi, apne moments jee rahi hogi, aur shayad tumhe pata bhi nahi hoga ki kahin door koi tumhari ek chhoti si photo dekh kar smile kar raha hai.\n\nDistance sirf jagah ke beech hai… feelings ke beech nahi."
    }
  ],

  // ── 6. Reasons You Are Special (Hinglish Emotional & Playful) ───────
  reasons: [
    {
      tag: "Tumhari Smile",
      short: "Sabse pyara sukoon",
      expanded: "Tum jab hasti ho na, toh din bhar ki saari thakan aur dimaag ka sara shor ek pal mein shaant ho jaata hai. Tumhari smile sach mein therapy jaisi hai."
    },
    {
      tag: "Tumhara Chaos",
      short: "Zindagi ka entertainment",
      expanded: "Sach bolun toh... tumhare bina life kitni boring hoti! Tumhari random nautanki, dramatic baatein aur achanak gussa hona meri sabse favorite cheez hai."
    },
    {
      tag: "Tumhara Saaf Dil",
      short: "Bina kisi shart ke",
      expanded: "Bina kisi matlab ke logon ki care karna... aaj ke time mein tum jaisa genuine aur pure dil milna bohot mushkil hai. Tum dil se bohot pyari ho."
    },
    {
      tag: "Late Night Baatein",
      short: "2 AM deep talks",
      expanded: "Raat ke 2 baje life ki deep baaton se lekar faltu topics par ghanton ladna... yeh moments mere liye duniya ke kisi bhi comfort se bade hain."
    },
    {
      tag: "Tumhari Chhoti Aadatein",
      short: "Cute details",
      expanded: "Story batane se pehle khud has padna, baat karte waqt aankhon ke expressions, aur chhoti-chhoti baaton par excite ho jaana... yeh sab bohot pyara hai."
    },
    {
      tag: "Jis Tarah Tum Care Karti Ho",
      short: "Notice karna",
      expanded: "Tumhe teen mahine pehle boli hui meri chhoti si baat bhi yaad rehti hai. Tum logon ko sach mein seen aur special feel karati ho, yeh ek gift hai."
    },
    {
      tag: "Tumhari Quiet Strength",
      short: "Sab sambhaal lena",
      expanded: "Chahe cheezein kitni bhi tough kyun na ho, tum kitne sukoon aur grace ke saath sab sambhalti ho... I admire that so endlessly."
    },
    {
      tag: "Bas Tumhara Hona",
      short: "No filters needed",
      expanded: "Tumhe mere saamne koi act karne ki ya perfect banne ki zaroorat nahi hai. Tum jaisi ho, apne raw moments mein bhi, mere liye bohot precious ho."
    }
  ],

  // ── 7. Main Birthday Letter (Deeply Emotional Hinglish) ─────────────
  mainLetter: {
    salutation: "Dearest",
    paragraphs: [
      "Kaash aaj main tumhare saamne hota...",
      "Kaash tumhare face ke expressions dekh paata jab tum yeh sab padh rahi ho. Hazaaron miles door se yeh link bhejne ke bajaye, kaash pehla wish main khud saamne aakar deta.",
      "Lekin jab tak main physically tumhare paas nahi aa sakta, maine yeh jagah banayi jahan main woh sab keh sakun jo main zabaan se bol nahi paata.",
      "Meri boring si life mein aakar use itna khoobsurat banane ke liye thank you. Tumhare hasi, tumhare bina baat ke gusse, tumhari caring nature, aur tumhare sukoon ke liye dil se shukriya.",
      "Dua hai ki yeh aane wala saal tumhari life mein utni hi khushiyan aur warmth laye jitni tum meri zindagi mein laati ho.",
      "Happy Birthday, meri Anu. Tum hamesha bohot special rahogi. 🤍"
    ],
    closing: "Hamesha aur bina kisi shart ke,",
    signature: "Tumhara"
  }
};
