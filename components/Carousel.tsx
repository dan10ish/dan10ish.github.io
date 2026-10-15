import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { data } from "@/app/data";
import { ArrowLeftIcon } from "@/components/animate-ui/icons/arrow-left";

const GithubIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M5.88401 18.6533C5.58404 18.4526 5.32587 18.1975 5.0239 17.8369C4.91473 17.7065 4.47283 17.1524 4.55811 17.2583C4.09533 16.6833 3.80296 16.417 3.50156 16.3089C2.9817 16.1225 2.7114 15.5499 2.89784 15.0301C3.08428 14.5102 3.65685 14.2399 4.17672 14.4263C4.92936 14.6963 5.43847 15.1611 6.12425 16.0143C6.03025 15.8974 6.46364 16.441 6.55731 16.5529C6.74784 16.7804 6.88732 16.9182 6.99629 16.9911C7.20118 17.1283 7.58451 17.1874 8.14709 17.1311C8.17065 16.7489 8.24136 16.3783 8.34919 16.0358C5.38097 15.3104 3.70116 13.3952 3.70116 9.63971C3.70116 8.40085 4.0704 7.28393 4.75917 6.3478C4.5415 5.45392 4.57433 4.37284 5.06092 3.15636C5.1725 2.87739 5.40361 2.66338 5.69031 2.57352C5.77242 2.54973 5.81791 2.53915 5.89878 2.52673C6.70167 2.40343 7.83573 2.69705 9.31449 3.62336C10.181 3.41879 11.0885 3.315 12.0012 3.315C12.9129 3.315 13.8196 3.4186 14.6854 3.62277C16.1619 2.69 17.2986 2.39649 18.1072 2.52651C18.1919 2.54013 18.2645 2.55783 18.3249 2.57766C18.6059 2.66991 18.8316 2.88179 18.9414 3.15636C19.4279 4.37256 19.4608 5.45344 19.2433 6.3472C19.9342 7.28337 20.3012 8.39208 20.3012 9.63971C20.3012 13.3968 18.627 15.3048 15.6588 16.032C15.7837 16.447 15.8496 16.9105 15.8496 17.4121C15.8496 18.0765 15.8471 18.711 15.8424 19.4225C15.8412 19.6127 15.8397 19.8159 15.8375 20.1281C16.2129 20.2109 16.5229 20.5077 16.6031 20.9089C16.7114 21.4504 16.3602 21.9773 15.8186 22.0856C14.6794 22.3134 13.8353 21.5538 13.8353 20.5611C13.8353 20.4708 13.836 20.3417 13.8375 20.1145C13.8398 19.8015 13.8412 19.599 13.8425 19.4094C13.8471 18.7019 13.8496 18.0716 13.8496 17.4121C13.8496 16.7148 13.6664 16.2602 13.4237 16.051C12.7627 15.4812 13.0977 14.3973 13.965 14.2999C16.9314 13.9666 18.3012 12.8177 18.3012 9.63971C18.3012 8.68508 17.9893 7.89571 17.3881 7.23559C17.1301 6.95233 17.0567 6.54659 17.199 6.19087C17.3647 5.77663 17.4354 5.23384 17.2941 4.57702L17.2847 4.57968C16.7928 4.71886 16.1744 5.0198 15.4261 5.5285C15.182 5.69438 14.8772 5.74401 14.5932 5.66413C13.7729 5.43343 12.8913 5.315 12.0012 5.315C11.111 5.315 10.2294 5.43343 9.40916 5.66413C9.12662 5.74359 8.82344 5.69492 8.57997 5.53101C7.8274 5.02439 7.2056 4.72379 6.71079 4.58376C6.56735 5.23696 6.63814 5.77782 6.80336 6.19087C6.94565 6.54659 6.87219 6.95233 6.61423 7.23559C6.01715 7.8912 5.70116 8.69376 5.70116 9.63971C5.70116 12.8116 7.07225 13.9683 10.023 14.2999C10.8883 14.3971 11.2246 15.4769 10.5675 16.0482C10.3751 16.2156 10.1384 16.7802 10.1384 17.4121V20.5611C10.1384 21.5474 9.30356 22.2869 8.17878 22.09C7.63476 21.9948 7.27093 21.4766 7.36613 20.9326C7.43827 20.5204 7.75331 20.2116 8.13841 20.1276V19.1381C7.22829 19.1994 6.47656 19.0498 5.88401 18.6533Z" />
  </svg>
);

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
  src: `/videos/${p.video.replace(".mp4", "-poster.jpg")}`,
  video: `/videos/${p.video}`,
  title: p.title,
  source: p.source,
  live: p.live,
}));

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

const CARD_W = 240;
const CARD_H = 240;

const STAGE_W = 500;
const STAGE_H = 330;

const ORBIT = 145;
const DEPTH = 100;
const DEPTH_MAX = 150;
const CORNER = 20;
const FLOAT = 15;
const SINK = 50;
const SETTLE = 50;
const LEAN = 34;

const PULL = 140;
const TOSS = 150;
const MOST = 2;
const BASE = 620;

const N = SHOTS.length;
const FRONT = SHOTS[0]?.name ?? "";
const OPENS_ON = (() => {
  const i = SHOTS.findIndex((s) => s.name === FRONT);
  return i < 0 ? Math.floor((N - 1) / 2) : i;
})();

const ANGLE = [-4.2, 2.6, -1.4, 3.8, -2.8, 1.7, -3.5, 2.1, -1.9, 3.4, -2.2, 1.5];
const PERIOD = [4.7, 5.9, 6.7, 5.3, 7.1, 6.1, 5.5, 6.4, 4.9, 7.3, 5.7, 6.3];

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
                    shot={shot.src}
                    video={shot.video}
                    corner={r}
                    sink={sink}
                    off={held || still}
                    isFront={isFront}
                    isNear={isNear}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="car-title-wrap">
        <span className="car-title">{activeProject.title}</span>
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
            <GithubIcon size={14} />
            <span>Source</span>
          </a>
        ) : (
          <span className="car-link-btn car-link-disabled">
            <GithubIcon size={14} />
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
  shot,
  video,
  corner,
  sink,
  off,
  isFront,
  isNear,
}: {
  shot: string;
  video: string;
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
      if (v.readyState >= 2) setVideoReady(true);
      const p = v.play();
      if (p !== undefined) p.catch(() => {});
    } else {
      v.pause();
    }
  }, [isFront]);

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
        boxShadow: "0 14px 34px -10px rgba(var(--shadow-rgb), 0.22)",
      }}
    >
      <img
        src={shot}
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
          onLoadedData={() => setVideoReady(true)}
          onCanPlay={() => setVideoReady(true)}
          onPlaying={() => setVideoReady(true)}
          style={{
            opacity: isFront && videoReady ? 1 : 0,
            transition: "opacity 0.22s ease-out",
          }}
        />
      )}

      <span
        className="car-sheen"
        aria-hidden="true"
        style={{
          borderRadius: corner,
          backgroundImage: `radial-gradient(44% 36% at ${px.toFixed(1)}% ${py.toFixed(1)}%, rgba(9, 14, 28, ${dark.toFixed(3)}) 0%, rgba(9, 14, 28, 0) 100%), radial-gradient(54% 44% at ${(100 - px).toFixed(1)}% ${(100 - py).toFixed(1)}%, rgba(255, 255, 255, ${rim.toFixed(3)}) 0%, rgba(255, 255, 255, 0) 100%)`,
        }}
      />
    </div>
  );
}
