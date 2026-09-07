import type { ReactNode } from "react"

import type { VisualKind } from "@/lib/products"

const stroke = "#2F2723"

const visuals: Record<VisualKind, (accent: string) => ReactNode> = {
  foundation: (a) => (
    <>
      <ellipse cx="100" cy="228" rx="38" ry="8" fill={stroke} opacity="0.08" />
      <rect x="70" y="70" width="60" height="150" rx="14" fill="#F7F1EA" stroke={stroke} strokeWidth="2" />
      <rect x="74" y="92" width="52" height="90" rx="8" fill={a} opacity="0.85" />
      <rect x="78" y="58" width="44" height="22" rx="6" fill="#F7F1EA" stroke={stroke} strokeWidth="2" />
      <rect x="86" y="48" width="28" height="14" rx="4" fill={a} stroke={stroke} strokeWidth="1.6" />
      <path d="M82 130h36" stroke="#fff" strokeWidth="2" opacity="0.45" />
    </>
  ),
  concealer: (a) => (
    <>
      <ellipse cx="100" cy="232" rx="28" ry="7" fill={stroke} opacity="0.08" />
      <rect x="82" y="58" width="36" height="160" rx="10" fill="#F7F1EA" stroke={stroke} strokeWidth="2" />
      <rect x="86" y="88" width="28" height="100" rx="6" fill={a} />
      <rect x="84" y="46" width="32" height="22" rx="4" fill={stroke} />
      <circle cx="100" cy="57" r="3" fill="#F7F1EA" />
    </>
  ),
  blush: (a) => (
    <>
      <ellipse cx="100" cy="226" rx="48" ry="10" fill={stroke} opacity="0.08" />
      <circle cx="100" cy="138" r="62" fill="#F7F1EA" stroke={stroke} strokeWidth="2" />
      <circle cx="100" cy="138" r="48" fill={a} />
      <circle cx="86" cy="124" r="14" fill="#fff" opacity="0.28" />
      <rect x="72" y="72" width="56" height="10" rx="3" fill={stroke} />
    </>
  ),
  highlighter: (a) => (
    <>
      <ellipse cx="100" cy="226" rx="46" ry="10" fill={stroke} opacity="0.08" />
      <rect x="48" y="88" width="104" height="104" rx="20" fill="#F7F1EA" stroke={stroke} strokeWidth="2" />
      <rect x="62" y="102" width="76" height="76" rx="12" fill={a} />
      <path d="M78 130l18 22 26-34" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
    </>
  ),
  palette: (a) => (
    <>
      <ellipse cx="100" cy="230" rx="54" ry="9" fill={stroke} opacity="0.08" />
      <rect x="40" y="70" width="120" height="140" rx="16" fill="#F7F1EA" stroke={stroke} strokeWidth="2" />
      {[0, 1, 2].flatMap((row) =>
        [0, 1, 2].map((col) => (
          <circle
            key={`${row}-${col}`}
            cx={70 + col * 30}
            cy={104 + row * 32}
            r="11"
            fill={
              [
                "#E8C4B8",
                a,
                "#C9B0C8",
                "#D4A574",
                "#8B3D4F",
                "#F4E0D6",
                "#7A5A78",
                "#C97B8D",
                "#2F2723",
              ][row * 3 + col]
            }
            stroke={stroke}
            strokeWidth="1"
          />
        ))
      )}
    </>
  ),
  liner: (a) => (
    <>
      <ellipse cx="100" cy="236" rx="18" ry="6" fill={stroke} opacity="0.08" />
      <path d="M96 40c8 40 8 80 4 150h-8c-4-70-4-110 4-150z" fill={stroke} />
      <rect x="90" y="88" width="20" height="70" rx="4" fill={a} />
      <path d="M100 40l6 18h-12z" fill={stroke} />
      <path d="M97 36l3-10 3 10" stroke={stroke} strokeWidth="1.6" />
    </>
  ),
  mascara: (a) => (
    <>
      <ellipse cx="100" cy="234" rx="22" ry="7" fill={stroke} opacity="0.08" />
      <rect x="84" y="96" width="32" height="120" rx="10" fill="#F7F1EA" stroke={stroke} strokeWidth="2" />
      <rect x="88" y="110" width="24" height="88" rx="6" fill={a} />
      <rect x="86" y="40" width="28" height="62" rx="8" fill={stroke} />
      <rect x="92" y="48" width="16" height="40" rx="3" fill={a} opacity="0.7" />
    </>
  ),
  lipstick: (a) => (
    <>
      <ellipse cx="100" cy="232" rx="24" ry="7" fill={stroke} opacity="0.08" />
      <rect x="80" y="120" width="40" height="92" rx="8" fill="#F7F1EA" stroke={stroke} strokeWidth="2" />
      <rect x="84" y="132" width="32" height="20" rx="3" fill={a} />
      <path
        d="M88 120v-28c0-6 4-14 12-22 8 8 12 16 12 22v28z"
        fill={a}
        stroke={stroke}
        strokeWidth="1.8"
      />
      <rect x="80" y="108" width="40" height="14" rx="3" fill={stroke} />
    </>
  ),
  gloss: (a) => (
    <>
      <ellipse cx="100" cy="232" rx="24" ry="7" fill={stroke} opacity="0.08" />
      <path d="M78 80h44l10 140H68z" fill="#F7F1EA" stroke={stroke} strokeWidth="2" />
      <path d="M84 100h32l8 108H76z" fill={a} opacity="0.75" />
      <rect x="86" y="52" width="28" height="32" rx="6" fill={stroke} />
      <path d="M96 52v-12h8v12" stroke={stroke} strokeWidth="2" />
    </>
  ),
  powder: (a) => (
    <>
      <ellipse cx="100" cy="228" rx="50" ry="9" fill={stroke} opacity="0.08" />
      <ellipse cx="100" cy="150" rx="58" ry="22" fill="#F7F1EA" stroke={stroke} strokeWidth="2" />
      <rect x="42" y="88" width="116" height="62" rx="10" fill="#F7F1EA" stroke={stroke} strokeWidth="2" />
      <ellipse cx="100" cy="88" rx="58" ry="22" fill={a} stroke={stroke} strokeWidth="2" />
      <ellipse cx="100" cy="82" rx="18" ry="7" fill="#F7F1EA" opacity="0.5" />
    </>
  ),
  cleanser: (a) => (
    <>
      <ellipse cx="100" cy="230" rx="36" ry="8" fill={stroke} opacity="0.08" />
      <path
        d="M68 92h64c8 0 14 8 14 16v108c0 10-8 18-18 18H72c-10 0-18-8-18-18V108c0-8 6-16 14-16z"
        fill="#F7F1EA"
        stroke={stroke}
        strokeWidth="2"
      />
      <path d="M62 130h76v80c0 8-6 14-14 14H76c-8 0-14-6-14-14z" fill={a} opacity="0.8" />
      <rect x="88" y="62" width="24" height="34" rx="8" fill={stroke} />
      <rect x="94" y="48" width="12" height="18" rx="4" fill={a} stroke={stroke} strokeWidth="1.5" />
    </>
  ),
  toner: (a) => (
    <>
      <ellipse cx="100" cy="230" rx="32" ry="8" fill={stroke} opacity="0.08" />
      <rect x="72" y="86" width="56" height="128" rx="18" fill="#F7F1EA" stroke={stroke} strokeWidth="2" />
      <rect x="78" y="120" width="44" height="80" rx="12" fill={a} opacity="0.7" />
      <rect x="90" y="58" width="20" height="32" rx="6" fill={stroke} />
      <circle cx="100" cy="52" r="10" fill={a} stroke={stroke} strokeWidth="1.6" />
      <path d="M100 42v-10M94 36h12" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  serum: (a) => (
    <>
      <ellipse cx="100" cy="232" rx="28" ry="7" fill={stroke} opacity="0.08" />
      <path d="M82 108h36l10 108H72z" fill="#F7F1EA" stroke={stroke} strokeWidth="2" />
      <path d="M86 128h28l8 80H78z" fill={a} opacity="0.85" />
      <rect x="90" y="78" width="20" height="34" rx="4" fill="#F7F1EA" stroke={stroke} strokeWidth="2" />
      <rect x="94" y="48" width="12" height="34" rx="6" fill={stroke} />
      <circle cx="100" cy="46" r="8" fill={a} stroke={stroke} strokeWidth="1.6" />
    </>
  ),
  cream: (a) => (
    <>
      <ellipse cx="100" cy="226" rx="52" ry="10" fill={stroke} opacity="0.08" />
      <rect x="50" y="118" width="100" height="70" rx="12" fill="#F7F1EA" stroke={stroke} strokeWidth="2" />
      <ellipse cx="100" cy="118" rx="50" ry="18" fill={a} stroke={stroke} strokeWidth="2" />
      <ellipse cx="100" cy="110" rx="50" ry="18" fill="#F7F1EA" stroke={stroke} strokeWidth="2" />
      <circle cx="100" cy="108" r="10" fill={a} opacity="0.7" />
    </>
  ),
  eyecream: (a) => (
    <>
      <ellipse cx="100" cy="228" rx="36" ry="8" fill={stroke} opacity="0.08" />
      <rect x="64" y="120" width="72" height="68" rx="14" fill="#F7F1EA" stroke={stroke} strokeWidth="2" />
      <ellipse cx="100" cy="120" rx="36" ry="14" fill={a} stroke={stroke} strokeWidth="2" />
      <ellipse cx="100" cy="114" rx="36" ry="14" fill="#F7F1EA" stroke={stroke} strokeWidth="2" />
      <circle cx="100" cy="112" r="6" fill={a} />
    </>
  ),
  mask: (a) => (
    <>
      <ellipse cx="100" cy="230" rx="40" ry="8" fill={stroke} opacity="0.08" />
      <rect x="58" y="52" width="84" height="160" rx="10" fill="#F7F1EA" stroke={stroke} strokeWidth="2" />
      <rect x="68" y="68" width="64" height="128" rx="8" fill={a} opacity="0.55" />
      <ellipse cx="88" cy="110" rx="8" ry="12" fill="#F7F1EA" />
      <ellipse cx="112" cy="110" rx="8" ry="12" fill="#F7F1EA" />
      <path d="M90 148c6 8 14 8 20 0" stroke="#F7F1EA" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  sunscreen: (a) => (
    <>
      <ellipse cx="100" cy="230" rx="30" ry="8" fill={stroke} opacity="0.08" />
      <path
        d="M74 96h52c8 0 14 8 14 16v100c0 10-8 18-18 18H78c-10 0-18-8-18-18V112c0-8 6-16 14-16z"
        fill="#F7F1EA"
        stroke={stroke}
        strokeWidth="2"
      />
      <path d="M64 140h72v64c0 8-6 14-14 14H78c-8 0-14-6-14-14z" fill={a} opacity="0.75" />
      <rect x="88" y="70" width="24" height="30" rx="6" fill={stroke} />
      <rect x="92" y="58" width="16" height="16" rx="3" fill={a} stroke={stroke} strokeWidth="1.5" />
    </>
  ),
  oil: (a) => (
    <>
      <ellipse cx="100" cy="232" rx="26" ry="7" fill={stroke} opacity="0.08" />
      <path
        d="M78 120c0-18 10-28 22-28s22 10 22 28v88c0 10-8 18-22 18s-22-8-22-18z"
        fill="#F7F1EA"
        stroke={stroke}
        strokeWidth="2"
      />
      <path d="M82 148c4 40 32 40 36 0" fill={a} opacity="0.8" />
      <rect x="92" y="78" width="16" height="22" rx="3" fill="#F7F1EA" stroke={stroke} strokeWidth="2" />
      <rect x="95" y="52" width="10" height="28" rx="5" fill={stroke} />
      <circle cx="100" cy="48" r="7" fill={a} stroke={stroke} strokeWidth="1.6" />
    </>
  ),
}

export function ProductVisual({
  kind,
  accent,
  className,
}: {
  kind: VisualKind
  accent: string
  className?: string
}) {
  return (
    <svg viewBox="0 0 200 260" className={className} aria-hidden fill="none">
      {visuals[kind](accent)}
    </svg>
  )
}

export function ProductStage({
  kind,
  from,
  to,
  accent,
  className,
}: {
  kind: VisualKind
  from: string
  to: string
  accent: string
  className?: string
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className ?? ""}`}
      style={{ background: `linear-gradient(165deg, ${from} 0%, ${to} 100%)` }}
    >
      <SakuraWatermark className="pointer-events-none absolute -right-6 -top-8 size-32 opacity-25" />
      <ProductVisual
        kind={kind}
        accent={accent}
        className="relative h-[88%] w-auto max-w-[82%]"
      />
    </div>
  )
}

export function SakuraWatermark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden fill="none">
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="40"
          cy="22"
          rx="11"
          ry="16"
          transform={`rotate(${deg} 40 40)`}
          fill="#E8B4C0"
          stroke="#2F2723"
          strokeWidth="1.2"
        />
      ))}
      <circle
        cx="40"
        cy="40"
        r="7"
        fill="#F7F1EA"
        stroke="#2F2723"
        strokeWidth="1.2"
      />
    </svg>
  )
}
