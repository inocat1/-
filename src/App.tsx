/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Train,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Camera,
  Music,
  CloudRain,
  Wind,
  Headphones,
  Sliders,
  X,
  MapPin,
  Disc3,
  Sparkles,
  Info,
  Layers,
  ArrowRight,
  Eye,
  RotateCcw,
  SkipBack,
  SkipForward
} from 'lucide-react';

// ============================================================================
// ※ 請在此處直接替換成你自己的照片連結與音樂 MP3 網址 ※
// ============================================================================
export const STATIONS_DATA = [
  {
    id: 1,
    name: '平溪 (Intro)',
    romanized: 'Pingxi (Intro)',
    distance: 'K11.2',
    trackTitle: '01. 平溪',
    duration: '03:42',
    audioSrc: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
    quote: '「晨光穿不透的薄霧裡，只聽得見芒草與風的初次低語。」',
    description: '平溪線的開端，清晨的空氣帶著潮濕的鐵鏽味與山林冷露。雨絲綿延，將古老的老街屋瓦浸染成深墨色。芒草在鐵道兩側微伏，像是為這趟靜默的旅途開啟序曲。',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=1600&q=80',
        title: '晨霧中的白芒',
        caption: '平溪溪谷兩旁微風拂過的芒草叢，冷灰色的薄霧懸在山腰，水氣在草尖凝聚成露珠。',
        time: '06:40 AM',
        film: '35mm · ISO 400 · f/2.8',
        rotation: -2.5
      },
      {
        url: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?auto=format&fit=crop&w=1600&q=80',
        title: '單軌與水痕',
        caption: '雨水洗滌過的鐵道枕木，延伸進看不見盡頭的深綠山嵐，清晨沒有遊客的寂靜。',
        time: '07:15 AM',
        film: '35mm · ISO 200 · f/4.0',
        rotation: 1.8
      },
      {
        url: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1600&q=80',
        title: '靜謐的站台角落',
        caption: '木製長椅上落著幾片濕透的楓葉，等待第一班晨光列車緩緩滑入月台。',
        time: '07:35 AM',
        film: '35mm · ISO 400 · f/2.0',
        rotation: -1.2
      },
      {
        url: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1600&q=80',
        title: '山徑苔石',
        caption: '被雨林覆蓋的古老石階，青苔在陰暗光影中閃著微光，滴水聲如琴音。',
        time: '07:50 AM',
        film: '35mm · ISO 400 · f/2.8',
        rotation: 2.4
      }
    ]
  },
  {
    id: 2,
    name: '暖暖',
    romanized: 'Nuannuan',
    distance: 'K0.0',
    trackTitle: '02. 兩日',
    duration: '04:15',
    audioSrc: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3',
    quote: '「小站靜默如昨，基隆河的流水洗刷著歲月的青苔。」',
    description: '小小的無人小站，緊依著平緩的溪流。水氣沉重而溫柔，空氣中瀰漫著舊式柴油車頭殘留的氣味與潮濕木頭的微香。',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
        title: '河谷上的積雨雲',
        caption: '遠方山巒被濃密的冷灰雲層覆蓋，只露出若隱若現的林線，雨勢即將到來。',
        time: '08:20 AM',
        film: '35mm · ISO 100 · f/5.6',
        rotation: -2.0
      },
      {
        url: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1600&q=80',
        title: '車窗凝結的微滴',
        caption: '列車緩行時，窗外模糊倒映的電線桿與山影，水珠順著玻璃緩緩滑落。',
        time: '08:45 AM',
        film: '35mm · ISO 800 · f/1.4',
        rotation: 2.2
      },
      {
        url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
        title: '無人小月台',
        caption: '細雨中的水泥遮雨棚，空氣澄澈而寂寥，只有廣播偶爾傳來的輕微電流雜音。',
        time: '09:05 AM',
        film: '35mm · ISO 200 · f/3.5',
        rotation: -1.5
      }
    ]
  },
  {
    id: 3,
    name: '瑞芳',
    romanized: 'Ruifang',
    distance: 'K2.4',
    trackTitle: '03. 時雨',
    duration: '03:55',
    audioSrc: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3',
    quote: '「在山城與平原的交界，所有告別都帶著雨水的氣味。」',
    description: '從幹線分岔而出的節點，月台的雨遮發出細密清脆的滴答聲。旅人匆匆交錯，又在列車關門的提示音裡各自轉入沉默。',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1600&q=80',
        title: '交會月台',
        caption: '午後陰雨天的瑞芳月台，微弱的黃銅光暈映在積水地面，旅人各自撐著黑傘。',
        time: '09:30 AM',
        film: '35mm · ISO 400 · f/2.8',
        rotation: 1.5
      },
      {
        url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
        title: '灰調老街邊緣',
        caption: '雨傘與斑駁招牌，在冷綠基調中低調沉睡，街角飄著淡淡小吃熱氣。',
        time: '10:05 AM',
        film: '35mm · ISO 200 · f/3.5',
        rotation: -2.8
      },
      {
        url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1600&q=80',
        title: '小巷裡的石階',
        caption: '通往山腰舊礦工聚落的蜿蜒坡道，牆面上長滿了微潤的地衣。',
        time: '10:40 AM',
        film: '35mm · ISO 400 · f/2.8',
        rotation: 1.0
      }
    ]
  },
  {
    id: 4,
    name: '侯硐',
    romanized: 'Houtong',
    distance: 'K4.6',
    trackTitle: '04. 貓村',
    duration: '04:30',
    audioSrc: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_bb630cc098.mp3',
    quote: '「舊煤倉崩塌的石階上，蜷縮著一隻聽著落雨入睡的貓。」',
    description: '昔日煤礦的黑色骨架依然矗立在河對岸，如今成了貓與青苔的棲息所。鋼構生鏽、磚石染苔，時間在這裡以極慢的節奏凝固。',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1600&q=80',
        title: '石階上的沉睡',
        caption: '在無聲的陰冷午後，貓在廢棄煤廠的陰影下安詳閉目，呼吸輕柔。',
        time: '11:15 AM',
        film: '35mm · ISO 400 · f/1.8',
        rotation: -1.8
      },
      {
        url: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1600&q=80',
        title: '煤廠斑駁磚牆',
        caption: '野蕨自牆縫破土而出，見證工業繁華後的靜默歸真。',
        time: '11:40 AM',
        film: '35mm · ISO 200 · f/4.0',
        rotation: 2.6
      },
      {
        url: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?auto=format&fit=crop&w=1600&q=80',
        title: '基隆河古運煤橋',
        caption: '架設於黑濁溪流上的鏽蝕鋼構拱橋，雲霧深鎖，見證採礦歷史。',
        time: '12:10 PM',
        film: '35mm · ISO 200 · f/5.6',
        rotation: -2.2
      }
    ]
  },
  {
    id: 5,
    name: '三貂嶺',
    romanized: 'Sandiaoling',
    distance: 'K7.2',
    trackTitle: '05. 歧路',
    duration: '05:02',
    audioSrc: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f7772f.mp3',
    quote: '「三貂嶺：廢棄的隧道口，只有水滴聲與芒草的回音。」',
    description: '公路無法直達的孤絕之站，火車緊貼著峭壁與基隆河上游急流。深幽的廢棄舊隧道中，石壁滲出的水珠滴入平靜水面，發出宛如鋼琴泛音般的清響。',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1600&q=80',
        title: '幽閉舊隧道入口',
        caption: '深綠青苔爬滿拱門，深不見底的幽暗引渡著陣陣涼風。水聲自洞內深處隱隱傳出。',
        time: '01:10 PM',
        film: '35mm · ISO 800 · f/2.0',
        rotation: 2.1
      },
      {
        url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=1600&q=80',
        title: '山壁旁的芒草束',
        caption: '高聳的芒草在落差百米的峽谷岩縫中孤傲挺立，被風吹得微微傾斜。',
        time: '01:45 PM',
        film: '35mm · ISO 400 · f/3.5',
        rotation: -2.4
      },
      {
        url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1600&q=80',
        title: '合流處的水面倒影',
        caption: '基隆河與三貂嶺瀑布交匯處，水氣如煙霧瀰漫，河石被沖刷得極為圓潤。',
        time: '02:05 PM',
        film: '35mm · ISO 100 · f/4.0',
        rotation: 1.4
      },
      {
        url: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1600&q=80',
        title: '廢棄道班房遺跡',
        caption: '爬滿野藤的紅磚牆，無聲佇立在軌道旁的林蔭中，歲月在此靜止。',
        time: '02:20 PM',
        film: '35mm · ISO 400 · f/2.8',
        rotation: -1.7
      }
    ]
  },
  {
    id: 6,
    name: '大華',
    romanized: 'Dahua',
    distance: 'K8.9',
    trackTitle: '06. 歸鄉',
    duration: '03:48',
    audioSrc: 'https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe92c21.mp3',
    quote: '「河谷裡石壺藏著千年的漩渦，列車在此刻放慢了心跳。」',
    description: '壺穴地形遍佈河床，圓滑的石臼盛接著千百年來不停流轉的山泉。列車在兩山夾峙的小彎道中徐行，車軌與落葉摩擦出微弱沙沙聲。',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1600&q=80',
        title: '深谷與石壺',
        caption: '急流打磨出的平滑石穴，幽綠的潭水深如明鏡，倒映著兩岸的蕨類植物。',
        time: '02:30 PM',
        film: '35mm · ISO 200 · f/4.5',
        rotation: -2.3
      },
      {
        url: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?auto=format&fit=crop&w=1600&q=80',
        title: '林間單軌彎道',
        caption: '鐵道切入山腹深處，濃霧中僅有車頭微光劃破昏暗。',
        time: '03:05 PM',
        film: '35mm · ISO 400 · f/2.8',
        rotation: 1.9
      },
      {
        url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=1600&q=80',
        title: '山嵐微光',
        caption: '兩側山壁合抱的狹長谷地，陽光偶爾穿透霧氣形成耶穌光。',
        time: '03:25 PM',
        film: '35mm · ISO 200 · f/5.6',
        rotation: -1.1
      }
    ]
  },
  {
    id: 7,
    name: '十分 (五分山)',
    romanized: 'Shifen (Wufenshan)',
    distance: 'K10.5',
    trackTitle: '07. 芒草',
    duration: '04:50',
    audioSrc: 'https://cdn.pixabay.com/download/audio/2022/11/06/audio_41a2732997.mp3',
    quote: '「登上海拔七百公尺，整座山脊的白芒如海浪般湧向天際。」',
    description: '從喧鬧的十分老街轉身登高，五分山步道兩側盡是翻滾的銀白芒花。天際沉甸甸的鉛灰色雲朵壓在山巒之上，彷彿伸手即可觸碰天空的孤寂。',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80',
        title: '五分山脊之芒浪',
        caption: '冷冽山風席捲山巔，千萬株芒草泛起銀灰色的壯闊波瀾，天地只剩風聲。',
        time: '03:50 PM',
        film: '35mm · ISO 100 · f/8.0',
        rotation: 2.5
      },
      {
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
        title: '遠眺陰陽海界',
        caption: '山海交界處微光傾洩，雲層撕開一道幽藍的縫隙，基隆嶼如海中孤影。',
        time: '04:15 PM',
        film: '35mm · ISO 200 · f/5.6',
        rotation: -2.1
      },
      {
        url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=1600&q=80',
        title: '風中搖曳的穗子',
        caption: '近景芒草的細密質感，在陰暗天空襯托下如銀絲閃爍。',
        time: '04:35 PM',
        film: '35mm · ISO 200 · f/2.8',
        rotation: 1.2
      }
    ]
  },
  {
    id: 8,
    name: '望古',
    romanized: 'Wanggu',
    distance: 'K11.8',
    trackTitle: '08. 山橋',
    duration: '04:10',
    audioSrc: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c350170a7b.mp3',
    quote: '「無人看守的木月台，林蔭深處有一汪碧綠的瀑布深潭。」',
    description: '平溪線最為孤寂靜謐的一隅。簡單的水泥月台與生滿雜草的站牌，沿著溪流小徑步行五分鐘，便是被原始森林環抱的望古瀑布。水滴敲擊在深潭岩石上，音色純淨空靈。',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1600&q=80',
        title: '望古清冷水簾',
        caption: '絲絹般的細小水流自懸崖垂落，潭面泛著神秘深邃的冷綠，寒氣沁人。',
        time: '04:55 PM',
        film: '35mm · ISO 100 · f/11 · 1.5s',
        rotation: -1.9
      },
      {
        url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=1600&q=80',
        title: '薄暮微光',
        caption: '樹冠篩落最後的冷灰天光，空氣中滿是苔蘚與清泉甘息。',
        time: '05:20 PM',
        film: '35mm · ISO 400 · f/2.0',
        rotation: 2.3
      },
      {
        url: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1600&q=80',
        title: '望古無人月台',
        caption: '鐵道切過山腳，安靜得只聽得見遠處竹林摩擦的窸窣響動。',
        time: '05:40 PM',
        film: '35mm · ISO 800 · f/2.8',
        rotation: -1.3
      }
    ]
  },
  {
    id: 9,
    name: 'Way home (Outro)',
    romanized: 'Way home (Outro)',
    distance: 'K12.9',
    trackTitle: '09. Way home',
    duration: '05:12',
    audioSrc: 'https://cdn.pixabay.com/download/audio/2022/05/16/audio_dbb2169b18.mp3',
    quote: '「黃昏染灰了車窗，我們把整座濕潤的山留給了夜色。」',
    description: '返程的列車車廂裡，昏黃的吊燈在晃動中發出規律的吱呀聲。窗外的山景漸漸融化於深濃的墨藍與夜靄之中。這趟以芒草為名的探索在此劃下句點，卻在耳畔留下了長久的餘溫。',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1600&q=80',
        title: '夜色浸染的車窗',
        caption: '回程列車的昏黃燈暈，映著窗外模糊掠過的深黑山林。',
        time: '06:15 PM',
        film: '35mm · ISO 1600 · f/1.4',
        rotation: 2.0
      },
      {
        url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80',
        title: '晚風中的最後剪影',
        caption: '夜色降臨前，山頭芒草在冷風中做最後一次無聲揮手。',
        time: '06:40 PM',
        film: '35mm · ISO 800 · f/2.8',
        rotation: -2.5
      },
      {
        url: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?auto=format&fit=crop&w=1600&q=80',
        title: '終點站的夜霧軌道',
        caption: '車燈熄滅之後，鐵軌在微弱街燈下閃著冰冷的銀色幽光。',
        time: '07:05 PM',
        film: '35mm · ISO 3200 · f/1.4',
        rotation: 1.6
      }
    ]
  }
];

export default function App() {
  const [currentStationIndex, setCurrentStationIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Independent Dual Audio Controls
  const [musicVolume, setMusicVolume] = useState(0.8);
  const [isMusicMuted, setIsMusicMuted] = useState(false);
  
  const [ambientVolume, setAmbientVolume] = useState(0.65);
  const [isAmbientMuted, setIsAmbientMuted] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(240);
  const [isLooping, setIsLooping] = useState(false);
  const [isAutoJourney, setIsAutoJourney] = useState(false);

  // Active inspected photo on the table
  const [inspectedPhoto, setInspectedPhoto] = useState<{
    url: string;
    title: string;
    caption: string;
    time?: string;
    film?: string;
    rotation?: number;
    stationName?: string;
    stationId?: number;
  } | null>(null);

  // Lightbox full-screen view
  const [lightboxPhoto, setLightboxPhoto] = useState<{
    url: string;
    title: string;
    caption: string;
    time?: string;
    film?: string;
  } | null>(null);

  // Ambient soundscape layers toggles
  const [ambientRain, setAmbientRain] = useState(true);
  const [ambientTrain, setAmbientTrain] = useState(false);
  const [ambientTape, setAmbientTape] = useState(true);
  const [ambientWind, setAmbientWind] = useState(false);
  const [showMixer, setShowMixer] = useState(false);

  // Table photo view mode: 'current' (current station photos) or 'all' (all stations on the grand table)
  const [deskViewMode, setDeskViewMode] = useState<'current' | 'all'>('current');

  // Primary HTML5 Audio ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Web Audio Context & Synthesizer node refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterAmbientGainRef = useRef<GainNode | null>(null);
  const rainGainRef = useRef<GainNode | null>(null);
  const tapeGainRef = useRef<GainNode | null>(null);
  const trainGainRef = useRef<GainNode | null>(null);
  const windGainRef = useRef<GainNode | null>(null);
  const pianoSynthTimerRef = useRef<number | null>(null);

  const currentStation = STATIONS_DATA[currentStationIndex];

  // Initialize Web Audio ambient synthesizer
  const initWebAudio = () => {
    if (audioCtxRef.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterAmbientGain = ctx.createGain();
      masterAmbientGain.gain.value = isAmbientMuted ? 0 : ambientVolume;
      masterAmbientGain.connect(ctx.destination);
      masterAmbientGainRef.current = masterAmbientGain;

      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      // Rain
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;
      const rainFilter = ctx.createBiquadFilter();
      rainFilter.type = 'lowpass';
      rainFilter.frequency.value = 850;
      const rainGain = ctx.createGain();
      rainGain.gain.value = ambientRain ? 0.08 : 0;
      whiteNoise.connect(rainFilter);
      rainFilter.connect(rainGain);
      rainGain.connect(masterAmbientGain);
      whiteNoise.start(0);
      rainGainRef.current = rainGain;

      // Tape Hiss
      const tapeSource = ctx.createBufferSource();
      tapeSource.buffer = noiseBuffer;
      tapeSource.loop = true;
      const tapeFilter = ctx.createBiquadFilter();
      tapeFilter.type = 'highpass';
      tapeFilter.frequency.value = 1400;
      const tapeGain = ctx.createGain();
      tapeGain.gain.value = ambientTape ? 0.022 : 0;
      tapeSource.connect(tapeFilter);
      tapeFilter.connect(tapeGain);
      tapeGain.connect(masterAmbientGain);
      tapeSource.start(0);
      tapeGainRef.current = tapeGain;

      // Train track
      const trainGain = ctx.createGain();
      trainGain.gain.value = ambientTrain ? 0.1 : 0;
      trainGain.connect(masterAmbientGain);
      trainGainRef.current = trainGain;

      // Wind
      const windSource = ctx.createBufferSource();
      windSource.buffer = noiseBuffer;
      windSource.loop = true;
      const windFilter = ctx.createBiquadFilter();
      windFilter.type = 'bandpass';
      windFilter.frequency.value = 320;
      windFilter.Q.value = 2.5;
      const windGain = ctx.createGain();
      windGain.gain.value = ambientWind ? 0.09 : 0;
      windSource.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(masterAmbientGain);
      windSource.start(0);
      windGainRef.current = windGain;

    } catch (e) {
      console.warn('Web Audio Ambient synthesis deferred:', e);
    }
  };

  useEffect(() => {
    if (masterAmbientGainRef.current && audioCtxRef.current) {
      const targetGain = (isAmbientMuted || !isPlaying) ? 0 : ambientVolume;
      masterAmbientGainRef.current.gain.setTargetAtTime(targetGain, audioCtxRef.current.currentTime, 0.15);
    }
  }, [ambientVolume, isAmbientMuted, isPlaying]);

  useEffect(() => {
    if (rainGainRef.current && audioCtxRef.current) {
      rainGainRef.current.gain.setTargetAtTime(ambientRain ? 0.08 : 0, audioCtxRef.current.currentTime, 0.2);
    }
    if (tapeGainRef.current && audioCtxRef.current) {
      tapeGainRef.current.gain.setTargetAtTime(ambientTape ? 0.022 : 0, audioCtxRef.current.currentTime, 0.2);
    }
    if (windGainRef.current && audioCtxRef.current) {
      windGainRef.current.gain.setTargetAtTime(ambientWind ? 0.09 : 0, audioCtxRef.current.currentTime, 0.2);
    }
    if (trainGainRef.current && audioCtxRef.current) {
      trainGainRef.current.gain.setTargetAtTime(ambientTrain ? 0.1 : 0, audioCtxRef.current.currentTime, 0.2);
    }
  }, [ambientRain, ambientTape, ambientWind, ambientTrain]);

  useEffect(() => {
    let intervalId: number | null = null;
    if (ambientTrain && isPlaying && !isAmbientMuted && audioCtxRef.current && masterAmbientGainRef.current) {
      const playClick = () => {
        if (!audioCtxRef.current || !masterAmbientGainRef.current) return;
        const now = audioCtxRef.current.currentTime;
        [0, 0.12].forEach((offset) => {
          if (!audioCtxRef.current || !masterAmbientGainRef.current) return;
          const osc = audioCtxRef.current.createOscillator();
          const gain = audioCtxRef.current.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(95, now + offset);
          osc.frequency.exponentialRampToValueAtTime(35, now + offset + 0.07);
          gain.gain.setValueAtTime(0.04, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.08);
          osc.connect(gain);
          gain.connect(masterAmbientGainRef.current);
          osc.start(now + offset);
          osc.stop(now + offset + 0.09);
        });
      };
      intervalId = window.setInterval(playClick, 1400);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [ambientTrain, isPlaying, isAmbientMuted]);

  const fadeRafRef = useRef<number | null>(null);

  // Smooth Fade-In for audio playback
  const fadeInAudio = (targetVol = musicVolume, durationMs = 2600) => {
    if (fadeRafRef.current) {
      cancelAnimationFrame(fadeRafRef.current);
      fadeRafRef.current = null;
    }
    const audio = audioRef.current;
    if (!audio) return;
    if (isMusicMuted) {
      audio.volume = 0;
      return;
    }

    audio.volume = 0;
    const startTime = performance.now();

    const step = (now: number) => {
      if (!audioRef.current || isMusicMuted) return;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Cubic ease-out curve for gentle, natural acoustic swell
      const ease = 1 - Math.pow(1 - progress, 3);
      audioRef.current.volume = Math.min(Math.max(targetVol * ease, 0), 1);

      if (progress < 1) {
        fadeRafRef.current = requestAnimationFrame(step);
      } else {
        audioRef.current.volume = targetVol;
        fadeRafRef.current = null;
      }
    };

    fadeRafRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    if (audioRef.current && !fadeRafRef.current) {
      audioRef.current.volume = isMusicMuted ? 0 : musicVolume;
    }
  }, [musicVolume, isMusicMuted]);

  // Audio Playback effect for station change with Fade-In
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = currentStation.audioSrc;
    audio.load();

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            fadeInAudio(musicVolume, 2600);
          })
          .catch(() => {
            startGenerativePianoBackup();
          });
      }
    }
  }, [currentStationIndex]);

  // Fallback generative piano
  const startGenerativePianoBackup = () => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (pianoSynthTimerRef.current) return;

    const chords = [
      [155.56, 196.0, 233.08, 293.66],
      [196.0, 233.08, 293.66, 349.23],
      [207.65, 261.63, 311.13, 392.0],
      [233.08, 293.66, 349.23, 440.0]
    ];
    let chordIdx = 0;

    const playChord = () => {
      if (!audioCtxRef.current || !isPlaying || isMusicMuted) return;
      const chord = chords[chordIdx % chords.length];
      chordIdx++;
      const now = ctx.currentTime;

      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.value = freq;
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600 + Math.random() * 200, now);
        filter.frequency.exponentialRampToValueAtTime(250, now + 4.5);

        gain.gain.setValueAtTime(0.001, now);
        const effectiveVol = (isMusicMuted ? 0 : musicVolume) * 0.04;
        gain.gain.linearRampToValueAtTime(effectiveVol - idx * 0.004, now + 0.15 + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + 6.0);
      });
    };

    playChord();
    pianoSynthTimerRef.current = window.setInterval(playChord, 5200);
  };

  const togglePlay = () => {
    initWebAudio();
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    if (!isPlaying) {
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            fadeInAudio(musicVolume, 2200);
          })
          .catch(() => {
            startGenerativePianoBackup();
          });
      }
    } else {
      setIsPlaying(false);
      if (fadeRafRef.current) {
        cancelAnimationFrame(fadeRafRef.current);
        fadeRafRef.current = null;
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (pianoSynthTimerRef.current) {
        clearInterval(pianoSynthTimerRef.current);
        pianoSynthTimerRef.current = null;
      }
    }
  };

  const goToStation = (index: number) => {
    if (index >= 0 && index < STATIONS_DATA.length) {
      setCurrentStationIndex(index);
      if (!isPlaying) {
        setIsPlaying(true);
        initWebAudio();
        if (audioCtxRef.current?.state === 'suspended') {
          audioCtxRef.current.resume();
        }
      }
    }
  };

  const handleNextStation = () => {
    goToStation((currentStationIndex + 1) % STATIONS_DATA.length);
  };

  const handlePrevStation = () => {
    goToStation((currentStationIndex - 1 + STATIONS_DATA.length) % STATIONS_DATA.length);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  const handleStartJourney = () => {
    initWebAudio();
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          fadeInAudio(musicVolume, 2500);
        })
        .catch(() => {
          startGenerativePianoBackup();
        });
    }

    const railwaySection = document.getElementById('photo-desk');
    if (railwaySection) {
      railwaySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    let timer: number | null = null;
    if (isAutoJourney && isPlaying) {
      timer = window.setInterval(() => {
        setCurrentStationIndex((prev) => (prev + 1) % STATIONS_DATA.length);
      }, 45000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isAutoJourney, isPlaying]);

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const onEnded = () => {
    if (isLooping) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      handleNextStation();
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // List of photos currently displayed on the table
  const displayedPhotos = useMemo(() => {
    if (deskViewMode === 'current') {
      return currentStation.photos.map((p) => ({
        ...p,
        stationName: currentStation.name,
        stationId: currentStation.id
      }));
    } else {
      // All stations combined on the grand table
      return STATIONS_DATA.flatMap((st) =>
        st.photos.map((p) => ({
          ...p,
          stationName: st.name,
          stationId: st.id
        }))
      );
    }
  }, [deskViewMode, currentStation]);

  // Handle switching photos inside inspector
  const handleInspectNext = () => {
    if (!inspectedPhoto) return;
    const currentIndex = displayedPhotos.findIndex((p) => p.url === inspectedPhoto.url);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % displayedPhotos.length;
      setInspectedPhoto(displayedPhotos[nextIndex]);
    }
  };

  const handleInspectPrev = () => {
    if (!inspectedPhoto) return;
    const currentIndex = displayedPhotos.findIndex((p) => p.url === inspectedPhoto.url);
    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + displayedPhotos.length) % displayedPhotos.length;
      setInspectedPhoto(displayedPhotos[prevIndex]);
    }
  };

  return (
    <div className="min-h-screen bg-[#121316] text-[#dcdee0] relative font-sans selection:bg-stone-800 selection:text-stone-200">
      {/* 35mm Film Grain Texture */}
      <div className="film-grain" />

      {/* Hidden HTML5 Audio Element for Music */}
      <audio
        ref={audioRef}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
        onError={() => {
          startGenerativePianoBackup();
        }}
      />

      {/* =========================================================================
          Top Bar: Strictly adheres to Top Bar Contract
         ========================================================================= */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#121316]/85 border-b border-white/[0.06] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Wordmark with Swei Spring Title */}
          <a
            href="#hero"
            className="font-swei-spring text-xl tracking-[0.22em] text-stone-100 font-normal hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span>《芒草》</span>
            <span className="text-[11px] font-sans text-stone-500 tracking-[0.2em] uppercase hidden sm:inline">
              Pingxi Line
            </span>
          </a>

          {/* Zone 2: Concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-xs tracking-widest text-stone-400 font-light">
            <a href="#hero" className="hover:text-stone-200 transition-colors whitespace-nowrap shrink-0">
              序幕 · 芒草
            </a>
            <a href="#photo-desk" className="hover:text-stone-200 transition-colors whitespace-nowrap shrink-0">
              寫真桌面
            </a>
            <a href="#railway-track" className="hover:text-stone-200 transition-colors whitespace-nowrap shrink-0">
              鐵道路線
            </a>
            <a href="#liner-notes" className="hover:text-stone-200 transition-colors whitespace-nowrap shrink-0">
              底片手記
            </a>
          </nav>

          {/* Zone 3: 1 primary action (Mixer Drawer & Quick Play/Pause) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowMixer(!showMixer)}
              title="調校環境雨聲與底噪"
              className={`p-2 rounded-md transition-colors text-xs flex items-center gap-1.5 border border-white/5 ${
                showMixer ? 'bg-stone-800 text-stone-200' : 'bg-stone-900/60 text-stone-400 hover:text-stone-200'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 stroke-[1.5]" />
              <span className="hidden sm:inline text-[11px] tracking-wider">音場混音</span>
            </button>

            <button
              onClick={togglePlay}
              className="px-3.5 py-1.5 rounded-md bg-stone-800/90 hover:bg-stone-700/90 text-stone-200 text-xs tracking-wider transition-all duration-300 flex items-center gap-2 border border-white/10 shrink-0"
            >
              {isPlaying ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-600/80 animate-pulse" />
                  <Pause className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span className="whitespace-nowrap font-mono text-[11px]">PAUSE</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span className="whitespace-nowrap font-mono text-[11px]">PLAY</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Ambient Sound Mixer Drawer */}
        {showMixer && (
          <div className="border-t border-white/[0.06] bg-[#15171a]/95 px-6 py-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6 text-xs text-stone-400">
              <div className="flex items-center gap-2 text-stone-300 font-poetry tracking-widest">
                <Headphones className="w-3.5 h-3.5 text-stone-400" />
                <span>環境聲音層疊（鐵道現場自然音訊）</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <button
                  onClick={() => setAmbientRain(!ambientRain)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
                    ambientRain ? 'text-stone-200 bg-stone-800 border border-white/10' : 'text-stone-500 hover:text-stone-300'
                  }`}
                >
                  <CloudRain className="w-3.5 h-3.5" />
                  <span>鐵道細雨 {ambientRain ? '開' : '關'}</span>
                </button>

                <button
                  onClick={() => setAmbientTape(!ambientTape)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
                    ambientTape ? 'text-stone-200 bg-stone-800 border border-white/10' : 'text-stone-500 hover:text-stone-300'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>卡帶底噪 {ambientTape ? '開' : '關'}</span>
                </button>

                <button
                  onClick={() => setAmbientTrain(!ambientTrain)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
                    ambientTrain ? 'text-stone-200 bg-stone-800 border border-white/10' : 'text-stone-500 hover:text-stone-300'
                  }`}
                >
                  <Train className="w-3.5 h-3.5" />
                  <span>枕木節奏 {ambientTrain ? '開' : '關'}</span>
                </button>

                <button
                  onClick={() => setAmbientWind(!ambientWind)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
                    ambientWind ? 'text-stone-200 bg-stone-800 border border-white/10' : 'text-stone-500 hover:text-stone-300'
                  }`}
                >
                  <Wind className="w-3.5 h-3.5" />
                  <span>谷底山風 {ambientWind ? '開' : '關'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          【開場封面 / Hero Section】
          Background: 山林的照片 (Misty Mountain Forest)
          Title: 最大的芒草標題字體：松韻 TC (font-songyun)
         ========================================================================= */}
      <section
        id="hero"
        className="relative min-h-[92vh] flex flex-col items-center justify-center px-6 overflow-hidden text-center"
      >
        {/* Mountain Forest Background (山林的照片) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2400&q=80"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover filter contrast-[0.92] brightness-[0.32] saturate-[0.8] animate-breath"
          />
          <div className="absolute inset-0 vignette-radial" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#121316]/75 via-transparent to-[#121316]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-3 text-xs tracking-[0.35em] text-stone-400 mb-6 font-light uppercase">
            <span>Pingxi Line</span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span>Audiovisual Journey</span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span>Album 2026</span>
          </div>

          {/* 最大的芒草標題字體：松韻 TC (font-songyun) */}
          <h1 className="font-songyun text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] tracking-[0.24em] font-normal text-stone-100 mb-6 select-none drop-shadow-2xl">
            芒草
          </h1>

          <p className="font-poetry text-base sm:text-xl text-stone-300 font-light tracking-[0.25em] max-w-xl mx-auto leading-relaxed mb-10">
            沿著平溪線，在陰天與微霧中的探索
          </p>

          {/* Board Train / Start Listening CTA Button */}
          <button
            onClick={handleStartJourney}
            className="group relative px-8 py-3.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-white/15 transition-all duration-500 hover:border-white/30 hover:scale-[1.02] flex items-center gap-3 shadow-2xl backdrop-blur-sm cursor-pointer"
          >
            <Train className="w-4 h-4 stroke-[1.5] text-stone-400 group-hover:text-stone-100 transition-colors group-hover:translate-x-0.5 duration-300" />
            <span className="font-poetry tracking-[0.2em] text-sm text-stone-200 group-hover:text-white transition-colors">
              乘上列車 · 檢視寫真桌面
            </span>
            <span className="text-[11px] font-mono tracking-widest text-stone-400 ml-1">
              (Inspect Desk)
            </span>
          </button>

          <div className="mt-16 flex flex-col items-center gap-2 text-[11px] text-stone-400 tracking-[0.3em] font-light">
            <span className="uppercase">Scroll to inspect table</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-stone-500 to-transparent animate-pulse" />
          </div>
        </div>
      </section>

      {/* =========================================================================
          【核心互動：照片真正攤在桌上 (Photographic Desk Workbench)】
          The photos are physically laid out / scattered on a darkroom desk!
          Clicking any photo opens its detailed view & story right here.
         ========================================================================= */}
      <section
        id="photo-desk"
        className="py-16 px-6 desk-surface border-t border-b border-white/[0.08] relative min-h-[90vh]"
      >
        <div className="max-w-7xl mx-auto">
          
          {/* Desk Header & Station Archival Dossier */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-stone-400 tracking-widest uppercase mb-1.5">
                <span className="px-2 py-0.5 rounded bg-stone-900/90 border border-white/10 text-stone-300">
                  DOSSIER #{currentStation.id < 10 ? `0${currentStation.id}` : currentStation.id}
                </span>
                <span aria-hidden="true">·</span>
                <span>{currentStation.distance}</span>
                <span aria-hidden="true">·</span>
                <span className="text-amber-400/80">35MM DARKROOM PROOFS</span>
              </div>
              <h2 className="font-swei-spring text-3xl sm:text-4xl text-stone-100 tracking-[0.18em] font-normal flex items-center gap-3">
                <span>{currentStation.name}</span>
                <span className="text-sm font-sans text-stone-400 font-light tracking-widest uppercase">
                  / {currentStation.romanized}
                </span>
              </h2>
              <p className="font-poetry text-stone-300 text-sm tracking-[0.15em] mt-2 italic max-w-2xl">
                {currentStation.quote}
              </p>
            </div>

            {/* Desk Controls & View Mode Toggles */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center p-1 bg-stone-900/80 rounded-lg border border-white/10 text-xs font-poetry">
                <button
                  onClick={() => setDeskViewMode('current')}
                  className={`px-3 py-1.5 rounded transition-colors ${
                    deskViewMode === 'current'
                      ? 'bg-stone-800 text-stone-100 shadow-sm'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  本站桌面 ({currentStation.photos.length} 張)
                </button>
                <button
                  onClick={() => setDeskViewMode('all')}
                  className={`px-3 py-1.5 rounded transition-colors ${
                    deskViewMode === 'all'
                      ? 'bg-stone-800 text-stone-100 shadow-sm'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  全線大桌 (30+ 張總覽)
                </button>
              </div>

              {/* Station Step Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrevStation}
                  className="px-3 py-1.5 rounded bg-stone-900/80 hover:bg-stone-800 border border-white/10 text-xs text-stone-300 flex items-center gap-1 transition-colors"
                  title="上一站"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>前一站</span>
                </button>
                <button
                  onClick={handleNextStation}
                  className="px-3 py-1.5 rounded bg-stone-900/80 hover:bg-stone-800 border border-white/10 text-xs text-stone-300 flex items-center gap-1 transition-colors"
                  title="下一站"
                >
                  <span>下一站</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Instruction Banner */}
          <div className="mb-8 flex items-center justify-between text-xs text-stone-400 tracking-wider font-poetry">
            <span className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-400/80" />
              <span>照片已自然攤在暗房桌上，點擊任一張照片即可查看詳細拍攝記錄與手記</span>
            </span>
            <span className="font-mono text-[11px] text-stone-500 hidden sm:inline">
              TABLE PROOFS: {displayedPhotos.length} PRINTS
            </span>
          </div>

          {/* ===================================================================
              THE DESK TABLE (照片攤在桌上的真實排版)
             =================================================================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10 py-6 px-2">
            {displayedPhotos.map((photo, pIdx) => {
              const rotation = photo.rotation || (pIdx % 2 === 0 ? -1.8 : 2.0);
              return (
                <div
                  key={`${photo.url}-${pIdx}`}
                  onClick={() => setInspectedPhoto(photo)}
                  className="relative group cursor-pointer"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  {/* Masking tape on corner */}
                  <div className={`masking-tape ${pIdx % 2 === 0 ? '-top-2 left-6 rotate-[-5deg]' : '-top-2 right-6 rotate-[7deg]'}`} />

                  {/* Physical Photo Paper Card with Authentic White Margin */}
                  <div className="photo-print p-3 pb-5 rounded-sm bg-[#faf9f5] text-stone-900 flex flex-col">
                    {/* Visual Photo Area */}
                    <div className="relative aspect-[4/3] bg-stone-900 overflow-hidden shadow-inner">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover filter contrast-[0.93] brightness-[0.88] saturate-[0.88] transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      {/* Subtle filmic dark vignette inside photo */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-70 group-hover:opacity-40 transition-opacity" />

                      {/* Hover action prompt */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[1px]">
                        <span className="px-3 py-1.5 rounded-full bg-stone-900/90 text-stone-100 text-[11px] font-poetry tracking-widest flex items-center gap-1.5 shadow-xl border border-white/20">
                          <Eye className="w-3.5 h-3.5 text-amber-300" />
                          <span>點擊閱覽說明</span>
                        </span>
                      </div>
                    </div>

                    {/* Handwritten Pencil Notes on the bottom white margin */}
                    <div className="mt-3.5 px-1 flex flex-col justify-between">
                      <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 tracking-wider">
                        <span>{photo.stationName || currentStation.name}</span>
                        <span>{photo.time || '35MM'}</span>
                      </div>
                      <h4 className="font-poetry text-stone-800 text-sm font-semibold tracking-wider mt-1 truncate">
                        {photo.title}
                      </h4>
                      <p className="text-[11px] text-stone-600 font-poetry truncate mt-0.5">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ===================================================================
              DUAL-CHANNEL AUDIO CONSOLE PINNED ON THE DESK
             =================================================================== */}
          <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#17191d]/90 border border-white/[0.08] shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              
              {/* Left: Track Information & Vinyl Disc */}
              <div className="flex items-center gap-5 w-full lg:w-auto">
                <div className="relative w-14 h-14 rounded-full bg-stone-900 border border-stone-700/60 flex items-center justify-center shrink-0 shadow-inner">
                  <Disc3
                    className={`w-7 h-7 text-stone-400 transition-transform duration-700 ${
                      isPlaying ? 'animate-spin' : ''
                    }`}
                    style={{ animationDuration: '6s' }}
                  />
                  <div className="absolute w-2 h-2 rounded-full bg-stone-300" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono tracking-wider text-amber-400/90 uppercase">
                      DESK AUDIO TRACK
                    </span>
                    {isPlaying && (
                      <span className="flex items-center gap-0.5 h-3">
                        <span className="w-0.5 h-3 bg-stone-400 animate-pulse" />
                        <span className="w-0.5 h-2 bg-stone-400 animate-pulse delay-75" />
                        <span className="w-0.5 h-4 bg-stone-400 animate-pulse delay-150" />
                      </span>
                    )}
                  </div>
                  <h4 className="font-swei-spring text-stone-100 text-base sm:text-lg tracking-wider truncate">
                    {currentStation.trackTitle}
                  </h4>
                  <p className="text-xs text-stone-400 tracking-wider font-poetry">
                    {currentStation.name}
                  </p>
                </div>

                {/* Station & Playback Controls: Prev Station, Play/Pause, Next Station */}
                <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                  <button
                    onClick={handlePrevStation}
                    className="group px-3 py-2 rounded-full bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-white border border-white/10 flex items-center gap-1.5 transition-all duration-200 hover:scale-105 active:scale-95 shadow-md cursor-pointer"
                    title={`上一站：${STATIONS_DATA[(currentStationIndex - 1 + STATIONS_DATA.length) % STATIONS_DATA.length].name}`}
                    aria-label="上一站"
                  >
                    <SkipBack className="w-4 h-4 stroke-[2]" />
                    <span className="hidden sm:inline text-xs font-poetry tracking-wider">上一站</span>
                  </button>

                  <button
                    onClick={togglePlay}
                    className="w-12 h-12 rounded-full bg-stone-200 text-stone-900 hover:bg-white flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
                    title={isPlaying ? '暫停' : '播放'}
                    aria-label={isPlaying ? '暫停' : '播放'}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 stroke-[2] fill-stone-900" />
                    ) : (
                      <Play className="w-5 h-5 stroke-[2] fill-stone-900 ml-0.5" />
                    )}
                  </button>

                  <button
                    onClick={handleNextStation}
                    className="group px-3 py-2 rounded-full bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-white border border-white/10 flex items-center gap-1.5 transition-all duration-200 hover:scale-105 active:scale-95 shadow-md cursor-pointer"
                    title={`下一站：${STATIONS_DATA[(currentStationIndex + 1) % STATIONS_DATA.length].name}`}
                    aria-label="下一站"
                  >
                    <span className="hidden sm:inline text-xs font-poetry tracking-wider">下一站</span>
                    <SkipForward className="w-4 h-4 stroke-[2]" />
                  </button>
                </div>
              </div>

              {/* Center: Scrubber */}
              <div className="w-full lg:max-w-xs space-y-1">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-stone-300 focus:outline-none"
                />
                <div className="flex justify-between text-[11px] font-mono text-stone-400 tracking-wider">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Right: Independent Dual Audio Controls (音樂與環境音分開控制) */}
              <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-4">
                {/* Music Slider */}
                <div className="flex items-center gap-2 bg-stone-900/80 px-3 py-2 rounded-lg border border-white/5 w-full sm:w-auto">
                  <button
                    onClick={() => setIsMusicMuted(!isMusicMuted)}
                    className={`p-1 rounded transition-colors ${
                      isMusicMuted ? 'text-rose-400' : 'text-stone-300 hover:text-white'
                    }`}
                    title={isMusicMuted ? '音樂取消靜音' : '音樂靜音'}
                  >
                    {isMusicMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                  <span className="text-[11px] font-poetry text-stone-300 whitespace-nowrap">音樂</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMusicMuted ? 0 : musicVolume}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      setMusicVolume(v);
                      if (isMusicMuted) setIsMusicMuted(false);
                    }}
                    className="w-20 h-1 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-stone-300"
                  />
                  <span className="text-[10px] font-mono text-stone-400 w-7 text-right">
                    {isMusicMuted ? '0%' : `${Math.round(musicVolume * 100)}%`}
                  </span>
                </div>

                {/* Ambient Slider */}
                <div className="flex items-center gap-2 bg-stone-900/80 px-3 py-2 rounded-lg border border-white/5 w-full sm:w-auto">
                  <button
                    onClick={() => setIsAmbientMuted(!isAmbientMuted)}
                    className={`p-1 rounded transition-colors ${
                      isAmbientMuted ? 'text-rose-400' : 'text-stone-300 hover:text-white'
                    }`}
                    title={isAmbientMuted ? '環境音取消靜音' : '環境音靜音'}
                  >
                    {isAmbientMuted ? <VolumeX className="w-3.5 h-3.5" /> : <CloudRain className="w-3.5 h-3.5" />}
                  </button>
                  <span className="text-[11px] font-poetry text-stone-300 whitespace-nowrap">雨聲底噪</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isAmbientMuted ? 0 : ambientVolume}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      setAmbientVolume(v);
                      if (isAmbientMuted) setIsAmbientMuted(false);
                    }}
                    className="w-20 h-1 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-stone-300"
                  />
                  <span className="text-[10px] font-mono text-stone-400 w-7 text-right">
                    {isAmbientMuted ? '0%' : `${Math.round(ambientVolume * 100)}%`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          【相片詳細手記檢視 (Photo Detailed Inspector Modal)】
          Opens when clicking any photo spread on the desk.
          Audio does NOT stop!
         ========================================================================= */}
      {inspectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300"
          onClick={() => setInspectedPhoto(null)}
        >
          <div
            className="w-full max-w-4xl max-h-[92vh] bg-[#16181b] border border-white/[0.1] rounded-2xl shadow-2xl overflow-y-auto flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Inspector Header */}
            <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-[#141619]">
              <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                <span className="px-2 py-0.5 bg-stone-800 text-stone-200 rounded text-[11px]">
                  {inspectedPhoto.stationName || currentStation.name}
                </span>
                <span aria-hidden="true">·</span>
                <span>{inspectedPhoto.time || '35MM FILM ARCHIVE'}</span>
                <span aria-hidden="true">·</span>
                <span className="text-stone-400">{inspectedPhoto.film || '35mm · ISO 400'}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLightboxPhoto(inspectedPhoto)}
                  className="p-1.5 rounded-md hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition-colors"
                  title="全螢幕放大"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setInspectedPhoto(null)}
                  className="p-1.5 rounded-md hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition-colors"
                  title="返回桌面"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>
            </div>

            {/* Inspector Body: Photo + Literary Story */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Photo Display */}
              <div className="md:col-span-7">
                <div
                  className="photo-print p-3 pb-6 rounded-sm bg-[#faf9f5] cursor-pointer"
                  onClick={() => setLightboxPhoto(inspectedPhoto)}
                >
                  <div className="aspect-[4/3] bg-stone-900 overflow-hidden relative">
                    <img
                      src={inspectedPhoto.url}
                      alt={inspectedPhoto.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter contrast-[0.94] brightness-[0.92]"
                    />
                  </div>
                  <div className="mt-3 text-center text-[11px] font-mono text-stone-600">
                    № {inspectedPhoto.title} · {inspectedPhoto.time}
                  </div>
                </div>
              </div>

              {/* Literary Details & Notes */}
              <div className="md:col-span-5 space-y-6">
                <div>
                  <h3 className="font-swei-spring text-2xl text-stone-100 tracking-[0.16em] mb-2 font-normal">
                    {inspectedPhoto.title}
                  </h3>
                  <div className="w-8 h-[1px] bg-stone-500 mb-4" />
                  <p className="font-poetry text-stone-300 text-sm leading-relaxed tracking-wider">
                    {inspectedPhoto.caption}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-900/60 border border-white/5 space-y-2 text-xs text-stone-400 font-poetry">
                  <div className="flex justify-between font-mono text-[11px]">
                    <span className="text-stone-500">拍攝站點</span>
                    <span className="text-stone-300">{inspectedPhoto.stationName || currentStation.name}</span>
                  </div>
                  <div className="flex justify-between font-mono text-[11px]">
                    <span className="text-stone-500">底片與光圈</span>
                    <span className="text-stone-300">{inspectedPhoto.film || '35mm · ISO 400'}</span>
                  </div>
                  <div className="flex justify-between font-mono text-[11px]">
                    <span className="text-stone-500">當前背景音樂</span>
                    <span className="text-stone-300 truncate max-w-[150px]">{currentStation.trackTitle}</span>
                  </div>
                </div>

                {/* Flip through photos on desk */}
                <div className="pt-2 flex items-center justify-between border-t border-white/5">
                  <button
                    onClick={handleInspectPrev}
                    className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-poetry flex items-center gap-1 transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>看前一張</span>
                  </button>
                  <button
                    onClick={handleInspectNext}
                    className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-poetry flex items-center gap-1 transition-colors"
                  >
                    <span>看下一張</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Inspector Footer with Quick audio reminder */}
            <div className="px-6 py-3.5 bg-[#121316] border-t border-white/[0.06] flex items-center justify-between text-xs text-stone-400">
              <span className="font-poetry">音樂與環境雨聲持續流淌中</span>
              <button
                onClick={() => setInspectedPhoto(null)}
                className="px-4 py-1.5 rounded-md bg-stone-800 text-stone-200 hover:bg-stone-700 font-poetry text-xs"
              >
                收合並放回桌上
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          【平溪線鐵路貫穿路線圖 (Railway Navigation)】
          Accurately mathematically centered so the train sits PRECISELY on the station!
         ========================================================================= */}
      <section id="railway-track" className="py-20 px-6 border-t border-white/[0.06] bg-[#111214]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-400 tracking-[0.25em] uppercase mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                <span>Pingxi Line Route Timeline · 12.9 KM</span>
              </div>
              <h2 className="font-swei-spring text-2xl sm:text-3xl tracking-[0.18em] text-stone-100 font-normal">
                平溪線鐵道路線導覽
              </h2>
            </div>

            <div className="flex items-center gap-3 text-xs tracking-wider">
              <button
                onClick={() => setIsAutoJourney(!isAutoJourney)}
                className={`px-3 py-1.5 rounded border transition-colors ${
                  isAutoJourney
                    ? 'border-emerald-700/60 text-emerald-300 bg-emerald-950/20'
                    : 'border-white/10 text-stone-400 hover:text-stone-200 hover:bg-stone-800/40'
                }`}
                title="每 45 秒自動行駛至下一站"
              >
                自動漫遊行駛：{isAutoJourney ? '開啟中' : '關閉'}
              </button>
            </div>
          </div>

          {/* Railway Track Timeline Visualization */}
          <div className="relative py-14 px-8 sm:px-14 bg-[#141619] rounded-2xl border border-white/[0.06] shadow-xl overflow-x-auto scrollbar-thin">
            <div className="min-w-[880px] relative h-28 select-none">
              
              {/* 1. Exact Rail Line Axis at fixed Y position: top-[44px] */}
              <div className="absolute top-[44px] left-[20px] right-[20px] -translate-y-1/2 h-[4px] bg-stone-700/80 rounded-full">
                {/* Active progress rail segment */}
                <div
                  className="h-full bg-stone-300 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${(currentStationIndex / 8) * 100}%` }}
                />
              </div>

              {/* 2. Cross ties pattern on the exact same axis */}
              <div
                className="absolute top-[44px] left-[20px] right-[20px] -translate-y-1/2 h-3.5 pointer-events-none opacity-25"
                style={{
                  backgroundImage: 'repeating-linear-gradient(90deg, #fff 0, #fff 2px, transparent 2px, transparent 18px)'
                }}
              />

              {/* 3. Gliding Train Indicator: Sits PRECISELY on top of the active station's circle dot */}
              <div
                className="absolute top-[44px] -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none transition-all duration-700 ease-out"
                style={{ left: `calc(20px + ${(currentStationIndex / 8)} * (100% - 40px))` }}
              >
                <div className="relative flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-stone-100 text-stone-900 flex items-center justify-center shadow-2xl shadow-black/90 ring-4 ring-[#141619] transition-transform duration-300 transform scale-105">
                    <Train className="w-4 h-4 stroke-[2]" />
                  </div>
                  {/* Subtle glowing lantern at top */}
                  <div className="absolute -top-1 w-2 h-2 rounded-full bg-amber-400 blur-[2px] opacity-90" />
                </div>
              </div>

              {/* 4. 9 Station Nodes: Exact concentric positioning on top-[44px] */}
              {STATIONS_DATA.map((st, idx) => {
                const isActive = idx === currentStationIndex;
                const isPassed = idx < currentStationIndex;
                return (
                  <button
                    key={st.id}
                    onClick={() => goToStation(idx)}
                    className="group absolute top-[44px] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer focus:outline-none"
                    style={{ left: `calc(20px + ${(idx / 8)} * (100% - 40px))` }}
                  >
                    {/* Station Number: Positioned ABOVE the rail line */}
                    <span
                      className={`absolute -top-7 text-[11px] font-mono tracking-wider transition-colors duration-300 ${
                        isActive ? 'text-stone-100 font-bold' : 'text-stone-400 group-hover:text-stone-300'
                      }`}
                    >
                      0{st.id}
                    </span>

                    {/* Station Circle Dot: Concentric with the rail line at top-[44px] */}
                    <div
                      className={`w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center bg-[#141619] ${
                        isActive
                          ? 'border-stone-100 scale-125 ring-2 ring-stone-400/60'
                          : isPassed
                          ? 'border-stone-400 group-hover:border-stone-200'
                          : 'border-stone-600 group-hover:border-stone-400'
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          isActive ? 'bg-stone-100' : isPassed ? 'bg-stone-400' : 'bg-transparent'
                        }`}
                      />
                    </div>

                    {/* Station Name: Positioned BELOW the rail line */}
                    <div className="absolute top-7 flex flex-col items-center pointer-events-none">
                      <span
                        className={`font-songyun text-xs tracking-[0.14em] whitespace-nowrap transition-all duration-300 ${
                          isActive
                            ? 'text-white font-medium scale-105'
                            : 'text-stone-400 group-hover:text-stone-200'
                        }`}
                      >
                        {st.name}
                      </span>
                      <span className="text-[10px] font-sans text-stone-500 tracking-wider mt-0.5 whitespace-nowrap opacity-70 group-hover:opacity-100 transition-opacity">
                        {st.romanized.split(' ')[0]}
                      </span>
                    </div>
                  </button>
                );
              })}

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          【手記註解 / Liner Notes & Album Concept】
         ========================================================================= */}
      <section id="liner-notes" className="py-20 px-6 border-t border-white/[0.06] bg-[#0f1012]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-stone-400 tracking-[0.25em] uppercase mb-4">
            <Info className="w-3.5 h-3.5 text-stone-400" />
            <span>Liner Notes · 專輯手記</span>
          </div>

          <h3 className="font-swei-spring text-2xl sm:text-3xl text-stone-100 tracking-[0.18em] font-normal mb-8">
            關於《芒草》：一場以微霧為名的鐵道沉思
          </h3>

          <div className="space-y-6 text-stone-400 text-sm font-light leading-relaxed font-poetry tracking-wider">
            <p>
              這張專輯的構想，源自於對台灣東北季風山林與鐵道記憶的凝望。在群山與雨霧交織的世界裡，時間不是以分秒度量，而是藉由微風吹拂草葉的弧度、窗櫺上滑落的雨珠，以及直立鋼琴琴槌撞擊氈布的微溫所記錄。
            </p>
            <p>
              台灣北部的「平溪線」鐵路，常年浸潤在潮濕多雨的氣候之中。由暖暖啟程，穿過三貂嶺幽暗的孤峰與隧道，終抵望古與菁桐的密林。秋末冬初之際，滿山滿谷的芒草在陰雨冷灰的天幕下翻滾，彷彿無聲的浪潮。
            </p>
            <p>
              我們將九個站點的鐵道實地收音、原創氛圍鋼琴與35mm底片攝影融為一體，獻給在繁忙世俗中渴望一處安靜避難所的你。你可以隨著列車的節奏一站一站聆聽，亦可透過獨立雙軌音量推桿，自由調校音樂與山林雨聲的比例。
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs text-stone-400">
            <div>
              <span className="text-stone-500 uppercase font-mono tracking-wider block mb-1">COMPOSITION</span>
              <span className="text-stone-300 font-poetry">Acoustic Piano & Ambient</span>
            </div>
            <div>
              <span className="text-stone-500 uppercase font-mono tracking-wider block mb-1">PHOTOGRAPHY</span>
              <span className="text-stone-300 font-poetry">35mm Film Archive</span>
            </div>
            <div>
              <span className="text-stone-500 uppercase font-mono tracking-wider block mb-1">LOCATION</span>
              <span className="text-stone-300 font-poetry">Pingxi Line, Taiwan</span>
            </div>
            <div>
              <span className="text-stone-500 uppercase font-mono tracking-wider block mb-1">SOUNDSCAPE</span>
              <span className="text-stone-300 font-poetry">Field Rain & Rail Acoustics</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          【全螢幕沉浸檢視 (Lightbox Modal)】
         ========================================================================= */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-6 sm:p-10 animate-in fade-in duration-300"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="w-full max-w-6xl flex items-center justify-between text-stone-400 text-xs tracking-widest z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-swei-spring text-stone-200 text-sm">{currentStation.name}</span>
              <span aria-hidden="true" className="text-stone-600">/</span>
              <span className="font-mono text-stone-400">{lightboxPhoto.time || '35MM'}</span>
            </div>

            <button
              onClick={() => setLightboxPhoto(null)}
              className="p-2 rounded-full bg-stone-900/80 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
              title="關閉檢視 (ESC)"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          <div
            className="relative max-w-5xl max-h-[75vh] w-full flex items-center justify-center my-auto overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxPhoto.url}
              alt={lightboxPhoto.title}
              referrerPolicy="no-referrer"
              className="max-h-[72vh] max-w-full object-contain rounded-md filter contrast-[0.94] brightness-[0.92] shadow-2xl border border-white/5"
            />
          </div>

          <div
            className="w-full max-w-2xl text-center z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="font-swei-spring text-stone-100 text-lg tracking-[0.2em] mb-1 font-normal">
              {lightboxPhoto.title}
            </h4>
            <p className="text-xs text-stone-400 font-light tracking-wider leading-relaxed">
              {lightboxPhoto.caption}
            </p>

            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                onClick={togglePlay}
                className="px-4 py-1.5 rounded-full bg-stone-900 border border-white/10 text-stone-300 hover:text-white text-xs flex items-center gap-2 transition-colors font-poetry"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? '音樂播放中' : '伴隨音樂欣賞'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/[0.04] bg-[#0d0e10] text-center text-xs text-stone-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-swei-spring tracking-widest text-stone-400">
            《芒草》 MISCANTHUS · 平溪線鐵路視聽旅程
          </div>
          <div className="text-[11px] font-mono text-stone-500">
            PINGXI LINE AUDIOVISUAL ARCHIVE · TAIWAN RAILWAY
          </div>
        </div>
      </footer>
    </div>
  );
}
