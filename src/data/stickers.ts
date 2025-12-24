export interface StickerDefinition {
  id: string;
  name: string;
  emoji?: string;
  imagePath?: string;
  defaultSize: number;
}

import penguinImage from './assets/penguin-single.png';
import penguinScarfImage from './assets/penguin-scarf.png';
import heartRedImage from './assets/heart-red.png';
import heartGreenImage from './assets/heart-green.png';
import mistletoeImage from './assets/mistletoe.png';
import treeImage from './assets/tree (1).png';
import treeEvergreenImage from './assets/tree-evergreen.png';
import sparkleImage from './assets/sparkle.png';
import soupImage from './assets/soup.png';
import snoopyImage from './assets/snoopy.png';
import gingerbreadImage from './assets/gingerbread.png';
import gingerbreadHouseImage from './assets/gingerbread-house.png';
import champagneImage from './assets/champagne.png';
import pikachuImage from './assets/pikachiu.png';
import toonLinkImage from './assets/toon_link.png';
import snowmanImage from './assets/snowman.png';
import magicHatImage from './assets/magic_hat.png';
import snowClumpImage from './assets/snow_clump.png';
import giftImage from './assets/gift.png';
import redStockingImage from './assets/red_stocking.png';
import snowflake3Image from './assets/snowflake-3.png';
import reindeerImage from './assets/reindeer.png';
import snowman2Image from './assets/snowman-2.png';
import candyCaneImage from './assets/candy-cane.png';
import bellImage from './assets/bell.png';
import wreathImage from './assets/wreath.png';
import santaHatImage from './assets/santa-hat.png';
import appaImage from './assets/appa.png';
import chocolateCakeImage from './assets/chocolate-cake.png';
import watermelonImage from './assets/watermelon.png';
import hotChocolateImage from './assets/hot-chocolate.png';
import poohImage from './assets/pooh.png';
import charlieBrownImage from './assets/charlie-brown.png';
import starImage from './assets/star.png';
import ornamentsImage from './assets/ornaments.png';
import eeveeImage from './assets/eevee.png';

export const stickers: StickerDefinition[] = [

 
  {
    id: 'tree-image',
    name: 'Christmas Tree',
    imagePath: treeImage,
    defaultSize: 80,
  },


  {
    id: 'gift',
    name: 'Gift',
    imagePath: giftImage,
    defaultSize: 50,
  },
  {
    id: 'red-stocking',
    name: 'Red Stocking',
    imagePath: redStockingImage,
    defaultSize: 60,
  },
  {
    id: 'snowflake-3',
    name: 'Snowflake 3',
    imagePath: snowflake3Image,
    defaultSize: 40,
  },
  {
    id: 'reindeer',
    name: 'Reindeer',
    imagePath: reindeerImage,
    defaultSize: 80,
  },
  {
    id: 'snowman-2',
    name: 'Snowman 2',
    imagePath: snowman2Image,
    defaultSize: 70,
  },
  {
    id: 'candy-cane',
    name: 'Candy Cane',
    imagePath: candyCaneImage,
    defaultSize: 50,
  },
  {
    id: 'bell',
    name: 'Bell',
    imagePath: bellImage,
    defaultSize: 50,
  },
  {
    id: 'wreath',
    name: 'Wreath',
    imagePath: wreathImage,
    defaultSize: 80,
  },
  {
    id: 'santa-hat',
    name: 'Santa Hat',
    imagePath: santaHatImage,
    defaultSize: 60,
  },

  {
    id: 'mistletoe',
    name: 'Mistletoe',
    imagePath: mistletoeImage,
    defaultSize: 60,
  },
    {
    id: 'tree-evergreen',
    name: 'Evergreen Tree',
    imagePath: treeEvergreenImage,
    defaultSize: 80,
  },

  {
    id: 'hot-chocolate',
    name: 'Hot Chocolate',
    imagePath: hotChocolateImage,
    defaultSize: 60,
  },

  {
    id: 'snowman',
    name: 'Snowman',
    imagePath: snowmanImage,
    defaultSize: 70,
  },

  {
    id: 'penguin-scarf',
    name: 'Penguin Scarf',
    imagePath: penguinScarfImage,
    defaultSize: 80,
  },

  {
    id: 'soup',
    name: 'Soup',
    imagePath: soupImage,
    defaultSize: 60,
  },

  {
    id: 'sparkle',
    name: 'Sparkle',
    imagePath: sparkleImage,
    defaultSize: 50,
  },
    {
    id: 'star',
    name: 'Star',
    imagePath: starImage,
    defaultSize: 50,
  },
  {
    id: 'heart-red',
    name: 'Red Heart',
    imagePath: heartRedImage,
    defaultSize: 50,
  },
  {
    id: 'heart-green',
    name: 'Green Heart',
    imagePath: heartGreenImage,
    defaultSize: 50,
  },
  {
    id: 'gingerbread',
    name: 'Gingerbread',
    imagePath: gingerbreadImage,
    defaultSize: 60,
  },
  {
    id: 'gingerbread-house',
    name: 'Gingerbread House',
    imagePath: gingerbreadHouseImage,
    defaultSize: 80,
  },
  {
    id: 'champagne',
    name: 'Champagne',
    imagePath: champagneImage,
    defaultSize: 60,
  },
      {
    id: 'chocolate-cake',
    name: 'Chocolate Cake',
    imagePath: chocolateCakeImage,
    defaultSize: 60,
  },
  {
    id: 'penguin-image',
    name: 'Penguin',
    imagePath: penguinImage,
    defaultSize: 80,
  },
  {
    id: 'pooh',
    name: 'Pooh',
    imagePath: poohImage,
    defaultSize: 80,
  },
    {
    id: 'pikachu',
    name: 'Pikachu',
    imagePath: pikachuImage,
    defaultSize: 80,
  },
    {
    id: 'appa',
    name: 'Appa',
    imagePath: appaImage,
    defaultSize: 100,
  },
  {
    id: 'toon-link',
    name: 'Toon Link',
    imagePath: toonLinkImage,
    defaultSize: 100,
  },
  {
    id: 'charlie-brown',
    name: 'Charlie Brown',
    imagePath: charlieBrownImage,
    defaultSize: 80,
  },
    {
    id: 'eevee',
    name: 'Eevee',
    imagePath: eeveeImage,
    defaultSize: 80,
  },
    {
    id: 'snoopy',
    name: 'Snoopy',
    imagePath: snoopyImage,
    defaultSize: 80,
  },

  {
    id: 'ornaments',
    name: 'Ornaments',
    imagePath: ornamentsImage,
    defaultSize: 60,
  },

    {
    id: 'magic-hat',
    name: 'Magic Hat',
    imagePath: magicHatImage,
    defaultSize: 50,
  },
  {
    id: 'snow-clump',
    name: 'Snow Clump',
    imagePath: snowClumpImage,
    defaultSize: 40,
  },

  {
    id: 'watermelon',
    name: 'Watermelon',
    imagePath: watermelonImage,
    defaultSize: 50,
  },
];
