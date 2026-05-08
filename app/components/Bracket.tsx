"use client";

import { R16_MATCHUPS } from "@/lib/data";

function Slot({ label, dim = false }: { label: string; dim?: boolean }) {
  return (
    <div
      className="px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
      style={{
        background: dim ? "var(--ivory-100)" : "var(--surface)",
        border: `1px solid ${dim ? "var(--border)" : "rgba(0,124,146,0.25)"}`,
        color: dim ? "var(--slate-400)" : "var(--slate-950)",
        boxShadow: dim ? "none" : "var(--shadow-sm)",
      }}
    >
      <span className="truncate block">{label}</span>
    </div>
  );
}

function PhaseLabel({ title }: { title: string }) {
  return (
    <div className="text-center mb-4">
      <span
        className="livo-pill text-xs font-semibold uppercase tracking-widest px-3 py-1"
        style={{ background: "var(--brand-teal-subtle)", color: "var(--brand-teal)", border: "1px solid var(--brand-teal-border)" }}
      >
        {title}
      </span>
    </div>
  );
}

export default function Bracket() {
  const TBD = "TBD";
  const r16Top = R16_MATCHUPS.slice(0, 4);
  const r16Bottom = R16_MATCHUPS.slice(4, 8);

  return (
    <div className="space-y-6">
      <p className="text-xs md:hidden text-center" style={{ color: "var(--slate-400)" }}>
        Scroll horizontally to view full bracket →
      </p>

      <div className="overflow-x-auto pb-4">
        <div className="min-w-[880px]">

          {/* Phase headers */}
          <div className="grid grid-cols-[1fr_16px_1fr_16px_1fr_16px_1fr_16px_180px] mb-2">
            {["ROUND OF 16", "", "QUARTER-FINALS", "", "SEMI-FINALS", "", "FINAL", "", "CHAMPION"].map((t, i) => (
              <div key={i} className="text-center">
                {t && <PhaseLabel title={t} />}
              </div>
            ))}
          </div>

          {/* Top half */}
          <div className="grid grid-cols-[1fr_16px_1fr_16px_1fr_16px_1fr_16px_180px] items-start">
            {/* R16 top 4 */}
            <div className="space-y-1">
              {r16Top.map((m) => (
                <div key={m.slot} className="mb-4">
                  <Slot label={m.p1} />
                  <div className="flex items-center gap-2 my-1 px-2">
                    <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                    <span className="text-xs font-medium" style={{ color: "var(--slate-400)" }}>vs</span>
                    <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                  </div>
                  <Slot label={m.p2} />
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center h-full">
              <div className="flex-1 w-px" style={{ background: "var(--border)" }} />
            </div>

            {/* QF top 2 */}
            <div className="space-y-2 pt-10">
              {[0, 1].map((i) => (
                <div key={i} className="mb-10">
                  <Slot label={TBD} dim />
                  <div className="flex items-center gap-2 my-1 px-2">
                    <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                    <span className="text-xs font-medium" style={{ color: "var(--slate-400)" }}>vs</span>
                    <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                  </div>
                  <Slot label={TBD} dim />
                </div>
              ))}
            </div>

            <div />

            {/* SF top */}
            <div className="pt-28">
              <Slot label={TBD} dim />
              <div className="flex items-center gap-2 my-1 px-2">
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                <span className="text-xs font-medium" style={{ color: "var(--slate-400)" }}>vs</span>
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
              </div>
              <Slot label={TBD} dim />
            </div>

            <div />

            {/* Final */}
            <div className="pt-40">
              <Slot label={TBD} dim />
              <div className="flex items-center gap-2 my-1 px-2">
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                <span className="text-xs font-medium" style={{ color: "var(--slate-400)" }}>vs</span>
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
              </div>
              <Slot label={TBD} dim />
            </div>

            <div />

            {/* Champion */}
            <div className="pt-44">
              <div
                className="rounded-lg p-5 text-center"
                style={{ background: "var(--brand-teal-subtle)", border: "1px solid var(--brand-teal-border)" }}
              >
                <div className="text-3xl mb-2">🏆</div>
                <div className="font-bold text-sm uppercase tracking-widest mb-1" style={{ color: "var(--brand-teal)" }}>
                  Champion
                </div>
                <div className="text-xs" style={{ color: "var(--slate-400)" }}>To be determined</div>
              </div>
              <div
                className="mt-3 rounded-lg p-3 text-center"
                style={{ background: "var(--ivory-100)", border: "1px solid var(--border)" }}
              >
                <div className="text-lg mb-0.5">🥈</div>
                <div className="text-xs font-semibold" style={{ color: "var(--slate-700)" }}>Runner-Up</div>
                <div className="text-xs" style={{ color: "var(--slate-400)" }}>TBD</div>
              </div>
            </div>
          </div>

          {/* Bottom half */}
          <div className="mt-3 grid grid-cols-[1fr_16px_1fr] items-start">
            <div className="space-y-1">
              {r16Bottom.map((m) => (
                <div key={m.slot} className="mb-4">
                  <Slot label={m.p1} />
                  <div className="flex items-center gap-2 my-1 px-2">
                    <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                    <span className="text-xs font-medium" style={{ color: "var(--slate-400)" }}>vs</span>
                    <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                  </div>
                  <Slot label={m.p2} />
                </div>
              ))}
            </div>
            <div />
            <div className="space-y-2 pt-10">
              {[0, 1].map((i) => (
                <div key={i} className="mb-10">
                  <Slot label={TBD} dim />
                  <div className="flex items-center gap-2 my-1 px-2">
                    <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                    <span className="text-xs font-medium" style={{ color: "var(--slate-400)" }}>vs</span>
                    <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                  </div>
                  <Slot label={TBD} dim />
                </div>
              ))}
            </div>
          </div>

          {/* 3rd place */}
          <div className="mt-8 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-center mb-3" style={{ color: "var(--slate-400)" }}>
              🥉 3rd Place Match
            </p>
            <div className="max-w-xs mx-auto">
              <Slot label="SF Loser 1" dim />
              <div className="flex items-center gap-2 my-1 px-2">
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                <span className="text-xs font-medium" style={{ color: "var(--slate-400)" }}>vs</span>
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
              </div>
              <Slot label="SF Loser 2" dim />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
