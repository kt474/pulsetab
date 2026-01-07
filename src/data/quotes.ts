export interface Quote {
  text: string;
  author: string;
}

const quotes: Quote[] = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
  },
  { text: "Your limitation—it's only your imagination.", author: "Unknown" },
  {
    text: "Push yourself, because no one else is going to do it for you.",
    author: "Unknown",
  },
  { text: "Great things never come from comfort zones.", author: "Unknown" },
  { text: "Dream it. Wish it. Do it.", author: "Unknown" },
  {
    text: "The harder you work for something, the greater you'll feel when you achieve it.",
    author: "Unknown",
  },
  {
    text: "Don't stop when you're tired. Stop when you're done.",
    author: "Unknown",
  },
  {
    text: "Wake up with determination. Go to bed with satisfaction.",
    author: "Unknown",
  },
  { text: "Little things make big days.", author: "Unknown" },
  {
    text: "It's going to be hard, but hard does not mean impossible.",
    author: "Unknown",
  },
  { text: "Don't wait for opportunity. Create it.", author: "Unknown" },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    text: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair",
  },
  {
    text: "Happiness is not something ready made. It comes from your own actions.",
    author: "Dalai Lama",
  },
  { text: "What we think, we become.", author: "Buddha" },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
  },
  { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
  {
    text: "Be the change that you wish to see in the world.",
    author: "Mahatma Gandhi",
  },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "Not all those who wander are lost.", author: "J.R.R. Tolkien" },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
  },
  {
    text: "What you get by achieving your goals is not as important as what you become.",
    author: "Zig Ziglar",
  },
  {
    text: "Act as if what you do makes a difference. It does.",
    author: "William James",
  },
  {
    text: "You are never too old to set another goal or to dream a new dream.",
    author: "C.S. Lewis",
  },
  {
    text: "Happiness depends upon ourselves.",
    author: "Aristotle",
  },
  {
    text: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt",
  },
  {
    text: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt",
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
  },
  {
    text: "Keep your face always toward the sunshine—and shadows will fall behind you.",
    author: "Walt Whitman",
  },
  {
    text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
    author: "Mother Teresa",
  },
  {
    text: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu",
  },
  {
    text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson",
  },
  {
    text: "Success is stumbling from failure to failure with no loss of enthusiasm.",
    author: "Winston S. Churchill",
  },
  {
    text: "Don't judge each day by the harvest you reap but by the seeds that you plant.",
    author: "Robert Louis Stevenson",
  },
  {
    text: "The power of imagination makes us infinite.",
    author: "John Muir",
  },
  {
    text: "Everything has beauty, but not everyone sees it.",
    author: "Confucius",
  },
  {
    text: "Hardships often prepare ordinary people for an extraordinary destiny.",
    author: "C.S. Lewis",
  },
];

export function getDailyQuote(): Quote {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const index = dayOfYear % quotes.length;
  return quotes[index]!;
}
