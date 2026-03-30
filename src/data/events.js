export const EVENTS = [
  {
    id: 1,
    slug: 'bunnies-and-bubbles',
    title: 'Bunnies & Bubbles',
    date: '3. april 2025',
    time: 'Fra kl. 21:00',
    location: 'Café Zappa',
    image: new URL('../assets/events/event-bunnies.jpg', import.meta.url).href,
    imageAlt: 'Bunnies & Bubbles påskeevent',
    teaser:
      'En hyggelig aften med DJ, gode tilbud og masser af påskestemning.',
    bookingUrl: 'https://cafezappa.booketbord.dk/onlinebooking',
    highlights: [
      'Flaske bobler – 199,-',
      '2 udvalgte drinks – 129,-',
      'DJ fra kl. 21',
    ],
    description: [
      'Påsken kalder på bobler! Fredag d. 3. april inviterer vi til Bunnies & Bubbles på Zappa – en hyggelig aften med DJ, gode tilbud og masser af påskestemning.',
      'Vi har gemt små påskeæg rundt i restauranten, og hvis du finder et, kan der gemme sig en rabat eller en lille overraskelse indeni.',
      'Derudover har baren mixet særlige påske-inspirerede cocktails, som kun kan fås denne aften.',
      'Tag vennerne med til en festlig start på påsken – vi sørger for musikken, boblerne og lidt ekstra påskesjov.',
    ],
  },
  {
    id: 2,
    slug: '00er-fest',
    title: "00'er Fest",
    date: '11. april 2025',
    time: 'Fra kl. 21:00',
    location: 'Café Zappa',
    image: new URL('../assets/events/event-00er.jpg', import.meta.url).href,
    imageAlt: "00'er fest event",
    teaser: "Savner du at høre alle de store bangers fra 00'erne?",
    bookingUrl: 'https://cafezappa.booketbord.dk/onlinebooking',
    highlights: [
      '2 ens øl til 1 pris (21:00–22:00)',
      "DJ med 00'er hits",
      'Sjove bordlege',
    ],
    description: [
      "Savner du at høre alle de store bangers fra 00'erne? Så er det her eventet for dig.",
      "Lørdag d. 11. april skruer vi op for nostalgien på Zappa, når vores DJ spiller de største hits fra 00'erne hele aftenen.",
      "Vi har også gjort lidt ekstra ud af hyggen ved bordene med et 'Gæt kunstneren'-kit, som I kan spille sammen med jeres vennegruppe.",
      'Det handler ikke om at være musikekspert – bare om at have det sjovt sammen.',
    ],
  },
  {
    id: 3,
    slug: 'baby-brunch',
    title: 'Baby Brunch',
    date: '15. april 2025',
    time: 'Kl. 10–12',
    location: 'Café Zappa, Horsens',
    image: new URL('../assets/events/event-babybrunch.jpg', import.meta.url).href,
    imageAlt: 'Baby Brunch event',
    teaser:
      'For mødregrupper og mødre på barsel i rolige og trygge rammer.',
    bookingUrl: 'https://cafezappa.booketbord.dk/onlinebooking',
    highlights: [
      '7 retters brunch + kaffe/saft – 199,- per person',
      'Stueetagen reserveret til eventet',
      'Plads til barnevogne',
      'Puslebord og mikrobølgeovn klar',
    ],
    description: [
      'Barsel kan være fantastisk – og lidt ensomt. Derfor inviterer vi til Baby Brunch på Zappa, hvor mødregrupper og mødre på barsel kan mødes i rolige og trygge rammer.',
      'Her er alle i samme situation – og der er plads til både snak, grin og babyer.',
      'Kom som du er – og få en hyggelig formiddag med andre der er i præcis samme situation.',
    ],
  },
]

export const getEventBySlug = (slug) => EVENTS.find((e) => e.slug === slug)

export const getOtherEvents = (slug) => EVENTS.filter((e) => e.slug !== slug)
