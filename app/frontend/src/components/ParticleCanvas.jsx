import { useEffect, useRef } from "react";

function rand(a, b) { return a + Math.random() * (b - a); }
function randInt(a, b) { return Math.floor(rand(a, b)); }
function hex2rgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

const HOLI_COLORS = ["#e879f9", "#fb923c", "#4ade80", "#38bdf8", "#fbbf24", "#f43f5e", "#a78bfa"];
const TRICOLORS  = ["#FF9933", "#ffffff", "#138808"];

function makeParticle(type, W, H, color) {
  const base = {
    x: rand(0, W), y: rand(0, H),
    life: rand(0, 1), maxLife: rand(0.6, 1),
    opacity: rand(0.4, 0.9),
  };
  switch (type) {
    case "fireworks":
      return { ...base, size: rand(1.5, 4), vx: rand(-0.8, 0.8), vy: rand(-1.2, -0.3), color, tail: [], tailLen: randInt(4, 10), burst: Math.random() < 0.3 };
    case "snowflakes":
      return { ...base, size: rand(8, 20), vx: rand(-0.3, 0.3), vy: rand(0.4, 1.0), rot: rand(0, Math.PI * 2) };
    case "hearts":
      return { ...base, size: rand(10, 22), vx: rand(-0.2, 0.2), vy: rand(-0.8, -0.2), wobble: rand(0, Math.PI * 2) };
    case "ghosts":
      return { ...base, size: rand(14, 28), vx: rand(-0.3, 0.3), vy: rand(-0.5, 0.5), wobble: rand(0, Math.PI * 2) };
    case "kites":
      return { ...base, size: rand(12, 24), vx: rand(0.3, 0.8), vy: rand(-0.6, -0.1), rot: rand(-0.4, 0.4), color: HOLI_COLORS[randInt(0, HOLI_COLORS.length)] };
    case "stars":
      return { ...base, size: rand(2, 5), twinkle: rand(0, Math.PI * 2), twinkleSpeed: rand(0.02, 0.07), color };
    case "leaves":
      return { ...base, size: rand(8, 18), vx: rand(-0.4, 0.4), vy: rand(0.5, 1.2), rot: rand(0, Math.PI * 2), rotSpeed: rand(-0.03, 0.03), color: ["#d97706","#f59e0b","#ef4444","#dc2626","#92400e"][randInt(0, 5)] };
    case "doves":
      return { ...base, size: rand(10, 20), vx: rand(-0.3, 0.3), vy: rand(-0.4, -0.1), wobble: rand(0, Math.PI * 2) };
    case "colors":
      return { ...base, size: rand(4, 12), vx: rand(-0.5, 0.5), vy: rand(-0.5, 0.5), color: HOLI_COLORS[randInt(0, HOLI_COLORS.length)], shape: ["circle","square","blob"][randInt(0,3)] };
    case "tricolor":
      return { ...base, size: rand(3, 7), vx: rand(-0.4, 0.4), vy: rand(-0.8, -0.2), color: TRICOLORS[randInt(0, 3)] };
    default: // dots
      return { ...base, size: rand(2, 5), vx: rand(-0.3, 0.3), vy: rand(-0.4, 0.4), color };
  }
}

function drawParticle(ctx, p, type, rgb) {
  ctx.save();
  ctx.globalAlpha = p.opacity * (1 - p.life / p.maxLife);

  switch (type) {
    case "fireworks": {
      const gr = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
      const c = p.color ? hex2rgb(p.color) : rgb;
      gr.addColorStop(0, `rgba(${c.r},${c.g},${c.b},1)`);
      gr.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`);
      ctx.fillStyle = gr;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
      ctx.fill();
      if (p.tail.length > 1) {
        ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},0.35)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.tail[0].x, p.tail[0].y);
        p.tail.forEach((pt) => ctx.lineTo(pt.x, pt.y));
        ctx.stroke();
      }
      break;
    }
    case "snowflakes":
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot || 0);
      ctx.font = `${p.size}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("❄", 0, 0);
      break;
    case "hearts":
      ctx.translate(p.x + Math.sin(p.wobble + p.life * 3) * 8, p.y);
      ctx.font = `${p.size}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("💗", 0, 0);
      break;
    case "ghosts":
      ctx.translate(p.x + Math.sin(p.wobble + p.life * 2) * 10, p.y);
      ctx.font = `${p.size}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(Math.random() < 0.5 ? "👻" : "🦇", 0, 0);
      break;
    case "doves":
      ctx.translate(p.x + Math.sin(p.wobble + p.life * 2) * 6, p.y);
      ctx.font = `${p.size}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("🕊️", 0, 0);
      break;
    case "kites": {
      const kc = hex2rgb(p.color);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = `rgba(${kc.r},${kc.g},${kc.b},0.85)`;
      ctx.beginPath();
      ctx.moveTo(0, -p.size); ctx.lineTo(p.size * 0.6, 0);
      ctx.lineTo(0, p.size * 0.8); ctx.lineTo(-p.size * 0.6, 0);
      ctx.closePath(); ctx.fill();
      ctx.strokeStyle = `rgba(${kc.r},${kc.g},${kc.b},0.4)`;
      ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.moveTo(0, p.size * 0.8); ctx.lineTo(0, p.size * 2.5); ctx.stroke();
      break;
    }
    case "stars": {
      const sc = hex2rgb(p.color);
      const twAlpha = 0.5 + 0.5 * Math.sin(p.twinkle + p.life * p.twinkleSpeed * 60);
      ctx.globalAlpha = twAlpha * p.opacity;
      ctx.fillStyle = `rgba(${sc.r},${sc.g},${sc.b},1)`;
      ctx.shadowBlur = p.size * 4;
      ctx.shadowColor = `rgba(${sc.r},${sc.g},${sc.b},0.8)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      break;
    }
    case "leaves": {
      const lc = hex2rgb(p.color);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = `rgba(${lc.r},${lc.g},${lc.b},0.85)`;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "colors":
    case "tricolor": {
      const cc = hex2rgb(p.color);
      ctx.fillStyle = `rgba(${cc.r},${cc.g},${cc.b},0.75)`;
      ctx.shadowBlur = p.size * 1.5;
      ctx.shadowColor = `rgba(${cc.r},${cc.g},${cc.b},0.5)`;
      if (p.shape === "square") {
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      break;
    }
    default: {
      const dc = hex2rgb(p.color || "#ffffff");
      ctx.fillStyle = `rgba(${dc.r},${dc.g},${dc.b},0.6)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

function updateParticle(p, type, W, H, dt) {
  p.life += dt * 0.3;

  if (type === "fireworks") {
    p.tail.unshift({ x: p.x, y: p.y });
    if (p.tail.length > p.tailLen) p.tail.pop();
    p.vy += 0.008; // gravity
  }
  if (type === "snowflakes") p.rot += 0.005;
  if (type === "leaves") p.rot += p.rotSpeed;
  if (type === "stars") p.twinkle += p.twinkleSpeed;

  p.x += p.vx;
  p.y += p.vy;

  // Wrap around edges
  if (p.x < -50) p.x = W + 50;
  if (p.x > W + 50) p.x = -50;
  if (p.y < -50) p.y = H + 50;
  if (p.y > H + 50) p.y = -50;

  return p.life < p.maxLife;
}

export default function ParticleCanvas({ theme, visible }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({ particles: [], lastTime: 0, raf: null });

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const type = theme?.particles || "dots";
    const colorHex = theme?.["--theme-particle"] || "#ffffff";
    const rgb = hex2rgb(colorHex);
    const COUNT = type === "fireworks" ? 70 : type === "stars" ? 80 : 45;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    stateRef.current.particles = Array.from({ length: COUNT }, () =>
      makeParticle(type, W(), H(), colorHex)
    );

    function loop(ts) {
      const dt = Math.min((ts - stateRef.current.lastTime) / 16, 3);
      stateRef.current.lastTime = ts;
      ctx.clearRect(0, 0, W(), H());

      stateRef.current.particles = stateRef.current.particles
        .filter((p) => updateParticle(p, type, W(), H(), dt))
        .map((p) => { drawParticle(ctx, p, type, rgb); return p; });

      // Replenish dead particles
      while (stateRef.current.particles.length < COUNT) {
        stateRef.current.particles.push(makeParticle(type, W(), H(), colorHex));
      }

      stateRef.current.raf = requestAnimationFrame(loop);
    }
    stateRef.current.raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(stateRef.current.raf);
      ro.disconnect();
    };
  }, [theme, visible]);

  if (!visible) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.55,
      }}
    />
  );
}
