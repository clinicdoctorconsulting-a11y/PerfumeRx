export const questions = [
  {
    id: 1,
    question: 'How do you want to feel when you wear perfume?',
    options: [
      { text: 'Radiant and effortlessly charming',          scores: { girly: 3, quiet: 1 } },
      { text: 'Powerful in a quiet, refined way',           scores: { oldMoney: 3, quiet: 1 } },
      { text: 'Like the best version of myself, nothing more', scores: { cool: 3 } },
      { text: 'Wrapped in something impossibly soft',       scores: { quiet: 3, oldMoney: 1 } },
      { text: 'Magnetic. Unforgettable.',                   scores: { femme: 3, gourmand: 1 } },
      { text: 'Warm, cozy, and completely myself',          scores: { gourmand: 3, girly: 1 } },
    ],
  },
  {
    id: 2,
    question: 'Pick a moment',
    options: [
      { text: 'Garden party on a perfect spring afternoon', scores: { girly: 3 } },
      { text: 'Private viewing at an art gallery',          scores: { oldMoney: 3 } },
      { text: 'Coffee in a minimalist café, people-watching', scores: { cool: 3 } },
      { text: 'Reading by the fireplace in cashmere',       scores: { quiet: 3 } },
      { text: 'Cocktails in a velvet booth, low lighting',  scores: { femme: 3 } },
      { text: 'Baking at home while it rains outside',      scores: { gourmand: 3 } },
    ],
  },
  {
    id: 3,
    question: 'When someone hugs you, you want them to think…',
    options: [
      { text: '"She smells like sunshine"',                 scores: { girly: 3 } },
      { text: '"That\'s expensive"',                        scores: { oldMoney: 3 } },
      { text: '"I can\'t place it, but it\'s perfect"',     scores: { cool: 3 } },
      { text: '"She smells so elegant"',                    scores: { quiet: 3 } },
      { text: '"I need to know what that is"',              scores: { femme: 3 } },
      { text: '"I want to stay here forever"',              scores: { gourmand: 3 } },
    ],
  },
  {
    id: 4,
    question: 'Your signature look is…',
    options: [
      { text: 'Soft, feminine, a little romantic',         scores: { girly: 2, quiet: 1 } },
      { text: 'Timeless pieces, impeccable tailoring',     scores: { oldMoney: 3 } },
      { text: 'Clean lines, neutral palette, effortless',  scores: { cool: 3 } },
      { text: 'Understated luxury in every detail',        scores: { quiet: 3, oldMoney: 1 } },
      { text: 'Bold, confident, a little dramatic',        scores: { femme: 3 } },
      { text: 'Cozy textures, warm colors, comfortable chic', scores: { gourmand: 2, quiet: 1 } },
    ],
  },
  {
    id: 5,
    question: 'If your perfume were a fabric…',
    options: [
      { text: 'Silk chiffon floating in the breeze',       scores: { girly: 3 } },
      { text: 'Fine wool with perfect structure',          scores: { oldMoney: 3 } },
      { text: 'Crisp linen, pressed and clean',            scores: { cool: 3 } },
      { text: 'The world\'s softest cashmere',             scores: { quiet: 3 } },
      { text: 'Rich velvet that catches the light',        scores: { femme: 3 } },
      { text: 'The coziest fleece you never want to take off', scores: { gourmand: 2, quiet: 1 } },
    ],
  },
  {
    id: 6,
    question: 'You\'re most drawn to…',
    options: [
      { text: 'Flowers and a hint of something sweet',     scores: { girly: 3 } },
      { text: 'Things that smell expensive and complex',   scores: { oldMoney: 3 } },
      { text: 'Scents that feel more like skin than perfume', scores: { cool: 3 } },
      { text: 'Soft, powdery, enveloping warmth',          scores: { quiet: 3 } },
      { text: 'Dark, intense, boundary-pushing',           scores: { femme: 3 } },
      { text: 'Anything that smells like dessert',         scores: { gourmand: 3 } },
    ],
  },
  {
    id: 7,
    question: 'How much sweetness can you handle?',
    options: [
      { text: 'A little sweetness, but keep it fresh',     scores: { girly: 2, quiet: 1 } },
      { text: 'Almost none — I like it sophisticated',     scores: { oldMoney: 2, cool: 2 } },
      { text: 'Just barely there, if at all',              scores: { cool: 3 } },
      { text: 'Soft and subtle, never loud',               scores: { quiet: 3 } },
      { text: 'Sweet, but make it seductive',              scores: { femme: 3 } },
      { text: 'Give me all of it — unapologetically',      scores: { gourmand: 3 } },
    ],
  },
  {
    id: 8,
    question: 'When you walk into a room, you want your scent to…',
    options: [
      { text: 'Arrive with you, friendly and inviting',    scores: { girly: 2, quiet: 1 } },
      { text: 'Command respect without trying',            scores: { oldMoney: 2, quiet: 1 } },
      { text: 'Stay close, like a secret only you know',   scores: { cool: 3 } },
      { text: 'Whisper elegance to those nearby',          scores: { quiet: 3 } },
      { text: 'Announce you before you speak',             scores: { femme: 3 } },
      { text: 'Wrap everyone in a warm cloud',             scores: { gourmand: 2, femme: 1 } },
    ],
  },
  {
    id: 9,
    question: 'What\'s your ideal Saturday?',
    options: [
      { text: 'Brunch with friends, farmers market, easy and bright', scores: { girly: 2, cool: 1 } },
      { text: 'Museum, lunch somewhere impeccable, evening at the theater', scores: { oldMoney: 2, quiet: 1 } },
      { text: 'Studio class, vintage shopping, dinner at that new minimal spot', scores: { cool: 3 } },
      { text: 'Slow morning, good book, maybe a quiet dinner out', scores: { quiet: 3 } },
      { text: 'Gallery opening, cocktails, wherever the night takes you', scores: { femme: 3 } },
      { text: 'Cooking all day, candles lit, blankets everywhere', scores: { gourmand: 2, girly: 1 } },
    ],
  },
  {
    id: 10,
    question: 'Pick a color palette',
    options: [
      { text: 'Soft pinks, whites, gold accents',          scores: { girly: 3 } },
      { text: 'Deep greens, navy, burgundy, cream',        scores: { oldMoney: 3 } },
      { text: 'Whites, grays, black, natural wood',        scores: { cool: 3 } },
      { text: 'Beige, taupe, ivory, soft gray',            scores: { quiet: 3 } },
      { text: 'Black, deep red, plum, gold',               scores: { femme: 3 } },
      { text: 'Warm browns, caramel, cream, burnt orange', scores: { gourmand: 2, quiet: 1 } },
    ],
  },
]

export function computeArchetype(answers) {
  const total = Object.values(answers).reduce((s, v) => s + v, 0) || 1
  const percentages = {}
  Object.entries(answers).forEach(([k, v]) => {
    percentages[k] = Math.round((v / total) * 100)
  })
  const primary = Object.entries(percentages).sort((a, b) => b[1] - a[1])[0][0]
  return { primary, percentages }
}
