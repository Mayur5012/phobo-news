"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <span className="bg-[#CC0000] text-white px-2 py-1 text-[10px] 
          font-black uppercase tracking-widest font-mono">
          Error
        </span>
        <h1 className="font-serif text-4xl font-black mt-6 text-neutral-900">
          Something went wrong
        </h1>
        <button
          onClick={reset}
          className="mt-6 inline-block text-sm font-mono uppercase 
            tracking-wider text-[#CC0000] hover:underline"
        >
          Try again
        </button>
      </div>
    </main>
  );
}