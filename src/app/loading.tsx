import { ImSpinner9 } from "react-icons/im";

const THEME = {
  "--paper": "#FFFEF8",
  "--ink": "#1C1B17",
  "--mustard": "#E8A33D",
  "--mustard-ink": "#B9781F",
} as React.CSSProperties;

const BARCODE = [2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 2, 1, 4, 2, 1, 3];

export default function Loading() {
  return (
    <div style={THEME} className="bg-[var(--paper)]">
      <div className="h-screen flex items-center justify-center p-10">
        <div className="relative flex flex-col items-center gap-4 text-center p-10 bg-[var(--paper)] border border-dashed border-[var(--ink)]/15 rounded-xl">
          <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-dashed border-[var(--ink)]/25 bg-[var(--paper)]" />
          <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-dashed border-[var(--ink)]/25 bg-[var(--paper)]" />

          <ImSpinner9 className="size-8 md:size-10 text-[var(--mustard-ink)] animate-spin" />

          <h3 className="text-2xl md:text-3xl font-black text-[var(--ink)]">
            Just a second
          </h3>
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--ink)]/40">
            Printing your request
          </p>

          <div className="flex items-end gap-[2px] mt-2">
            {BARCODE.map((w, i) => (
              <div
                key={i}
                className="animate-pulse"
                style={{
                  width: `${w}px`,
                  height: "20px",
                  background: "var(--ink)",
                  opacity: 0.3,
                  animationDelay: `${i * 0.08}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
