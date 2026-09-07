import type { Product } from "@/data/products";

function Sparkle({
  x,
  y,
  size,
  fill,
  opacity = 0.9,
}: {
  x: number;
  y: number;
  size: number;
  fill: string;
  opacity?: number;
}) {
  const c = size * 0.18;
  return (
    <path
      d={`M ${x} ${y - size} Q ${x + c} ${y - c} ${x + size} ${y} Q ${x + c} ${y + c} ${x} ${y + size} Q ${x - c} ${y + c} ${x - size} ${y} Q ${x - c} ${y - c} ${x} ${y - size} Z`}
      fill={fill}
      opacity={opacity}
    />
  );
}

function Shadow({ cx = 200, cy = 335, rx = 75 }: { cx?: number; cy?: number; rx?: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={11} fill="#3A2418" opacity={0.1} />;
}

function LabelLines({ x, y, w, color }: { x: number; y: number; w: number; color: string }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={6} rx={3} fill={color} opacity={0.55} />
      <rect x={x + w * 0.12} y={y + 13} width={w * 0.76} height={6} rx={3} fill={color} opacity={0.3} />
    </>
  );
}

function Art({ product }: { product: Product }) {
  const { primary, secondary, fill } = product.art;

  switch (product.art.kind) {
    case "lipstick":
      return (
        <>
          <Shadow cy={338} />
          <path
            d="M176,208 L176,152 C176,144 180,140 186,137 L214,121 C220,118 224,121 224,128 L224,208 Z"
            fill={fill}
          />
          <rect x="162" y="204" width="76" height="24" rx="6" fill={secondary} />
          <rect x="168" y="226" width="64" height="106" rx="8" fill={primary} />
          <rect x="177" y="234" width="9" height="90" rx="4.5" fill="#FFFFFF" opacity={0.14} />
          <Sparkle x={272} y={140} size={13} fill={secondary} />
          <Sparkle x={126} y={180} size={9} fill={secondary} opacity={0.7} />
        </>
      );

    case "foundation":
      return (
        <>
          <Shadow cy={342} />
          <rect x="176" y="140" width="48" height="30" rx="6" fill={primary} />
          <rect x="216" y="146" width="26" height="12" rx="6" fill={primary} />
          <rect x="186" y="168" width="28" height="20" fill={secondary} />
          <rect x="152" y="186" width="96" height="150" rx="16" fill={fill} />
          <rect x="162" y="196" width="13" height="128" rx="6.5" fill="#FFFFFF" opacity={0.35} />
          <rect x="166" y="230" width="68" height="62" rx="6" fill="#FFFFFF" opacity={0.88} />
          <LabelLines x={176} y={248} w={48} color={primary} />
          <Sparkle x={280} y={170} size={11} fill={secondary} />
        </>
      );

    case "palette": {
      const shades = ["#E8C07A", "#C98A5A", "#8A4B2E", "#F0D5A8", "#B4713C", "#6B3A26"];
      return (
        <>
          <Shadow cy={322} rx={112} />
          <rect x="88" y="185" width="224" height="126" rx="18" fill={primary} />
          <rect x="102" y="199" width="196" height="98" rx="12" fill="#F9F1E6" />
          {shades.map((shade, i) => (
            <circle
              key={shade}
              cx={140 + (i % 3) * 60}
              cy={i < 3 ? 230 : 274}
              r={17}
              fill={shade}
            />
          ))}
          <rect x="190" y="178" width="20" height="12" rx="4" fill={secondary} />
          <Sparkle x={320} y={160} size={11} fill={secondary} />
          <Sparkle x={76} y={150} size={8} fill={secondary} opacity={0.7} />
        </>
      );
    }

    case "blush":
      return (
        <>
          <Shadow cy={332} rx={92} />
          <circle cx="200" cy="172" r="62" fill={secondary} />
          <circle cx="200" cy="172" r="47" fill="#FDF6F0" />
          <path d="M172,158 L206,138" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" opacity={0.9} />
          <circle cx="200" cy="272" r="67" fill={primary} />
          <circle cx="200" cy="272" r="46" fill={fill} />
          <circle cx="200" cy="272" r="29" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity={0.35} />
          <circle cx="200" cy="272" r="13" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity={0.25} />
          <Sparkle x={288} y={210} size={11} fill={secondary} />
        </>
      );

    case "mascara":
      return (
        <>
          <Shadow cy={340} rx={82} />
          <rect x="238" y="150" width="16" height="92" rx="8" fill={secondary} />
          <rect x="244" y="240" width="4" height="42" fill="#8D7B83" />
          <rect x="235" y="280" width="22" height="54" rx="10" fill={fill} />
          <path d="M235,292 L257,292 M235,304 L257,304 M235,316 L257,316" stroke="#FFFFFF" strokeWidth="2.5" opacity={0.18} />
          <rect x="158" y="190" width="52" height="144" rx="12" fill={primary} />
          <rect x="158" y="190" width="52" height="26" rx="12" fill={secondary} />
          <rect x="158" y="203" width="52" height="13" fill={secondary} />
          <rect x="167" y="228" width="8" height="96" rx="4" fill="#FFFFFF" opacity={0.12} />
          <Sparkle x={292} y={180} size={10} fill={secondary} />
        </>
      );

    case "highlighter":
      return (
        <>
          <Shadow cy={338} rx={72} />
          <path d="M178,198 L178,152 C178,134 222,134 222,152 L222,198 Z" fill={fill} />
          <rect x="160" y="196" width="80" height="22" rx="6" fill={secondary} />
          <rect x="166" y="216" width="68" height="116" rx="10" fill={primary} />
          <rect x="175" y="226" width="9" height="96" rx="4.5" fill="#FFFFFF" opacity={0.14} />
          <Sparkle x={268} y={128} size={14} fill={secondary} />
          <Sparkle x={128} y={170} size={10} fill={secondary} opacity={0.8} />
          <Sparkle x={292} y={210} size={8} fill={secondary} opacity={0.6} />
        </>
      );

    case "serum":
      return (
        <>
          <Shadow cy={342} rx={76} />
          <circle cx="200" cy="150" r="13" fill={secondary} />
          <rect x="182" y="158" width="36" height="40" rx="6" fill={secondary} />
          <rect x="158" y="196" width="84" height="140" rx="14" fill={fill} />
          <rect x="166" y="216" width="68" height="112" rx="10" fill={primary} opacity={0.5} />
          <rect x="168" y="206" width="12" height="118" rx="6" fill="#FFFFFF" opacity={0.3} />
          <rect x="170" y="240" width="60" height="58" rx="6" fill="#FFFFFF" opacity={0.92} />
          <path
            d="M200,254 C206,262 209,266 209,271 A9,9 0 1 1 191,271 C191,266 194,262 200,254 Z"
            fill={primary}
          />
          <rect x="182" y="286" width="36" height="5" rx="2.5" fill={primary} opacity={0.4} />
          <Sparkle x={276} y={170} size={11} fill={secondary} />
        </>
      );

    case "moisturizer":
      return (
        <>
          <Shadow cy={322} rx={96} />
          <rect x="132" y="216" width="136" height="100" rx="20" fill={fill} />
          <rect x="132" y="216" width="136" height="100" rx="20" fill="none" stroke={primary} strokeWidth="2" opacity={0.15} />
          <rect x="126" y="178" width="148" height="40" rx="15" fill={secondary} />
          <rect x="142" y="185" width="116" height="8" rx="4" fill="#FFFFFF" opacity={0.28} />
          <LabelLines x={160} y={248} w={80} color={primary} />
          <Sparkle x={300} y={200} size={11} fill={secondary} />
          <Sparkle x={102} y={230} size={8} fill={secondary} opacity={0.7} />
        </>
      );

    case "cleanser":
      return (
        <>
          <Shadow cy={340} rx={72} />
          <rect x="172" y="146" width="56" height="30" rx="8" fill={primary} />
          <rect x="158" y="174" width="84" height="152" rx="20" fill={fill} />
          <rect x="158" y="174" width="84" height="152" rx="20" fill="none" stroke={primary} strokeWidth="2" opacity={0.12} />
          <rect x="167" y="186" width="11" height="128" rx="5.5" fill="#FFFFFF" opacity={0.4} />
          <LabelLines x={176} y={214} w={48} color={primary} />
          <ellipse cx="188" cy="282" rx="9" ry="14" fill={secondary} opacity={0.75} transform="rotate(-18 188 282)" />
          <ellipse cx="212" cy="292" rx="9" ry="14" fill={secondary} opacity={0.55} transform="rotate(14 212 292)" />
          <Sparkle x={272} y={180} size={10} fill={secondary} />
        </>
      );

    case "sunscreen": {
      const rays = Array.from({ length: 8 }, (_, i) => {
        const angle = (i * Math.PI) / 4;
        const r1 = 26;
        const r2 = 34;
        return {
          x1: 200 + Math.cos(angle) * r1,
          y1: 232 + Math.sin(angle) * r1,
          x2: 200 + Math.cos(angle) * r2,
          y2: 232 + Math.sin(angle) * r2,
        };
      });
      return (
        <>
          <Shadow cy={344} rx={72} />
          <rect x="158" y="168" width="84" height="152" rx="18" fill={fill} />
          <rect x="158" y="168" width="84" height="152" rx="18" fill="none" stroke={secondary} strokeWidth="2" opacity={0.15} />
          <rect x="170" y="318" width="60" height="24" rx="8" fill={secondary} />
          <circle cx="200" cy="232" r="19" fill={primary} />
          {rays.map((ray, i) => (
            <line
              key={i}
              x1={ray.x1}
              y1={ray.y1}
              x2={ray.x2}
              y2={ray.y2}
              stroke={primary}
              strokeWidth="5"
              strokeLinecap="round"
            />
          ))}
          <LabelLines x={176} y={282} w={48} color={secondary} />
          <Sparkle x={272} y={160} size={10} fill={secondary} />
        </>
      );
    }

    case "mask":
      return (
        <>
          <Shadow cy={324} rx={96} />
          <rect x="130" y="224" width="140" height="94" rx="18" fill={fill} />
          <rect x="130" y="224" width="140" height="94" rx="18" fill="#FFFFFF" opacity={0.18} />
          <rect x="124" y="190" width="152" height="36" rx="13" fill={secondary} />
          <path d="M138,203 L262,203 M138,212 L262,212" stroke="#000000" strokeWidth="2.5" opacity={0.12} />
          <rect x="158" y="248" width="84" height="46" rx="6" fill="#FFFFFF" opacity={0.88} />
          <LabelLines x={168} y={260} w={64} color={primary} />
          <Sparkle x={298} y={186} size={11} fill={secondary} />
          <Sparkle x={104} y={216} size={8} fill={secondary} opacity={0.7} />
        </>
      );

    case "toner":
      return (
        <>
          <Shadow cy={344} rx={72} />
          <rect x="184" y="138" width="32" height="14" rx="6" fill={primary} />
          <rect x="184" y="150" width="32" height="38" rx="6" fill={secondary} />
          <circle cx="236" cy="132" r="4" fill={primary} opacity={0.45} />
          <circle cx="248" cy="120" r="3" fill={primary} opacity={0.35} />
          <circle cx="226" cy="116" r="2.5" fill={primary} opacity={0.3} />
          <rect x="162" y="186" width="76" height="152" rx="14" fill={fill} />
          <rect x="170" y="214" width="60" height="116" rx="10" fill={primary} opacity={0.42} />
          <rect x="170" y="196" width="10" height="130" rx="5" fill="#FFFFFF" opacity={0.3} />
          <rect x="174" y="240" width="52" height="56" rx="6" fill="#FFFFFF" opacity={0.9} />
          <circle cx="200" cy="260" r="8" fill={primary} opacity={0.8} />
          <circle cx="192" cy="254" r="4" fill={primary} opacity={0.45} />
          <circle cx="208" cy="254" r="4" fill={primary} opacity={0.45} />
          <rect x="184" y="278" width="32" height="5" rx="2.5" fill={primary} opacity={0.4} />
          <path d="M150,330 C156,318 168,318 170,328 C166,338 154,340 150,330 Z" fill={primary} opacity={0.5} />
          <path d="M250,332 C244,320 232,320 230,330 C234,340 246,342 250,332 Z" fill={primary} opacity={0.4} />
        </>
      );
  }
}

export function ProductIllustration({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { bgFrom, bgTo } = product.art;
  const gradientId = `grad-${product.id}`;

  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      role="img"
      aria-label={`Ilustración de ${product.name}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor={bgFrom} />
          <stop offset="100%" stopColor={bgTo} />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill={`url(#${gradientId})`} />
      <circle cx="200" cy="215" r="128" fill="#FFFFFF" opacity={0.32} />
      <circle cx="330" cy="90" r="5" fill="#FFFFFF" opacity={0.5} />
      <circle cx="64" cy="110" r="3.5" fill="#FFFFFF" opacity={0.5} />
      <circle cx="86" cy="300" r="4" fill="#FFFFFF" opacity={0.4} />
      <Art product={product} />
    </svg>
  );
}
