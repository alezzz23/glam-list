export function FlowerMark({ className = "size-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M40 8c3.2 8.8 5.4 14 8.8 18.6C52.2 31.2 58 34 68 36.5c-8.6 3.4-14.2 6.6-18.4 11.2C45.4 52.3 43.4 58.4 40 72c-3.4-13.6-5.4-19.7-9.6-24.3C26.2 43.1 20.6 39.9 12 36.5c10-2.5 15.8-5.3 19.2-9.9C34.6 22 36.8 16.8 40 8Z"
        fill="#E8B8BC"
        stroke="#2C241E"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M40 8c2.2 9.4 2.8 16.2 2.8 22.8 0 8.4 2.6 13.2 11.2 18.2-8.2 2.2-13.8 2.8-16.8 8.5"
        stroke="#2C241E"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <text
        x="40"
        y="48"
        textAnchor="middle"
        fill="#2C241E"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="28"
        fontStyle="italic"
      >
        b
      </text>
    </svg>
  );
}

export function PetalBurst({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="none">
      {Array.from({ length: 8 }).map((_, index) => {
        const angle = (index * Math.PI) / 4;
        const x = 100 + Math.cos(angle) * 58;
        const y = 100 + Math.sin(angle) * 58;
        return (
          <ellipse
            key={index}
            cx={x}
            cy={y}
            rx="18"
            ry="28"
            transform={`rotate(${(index * 45) + 12} ${x} ${y})`}
            fill="#E8B8BC"
            fillOpacity="0.35"
            stroke="#2C241E"
            strokeOpacity="0.12"
          />
        );
      })}
    </svg>
  );
}
