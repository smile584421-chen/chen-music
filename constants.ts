
import { MusicTrack, CarouselImage } from './types';

// 使用根目錄路徑
const BASE = '';

export const INITIAL_CAROUSEL: CarouselImage[] = [
  { id: 'img_1', url: `${BASE}chen-p1.jpg`, title: '月光', subtitle: 'Moonlight' },
  { id: 'img_2', url: `${BASE}chen-p5.jpg`, title: '在旋律中與自己相遇', subtitle: 'Meeting Yourself in Melody' },
  { id: 'img_3', url: `${BASE}chen-p3.jpg`, title: '風 地與水的協奏', subtitle: 'Concerto of Wind, Earth & Water' },
  { id: 'img_4', url: `${BASE}chen-p6.jpg`, title: '風與石系列', subtitle: 'Wind & Stone Series' },
  { id: 'img_5', url: `${BASE}chen-p2.jpg`, title: '溪語情書', subtitle: 'Love Letters from the Brook' },
  { id: 'img_6', url: `${BASE}chen-p4.jpg`, title: '溫暖療癒系', subtitle: 'Warmth & Healing' },
];

export const CATEGORIES = ['禎心推薦', '冥想', '溫暖', '明亮', '放鬆'];

export const INITIAL_TRACKS: MusicTrack[] = [
  { 
    id: 't1', 
    title: '風與石系列4~放手', 
    artist: '最終你成了抓不住的遠方，而我，成了守望你背影的晴朗。', 
    category: '禎心推薦', 
    url: encodeURI(`${BASE}風與石系列4 放手-1.mp3`), 
    coverUrl: `${BASE}chen-p6.jpg` 
  },
  { 
    id: 't2', 
    title: '風與石系列2~遠行', 
    artist: '我不曾離去，而你正要遠行。', 
    category: '放鬆', 
    url: encodeURI(`${BASE}風與石系列2 遠行.mp3`), 
    coverUrl: `${BASE}chen-p6.jpg` 
  },
  { 
    id: 't3', 
    title: '與自己相遇 4', 
    artist: '光影交織，溫暖如昨。', 
    category: '冥想', 
    url: encodeURI(`${BASE}在旋律中與自己相遇4.mp3`), 
    coverUrl: `${BASE}chen-p5.jpg` 
  },
  { 
    id: 't4', 
    title: '與自己相遇 3', 
    artist: '心安了，便是一生瀟灑。', 
    category: '溫暖', 
    url: encodeURI(`${BASE}在旋律中與自己相遇3.mp3`), 
    coverUrl: `${BASE}chen-p5.jpg` 
  },
  { 
    id: 't5', 
    title: '溫暖療癒系 1', 
    artist: '所有的流浪，都是為了此刻的停泊。', 
    category: '放鬆', 
    url: encodeURI(`${BASE}溫暖療癒系1.mp3`), 
    coverUrl: `${BASE}chen-p4.jpg` 
  },
  { 
    id: 't7', 
    title: '溫暖療癒系 5', 
    artist: '在音符裡安放所有憂傷。', 
    category: '冥想', 
    url: encodeURI(`${BASE}溫暖療癒系5.mp3`), 
    coverUrl: `${BASE}chen-p4.jpg` 
  },
  { 
    id: 't8', 
    title: '風地與水協奏 1', 
    artist: '像風掠過水，滋潤大地。', 
    category: '溫暖', 
    url: encodeURI(`${BASE}風地與水協奏1.mp3`), 
    coverUrl: `${BASE}chen-p3.jpg` 
  },
  { 
    id: 't9', 
    title: '風地與水協奏 3', 
    artist: '當旋律蔓延成最好的相遇。', 
    category: '明亮', 
    url: encodeURI(`${BASE}風地與水協奏3.mp3`), 
    coverUrl: `${BASE}chen-p3.jpg` 
  },
  { 
    id: 't10', 
    title: '溪語情書 5', 
    artist: '順著蜿蜒的旋律而行，前方便是燈火。', 
    category: '放鬆', 
    url: encodeURI(`${BASE}溪語情書5.mp3`), 
    coverUrl: `${BASE}chen-p2.jpg` 
  },
  { 
    id: 't6', 
    title: '溪語情書 2', 
    artist: '靈魂很輕，世界很遠，而你就在懷裡。', 
    category: '明亮', 
    url: encodeURI(`${BASE}溪語情書2.mp3`), 
    coverUrl: `${BASE}chen-p2.jpg` 
  },
  {
    id: 't13',
    title: '月光 1',
    artist: '妳是萬物夢境裡永不乾枯的泉源。',
    category: '放鬆',
    url: encodeURI(`${BASE}月光1.mp3`),
    coverUrl: `${BASE}chen-p1.jpg`
  },
  {
    id: 't14',
    title: '月光 3',
    artist: '月色正溫柔地收攏世間所有的匆匆。',
    category: '溫暖',
    url: encodeURI(`${BASE}月光3.mp3`),
    coverUrl: `${BASE}chen-p1.jpg`
  }
];

export const ADMIN_PASSWORD = 'admin';
