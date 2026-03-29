"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, GraduationCap, Users, BookOpen, ArrowRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Destination {
  name: string;
  lat: number;
  lon: number;
  color: string;
  size: number;
  flag: string;
  universities: string;
  students: string;
  courses: string;
  slug: string;
}
type LonLat   = [number, number];
interface Star { x: number; y: number; r: number; a: number; f: number }

// ─── Destination data ─────────────────────────────────────────────────────────
const DESTINATIONS: Destination[] = [
  // idx 0
  { name: "Cyprus",         lat: 35.0,  lon: 33.0,   color: "#ffaa33", size: 0.85, flag: "🇨🇾", universities: "8+",   students: "3K+",  courses: "250+",   slug: "cyprus"         },
  // idx 1
  { name: "Denmark",        lat: 56.0,  lon: 10.5,   color: "#4499ff", size: 0.95, flag: "🇩🇰", universities: "20+",  students: "8K+",  courses: "600+",   slug: "denmark"        },
  // idx 2
  { name: "Dubai",          lat: 25.2,  lon: 55.3,   color: "#ffdd00", size: 1.1,  flag: "🇦🇪", universities: "40+",  students: "12K+", courses: "800+",   slug: "dubai"          },
  // idx 3
  { name: "Estonia",        lat: 58.6,  lon: 25.0,   color: "#44ddff", size: 0.8,  flag: "🇪🇪", universities: "6+",   students: "2K+",  courses: "200+",   slug: "estonia"        },
  // idx 4
  { name: "Finland",        lat: 64.0,  lon: 26.0,   color: "#77aaff", size: 0.9,  flag: "🇫🇮", universities: "20+",  students: "6K+",  courses: "500+",   slug: "finland"        },
  // idx 5
  { name: "France",         lat: 46.0,  lon: 2.0,    color: "#8866ff", size: 1.1,  flag: "🇫🇷", universities: "70+",  students: "18K+", courses: "1,200+", slug: "france"         },
  // idx 6
  { name: "Germany",        lat: 51.0,  lon: 10.0,   color: "#bb88ff", size: 1.2,  flag: "🇩🇪", universities: "90+",  students: "22K+", courses: "1,500+", slug: "germany"        },
  // idx 7
  { name: "Greece",         lat: 39.0,  lon: 22.0,   color: "#00ccee", size: 0.9,  flag: "🇬🇷", universities: "25+",  students: "7K+",  courses: "500+",   slug: "greece"         },
  // idx 8
  { name: "Hungary",        lat: 47.2,  lon: 19.0,   color: "#ff8844", size: 0.9,  flag: "🇭🇺", universities: "25+",  students: "8K+",  courses: "600+",   slug: "hungary"        },
  // idx 9
  { name: "Ireland",        lat: 53.4,  lon: -8.0,   color: "#44ff88", size: 1.0,  flag: "🇮🇪", universities: "30+",  students: "10K+", courses: "700+",   slug: "ireland"        },
  // idx 10
  { name: "Italy",          lat: 42.5,  lon: 12.5,   color: "#55ff99", size: 1.0,  flag: "🇮🇹", universities: "80+",  students: "15K+", courses: "1,100+", slug: "italy"          },
  // idx 11
  { name: "Latvia",         lat: 56.9,  lon: 24.1,   color: "#ff55aa", size: 0.8,  flag: "🇱🇻", universities: "10+",  students: "3K+",  courses: "280+",   slug: "latvia"         },
  // idx 12
  { name: "Lithuania",      lat: 55.9,  lon: 23.9,   color: "#aaff44", size: 0.8,  flag: "🇱🇹", universities: "15+",  students: "4K+",  courses: "350+",   slug: "lithuania"      },
  // idx 13
  { name: "Malaysia",       lat: 4.2,   lon: 108.0,  color: "#00ffcc", size: 1.0,  flag: "🇲🇾", universities: "50+",  students: "14K+", courses: "900+",   slug: "malaysia"       },
  // idx 14
  { name: "Malta",          lat: 35.9,  lon: 14.5,   color: "#ffcc44", size: 0.8,  flag: "🇲🇹", universities: "5+",   students: "2K+",  courses: "180+",   slug: "malta"          },
  // idx 15
  { name: "Mauritius",      lat: -20.3, lon: 57.5,   color: "#ff88cc", size: 0.8,  flag: "🇲🇺", universities: "8+",   students: "2K+",  courses: "200+",   slug: "mauritius"      },
  // idx 16
  { name: "Netherlands",    lat: 52.1,  lon: 5.3,    color: "#ff7700", size: 1.1,  flag: "🇳🇱", universities: "40+",  students: "15K+", courses: "1,000+", slug: "netherlands"    },
  // idx 17
  { name: "Poland",         lat: 52.0,  lon: 19.0,   color: "#ff2255", size: 0.95, flag: "🇵🇱", universities: "50+",  students: "10K+", courses: "700+",   slug: "poland"         },
  // idx 18
  { name: "Singapore",      lat: 1.4,   lon: 103.8,  color: "#44aaff", size: 1.1,  flag: "🇸🇬", universities: "20+",  students: "12K+", courses: "850+",   slug: "singapore"      },
  // idx 19
  { name: "Spain",          lat: 40.0,  lon: -4.0,   color: "#ff4433", size: 1.0,  flag: "🇪🇸", universities: "70+",  students: "14K+", courses: "1,000+", slug: "spain"          },
  // idx 20
  { name: "Sweden",         lat: 62.0,  lon: 15.0,   color: "#33bbff", size: 0.95, flag: "🇸🇪", universities: "40+",  students: "9K+",  courses: "650+",   slug: "sweden"         },
  // idx 21
  { name: "Switzerland",    lat: 47.0,  lon: 8.0,    color: "#ff4466", size: 1.0,  flag: "🇨🇭", universities: "25+",  students: "8K+",  courses: "600+",   slug: "switzerland"    },
  // idx 22
  { name: "United Kingdom", lat: 51.5,  lon: -0.1,   color: "#00d4ff", size: 1.3,  flag: "🇬🇧", universities: "150+", students: "35K+", courses: "2,500+", slug: "united-kingdom" },

  // ── Extra countries to fill the globe ─────────────────────────────────────
  // North America
  // idx 23
  { name: "United States", lat: 37.0,  lon: -95.7,  color: "#00ee77", size: 1.4,  flag: "🇺🇸", universities: "200+", students: "45K+", courses: "3,500+", slug: "united-states"  },
  // idx 24
  { name: "Canada",        lat: 56.0,  lon: -106.0, color: "#ff3333", size: 1.1,  flag: "🇨🇦", universities: "80+",  students: "20K+", courses: "1,400+", slug: "canada"         },

  // South America
  // idx 25
  { name: "Brazil",        lat: -14.2, lon: -51.9,  color: "#ddff22", size: 0.9,  flag: "🇧🇷", universities: "40+",  students: "6K+",  courses: "500+",   slug: "brazil"         },
  // idx 26
  { name: "Argentina",     lat: -38.4, lon: -63.6,  color: "#77ccff", size: 0.85, flag: "🇦🇷", universities: "20+",  students: "3K+",  courses: "300+",   slug: "argentina"      },

  // Africa
  // idx 27
  { name: "South Africa",  lat: -30.6, lon: 25.0,   color: "#77ff33", size: 0.9,  flag: "🇿🇦", universities: "25+",  students: "5K+",  courses: "450+",   slug: "south-africa"   },
  // idx 28
  { name: "Egypt",         lat: 26.8,  lon: 30.8,   color: "#ffaa00", size: 0.85, flag: "🇪🇬", universities: "15+",  students: "4K+",  courses: "350+",   slug: "egypt"          },
  // idx 29
  { name: "Morocco",       lat: 31.8,  lon: -7.1,   color: "#ff6622", size: 0.8,  flag: "🇲🇦", universities: "12+",  students: "3K+",  courses: "280+",   slug: "morocco"        },

  // East / South Asia
  // idx 30
  { name: "Japan",         lat: 36.2,  lon: 138.3,  color: "#ffcc00", size: 1.1,  flag: "🇯🇵", universities: "50+",  students: "10K+", courses: "800+",   slug: "japan"          },
  // idx 31
  { name: "South Korea",   lat: 36.5,  lon: 127.9,  color: "#22ddff", size: 1.0,  flag: "🇰🇷", universities: "35+",  students: "8K+",  courses: "650+",   slug: "south-korea"    },
  // idx 32
  { name: "India",         lat: 20.6,  lon: 78.9,   color: "#ff7733", size: 1.1,  flag: "🇮🇳", universities: "100+", students: "55K+", courses: "2,800+", slug: "india"          },
  // idx 33
  { name: "China",         lat: 35.9,  lon: 104.2,  color: "#ff2244", size: 1.0,  flag: "🇨🇳", universities: "80+",  students: "20K+", courses: "1,200+", slug: "china"          },
  // idx 34
  { name: "Turkey",        lat: 38.9,  lon: 35.2,   color: "#00ddbb", size: 0.9,  flag: "🇹🇷", universities: "30+",  students: "7K+",  courses: "600+",   slug: "turkey"         },

  // Oceania
  // idx 35
  { name: "Australia",     lat: -25.0, lon: 133.0,  color: "#ff5577", size: 1.2,  flag: "🇦🇺", universities: "60+",  students: "22K+", courses: "1,600+", slug: "australia"      },
  // idx 36
  { name: "New Zealand",   lat: -40.9, lon: 174.9,  color: "#ee44cc", size: 0.9,  flag: "🇳🇿", universities: "25+",  students: "6K+",  courses: "480+",   slug: "new-zealand"    },
];

// Arc routes [fromIdx, toIdx] — global study routes
const ARC_PAIRS = [
  // Asia → Europe
  [18, 22], // Singapore  → UK
  [13, 22], // Malaysia   → UK
  [2,  22], // Dubai      → UK
  [18,  6], // Singapore  → Germany
  [13, 16], // Malaysia   → Netherlands
  [2,   5], // Dubai      → France
  [32, 22], // India      → UK
  [30, 22], // Japan      → UK
  [31,  6], // South Korea → Germany
  [33,  6], // China      → Germany
  [34,  5], // Turkey     → France
  // Americas → Europe
  [23, 22], // USA        → UK
  [24, 22], // Canada     → UK
  [25, 19], // Brazil     → Spain
  // Oceania → Europe
  [35, 22], // Australia  → UK
  [36, 22], // New Zealand → UK
];

// Simplified continent outlines [lon, lat][]
const CONTINENTS: LonLat[][] = [
  [[-140,60],[-125,50],[-123,48],[-120,38],[-118,34],[-117,32],[-110,30],[-97,26],[-90,20],[-86,16],[-83,10],[-77,8],[-65,10],[-60,12],[-60,16],[-62,33],[-70,41],[-67,45],[-52,47],[-55,50],[-60,60],[-64,63],[-83,62],[-95,72],[-115,73],[-130,71],[-140,60]],
  [[-77,8],[-62,11],[-60,7],[-52,5],[-35,-5],[-35,-10],[-40,-20],[-44,-23],[-50,-28],[-52,-33],[-58,-34],[-62,-38],[-65,-55],[-74,-50],[-74,-45],[-72,-40],[-72,-30],[-70,-18],[-70,-10],[-77,0],[-77,8]],
  [[-9,36],[0,36],[10,37],[15,38],[20,38],[28,41],[32,42],[40,42],[40,38],[35,37],[28,38],[26,40],[25,38],[28,44],[30,47],[24,48],[18,50],[14,54],[8,55],[5,58],[10,63],[15,68],[20,70],[28,71],[25,67],[20,63],[15,60],[10,55],[5,55],[0,51],[-2,50],[-5,48],[-9,36]],
  [[-6,36],[0,36],[12,37],[15,38],[20,38],[28,31],[32,31],[35,28],[38,22],[43,12],[45,10],[42,2],[40,-10],[35,-17],[35,-25],[28,-32],[18,-35],[14,-30],[10,-20],[5,-5],[0,0],[-5,5],[-14,10],[-15,15],[-17,22],[-14,28],[-8,35],[-6,36]],
  [[30,42],[45,42],[60,43],[80,43],[90,50],[100,52],[110,55],[120,53],[130,52],[140,50],[143,46],[135,40],[130,35],[122,32],[120,26],[110,20],[105,15],[100,5],[104,1],[110,1],[120,10],[125,14],[122,26],[118,32],[126,40],[135,44],[143,50],[145,55],[140,60],[120,68],[90,73],[70,73],[60,70],[50,68],[40,67],[30,65],[28,60],[28,55],[22,46],[28,44],[28,42],[30,42]],
  [[114,-22],[118,-20],[122,-18],[128,-14],[132,-12],[140,-16],[146,-20],[148,-20],[150,-24],[152,-26],[154,-28],[152,-32],[150,-36],[148,-38],[143,-38],[140,-36],[136,-35],[130,-32],[122,-34],[118,-32],[114,-28],[114,-22]],
];

// ─── Math helpers ─────────────────────────────────────────────────────────────
const toRad = (d: number) => (d * Math.PI) / 180;

function project(lat: number, lon: number, lon0: number, cx: number, cy: number, R: number) {
  const phi    = toRad(lat);
  const lambda = toRad(lon - lon0);
  return {
    x:   cx + R * Math.cos(phi) * Math.sin(lambda),
    y:   cy - R * Math.sin(phi),
    dot: Math.cos(phi) * Math.cos(lambda),
  };
}

function greatCirclePt(lat1: number, lon1: number, lat2: number, lon2: number, t: number) {
  const [p1, l1, p2, l2] = [lat1, lon1, lat2, lon2].map(toRad);
  const x1 = Math.cos(p1)*Math.cos(l1), y1 = Math.sin(p1), z1 = Math.cos(p1)*Math.sin(l1);
  const x2 = Math.cos(p2)*Math.cos(l2), y2 = Math.sin(p2), z2 = Math.cos(p2)*Math.sin(l2);
  const dot = Math.min(1, Math.max(-1, x1*x2 + y1*y2 + z1*z2));
  const ang = Math.acos(dot);
  if (ang < 1e-6) return { lat: lat1, lon: lon1 };
  const s = Math.sin(ang);
  const mx = (Math.sin((1-t)*ang)*x1 + Math.sin(t*ang)*x2) / s;
  const my = (Math.sin((1-t)*ang)*y1 + Math.sin(t*ang)*y2) / s;
  const mz = (Math.sin((1-t)*ang)*z1 + Math.sin(t*ang)*z2) / s;
  return {
    lat: Math.asin(Math.max(-1, Math.min(1, my))) * 180 / Math.PI,
    lon: Math.atan2(mz, mx) * 180 / Math.PI,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────
export function GlobeVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);

  // Animation state refs
  const lon0Ref    = useRef(20);
  const rafRef     = useRef<number>();
  const starsRef   = useRef<Star[]>([]);
  const sizeRef    = useRef(0);

  // Interaction refs (read inside rAF without stale closure issues)
  const hovIdxRef      = useRef<number | null>(null); // currently hovered marker index
  const isDragging     = useRef(false);
  const dragStartX     = useRef(0);
  const dragStartY     = useRef(0);
  const lon0AtDrag     = useRef(0);
  const dragDist       = useRef(0);       // total drag distance → distinguish click vs drag
  const autoRotate     = useRef(true);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const lastTsRef      = useRef(0);

  // React state (drives the UI overlay)
  const [hoveredDest,  setHoveredDest]  = useState<Destination | null>(null);
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const [tooltipPos,   setTooltipPos]   = useState<{ x: number; y: number } | null>(null);
  const [isTouchDev,   setIsTouchDev]   = useState(false);

  // ── Hit-test: find marker under canvas coords (x, y) ──────────────────────
  const hitTest = useCallback((cx: number, cy: number, R: number, px: number, py: number) => {
    let best: number | null = null;
    let bestDist = Infinity;
    DESTINATIONS.forEach((d, i) => {
      const p = project(d.lat, d.lon, lon0Ref.current, cx, cy, R);
      if (p.dot < 0.1) return;
      const dx = px - p.x, dy = py - p.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      const hitR = 5.5 * d.size * 2.2; // generous touch target
      if (dist < hitR && dist < bestDist) { best = i; bestDist = dist; }
    });
    return best;
  }, []);

  // ── Schedule auto-rotation resume after 2 s of inactivity ─────────────────
  const scheduleResume = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => { autoRotate.current = true; }, 2000);
  }, []);

  // ── Canvas setup + render loop ─────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsTouchDev("ontouchstart" in window);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const size = Math.min(parent.clientWidth, 580);
      if (size === sizeRef.current) return;
      sizeRef.current = size;
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width  = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      starsRef.current = Array.from({ length: 160 }, () => ({
        x: Math.random() * size,
        y: Math.random() * size,
        r: 0.3 + Math.random() * 1.1,
        a: 0.15 + Math.random() * 0.45,
        f: 0.3 + Math.random() * 1.2,
      }));
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    // ── Main draw loop ───────────────────────────────────────────────────────
    const draw = (ts: number) => {
      const S    = sizeRef.current;
      const cx   = S / 2, cy = S / 2;
      const R    = S * 0.40;
      const lon0 = lon0Ref.current;
      const hovI = hovIdxRef.current;

      ctx.clearRect(0, 0, S, S);

      // 1 ── Stars
      for (const s of starsRef.current) {
        const t = 0.65 + 0.35 * Math.sin(ts * 0.001 * s.f + s.x);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,215,255,${s.a * t})`;
        ctx.fill();
      }

      // 2 ── Sphere base (3-D shading)
      const baseGrad = ctx.createRadialGradient(cx+R*0.28, cy-R*0.3, R*0.02, cx-R*0.15, cy+R*0.15, R*1.05);
      baseGrad.addColorStop(0,    "rgba(22, 72, 100,1)");
      baseGrad.addColorStop(0.35, "rgba(10, 36,  58,1)");
      baseGrad.addColorStop(0.75, "rgba( 5, 18,  34,1)");
      baseGrad.addColorStop(1,    "rgba( 2,  8,  18,1)");
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI*2);
      ctx.fillStyle = baseGrad; ctx.fill();

      // 3 ── Atmosphere rim
      const atmGrad = ctx.createRadialGradient(cx, cy, R*0.80, cx, cy, R*1.22);
      atmGrad.addColorStop(0,    "rgba(0,170,220,0)");
      atmGrad.addColorStop(0.55, "rgba(0,170,220,0.22)");
      atmGrad.addColorStop(0.85, "rgba(0,130,200,0.10)");
      atmGrad.addColorStop(1,    "rgba(0,100,180,0)");
      ctx.beginPath(); ctx.arc(cx, cy, R*1.22, 0, Math.PI*2);
      ctx.fillStyle = atmGrad; ctx.fill();

      // Globe border
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI*2);
      ctx.strokeStyle = "rgba(0,210,255,0.65)"; ctx.lineWidth = 1.8; ctx.stroke();
      // Dashed outer ring
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, R+12, 0, Math.PI*2);
      ctx.strokeStyle = "rgba(0,200,255,0.12)"; ctx.lineWidth = 1;
      ctx.setLineDash([4,10]); ctx.stroke(); ctx.setLineDash([]); ctx.restore();

      // ── Clip to sphere
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, R-1, 0, Math.PI*2); ctx.clip();

      // 4 ── Grid lines (depth-shaded)
      for (let lat = -75; lat <= 75; lat += 15) {
        const pk = Math.cos(toRad(lat));
        ctx.beginPath(); let ok = false;
        for (let lon = -180; lon <= 181; lon += 1.2) {
          const p = project(lat, lon, lon0, cx, cy, R);
          if (p.dot < 0) { ok = false; continue; }
          ok ? ctx.lineTo(p.x, p.y) : (ctx.moveTo(p.x, p.y), (ok = true));
        }
        ctx.strokeStyle = `rgba(0,200,240,${0.05 + Math.max(0,pk)*0.18})`;
        ctx.lineWidth = 0.55; ctx.stroke();
      }
      for (let lon = -180; lon < 180; lon += 15) {
        const pk = Math.cos(toRad(lon - lon0));
        ctx.beginPath(); let ok = false;
        for (let lat = -89; lat <= 89; lat += 1.2) {
          const p = project(lat, lon, lon0, cx, cy, R);
          if (p.dot < 0) { ok = false; continue; }
          ok ? ctx.lineTo(p.x, p.y) : (ctx.moveTo(p.x, p.y), (ok = true));
        }
        ctx.strokeStyle = `rgba(0,200,240,${0.05 + Math.max(0,pk)*0.18})`;
        ctx.lineWidth = 0.55; ctx.stroke();
      }

      // 5 ── Continents
      for (const cont of CONTINENTS) {
        ctx.beginPath(); let moved = false, prevVis = false;
        for (const [lon, lat] of cont) {
          const p = project(lat, lon, lon0, cx, cy, R);
          const vis = p.dot > 0.02;
          if (!moved) { ctx.moveTo(p.x, p.y); moved = true; }
          else if (vis && prevVis) { ctx.lineTo(p.x, p.y); }
          else { ctx.moveTo(p.x, p.y); }
          prevVis = vis;
        }
        ctx.closePath();
        ctx.fillStyle = "rgba(0,160,195,0.07)"; ctx.fill();
        ctx.strokeStyle = "rgba(0,210,240,0.28)"; ctx.lineWidth = 0.8; ctx.stroke();
      }

      // 6 ── Flight arcs
      for (let ai = 0; ai < ARC_PAIRS.length; ai++) {
        const [fi, ti] = ARC_PAIRS[ai];
        const from = DESTINATIONS[fi], to = DESTINATIONS[ti];
        ctx.beginPath(); let arcOk = false;
        for (let s = 0; s <= 80; s++) {
          const gc = greatCirclePt(from.lat, from.lon, to.lat, to.lon, s/80);
          const p  = project(gc.lat, gc.lon, lon0, cx, cy, R);
          if (p.dot < 0.04) { arcOk = false; continue; }
          ctx.globalAlpha = Math.min(1, (p.dot-0.04)/0.3) * 0.30;
          arcOk ? ctx.lineTo(p.x, p.y) : (ctx.moveTo(p.x, p.y), (arcOk = true));
        }
        ctx.globalAlpha = 1;
        ctx.strokeStyle = from.color + "55"; ctx.lineWidth = 0.9; ctx.stroke();

        // Travelling pulse
        const phase = ((ts * (0.00022 + ai*0.000025) + ai*0.41) % 1);
        const gc = greatCirclePt(from.lat, from.lon, to.lat, to.lon, phase);
        const pp = project(gc.lat, gc.lon, lon0, cx, cy, R);
        if (pp.dot > 0.06) {
          const pa = Math.min(1, (pp.dot-0.06)/0.3);
          const g  = ctx.createRadialGradient(pp.x, pp.y, 0, pp.x, pp.y, 6);
          g.addColorStop(0, from.color+"ff"); g.addColorStop(1, from.color+"00");
          ctx.globalAlpha = pa;
          ctx.beginPath(); ctx.arc(pp.x, pp.y, 6, 0, Math.PI*2);
          ctx.fillStyle = g; ctx.fill();
          ctx.beginPath(); ctx.arc(pp.x, pp.y, 2, 0, Math.PI*2);
          ctx.fillStyle = "#fff"; ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      ctx.restore(); // end clip

      // 7 ── Markers — Pass A: dots only (rings · halo · sphere)
      const sorted = DESTINATIONS
        .map((d, idx) => ({ ...d, ...project(d.lat, d.lon, lon0, cx, cy, R), idx }))
        .sort((a, b) => a.dot - b.dot); // back → front

      for (const dest of sorted) {
        if (dest.dot < -0.18) continue;
        const alpha = Math.min(1, Math.max(0, (dest.dot + 0.12) / 0.45));
        if (alpha < 0.01) continue;
        const isHov = hovI === dest.idx;
        const isSel = selectedDest?.name === dest.name;
        const scale = isHov || isSel ? 1.4 : 1.0;
        const baseR = 5.5 * dest.size * scale;

        // Pulsing rings
        const ringCount = isHov || isSel ? 4 : 3;
        for (let r = 0; r < ringCount; r++) {
          const phase = ((ts / 2200 + dest.idx * 0.29 + r / ringCount) % 1);
          const ringR = baseR * (1 + phase * (isHov ? 5 : 4.2));
          ctx.globalAlpha = Math.pow(1 - phase, 1.6) * (isHov ? 0.85 : 0.65) * alpha;
          ctx.beginPath(); ctx.arc(dest.x, dest.y, ringR, 0, Math.PI * 2);
          ctx.strokeStyle = dest.color; ctx.lineWidth = isHov ? 2 : 1.5; ctx.stroke();
        }
        ctx.globalAlpha = alpha;

        // Halo
        const halo = ctx.createRadialGradient(dest.x, dest.y, baseR * 0.4, dest.x, dest.y, baseR * 3.2);
        halo.addColorStop(0, dest.color + (isHov ? "70" : "50"));
        halo.addColorStop(1, dest.color + "00");
        ctx.beginPath(); ctx.arc(dest.x, dest.y, baseR * 3.2, 0, Math.PI * 2);
        ctx.fillStyle = halo; ctx.fill();

        // 3-D sphere dot
        const dotG = ctx.createRadialGradient(dest.x - baseR * 0.33, dest.y - baseR * 0.33, baseR * 0.05, dest.x, dest.y, baseR);
        dotG.addColorStop(0, "#fff");
        dotG.addColorStop(0.25, dest.color + "ff");
        dotG.addColorStop(0.7,  dest.color + "cc");
        dotG.addColorStop(1,    dest.color + "66");
        ctx.beginPath(); ctx.arc(dest.x, dest.y, baseR, 0, Math.PI * 2);
        ctx.fillStyle = dotG; ctx.fill();

        // Specular highlight on dot
        const sp = ctx.createRadialGradient(dest.x - baseR * 0.28, dest.y - baseR * 0.28, 0, dest.x - baseR * 0.28, dest.y - baseR * 0.28, baseR * 0.55);
        sp.addColorStop(0, "rgba(255,255,255,0.85)"); sp.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath(); ctx.arc(dest.x, dest.y, baseR, 0, Math.PI * 2);
        ctx.fillStyle = sp; ctx.fill();

        ctx.globalAlpha = 1;
      }

      // 7b ── Markers — Pass B: greedy label deconfliction
      // Pre-build candidate offsets in expanding rings (closest candidates tried first)
      const CAND: Array<{ dx: number; dy: number }> = [];
      for (let radius = 18; radius <= 80; radius += 13) {
        const steps = Math.max(8, Math.round((Math.PI * 2 * radius) / 14));
        for (let i = 0; i < steps; i++) {
          // Start at right (0°), sweep counter-clockwise so right/up-right tried first
          const a = (i / steps) * Math.PI * 2;
          CAND.push({ dx: Math.cos(a) * radius, dy: Math.sin(a) * radius });
        }
      }

      const PAD = 4; // minimum gap between adjacent pills
      const placed: Array<{ x: number; y: number; w: number; h: number }> = [];

      // Front-facing markers get label priority
      const labelCandidates = sorted
        .filter(d => d.dot > 0.07)
        .reverse(); // front-most first

      for (const dest of labelCandidates) {
        const alpha  = Math.min(1, Math.max(0, (dest.dot + 0.12) / 0.45));
        const isHov  = hovI === dest.idx;
        const isSel  = selectedDest?.name === dest.name;
        const baseR  = 5.5 * dest.size * (isHov || isSel ? 1.4 : 1.0);

        // On touch devices only show label for selected/hovered marker
        if (isTouchDev && !isHov && !isSel) continue;

        const fs = isHov || isSel ? 12.5 : 11;
        ctx.font = `600 ${fs}px Inter,ui-sans-serif,sans-serif`;
        const tw  = ctx.measureText(dest.name).width;
        const pw  = tw + 16;
        const ph  = 19;

        // Find a non-overlapping candidate position
        let pos: { lx: number; ly: number } | null = null;
        for (const { dx, dy } of CAND) {
          // Center the pill on the candidate offset from marker
          const lx = dest.x + dx - pw / 2;
          const ly = dest.y + dy - ph / 2;

          // Must stay inside canvas with small margin
          if (lx < 2 || ly < 2 || lx + pw > S - 2 || ly + ph > S - 2) continue;

          // Must not overlap any already-placed pill
          const collides = placed.some(
            p => lx < p.x + p.w + PAD && lx + pw + PAD > p.x &&
                 ly < p.y + p.h + PAD && ly + ph + PAD > p.y
          );
          if (!collides) { pos = { lx, ly }; break; }
        }
        if (!pos) continue; // no room — skip label entirely

        const { lx, ly } = pos;
        placed.push({ x: lx, y: ly, w: pw, h: ph });

        // Leader line from marker centre → pill centre
        const lineX = lx + pw / 2;
        const lineY = ly + ph / 2;
        const lineDist = Math.hypot(lineX - dest.x, lineY - dest.y);
        if (lineDist > baseR + 6) {
          // Shorten start to edge of dot
          const ratio = baseR / lineDist;
          const sx = dest.x + (lineX - dest.x) * ratio;
          const sy = dest.y + (lineY - dest.y) * ratio;
          ctx.globalAlpha = alpha * 0.45;
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(lineX, lineY);
          ctx.strokeStyle = dest.color + "99";
          ctx.lineWidth = 0.8;
          ctx.setLineDash([3, 5]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Pill background
        ctx.globalAlpha = alpha * (isHov || isSel ? 0.96 : 0.88);
        ctx.beginPath();
        if (typeof ctx.roundRect === "function") ctx.roundRect(lx, ly, pw, ph, 5);
        else ctx.rect(lx, ly, pw, ph);
        ctx.fillStyle = isHov || isSel ? "rgba(2,10,24,0.97)" : "rgba(2,10,28,0.84)";
        ctx.fill();
        ctx.strokeStyle = dest.color + (isHov || isSel ? "bb" : "44");
        ctx.lineWidth = isHov || isSel ? 1.2 : 0.7;
        ctx.stroke();

        // Label text
        ctx.globalAlpha = alpha;
        ctx.shadowColor = dest.color;
        ctx.shadowBlur  = isHov || isSel ? 12 : 5;
        ctx.fillStyle   = "#deeeff";
        ctx.fillText(dest.name, lx + (pw - tw) / 2, ly + ph / 2 + fs / 3);
        ctx.shadowBlur  = 0;
        ctx.globalAlpha = 1;
      }

      // 8 ── Specular highlight
      const specGrad = ctx.createRadialGradient(cx+R*0.26, cy-R*0.30, R*0.01, cx+R*0.26, cy-R*0.30, R*0.62);
      specGrad.addColorStop(0,   "rgba(190,245,255,0.28)");
      specGrad.addColorStop(0.3, "rgba(120,210,245,0.10)");
      specGrad.addColorStop(0.7, "rgba( 60,170,220,0.03)");
      specGrad.addColorStop(1,   "rgba(  0,140,200,0.00)");
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI*2);
      ctx.fillStyle = specGrad; ctx.fill();

      // ── Rotate
      if (autoRotate.current) lon0Ref.current += 0.045;

      lastTsRef.current = ts;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => { ro.disconnect(); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [selectedDest]); // re-bind when selectedDest changes so draw loop sees updated value

  // ── Pointer / touch event handlers ────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getLocal = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };
    const dims = () => {
      const S = sizeRef.current;
      return { cx: S/2, cy: S/2, R: S*0.40 };
    };

    // ── Mouse move ──────────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const { x, y } = getLocal(e.clientX, e.clientY);
      const { cx, cy, R } = dims();

      if (isDragging.current) {
        const dx = e.clientX - dragStartX.current;
        dragDist.current += Math.abs(dx);
        lon0Ref.current = lon0AtDrag.current - (dx / R) * (180 / Math.PI) * 1.2;
        return;
      }

      const idx = hitTest(cx, cy, R, x, y);
      hovIdxRef.current = idx;

      if (idx !== null) {
        canvas.style.cursor = "pointer";
        setHoveredDest(DESTINATIONS[idx]);
        setTooltipPos({ x, y });
      } else {
        canvas.style.cursor = "grab";
        setHoveredDest(null);
        setTooltipPos(null);
      }
    };

    // ── Mouse down ──────────────────────────────────────────────────────────
    const onMouseDown = (e: MouseEvent) => {
      isDragging.current   = true;
      dragStartX.current   = e.clientX;
      dragStartY.current   = e.clientY;
      lon0AtDrag.current   = lon0Ref.current;
      dragDist.current     = 0;
      autoRotate.current   = false;
      canvas.style.cursor  = "grabbing";
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };

    // ── Mouse up ────────────────────────────────────────────────────────────
    const onMouseUp = (e: MouseEvent) => {
      isDragging.current  = false;
      canvas.style.cursor = "grab";

      if (dragDist.current < 5) {
        // It's a click, not a drag
        const { x, y }    = getLocal(e.clientX, e.clientY);
        const { cx, cy, R } = dims();
        const idx = hitTest(cx, cy, R, x, y);
        if (idx !== null) {
          setSelectedDest(prev =>
            prev?.name === DESTINATIONS[idx].name ? null : DESTINATIONS[idx]
          );
        } else {
          setSelectedDest(null);
        }
      }

      scheduleResume();
    };

    const onMouseLeave = () => {
      isDragging.current = false;
      hovIdxRef.current  = null;
      setHoveredDest(null);
      setTooltipPos(null);
      canvas.style.cursor = "grab";
      scheduleResume();
    };

    // ── Touch events ────────────────────────────────────────────────────────
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      isDragging.current  = true;
      dragStartX.current  = t.clientX;
      dragStartY.current  = t.clientY;
      lon0AtDrag.current  = lon0Ref.current;
      dragDist.current    = 0;
      autoRotate.current  = false;
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length !== 1) return;
      e.preventDefault(); // prevent page scroll while spinning globe
      const t  = e.touches[0];
      const dx = t.clientX - dragStartX.current;
      const { R } = dims();
      dragDist.current  += Math.abs(dx);
      lon0Ref.current    = lon0AtDrag.current - (dx / R) * (180 / Math.PI) * 1.2;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;

      if (dragDist.current < 8) {
        // Tap
        const touch = e.changedTouches[0];
        const { x, y }    = getLocal(touch.clientX, touch.clientY);
        const { cx, cy, R } = dims();
        const idx = hitTest(cx, cy, R, x, y);

        if (idx !== null) {
          hovIdxRef.current = idx;
          setHoveredDest(DESTINATIONS[idx]);
          setSelectedDest(prev =>
            prev?.name === DESTINATIONS[idx].name ? null : DESTINATIONS[idx]
          );
        } else {
          hovIdxRef.current = null;
          setHoveredDest(null);
          setSelectedDest(null);
        }
      }

      scheduleResume();
    };

    canvas.style.cursor = "grab";
    canvas.addEventListener("mousemove",  onMouseMove);
    canvas.addEventListener("mousedown",  onMouseDown);
    canvas.addEventListener("mouseup",    onMouseUp);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove",  onTouchMove,  { passive: false });
    canvas.addEventListener("touchend",   onTouchEnd,   { passive: true });

    return () => {
      canvas.removeEventListener("mousemove",  onMouseMove);
      canvas.removeEventListener("mousedown",  onMouseDown);
      canvas.removeEventListener("mouseup",    onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove",  onTouchMove);
      canvas.removeEventListener("touchend",   onTouchEnd);
    };
  }, [hitTest, scheduleResume]);

  // ─── JSX ──────────────────────────────────────────────────────────────────
  return (
    <div ref={wrapRef} className="relative w-full flex flex-col items-center gap-5 select-none">

      {/* Canvas */}
      <div className="relative w-full max-w-[580px]">
        <canvas ref={canvasRef} className="w-full" style={{ imageRendering: "crisp-edges" }} />

        {/* ── Hover tooltip (desktop) ─────────────────────────────────── */}
        <AnimatePresence>
          {hoveredDest && tooltipPos && !isTouchDev && (
            <motion.div
              key={hoveredDest.name + "-tip"}
              initial={{ opacity: 0, scale: 0.9, y: 4 }}
              animate={{ opacity: 1, scale: 1,   y: 0 }}
              exit={{   opacity: 0, scale: 0.9, y: 4 }}
              transition={{ duration: 0.15 }}
              className="pointer-events-none absolute z-20 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap"
              style={{
                left: tooltipPos.x + 18,
                top:  tooltipPos.y - 38,
                background: "rgba(4,14,30,0.92)",
                border: `1px solid ${hoveredDest.color}55`,
                boxShadow: `0 0 16px ${hoveredDest.color}33`,
                color: "#e0f4ff",
              }}
            >
              <span className="mr-1.5">{hoveredDest.flag}</span>
              {hoveredDest.name}
              <span className="ml-2 opacity-60 font-normal">· click to explore</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Mobile tap hint (shown briefly on first render) ─────────── */}
        {isTouchDev && !selectedDest && (
          <div className="pointer-events-none absolute bottom-4 inset-x-0 flex justify-center">
            <span className="text-[11px] text-white/35 bg-black/30 px-3 py-1 rounded-full">
              Tap a dot · Drag to rotate
            </span>
          </div>
        )}
      </div>

      {/* ── Selected destination card ──────────────────────────────────────── */}
      <AnimatePresence>
        {selectedDest && (
          <motion.div
            key={selectedDest.name}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{   opacity: 0, y: 12, scale: 0.97  }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="relative w-full max-w-[580px] rounded-2xl overflow-hidden"
            style={{
              background: "rgba(4, 14, 30, 0.92)",
              border: `1px solid ${selectedDest.color}44`,
              boxShadow: `0 0 40px ${selectedDest.color}22, 0 8px 32px rgba(0,0,0,0.5)`,
            }}
          >
            {/* Color accent bar */}
            <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${selectedDest.color}, transparent)` }} />

            <div className="p-5">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedDest.flag}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">{selectedDest.name}</h3>
                    <p className="text-xs mt-0.5" style={{ color: selectedDest.color }}>
                      Top Study Abroad Destination
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDest(null)}
                  className="p-1.5 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { icon: GraduationCap, label: "Universities", value: selectedDest.universities },
                  { icon: Users,         label: "Students",      value: selectedDest.students    },
                  { icon: BookOpen,      label: "Courses",        value: selectedDest.courses     },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="rounded-xl p-3 text-center"
                    style={{ background: `${selectedDest.color}12`, border: `1px solid ${selectedDest.color}22` }}
                  >
                    <Icon className="w-4 h-4 mx-auto mb-1" style={{ color: selectedDest.color }} />
                    <div className="text-base font-bold text-white">{value}</div>
                    <div className="text-[10px] text-white/50 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                href={`/courses?country=${encodeURIComponent(selectedDest.name)}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90 active:opacity-75"
                style={{
                  background: `linear-gradient(135deg, ${selectedDest.color}cc, ${selectedDest.color}88)`,
                  color: "#000",
                }}
              >
                Explore {selectedDest.name} Courses
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Legend ────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-lg px-2">
        {DESTINATIONS.slice(0, 23).map((d) => (
          <button
            key={d.name}
            onClick={() => setSelectedDest(prev => prev?.name === d.name ? null : d)}
            className="flex items-center gap-1.5 hover:opacity-90 active:scale-95 transition-transform"
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: d.color, boxShadow: `0 0 6px ${d.color}, 0 0 12px ${d.color}66` }}
            />
            <span className="text-[11px] text-foreground/60 whitespace-nowrap hover:text-foreground transition-colors">
              {d.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
