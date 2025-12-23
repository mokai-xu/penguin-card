export interface StickerDefinition {
  id: string;
  name: string;
  emoji?: string;
  imagePath?: string;
  defaultSize: number;
}

import penguinImage from './assets/penguin-single.png';
import heartImage from './assets/heart.png';
import treeImage from './assets/tree (1).png';
import pikachuImage from './assets/pikachiu.png';
import toonLinkImage from './assets/toon_link.png';
import snowmanImage from './assets/snowman.png';
import magicHatImage from './assets/magic_hat.png';
import snowClumpImage from './assets/snow_clump.png';
import giftImage from './assets/gift.png';
import redStockingImage from './assets/red_stocking.png';
import snowflake2Image from './assets/snowflake-2.png';
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

export const stickers: StickerDefinition[] = [
  {
    id: 'penguin-image',
    name: 'Penguin',
    imagePath: penguinImage,
    defaultSize: 80,
  },
 
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
    id: 'snowflake-2',
    name: 'Snowflake 2',
    imagePath: snowflake2Image,
    defaultSize: 40,
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
    id: 'appa',
    name: 'Appa',
    imagePath: appaImage,
    defaultSize: 100,
  },
  {
    id: 'heart',
    name: 'Heart',
    imagePath: heartImage,
    defaultSize: 50,
  },
  {
    id: 'chocolate-cake',
    name: 'Chocolate Cake',
    imagePath: chocolateCakeImage,
    defaultSize: 60,
  },
  {
    id: 'watermelon',
    name: 'Watermelon',
    imagePath: watermelonImage,
    defaultSize: 50,
  },
  {
    id: 'hot-chocolate',
    name: 'Hot Chocolate',
    imagePath: hotChocolateImage,
    defaultSize: 60,
  },
  {
    id: 'pikachu',
    name: 'Pikachu',
    imagePath: pikachuImage,
    defaultSize: 80,
  },
  {
    id: 'toon-link',
    name: 'Toon Link',
    imagePath: toonLinkImage,
    defaultSize: 100,
  },
  {
    id: 'snowman',
    name: 'Snowman',
    imagePath: snowmanImage,
    defaultSize: 70,
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
];
