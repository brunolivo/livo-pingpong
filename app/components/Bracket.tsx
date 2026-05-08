"use client";

import { R16_MATCHUPS } from "@/lib/data";

function Slot({ label, highlight = false }: { label: string; highlight?: boolean }) {
  return (
    <div
      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
        highlight
          ? "bg-amber-500/20 border border-amber-500/40 text-amber-200"
          : "bg-white/5 border border-white/10 text-gray-300"
      }`}
    >
      <span className="truncate block">{label}</span>
    </div>
  );
}

function RoundCol({ title, slots, highlight = false }: { title: string; slots: string[]; highlight?: boolean }) {
  return (
    <div className="flex flex-col gap-2 min-w-[160px]">
      <div className="text-center mb-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400/80 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
          {title}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {slots.map((s, i) => (
          <Slot key={i} label={s} highlight={highlight} />
        ))}
      </div>
    </div>
  );
}

function ConnectorLines({ count }: { count: number }) {
  return (
    <div className="flex flex-col justify-around h-full px-1" style={{ gap: `${100 / count}%` }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center">
          <div className="w-3 h-px bg-amber-500/30" />
          <div className="w-px h-6 bg-amber-500/30" />
          <div className="w-3 h-px bg-amber-500/30" />
        </div>
      ))}
    </div>
  );
}

export default function Bracket() {
  const TBD = "TBD";

  const r16Top = R16_MATCHUPS.slice(0, 4);
  const r16Bottom = R16_MATCHUPS.slice(4, 8);

  return (
    <div className="space-y-6">
      {/* Mobile warning */}
      <p className="text-xs text-gray-500 text-center md:hidden">
        Scroll horizontally to view the full bracket →
      </p>

      <div className="overflow-x-auto pb-4">
        <div className="min-w-[900px]">
          {/* Phase labels */}
          <div className="grid grid-cols-[1fr_20px_1fr_20px_1fr_20px_1fr_20px_200px] gap-0 mb-4">
            {["ROUND OF 16", "", "QUARTER-FINALS", "", "SEMI-FINALS", "", "FINAL", "", "CHAMPION"].map((t, i) => (
              <div key={i} className={`text-center ${t ? "" : ""}`}>
                {t && (
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400/80">
                    {t}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Top half of bracket */}
          <div className="grid grid-cols-[1fr_20px_1fr_20px_1fr_20px_1fr_20px_200px] gap-0 items-start">
            {/* R16 top */}
            <div className="space-y-2">
              {r16Top.map((m) => (
                <div key={m.slot} className="mb-4">
                  <Slot label={m.p1} />
                  <div className="my-1 flex items-center gap-2">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-xs text-gray-600">vs</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>
                  <Slot label={m.p2} />
                </div>
              ))}
            </div>

            {/* Connector */}
            <div className="flex flex-col items-center h-full pt-5">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-center">
                  <div className="w-px h-full bg-amber-500/20" />
                </div>
              ))}
            </div>

            {/* QF top */}
            <div className="space-y-8 pt-8">
              {[0, 1].map((i) => (
                <div key={i} className="mb-8">
                  <Slot label={TBD} />
                  <div className="my-1 flex items-center gap-2">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-xs text-gray-600">vs</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>
                  <Slot label={TBD} />
                </div>
              ))}
            </div>

            {/* Connector */}
            <div />

            {/* SF top */}
            <div className="pt-24">
              <Slot label={TBD} />
              <div className="my-1 flex items-center gap-2">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs text-gray-600">vs</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
              <Slot label={TBD} />
            </div>

            {/* Connector */}
            <div />

            {/* Final */}
            <div className="pt-36">
              <Slot label={TBD} />
              <div className="my-1 flex items-center gap-2">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs text-gray-600">vs</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
              <Slot label={TBD} />
            </div>

            {/* Connector */}
            <div />

            {/* Champion */}
            <div className="pt-40">
              <div className="glass-gold rounded-2xl p-4 text-center">
                <div className="text-3xl mb-2">🏆</div>
                <div className="text-amber-400 font-black text-sm uppercase tracking-widest mb-1">Champion</div>
                <div className="text-gray-400 text-xs">To be determined</div>
              </div>
              <div className="mt-4 glass rounded-xl p-3 text-center">
                <div className="text-lg mb-1">🥈</div>
                <div className="text-gray-300 text-xs font-semibold">Runner-Up</div>
                <div className="text-gray-500 text-xs">TBD</div>
              </div>
            </div>
          </div>

          {/* Bottom half */}
          <div className="mt-4 grid grid-cols-[1fr_20px_1fr_20px_1fr] gap-0 items-start">
            <div className="space-y-2">
              {r16Bottom.map((m) => (
                <div key={m.slot} className="mb-4">
                  <Slot label={m.p1} />
                  <div className="my-1 flex items-center gap-2">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-xs text-gray-600">vs</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>
                  <Slot label={m.p2} />
                </div>
              ))}
            </div>
            <div />
            <div className="space-y-8 pt-8">
              {[0, 1].map((i) => (
                <div key={i} className="mb-8">
                  <Slot label={TBD} />
                  <div className="my-1 flex items-center gap-2">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-xs text-gray-600">vs</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>
                  <Slot label={TBD} />
                </div>
              ))}
            </div>
          </div>

          {/* 3rd place */}
          <div className="mt-8 border-t border-white/5 pt-6">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 text-center mb-3">
              🥉 3rd Place Match
            </p>
            <div className="max-w-xs mx-auto">
              <Slot label="SF Loser 1" />
              <div className="my-1 flex items-center gap-2">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs text-gray-600">vs</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
              <Slot label="SF Loser 2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
