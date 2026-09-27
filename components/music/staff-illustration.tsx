/**
 * Ilustração vetorial da pauta em clave de sol — leve, sem bitmap.
 */
export function StaffIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 360 280"
      role="img"
      aria-label="Pauta musical em clave de sol com a nota Lá"
    >
      <rect width="360" height="280" rx="28" fill="var(--card)" />
      <rect
        x="1.5"
        y="1.5"
        width="357"
        height="277"
        rx="26.5"
        fill="none"
        stroke="var(--border)"
        strokeWidth="3"
      />

      {[78, 108, 138, 168, 198].map((y) => (
        <line
          key={y}
          x1="36"
          x2="324"
          y1={y}
          y2={y}
          stroke="var(--primary)"
          strokeOpacity="0.35"
          strokeWidth="2"
        />
      ))}

      {/* Clave de sol simplificada */}
      <path
        d="M86 198
           c0-28 22-46 22-74
           c0-28-18-46-34-46
           c-22 0-34 20-34 40
           c0 36 40 40 40 72
           c0 22-16 34-32 34
           c-20 0-34-16-34-34
           c0-14 8-24 20-28
           m18-108
           c8-22 6-44-8-56"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="74" cy="210" r="10" fill="var(--primary)" />

      {/* Cabeça da nota (A4, 2º espaço) */}
      <ellipse
        cx="236"
        cy="168"
        rx="18"
        ry="13"
        transform="rotate(-18 236 168)"
        fill="var(--foreground)"
      />
      <line
        x1="252"
        x2="252"
        y1="164"
        y2="72"
        stroke="var(--foreground)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M252 78 c28 6 42 22 40 44"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <text
        x="236"
        y="248"
        textAnchor="middle"
        fill="var(--muted-foreground)"
        fontSize="16"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        Lá · A4 · 440 Hz
      </text>
    </svg>
  );
}
