export const PROFILES = {
  girly: {
    name: 'Girly Floral',
    tagline: 'Bright, romantic, impossibly charming',
    description:
      "You're drawn to fragrances that feel like bottled optimism — soft florals kissed with brightness, sweetness that never overwhelms, and an overall feeling of approachable beauty. These are the scents that make people smile when you walk by.",
    examples:
      'Byredo Flowerhead · Diptyque Eau Rose · Jo Malone Peony & Blush Suede · Delina by Parfums de Marly',
  },
  oldMoney: {
    name: 'Old Money',
    tagline: 'Refined, intentional, quietly powerful',
    description:
      "Your taste runs toward fragrances that whisper wealth and sophistication — complex compositions that unfold slowly, reveal their quality without announcement, and feel rooted in perfumery's grand tradition.",
    examples:
      'Roja Elixir Essence · Chanel No. 19 · Creed Aventus for Her · Guerlain Mitsouko · Hermès Calèche',
  },
  cool: {
    name: 'Effortlessly Cool',
    tagline: 'Minimal, modern, impossibly you',
    description:
      'You gravitate toward scents that feel more like skin than perfume — barely-there compositions that create an intimate aura rather than announcing themselves. Modern minimalism at its finest.',
    examples:
      'Le Labo Another 13 · Juliette Has a Gun Not a Perfume · Glossier You · Le Labo Santal 33 · Molecule 01',
  },
  quiet: {
    name: 'Quiet Luxury',
    tagline: 'Soft, elegant, expensively simple',
    description:
      "You seek fragrances that envelop you like the world's softest cashmere — elegant, serene, and understated in their opulence. These scents don't shout; they whisper quality.",
    examples:
      'Xerjoff Dama Bianca · Parfums de Marly Valaya · Armani Privé Pivoine Suzhou · Byredo Inflorescence',
  },
  femme: {
    name: 'Femme Fatale',
    tagline: 'Bold, magnetic, unforgettable',
    description:
      "You're not here to blend in. You want fragrances that command attention — intense, sensual compositions with depth and drama. These scents linger long after you've left.",
    examples:
      'Tom Ford Noir de Noir · Kilian Good Girl Gone Bad · MFK Grand Soir · Initio Oud for Greatness · Parfums de Marly Oriana',
  },
  gourmand: {
    name: 'Scrumptious Gourmand',
    tagline: 'Sweet, cozy, deliciously indulgent',
    description:
      'You adore fragrances that smell unabashedly delicious — warm vanilla, rich caramel, sweet treats that wrap you in comfort. This is dessert in a bottle, and you wouldn\'t have it any other way.',
    examples:
      'Mancera Roses Vanille · Kayali Vanilla 28 · By Kilian Love Don\'t Be Shy · Prada Candy · Mugler Angel',
  },
}

export const ARCHETYPE_COLORS = {
  girly:    { accent: '#E8A4B8', light: 'rgba(232,164,184,0.1)' },
  oldMoney: { accent: '#7B9E6B', light: 'rgba(123,158,107,0.1)' },
  cool:     { accent: '#8BAEC4', light: 'rgba(139,174,196,0.1)' },
  quiet:    { accent: '#C4A882', light: 'rgba(196,168,130,0.1)' },
  femme:    { accent: '#9B6B8A', light: 'rgba(155,107,138,0.1)' },
  gourmand: { accent: '#C47B4A', light: 'rgba(196,123,74,0.1)'  },
}

export function getColors(primary) {
  return ARCHETYPE_COLORS[primary] || ARCHETYPE_COLORS.quiet
}
