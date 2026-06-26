import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <span className="bg-[#CC0000] text-white px-2 py-1 text-[10px] 
          font-black uppercase tracking-widest font-mono">
          404
        </span>
        <h1 className="font-serif text-4xl font-black mt-6 text-neutral-900">
          Page Not Found
        </h1>
        <p className="mt-4 text-neutral-600">
          This page does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-sm font-mono uppercase 
            tracking-wider text-[#CC0000] hover:underline"
        >
          ← Return to Homepage
        </Link>
      </div>
    </main>
  );
}