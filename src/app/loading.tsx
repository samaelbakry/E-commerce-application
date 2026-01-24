import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return <>
  <div className="max-w-7xl mx-auto mt-5">
    <div className="h-screen flex flex-col items-center justify-center gap-4 text-center gap-3 p-10">
         <Spinner className="size-8 second-color" />
         <h3 className="text-6xl accent-color font-semibold">Just a second</h3>
    </div>
  </div>
  </>
}
