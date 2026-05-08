"use client";

export default function OlympicRings({ size = 40 }: { size?: number }) {
  const r = size / 2;
  const stroke = size / 10;
  const gap = size * 0.6;
  const totalW = gap * 4 + r * 2;
  const totalH = r * 2 + gap * 0.55;
  // Using Livo illustration accent palette + teal
  const colors = ["#007C92", "#4B99E6", "#1C2631", "#1FC86E", "#FFA538"];

  const cx = (i: number) => r + i * gap;
  const cy = (i: number) => (i % 2 === 0 ? r : r + gap * 0.55);

  return (
    <svg width={totalW} height={totalH} viewBox={`0 0 ${totalW} ${totalH}`}>
      {[1, 3].map((i) => (
        <circle key={`bg-${i}`} cx={cx(i)} cy={cy(i)} r={r - stroke / 2}
          fill="none" stroke={colors[i]} strokeWidth={stroke} opacity={0.85} />
      ))}
      {[0, 2, 4].map((i) => (
        <circle key={`fg-${i}`} cx={cx(i)} cy={cy(i)} r={r - stroke / 2}
          fill="none" stroke={colors[i]} strokeWidth={stroke} opacity={0.85} />
      ))}
    </svg>
  );
}
