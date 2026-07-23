import { ImSpinner9 } from "react-icons/im";

export default function Loading() {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 py-12 bg-white overflow-hidden select-none">
      <div
        className="absolute inset-0 flex px-6 max-w-xl mx-auto pointer-events-none"
        aria-hidden="true"
      >
        <div className="flex-1 border-r border-stone-200/40" />
        <div className="flex-1 border-r border-stone-200/40" />
        <div className="flex-1" />
      </div>

      <div className="w-full max-w-md relative z-10 mx-auto flex flex-col items-center text-center">
        <div className="relative p-3 rounded-2xl bg-stone-100 mb-6 border border-stone-200/60 shadow-sm">
          <ImSpinner9 className="size-8 text-primary animate-spin" />
        </div>

        <div className="mb-6">
          <h3 className="text-4xl font-light tracking-tight text-stone-900">
            Just a <span className="font-serif italic text-primary">second</span>
          </h3>
          <p className="text-sm text-stone-500 font-light leading-relaxed mt-2">
            Preparing your experience and retrieving data
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-50 border border-stone-200/60 font-mono text-[10px] uppercase text-stone-400 tracking-wider">
          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          <span>
            SYS_RDY //{" "}
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}