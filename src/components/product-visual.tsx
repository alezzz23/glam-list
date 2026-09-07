import type { Vessel } from "@/lib/products";

type Props = {
  vessel: Vessel;
  colors: { primary: string; secondary: string; accent: string };
  className?: string;
};

export function ProductVisual({ vessel, colors, className }: Props) {
  return (
    <div
      className={className}
      style={{
        background: `linear-gradient(165deg, ${colors.secondary} 0%, #fffdf9 55%, ${colors.primary}22 100%)`,
      }}
    >
      <svg viewBox="0 0 200 240" className="h-full w-full" aria-hidden="true">
        {vessel === "lipstick" && <Lipstick colors={colors} />}
        {vessel === "gloss" && <Gloss colors={colors} />}
        {vessel === "palette" && <Palette colors={colors} />}
        {vessel === "mascara" && <Mascara colors={colors} />}
        {vessel === "liner" && <Liner colors={colors} />}
        {vessel === "compact" && <Compact colors={colors} />}
        {vessel === "foundation" && <Foundation colors={colors} />}
        {vessel === "dropper" && <Dropper colors={colors} />}
        {vessel === "jar" && <Jar colors={colors} />}
        {vessel === "pump" && <Pump colors={colors} />}
        {vessel === "tube" && <Tube colors={colors} />}
        {vessel === "mist" && <Mist colors={colors} />}
      </svg>
    </div>
  );
}

type C = { primary: string; secondary: string; accent: string };

function Lipstick({ colors }: { colors: C }) {
  return (
    <g>
      <ellipse cx="100" cy="214" rx="42" ry="8" fill="#2C241E" opacity="0.08" />
      <rect x="78" y="118" width="44" height="78" rx="6" fill="#2C241E" />
      <rect x="82" y="124" width="36" height="10" rx="2" fill="#F4E8DC" opacity="0.35" />
      <rect x="86" y="88" width="28" height="32" rx="3" fill="#3A322C" />
      <path d="M90 88c4-18 16-18 20 0H90Z" fill={colors.primary} />
      <path d="M92 86c3-12 13-12 16 0" stroke={colors.accent} strokeWidth="1.5" fill="none" />
      <circle cx="100" cy="156" r="6" fill="#E8B8BC" opacity="0.9" />
    </g>
  );
}

function Gloss({ colors }: { colors: C }) {
  return (
    <g>
      <ellipse cx="100" cy="214" rx="36" ry="7" fill="#2C241E" opacity="0.08" />
      <rect x="84" y="70" width="32" height="128" rx="16" fill={colors.secondary} stroke="#2C241E" strokeWidth="1.2" />
      <rect x="84" y="70" width="32" height="70" rx="16" fill={colors.primary} opacity="0.85" />
      <rect x="88" y="52" width="24" height="22" rx="4" fill="#2C241E" />
      <rect x="94" y="44" width="12" height="12" rx="2" fill={colors.accent} />
      <ellipse cx="100" cy="108" rx="8" ry="14" fill="#fff" opacity="0.28" />
    </g>
  );
}

function Palette({ colors }: { colors: C }) {
  const pans = [
    colors.primary,
    colors.accent,
    "#F4E4D8",
    "#C9A0B0",
    "#8A5A6E",
    "#E8C8A0",
    "#D4B8C8",
    "#F0DCE4",
    "#6E4454",
  ];
  return (
    <g>
      <rect x="38" y="52" width="124" height="136" rx="14" fill="#FBF7F2" stroke="#2C241E" strokeWidth="1.4" />
      <rect x="38" y="52" width="124" height="22" rx="14" fill="#2C241E" />
      <rect x="38" y="64" width="124" height="12" fill="#2C241E" />
      {pans.map((hex, index) => {
        const col = index % 3;
        const row = Math.floor(index / 3);
        return (
          <circle
            key={hex + index}
            cx={70 + col * 30}
            cy={98 + row * 30}
            r="12"
            fill={hex}
            stroke="#2C241E"
            strokeWidth="0.6"
            strokeOpacity="0.25"
          />
        );
      })}
    </g>
  );
}

function Mascara({ colors }: { colors: C }) {
  return (
    <g>
      <ellipse cx="100" cy="214" rx="28" ry="7" fill="#2C241E" opacity="0.08" />
      <rect x="88" y="108" width="24" height="92" rx="8" fill="#2C241E" />
      <rect x="90" y="52" width="20" height="62" rx="6" fill={colors.primary} />
      <rect x="90" y="98" width="20" height="14" fill="#3A322C" />
      <g stroke={colors.accent} strokeWidth="1.4">
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={i} x1={96} y1={58 + i * 5} x2={104} y2={62 + i * 5} />
        ))}
      </g>
    </g>
  );
}

function Liner({ colors }: { colors: C }) {
  return (
    <g>
      <ellipse cx="100" cy="214" rx="24" ry="6" fill="#2C241E" opacity="0.08" />
      <rect x="92" y="78" width="16" height="120" rx="5" fill="#2C241E" />
      <polygon points="92,78 108,78 100,46" fill={colors.primary} />
      <rect x="94" y="78" width="12" height="10" fill={colors.accent} />
    </g>
  );
}

function Compact({ colors }: { colors: C }) {
  return (
    <g>
      <ellipse cx="100" cy="128" rx="58" ry="58" fill="#FBF7F2" stroke="#2C241E" strokeWidth="1.6" />
      <ellipse cx="100" cy="128" rx="42" ry="42" fill={colors.primary} />
      <ellipse cx="86" cy="114" rx="14" ry="10" fill="#fff" opacity="0.28" />
      <circle cx="100" cy="128" r="6" fill={colors.accent} opacity="0.5" />
    </g>
  );
}

function Foundation({ colors }: { colors: C }) {
  return (
    <g>
      <ellipse cx="100" cy="214" rx="40" ry="8" fill="#2C241E" opacity="0.08" />
      <rect x="70" y="70" width="60" height="128" rx="18" fill={colors.secondary} stroke="#2C241E" strokeWidth="1.2" />
      <rect x="70" y="70" width="60" height="70" fill={colors.primary} opacity="0.9" />
      <rect x="78" y="48" width="44" height="26" rx="8" fill="#2C241E" />
      <rect x="88" y="40" width="24" height="12" rx="3" fill={colors.accent} />
      <ellipse cx="92" cy="118" rx="8" ry="18" fill="#fff" opacity="0.25" />
    </g>
  );
}

function Dropper({ colors }: { colors: C }) {
  return (
    <g>
      <ellipse cx="100" cy="214" rx="32" ry="7" fill="#2C241E" opacity="0.08" />
      <rect x="80" y="92" width="40" height="108" rx="12" fill={colors.secondary} stroke="#2C241E" strokeWidth="1.2" />
      <rect x="80" y="128" width="40" height="72" rx="12" fill={colors.primary} opacity="0.88" />
      <rect x="80" y="128" width="40" height="12" fill={colors.primary} opacity="0.88" />
      <rect x="86" y="58" width="28" height="38" rx="10" fill="#2C241E" />
      <ellipse cx="100" cy="52" rx="14" ry="12" fill={colors.accent} />
      <ellipse cx="92" cy="150" rx="6" ry="16" fill="#fff" opacity="0.28" />
    </g>
  );
}

function Jar({ colors }: { colors: C }) {
  return (
    <g>
      <ellipse cx="100" cy="214" rx="50" ry="8" fill="#2C241E" opacity="0.08" />
      <rect x="52" y="100" width="96" height="96" rx="22" fill={colors.secondary} stroke="#2C241E" strokeWidth="1.3" />
      <rect x="52" y="148" width="96" height="48" fill={colors.primary} opacity="0.75" />
      <rect x="62" y="78" width="76" height="28" rx="10" fill="#2C241E" />
      <ellipse cx="100" cy="78" rx="38" ry="10" fill={colors.accent} />
      <ellipse cx="84" cy="132" rx="12" ry="8" fill="#fff" opacity="0.3" />
    </g>
  );
}

function Pump({ colors }: { colors: C }) {
  return (
    <g>
      <ellipse cx="100" cy="214" rx="40" ry="8" fill="#2C241E" opacity="0.08" />
      <rect x="68" y="88" width="64" height="112" rx="16" fill={colors.secondary} stroke="#2C241E" strokeWidth="1.2" />
      <rect x="68" y="140" width="64" height="60" rx="16" fill={colors.primary} opacity="0.7" />
      <rect x="88" y="58" width="24" height="34" rx="6" fill="#2C241E" />
      <rect x="96" y="40" width="8" height="22" rx="3" fill={colors.accent} />
      <rect x="96" y="38" width="22" height="8" rx="3" fill="#2C241E" />
    </g>
  );
}

function Tube({ colors }: { colors: C }) {
  return (
    <g>
      <ellipse cx="100" cy="214" rx="30" ry="7" fill="#2C241E" opacity="0.08" />
      <rect x="78" y="78" width="44" height="120" rx="14" fill={colors.primary} stroke="#2C241E" strokeWidth="1.2" />
      <rect x="82" y="52" width="36" height="30" rx="8" fill="#2C241E" />
      <rect x="90" y="44" width="20" height="12" rx="3" fill={colors.accent} />
      <ellipse cx="92" cy="128" rx="8" ry="20" fill="#fff" opacity="0.22" />
    </g>
  );
}

function Mist({ colors }: { colors: C }) {
  return (
    <g>
      <ellipse cx="100" cy="214" rx="34" ry="7" fill="#2C241E" opacity="0.08" />
      <rect x="76" y="86" width="48" height="114" rx="14" fill={colors.secondary} stroke="#2C241E" strokeWidth="1.2" />
      <rect x="76" y="140" width="48" height="60" rx="14" fill={colors.primary} opacity="0.75" />
      <rect x="90" y="62" width="20" height="28" rx="4" fill="#2C241E" />
      <circle cx="100" cy="54" r="8" fill={colors.accent} />
      <circle cx="84" cy="48" r="3" fill={colors.primary} opacity="0.45" />
      <circle cx="116" cy="44" r="2.5" fill={colors.primary} opacity="0.35" />
      <circle cx="108" cy="36" r="2" fill={colors.primary} opacity="0.3" />
    </g>
  );
}
