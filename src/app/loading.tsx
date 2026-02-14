import { ImSpinner9 } from "react-icons/im";

export default function Loading() {
  return <>
  <div className="max-w-7xl mx-auto mt-5">
    <div className="h-screen flex flex-col items-center justify-center gap-4 text-center p-10">
         <ImSpinner9  className="size-6 md:size-8 second-color animate-spin"/>
         <h3 className="text-4xl md:text-6xl accent-color font-semibold">Just a second</h3>
    </div>
  </div>
  </>
}
