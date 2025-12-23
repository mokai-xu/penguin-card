export const holidayJokes: string[] = [
  'May your holidays be filled with joy and your stockings be filled with presents!',
  'Wishing you a season full of light and laughter!',
  'Hope your holidays are as bright as Rudolph\'s nose!',
  'May your days be merry and your cookies be plenty!',
  'Wishing you warmth, love, and lots of hot cocoa this season!',
  'Hope Santa brings you everything on your list (and then some)!',
  'May your holidays be filled with peace, joy, and good company!',
  'Wishing you a holly, jolly, wonderful holiday season!',
  'Hope your holidays sparkle with moments of love, laughter, and goodwill!',
  'May the spirit of the season fill your home with happiness!',
  'Wishing you a magical holiday season and a prosperous new year!',
  'Hope your holidays are merry, bright, and filled with all your favorite things!',
  'May your holidays be as sweet as gingerbread and as cozy as a warm blanket!',
  'Wishing you peace, love, and holiday cheer!',
  'Hope your holidays are filled with making memories that will last forever!',
];

export function getRandomJoke(): string {
  const randomIndex = Math.floor(Math.random() * holidayJokes.length);
  return holidayJokes[randomIndex];
}
