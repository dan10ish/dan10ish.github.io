import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { data } from "@/app/data";
import { ArrowLeftIcon } from "@/components/animate-ui/icons/arrow-left";

const springOf = (tune: number) => ({
  k: 0.08 + (tune / 100) * 0.16,
  d: 0.62 + (tune / 100) * 0.2,
});

function useSpring(target: number, tune = 50, instant = false) {
  const [at, setAt] = useState(target);
  const cur = useRef(target);
  const vel = useRef(0);
  const raf = useRef(0);

  useEffect(() => {
    if (instant) {
      cur.current = target;
      vel.current = 0;
      setAt(target);
      return;
    }
    const { k, d } = springOf(tune);
    let prev = 0;
    const tick = (t: number) => {
      const dt = prev ? clamp((t - prev) / 16.67, 0, 2.5) : 1;
      prev = t;
      vel.current += (target - cur.current) * k * dt;
      vel.current *= Math.pow(d, dt);
      cur.current += vel.current * dt;
      if (Math.abs(target - cur.current) < 0.02 && Math.abs(vel.current) < 0.02) {
        cur.current = target;
        vel.current = 0;
        setAt(target);
        raf.current = 0;
        return;
      }
      setAt(cur.current);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    };
  }, [target, tune, instant]);

  return at;
}

const stillness = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const rate = (speed: number) => 1.6 - (speed / 100) * 1.2;

const SHOTS = data.projects.map((p) => ({
  name: p.title,
  src: `/videos/${p.video}`,
  poster: `/videos/${p.video.replace(".mp4", "-poster.jpg")}`,
  title: p.title,
  source: p.source,
  live: p.live,
  description: p.description,
  video: p.video,
}));

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

const CARD_W = 220;
const CARD_H = 220;
const STAGE_W = 490;
const STAGE_H = 330;
const ORBIT = 150;
const DEPTH = 100;
const DEPTH_MAX = 150;
const CORNER = 20;
const FLOAT = 15;
const SINK = 50;
const SETTLE = 50;
const LEAN = 34;
const PULL = 130;
const TOSS = 150;
const MOST = 2;
const BASE = 620;

const N = SHOTS.length;
const FRONT = SHOTS[0]?.name ?? "";
const OPENS_ON = (() => {
  const i = SHOTS.findIndex((s) => s.name === FRONT);
  return i < 0 ? Math.floor((N - 1) / 2) : i;
})();

const ANGLE = [-4.2, 2.6, -1.4, 3.8, -2.8, 1.7, -3.5, 2.1, -1.9, 3.4, -2.2, 1.5, -3.1];
const PERIOD = [4.7, 5.9, 6.7, 5.3, 7.1, 6.1, 5.5, 6.4, 4.9, 7.3, 5.7, 6.3, 5.1];

type Spot = { x: number; y: number; s: number; z: number };

const spotOf = (i: number, turn: number, orbit: number, depth: number): Spot => {
  const th = (i - turn) * ((Math.PI * 2) / N);
  const f = (Math.cos(th) + 1) / 2;
  return {
    x: Math.sin(th) * orbit,
    y: -(1 - f) * LEAN,
    s: mix(1 - clamp(depth, 0, DEPTH_MAX) / 200, 1, f),
    z: Math.round(f * 100),
  };
};

const write = (el: HTMLElement, sp: Spot, angle: number) => {
  el.style.transform = `translate(-50%, -50%) translate(${sp.x.toFixed(2)}px, ${sp.y.toFixed(2)}px) rotate(${angle}deg) scale(${sp.s.toFixed(4)})`;
  el.style.zIndex = String(sp.z);
};

const out = (t: number) => 1 - (1 - t) ** 4;

export function Carousel({
  orbit = ORBIT,
  depth = DEPTH,
  corner = CORNER,
  float = FLOAT,
  sink = SINK,
  settle = SETTLE,
  spin = 0,
  onBack,
}: {
  orbit?: number;
  depth?: number;
  corner?: number;
  float?: number;
  sink?: number;
  settle?: number;
  spin?: number;
  onBack?: () => void;
} = {}) {
  const still = stillness();
  const slots = useRef<(HTMLDivElement | null)[]>([]);
  const turn = useRef(OPENS_ON);
  const raf = useRef(0);
  const drag = useRef<{
    x0: number; t0: number; last: number; t: number; vx: number; moved: boolean;
  } | null>(null);
  const [held, setHeld] = useState(false);

  const activeRef = useRef(OPENS_ON);
  const [activeIdx, setActiveIdx] = useState(OPENS_ON);

  const paint = useCallback(() => {
    slots.current.forEach((el, i) =>
      el && write(el, spotOf(i, turn.current, orbit, depth), ANGLE[i % ANGLE.length]));
    const curFront = ((Math.round(turn.current) % N) + N) % N;
    if (curFront !== activeRef.current) {
      activeRef.current = curFront;
      setActiveIdx(curFront);
    }
  }, [orbit, depth]);

  useLayoutEffect(paint, [paint]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  useEffect(() => {
    if (!spin || still || held) return;
    let id = 0;
    let prev = 0;
    const step = (t: number) => {
      if (prev) turn.current += ((t - prev) / 1000) * (N / spin);
      prev = t;
      paint();
      id = requestAnimationFrame(step);
    };
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [spin, still, held, paint]);

  const glide = useCallback((to: number) => {
    cancelAnimationFrame(raf.current);
    const from = turn.current;
    if (still || from === to) {
      turn.current = to;
      paint();
      return;
    }
    const ms = BASE * rate(clamp(settle, 0, 100));
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / ms);
      turn.current = mix(from, to, out(p));
      paint();
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [paint, settle, still]);

  const go = useCallback((d: number) => glide(Math.round(turn.current) + d), [glide]);

  const down = (e: React.PointerEvent) => {
    cancelAnimationFrame(raf.current);
    drag.current = {
      x0: e.clientX, t0: turn.current, last: e.clientX,
      t: e.timeStamp, vx: 0, moved: false,
    };
    setHeld(true);
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
  };

  const move = (e: React.PointerEvent) => {
    const g = drag.current;
    if (!g) return;
    const dx = e.clientX - g.x0;
    if (!g.moved && Math.abs(dx) > 3) g.moved = true;
    const dt = Math.max(1, e.timeStamp - g.t);
    g.vx = (g.vx + (e.clientX - g.last) / dt) / 2;
    g.last = e.clientX;
    g.t = e.timeStamp;
    turn.current = g.t0 - dx / PULL;
    paint();
  };

  const up = () => {
    const g = drag.current;
    if (!g) return;
    drag.current = null;
    setHeld(false);
    const carry = clamp((-g.vx * TOSS) / PULL, -MOST, MOST);
    const to = Math.round(turn.current + carry);
    glide(to);
  };

  const key = (e: React.KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    go(d);
  };

  const r = clamp(corner, 0, 40);
  const activeProject = SHOTS[activeIdx] ?? SHOTS[0];

  return (
    <div className="car-wrapper">
      <div className="car" style={{ width: STAGE_W, height: STAGE_H }}>
        <div
          className="car-track"
          data-held={held}
          role="group"
          aria-label="Card carousel"
          aria-roledescription="carousel"
          tabIndex={0}
          onKeyDown={key}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
        >
          {SHOTS.map((shot, i) => {
            const rawDiff = Math.abs(i - activeIdx);
            const dist = Math.min(rawDiff, N - rawDiff);
            const isFront = dist === 0;
            const isNear = dist <= 1;

            return (
              <div
                key={shot.name}
                ref={(el) => { slots.current[i] = el; }}
                className="car-slot"
                style={{ width: CARD_W, height: CARD_H }}
                onClick={() => {
                  if (drag.current?.moved) return;
                  let diff = (i - (Math.round(turn.current) % N) + N) % N;
                  if (diff > N / 2) diff -= N;
                  glide(Math.round(turn.current) + diff);
                }}
              >
                <div
                  className="car-float"
                  style={{
                    animationName: float <= 0 ? "none" : undefined,
                    animationDuration: `${PERIOD[i % PERIOD.length]}s`,
                    ["--lift" as string]: `${((clamp(float, 0, 100) / 100) * 16).toFixed(2)}px`,
                    ["--sway" as string]: `${((clamp(float, 0, 100) / 100) * 1.4).toFixed(2)}deg`,
                  }}
                >
                  <Card
                    video={shot.src}
                    poster={shot.poster}
                    corner={r}
                    sink={sink}
                    isFront={isFront}
                    isNear={isNear}
                    off={held || still}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="car-title-row">
        <button
          className="car-chevron car-chevron-left"
          onClick={() => go(-1)}
          aria-label="Previous project"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M8.5 2L3.5 6.5l5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="car-title-wrap">
          <span className="car-title">{activeProject.title}</span>
        </div>

        <button
          className="car-chevron car-chevron-right"
          onClick={() => go(1)}
          aria-label="Next project"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M4.5 2l5 4.5-5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="car-links">
        {activeProject.source ? (
          <a
            href={activeProject.source}
            target="_blank"
            rel="noopener noreferrer"
            className="car-link-btn car-link-src"
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>Source</span>
          </a>
        ) : (
          <span className="car-link-btn car-link-disabled">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>Source</span>
          </span>
        )}
        {activeProject.live ? (
          <a
            href={activeProject.live}
            target="_blank"
            rel="noopener noreferrer"
            className="car-link-btn car-link-live"
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span>Live</span>
          </a>
        ) : (
          <span className="car-link-btn car-link-disabled">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span>Live</span>
          </span>
        )}
      </div>

      <div className="car-dots">
        {SHOTS.map((_, i) => (
          <button
            key={i}
            className={`car-dot ${i === activeIdx ? "car-dot-active" : ""}`}
            onClick={() => {
              let diff = (i - (Math.round(turn.current) % N) + N) % N;
              if (diff > N / 2) diff -= N;
              glide(Math.round(turn.current) + diff);
            }}
            aria-label={`Project ${i + 1}`}
          />
        ))}
      </div>

      {onBack && (
        <button
          className="car-back-btn"
          onClick={onBack}
          aria-label="Go back"
        >
          <ArrowLeftIcon size={20} className="w-full h-full" />
        </button>
      )}
    </div>
  );
}

function Card({
  video,
  poster,
  corner,
  sink,
  off,
  isFront,
  isNear,
}: {
  video: string;
  poster: string;
  corner: number;
  sink: number;
  off: boolean;
  isFront: boolean;
  isNear: boolean;
}) {
  const skin = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [pt, setPt] = useState({ x: 0, y: 0 });
  const [on, setOn] = useState(false);
  const still = stillness();

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isFront) {
      const p = v.play();
      if (p !== undefined) {
        p.catch(() => {});
      }
    } else {
      v.pause();
    }
  }, [isFront, isNear]);

  useEffect(() => {
    if (!isNear) {
      setVideoReady(false);
    }
  }, [isNear]);

  const live = on && !off;
  const sx = useSpring(live ? pt.x : 0, 50, still);
  const sy = useSpring(live ? pt.y : 0, 50, still);
  const lit = useSpring(live ? 1 : 0, 50, still);

  const deep = clamp(sink, 0, 100) / 100;
  const max = deep * 13;
  const rx = -sy * max;
  const ry = sx * max;

  const px = ((sx + 1) / 2) * 100;
  const py = ((sy + 1) / 2) * 100;
  const dark = deep * 0.5 * lit;
  const rim = deep * 0.16 * lit;

  const track = (e: React.PointerEvent) => {
    const el = skin.current;
    if (!el) return;
    const b = el.getBoundingClientRect();
    setPt({
      x: clamp(((e.clientX - b.left) / b.width) * 2 - 1, -1, 1),
      y: clamp(((e.clientY - b.top) / b.height) * 2 - 1, -1, 1),
    });
    setOn(true);
  };

  return (
    <div
      ref={skin}
      className="car-card"
      onPointerMove={track}
      onPointerOut={(e) => {
        const el = skin.current;
        const to = e.relatedTarget as Node | null;
        if (!el || !to || !el.contains(to)) setOn(false);
      }}
      onPointerCancel={() => setOn(false)}
      style={{
        borderRadius: corner,
        transform: `translateZ(${(-10 * deep * lit).toFixed(2)}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`,
      }}
    >
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        className="car-poster"
        loading="eager"
        decoding="async"
      />

      {isNear && (
        <video
          ref={videoRef}
          src={video}
          className="car-video"
          muted
          playsInline
          loop
          preload={isFront ? "auto" : "metadata"}
          onPlaying={() => setVideoReady(true)}
          style={{
            opacity: isFront && videoReady ? 1 : 0,
            transition: "opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      )}

      <span
        className="car-sheen"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(44% 36% at ${px.toFixed(1)}% ${py.toFixed(1)}%, rgba(9, 14, 28, ${dark.toFixed(3)}) 0%, rgba(9, 14, 28, 0) 100%), radial-gradient(54% 44% at ${(100 - px).toFixed(1)}% ${(100 - py).toFixed(1)}%, rgba(255, 255, 255, ${rim.toFixed(3)}) 0%, rgba(255, 255, 255, 0) 100%)`,
        }}
      />
    </div>
  );
}
