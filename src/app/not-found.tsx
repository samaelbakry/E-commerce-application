import Link from "next/link";


export default function NotFound() {
   return (
    <div className="h-screen flex flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-bold">Oops! Page not found</h1>
      <p className="text-gray-500">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link href="/">
        <button className="text-lg font-semibold bg-cyan-700 hover:bg-cyan-800 transition text-white px-5 py-2 rounded-xl shadow">
          Back to Home
        </button>
      </Link>
    </div>
  )
}
