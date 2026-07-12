import { ImSpinner9 } from "react-icons/im";

const THEME = {
  "--paper": "#FFFEF8",
  "--ink": "#1C1B17",
  "--mustard": "#E8A33D",
  "--mustard-ink": "#B9781F",
} as React.CSSProperties;

const BARCODE = [
  [2, 24], [1, 20], [3, 24], [1, 16], [2, 24], [4, 20], [1, 24], [2, 16],
  [3, 24], [1, 20], [2, 24], [1, 16], [4, 24], [2, 20], [1, 24], [3, 16]
];

export default function Loading() {
  return (
    <div style={THEME} className="bg-[var(--paper)] select-none">
      <div className="h-screen flex items-center justify-center p-6 sm:p-10">
        
        <div className="relative flex flex-col items-center text-center p-8 sm:p-10 bg-[var(--paper)] border border-[var(--ink)]/20 rounded-xl shadow-[4px_4px_0px_0px_rgba(28,27,23,0.08),8px_8px_0px_0px_rgba(28,27,23,0.03)] max-w-sm w-full overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-[3px] flex justify-between px-1 opacity-20">
            {Array.from({ length: 24 }).map((_, i) => (
              <span key={i} className="w-2 h-2 bg-[var(--ink)] rotate-45 -translate-y-1/2" />
            ))}
          </div>

          <span className="absolute -left-[9px] top-1/2 -translate-y-1/2 w-4 h-[24px] rounded-r-full border-y border-r border-[var(--ink)]/20 bg-[var(--paper)] z-10" />
          <span className="absolute -right-[9px] top-1/2 -translate-y-1/2 w-4 h-[24px] rounded-l-full border-y border-l border-[var(--ink)]/20 bg-[var(--paper)] z-10" />

          <div className="w-full flex justify-between items-center border-b border-dashed border-[var(--ink)]/10 pb-4 mb-6 font-mono text-[10px] uppercase tracking-wider text-[var(--ink)]/40">
            <span>DOC-404</span>
            <span>PRNT_QS_2026</span>
          </div>

          <div className="relative p-2 rounded-full bg-[var(--mustard)]/10 mb-2">
            <ImSpinner9 className="size-8 md:size-10 text-[var(--mustard-ink)] animate-spin" />
          </div>

          <h3 className="text-2xl md:text-3xl font-black text-[var(--ink)] tracking-tight">
            Just a second
          </h3>
          
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--ink)]/50 mt-1 mb-6">
            Printing your request
          </p>

          <div className="w-full border-t border-dashed border-[var(--ink)]/15 my-2" />

          <div className="flex items-end gap-[2px] pt-4 h-8">
            {BARCODE.map(([w, h], i) => (
              <div
                key={i}
                className="animate-pulse"
                style={{
                  width: `${w}px`,
                  height: `${h}px`,
                  background: "var(--ink)",
                  opacity: 0.4,
                  animationDelay: `${i * 0.06}s`,
                  animationDuration: "1.2s"
                }}
              />
            ))}
          </div>

          <span className="font-mono text-[9px] text-[var(--ink)]/30 tracking-widest mt-3">
            SYS_RDY // {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}
          </span>

        </div>
      </div>
    </div>
  );
}