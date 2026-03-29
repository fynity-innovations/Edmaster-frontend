"use client";

import { useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Destination {
  name: string; lat: number; lon: number; color: string; size: number;
}
type LonLat = [number, number];

// ─── Data ─────────────────────────────────────────────────────────────────────
const DESTINATIONS: Destination[] = [
  { name: "United Kingdom", lat: 51.5,  lon: -0.1,   color: "#00d4ff", size: 1.3  },
  { name: "United States",  lat: 37.0,  lon: -95.7,  color: "#00ff88", size: 1.5  },
  { name: "Canada",         lat: 56.0,  lon: -106.0, color: "#ff6b6b", size: 1.1  },
  { name: "Australia",      lat: -25.0, lon: 133.0,  color: "#ff88cc", size: 1.2  },
  { name: "Germany",        lat: 51.0,  lon: 10.0,   color: "#bb88ff", size: 1.0  },
  { name: "France",         lat: 46.0,  lon: 2.0,    color: "#ffcc44", size: 0.9  },
  { name: "Netherlands",    lat: 52.1,  lon: 5.3,    color: "#44ffdd", size: 0.85 },
  { name: "Ireland",        lat: 53.4,  lon: -8.0,   color: "#88ff44", size: 0.85 },
  { name: "New Zealand",    lat: -40.9, lon: 174.9,  color: "#ff44bb", size: 0.9  },
  { name: "Singapore",      lat: 1.4,   lon: 103.8,  color: "#44aaff", size: 1.0  },
  { name: "Japan",          lat: 36.2,  lon: 138.3,  color: "#ffdd44", size: 1.1  },
  { name: "India",          lat: 20.6,  lon: 78.9,   color: "#ff8844", size: 0.95 },
];

// Arc routes: [fromIdx, toIdx] — "students travelling from → to"
const ARC_PAIRS = [
  [11, 0], [11, 1], [11, 3], [11, 4],   // India → UK / USA / AU / DE
  [9, 1],  [10, 1], [2, 0],  [0, 4],    // SG/JP → USA, CA → UK, UK → DE
];

// Simplified continent outlines as [longitude, latitude] arrays
const CONTINENTS: LonLat[][] = [
  // North America
  [[-140,60],[-125,50],[-123,48],[-120,38],[-118,34],[-117,32],[-110,30],
   [-97,26],[-90,20],[-86,16],[-83,10],[-77,8],[-65,10],[-60,12],[-60,16],
   [-62,33],[-70,41],[-67,45],[-52,47],[-55,50],[-60,60],[-64,63],
   [-83,62],[-95,72],[-115,73],[-130,71],[-140,60]],
  // South America
  [[-77,8],[-62,11],[-60,7],[-52,5],[-35,-5],[-35,-10],[-40,-20],
   [-44,-23],[-50,-28],[-52,-33],[-58,-34],[-62,-38],[-65,-55],
   [-74,-50],[-74,-45],[-72,-40],[-72,-30],[-70,-18],[-70,-10],[-77,0],[-77,8]],
  // Europe
  [[-9,36],[0,36],[10,37],[15,38],[20,38],[28,41],[32,42],[40,42],
   [40,38],[35,37],[28,38],[26,40],[25,38],[28,44],[30,47],[24,48],
   [18,50],[14,54],[8,55],[5,58],[10,63],[15,68],[20,70],[28,71],
   [25,67],[20,63],[15,60],[10,55],[5,55],[0,51],[-2,50],[-5,48],[-9,36]],
  // Africa
  [[-6,36],[0,36],[12,37],[15,38],[20,38],[28,31],[32,31],[35,28],
   [38,22],[43,12],[45,10],[42,2],[40,-10],[35,-17],[35,-25],[28,-32],
   [18,-35],[14,-30],[10,-20],[5,-5],[0,0],[-5,5],[-14,10],[-15,15],
   [-17,22],[-14,28],[-8,35],[-6,36]],
  // Asia
  [[30,42],[45,42],[60,43],[80,43],[90,50],[100,52],[110,55],[120,53],
   [130,52],[140,50],[143,46],[135,40],[130,35],[122,32],[120,26],[110,20],
   [105,15],[100,5],[104,1],[110,1],[120,10],[125,14],[122,26],[118,32],
   [126,40],[135,44],[143,50],[145,55],[140,60],[120,68],[90,73],[70,73],
   [60,70],[50,68],[40,67],[30,65],[28,60],[28,55],[22,46],[28,44],[28,42],[30,42]],
  // Australia
  [[114,-22],[118,-20],[122,-18],[128,-14],[132,-12],[140,-16],[146,-20],
   [148,-20],[150,-24],[152,-26],[154,-28],[152,-32],[150,-36],[148,-38],
   [143,-38],[140,-36],[136,-35],[130,-32],[122,-34],[118,-32],[114,-28],[114,-22]],
];

// ─── Math helpers ─────────────────────────────────────────────────────────────
const toRad = (d: number) => (d * Math.PI) / 180;

/** Orthographic projection: (lat, lon) → canvas (x, y, dot) */
function project(lat: number, lon: number, lon0: number, cx: number, cy: number, R: number) {
  const phi    = toRad(lat);
  const lambda = toRad(lon - lon0);
  return {
    x:   cx + R * Math.cos(phi) * Math.sin(lambda),
    y:   cy - R * Math.sin(phi),
    dot: Math.cos(phi) * Math.cos(lambda), // > 0 → front hemisphere
  };
}

/** SLERP great-circle interpolation at parameter t ∈ [0,1] */
function greatCirclePt(
  lat1: number, lon1: number,
  lat2: number, lon2: number,
  t: number
): { lat: number; lon: number } {
  const [p1, l1, p2, l2] = [lat1, lon1, lat2, lon2].map(toRad);
  const x1 = Math.cos(p1)*Math.cos(l1), y1 = Math.sin(p1), z1 = Math.cos(p1)*Math.sin(l1);
  const x2 = Math.cos(p2)*Math.cos(l2), y2 = Math.sin(p2), z2 = Math.cos(p2)*Math.sin(l2);
  const dot = Math.min(1, Math.max(-1, x1*x2 + y1*y2 + z1*z2));
  const ang  = Math.acos(dot);
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
  const lon0Ref   = useRef(20);
  const rafRef    = useRef<number>();
  // Stars generated once, survive re-renders
  const starsRef  = useRef<{ x: number; y: number; r: number; a: number; f: number }[]>([]);
  const sizeRef   = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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

      // Regenerate stars for new size
      starsRef.current = Array.from({ length: 160 }, () => ({
        x: Math.random() * size,
        y: Math.random() * size,
        r: 0.3 + Math.random() * 1.1,
        a: 0.15 + Math.random() * 0.45,
        f: 0.3 + Math.random() * 1.2, // twinkle frequency
      }));
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    // ── Main render loop ───────────────────────────────────────────────────
    const draw = (ts: number) => {
      const S  = sizeRef.current;
      const cx = S / 2, cy = S / 2;
      const R  = S * 0.40;
      const lon0 = lon0Ref.current;

      ctx.clearRect(0, 0, S, S);

      // ── 1. Starfield ──────────────────────────────────────────────────────
      for (const s of starsRef.current) {
        const twinkle = 0.65 + 0.35 * Math.sin(ts * 0.001 * s.f + s.x);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 215, 255, ${s.a * twinkle})`;
        ctx.fill();
      }

      // ── 2. Globe base — 3D sphere shading ────────────────────────────────
      // Dark fill: lit from upper-right, shadow lower-left
      const baseGrad = ctx.createRadialGradient(
        cx + R * 0.28, cy - R * 0.30, R * 0.02,
        cx - R * 0.15, cy + R * 0.15, R * 1.05
      );
      baseGrad.addColorStop(0,    "rgba(22,  72, 100, 1)");
      baseGrad.addColorStop(0.35, "rgba(10,  36,  58, 1)");
      baseGrad.addColorStop(0.75, "rgba( 5,  18,  34, 1)");
      baseGrad.addColorStop(1,    "rgba( 2,   8,  18, 1)");

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = baseGrad;
      ctx.fill();

      // ── 3. Atmosphere — thick rim glow ────────────────────────────────────
      const atmGrad = ctx.createRadialGradient(cx, cy, R * 0.80, cx, cy, R * 1.22);
      atmGrad.addColorStop(0,    "rgba( 0, 170, 220,  0)");
      atmGrad.addColorStop(0.55, "rgba( 0, 170, 220, 0.22)");
      atmGrad.addColorStop(0.85, "rgba( 0, 130, 200, 0.10)");
      atmGrad.addColorStop(1,    "rgba( 0, 100, 180,  0)");
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.22, 0, Math.PI * 2);
      ctx.fillStyle = atmGrad;
      ctx.fill();

      // Globe border
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 210, 255, 0.65)";
      ctx.lineWidth   = 1.8;
      ctx.stroke();

      // Outer dashed decorative ring
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R + 12, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 200, 255, 0.12)";
      ctx.lineWidth   = 1;
      ctx.setLineDash([4, 10]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // ── Clip interior drawing to sphere ───────────────────────────────────
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R - 1, 0, Math.PI * 2);
      ctx.clip();

      // ── 4. Grid lines (depth-shaded) ──────────────────────────────────────
      // Latitude lines every 15°
      for (let lat = -75; lat <= 75; lat += 15) {
        // Depth at the part of this latitude line closest to viewer
        const peakDot = Math.cos(toRad(lat)); // max dot at lon = lon0
        const lineAlpha = 0.05 + Math.max(0, peakDot) * 0.18;

        ctx.beginPath();
        let started = false;
        for (let lon = -180; lon <= 181; lon += 1.2) {
          const p = project(lat, lon, lon0, cx, cy, R);
          if (p.dot < 0) { started = false; continue; }
          if (!started) { ctx.moveTo(p.x, p.y); started = true; }
          else          { ctx.lineTo(p.x, p.y); }
        }
        ctx.strokeStyle = `rgba(0, 200, 240, ${lineAlpha})`;
        ctx.lineWidth   = 0.55;
        ctx.stroke();
      }

      // Longitude lines every 15°
      for (let lon = -180; lon < 180; lon += 15) {
        const lambda   = toRad(lon - lon0);
        const peakDot  = Math.cos(lambda); // max dot at equator
        const lineAlpha = 0.05 + Math.max(0, peakDot) * 0.18;

        ctx.beginPath();
        let started = false;
        for (let lat = -89; lat <= 89; lat += 1.2) {
          const p = project(lat, lon, lon0, cx, cy, R);
          if (p.dot < 0) { started = false; continue; }
          if (!started) { ctx.moveTo(p.x, p.y); started = true; }
          else          { ctx.lineTo(p.x, p.y); }
        }
        ctx.strokeStyle = `rgba(0, 200, 240, ${lineAlpha})`;
        ctx.lineWidth   = 0.55;
        ctx.stroke();
      }

      // ── 5. Continent fills ────────────────────────────────────────────────
      for (const continent of CONTINENTS) {
        ctx.beginPath();
        let moved = false;
        let prevVis = false;

        for (let i = 0; i < continent.length; i++) {
          const [lon, lat] = continent[i];
          const p = project(lat, lon, lon0, cx, cy, R);
          const vis = p.dot > 0.02;

          if (!moved) {
            ctx.moveTo(p.x, p.y);
            moved = true;
          } else if (vis && prevVis) {
            ctx.lineTo(p.x, p.y);
          } else {
            ctx.moveTo(p.x, p.y);
          }
          prevVis = vis;
        }
        ctx.closePath();

        ctx.fillStyle   = "rgba(0, 160, 195, 0.07)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 210, 240, 0.30)";
        ctx.lineWidth   = 0.8;
        ctx.stroke();
      }

      // ── 6. Flight arcs ────────────────────────────────────────────────────
      const ARC_STEPS = 80;
      for (let ai = 0; ai < ARC_PAIRS.length; ai++) {
        const [fi, ti] = ARC_PAIRS[ai];
        const from = DESTINATIONS[fi];
        const to   = DESTINATIONS[ti];
        const arcColor = from.color;

        // Base arc line
        ctx.beginPath();
        let arcStarted = false;
        for (let s = 0; s <= ARC_STEPS; s++) {
          const gc = greatCirclePt(from.lat, from.lon, to.lat, to.lon, s / ARC_STEPS);
          const p  = project(gc.lat, gc.lon, lon0, cx, cy, R);
          if (p.dot < 0.04) { arcStarted = false; continue; }
          // Fade arc near limb
          ctx.globalAlpha = Math.min(1, (p.dot - 0.04) / 0.3) * 0.35;
          if (!arcStarted) { ctx.moveTo(p.x, p.y); arcStarted = true; }
          else              { ctx.lineTo(p.x, p.y); }
        }
        ctx.globalAlpha = 1;
        ctx.strokeStyle = arcColor + "55";
        ctx.lineWidth   = 0.9;
        ctx.stroke();

        // Travelling pulse dot
        const phase = ((ts * (0.00022 + ai * 0.000025) + ai * 0.41) % 1);
        const gc    = greatCirclePt(from.lat, from.lon, to.lat, to.lon, phase);
        const pp    = project(gc.lat, gc.lon, lon0, cx, cy, R);
        if (pp.dot > 0.06) {
          const pAlpha = Math.min(1, (pp.dot - 0.06) / 0.3);
          const glowR  = 6;
          const glow   = ctx.createRadialGradient(pp.x, pp.y, 0, pp.x, pp.y, glowR);
          glow.addColorStop(0, arcColor + "ff");
          glow.addColorStop(0.4, arcColor + "99");
          glow.addColorStop(1, arcColor + "00");
          ctx.globalAlpha = pAlpha;
          ctx.beginPath();
          ctx.arc(pp.x, pp.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
          // Solid core
          ctx.beginPath();
          ctx.arc(pp.x, pp.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      ctx.restore(); // end clip

      // ── 7. Destination markers (back → front) ─────────────────────────────
      const sorted = DESTINATIONS
        .map((d, idx) => ({ ...d, ...project(d.lat, d.lon, lon0, cx, cy, R), idx }))
        .sort((a, b) => a.dot - b.dot);

      for (const dest of sorted) {
        if (dest.dot < -0.18) continue;

        const alpha = Math.min(1, Math.max(0, (dest.dot + 0.12) / 0.45));
        if (alpha < 0.01) continue;

        const baseR = 5.5 * dest.size;

        ctx.globalAlpha = alpha;

        // Pulsing rings (3 staggered phases)
        for (let r = 0; r < 3; r++) {
          const phase  = ((ts / 2200 + dest.idx * 0.29 + r / 3) % 1);
          const ringR  = baseR * (1 + phase * 4.2);
          const rAlpha = Math.pow(1 - phase, 1.6) * 0.65 * alpha;
          ctx.globalAlpha = rAlpha;
          ctx.beginPath();
          ctx.arc(dest.x, dest.y, ringR, 0, Math.PI * 2);
          ctx.strokeStyle = dest.color;
          ctx.lineWidth   = 1.5;
          ctx.stroke();
        }

        ctx.globalAlpha = alpha;

        // Outer volumetric halo
        const halo = ctx.createRadialGradient(dest.x, dest.y, baseR * 0.4, dest.x, dest.y, baseR * 3.5);
        halo.addColorStop(0, dest.color + "50");
        halo.addColorStop(1, dest.color + "00");
        ctx.beginPath();
        ctx.arc(dest.x, dest.y, baseR * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        // Main dot — radial gradient → looks like a tiny 3-D sphere
        const dotGrad = ctx.createRadialGradient(
          dest.x - baseR * 0.33, dest.y - baseR * 0.33, baseR * 0.05,
          dest.x, dest.y, baseR
        );
        dotGrad.addColorStop(0,   "#ffffff");
        dotGrad.addColorStop(0.25, dest.color + "ff");
        dotGrad.addColorStop(0.7,  dest.color + "cc");
        dotGrad.addColorStop(1,   dest.color + "66");

        ctx.beginPath();
        ctx.arc(dest.x, dest.y, baseR, 0, Math.PI * 2);
        ctx.fillStyle = dotGrad;
        ctx.fill();

        // Sharp specular highlight on the marker
        const spec = ctx.createRadialGradient(
          dest.x - baseR * 0.28, dest.y - baseR * 0.28, 0,
          dest.x - baseR * 0.28, dest.y - baseR * 0.28, baseR * 0.55
        );
        spec.addColorStop(0, "rgba(255,255,255,0.85)");
        spec.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.arc(dest.x, dest.y, baseR, 0, Math.PI * 2);
        ctx.fillStyle = spec;
        ctx.fill();

        // Label — visible markers only
        if (alpha > 0.55) {
          const lx = dest.x + baseR + 10;
          const ly = dest.y + 4;
          const fs = Math.round(11.5 * dest.size);

          ctx.font = `600 ${fs}px Inter, ui-sans-serif, sans-serif`;
          const tw = ctx.measureText(dest.name).width;
          const pw = tw + 18, ph = 21, px = lx - 5, py = ly - 15;

          // Pill background
          ctx.globalAlpha = alpha * 0.92;
          ctx.beginPath();
          if (typeof ctx.roundRect === "function") {
            ctx.roundRect(px, py, pw, ph, 6);
          } else {
            ctx.rect(px, py, pw, ph);
          }
          ctx.fillStyle   = "rgba(2, 10, 24, 0.88)";
          ctx.fill();
          ctx.strokeStyle = dest.color + "55";
          ctx.lineWidth   = 0.8;
          ctx.stroke();

          // Text with subtle glow
          ctx.globalAlpha   = alpha;
          ctx.shadowColor   = dest.color;
          ctx.shadowBlur    = 10;
          ctx.fillStyle     = "#e0f4ff";
          ctx.fillText(dest.name, lx + 4, ly);
          ctx.shadowBlur    = 0;
        }

        ctx.globalAlpha = 1;
      }

      // ── 8. Specular highlight (top of sphere) ─────────────────────────────
      const specGrad = ctx.createRadialGradient(
        cx + R * 0.26, cy - R * 0.30, R * 0.01,
        cx + R * 0.26, cy - R * 0.30, R * 0.62
      );
      specGrad.addColorStop(0,   "rgba(190, 245, 255, 0.28)");
      specGrad.addColorStop(0.3, "rgba(120, 210, 245, 0.10)");
      specGrad.addColorStop(0.7, "rgba( 60, 170, 220, 0.03)");
      specGrad.addColorStop(1,   "rgba(  0, 140, 200, 0.00)");

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = specGrad;
      ctx.fill();

      // ── Advance rotation ───────────────────────────────────────────────────
      lon0Ref.current += 0.045;

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center gap-5">
      <canvas
        ref={canvasRef}
        className="w-full max-w-[580px]"
        style={{ imageRendering: "crisp-edges" }}
      />

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-lg px-2">
        {DESTINATIONS.map((d) => (
          <div key={d.name} className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                backgroundColor: d.color,
                boxShadow: `0 0 6px ${d.color}, 0 0 12px ${d.color}66`,
              }}
            />
            <span className="text-[11px] text-white/50 whitespace-nowrap">{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
