"use client";

export default function OlympicRings({ size = 40 }: { size?: number }) {
  const r = size / 2;
  const stroke = size / 10;
  const gap = size * 0.6;
  const totalW = gap * 4 + r * 2;
  const totalH = r * 2 + gap * 0.55;
  const colors = ["#0085C7", "#F4C300", "#333333", "#009F6B", "#DF0024"];

  const cx = (i: number) => r + i * gap;
  const cy = (i: number) => (i % 2 === 0 ? r : r + gap * 0.55);

  return (
    <svg width={totalW} height={totalH} viewBox={`0 0 ${totalW} ${totalH}`}>
      {/* Bottom row rings drawn first (behind) */}
      {[1, 3].map((i) => (
        <circle
          key={`bg-${i}`}
          cx={cx(i)}
          cy={cy(i)}
          r={r - stroke / 2}
          fill="none"
          stroke={colors[i]}
          strokeWidth={stroke}
          opacity={0.9}
        />
      ))}
      {/* Top row rings drawn on top */}
      {[0, 2, 4].map((i) => (
        <circle
          key={`fg-${i}`}
          cx={cx(i)}
          cy={cy(i)}
          r={r - stroke / 2}
          fill="none"
          stroke={colors[i]}
          strokeWidth={stroke}
          opacity={0.9}
        />
      ))}
    </svg>
  );
}
