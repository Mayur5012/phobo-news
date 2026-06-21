import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Genealogy of Sultan Sharif Ul-Hashim and the Origins of the Sulu Sultanate | ZamboToday Archive",
  description:
    "Historical archive examining Sultan Sharif Ul-Hashim, founder of the Sulu Sultanate, his lineage, influence, and lasting impact on maritime Southeast Asian history.",
  keywords: [
    "Sultan Sharif Ul-Hashim",
    "Sulu Sultanate",
    "Sulu history",
    "Philippines history",
    "Maritime Southeast Asia",
    "Historical archive",
    "Genealogy",
  ],
  alternates: {
    canonical:
      "https://zambotoday.com/archives/7439-Genealogy-of-Sultan-Sharif-Ul-Hashim-of-Sulu-Sultanate.html",
  },
  openGraph: {
    title:
      "Genealogy of Sultan Sharif Ul-Hashim and the Origins of the Sulu Sultanate",
    description:
      "Historical archive examining the founder of the Sulu Sultanate and his legacy.",
    type: "article",
    url: "https://zambotoday.com/archives/7439-Genealogy-of-Sultan-Sharif-Ul-Hashim-of-Sulu-Sultanate.html",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Genealogy of Sultan Sharif Ul-Hashim and the Origins of the Sulu Sultanate",
    description:
      "Historical archive examining the founder of the Sulu Sultanate and his legacy.",
  },
};

export default function HistoricalArchivePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Genealogy of Sultan Sharif Ul-Hashim and the Origins of the Sulu Sultanate",
    description:
      "Historical archive examining Sultan Sharif Ul-Hashim, founder of the Sulu Sultanate.",
    author: {
      "@type": "Organization",
      name: "ZamboToday",
    },
    publisher: {
      "@type": "Organization",
      name: "ZamboToday",
    },
    datePublished: "2026-06-21",
    dateModified: "2026-06-21",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <main className="bg-white min-h-screen">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          
          <div className="border-b border-neutral-200 pb-3 mb-6">
            <span className="bg-[#CC0000] text-white px-2 py-1 text-[10px] font-black uppercase tracking-widest font-mono">
              Historical Archive
            </span>
          </div>

          <header className="max-w-4xl">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-6xl font-black leading-none tracking-tight text-neutral-900">
              Genealogy of Sultan Sharif Ul-Hashim and the Origins of the Sulu Sultanate
            </h1>

            <p className="mt-5 text-neutral-600 text-base sm:text-lg leading-relaxed max-w-3xl">
              A historical examination of Sultan Sharif Ul-Hashim, widely regarded
              as the founder of the Sulu Sultanate, and the lineage that shaped
              one of the most influential maritime states in Southeast Asian history.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-[11px] font-mono uppercase tracking-wider text-neutral-500">
              <span>Archive Reference: 7439</span>
              <span>Historical Feature</span>
              <span>Updated June 2026</span>
            </div>
          </header>

          <div className="mt-8 border border-neutral-200 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1518998053901-5348d3961a04"
              alt="Historical archive illustration"
              className="w-full aspect-[16/8] object-cover"
            />
          </div>

          <div className="grid lg:grid-cols-12 gap-10 mt-10">

            <div className="lg:col-span-8">

              <div className="prose prose-neutral max-w-none">

                <p className="text-lg leading-relaxed text-neutral-800">
                  Sultan Sharif Ul-Hashim occupies a significant position in the
                  historical development of the Sulu archipelago. Historical
                  traditions, regional chronicles, and genealogical records
                  describe him as a religious scholar and noble figure whose
                  arrival contributed to the formation of the Sulu Sultanate
                  during the fifteenth century.
                </p>

                <h2>The Emergence of the Sultanate</h2>

                <p>
                  The rise of the Sulu Sultanate marked a transformative period
                  in the political and economic landscape of maritime Southeast
                  Asia. Strategically positioned along major trading routes, the
                  Sultanate developed strong commercial connections extending
                  across present-day Philippines, Malaysia, Indonesia, and
                  neighboring regions.
                </p>

                <p>
                  Through diplomatic alliances and expanding trade networks,
                  regional leaders consolidated authority while facilitating the
                  movement of goods, knowledge, and cultural traditions.
                </p>

                <h2>Lineage and Historical Records</h2>

                <p>
                  Genealogical accounts associated with Sultan Sharif Ul-Hashim
                  remain important historical references for researchers studying
                  the origins of leadership within the Sulu Sultanate.
                </p>

                <p>
                  Historical manuscripts and oral traditions document successive
                  generations of rulers, preserving narratives that continue to
                  shape scholarly discussions regarding governance, succession,
                  and regional influence.
                </p>

                <h2>Regional Influence</h2>

                <p>
                  The Sultanate evolved into an important maritime power whose
                  influence extended beyond the Sulu archipelago. Trade,
                  diplomacy, and cultural exchange connected communities across
                  Southeast Asia and contributed to the region's broader
                  historical development.
                </p>

                <p>
                  Historians continue to examine archival sources to better
                  understand the political structures and economic systems that
                  supported the Sultanate's longevity.
                </p>

                <h2>Legacy</h2>

                <p>
                  Today, Sultan Sharif Ul-Hashim remains one of the most widely
                  recognized historical figures associated with the Sulu
                  Sultanate. His legacy continues to be referenced in historical
                  research, educational materials, and discussions concerning the
                  cultural heritage of the region.
                </p>

                <p>
                  Ongoing academic research seeks to reconcile historical records,
                  genealogical accounts, and oral traditions in order to provide
                  a deeper understanding of the Sultanate's origins and enduring
                  significance.
                </p>
              </div>
            </div>

            <aside className="lg:col-span-4">

              <div className="border border-neutral-200 p-4">

                <div className="border-b border-neutral-900 pb-2 mb-4">
                  <h3 className="text-xs font-black uppercase tracking-widest">
                    Historical Context
                  </h3>
                </div>

                <div className="space-y-4 text-sm">

                  <div>
                    <div className="font-mono text-[10px] text-neutral-500 uppercase">
                      Period
                    </div>
                    <div className="font-semibold">
                      15th Century
                    </div>
                  </div>

                  <div>
                    <div className="font-mono text-[10px] text-neutral-500 uppercase">
                      Region
                    </div>
                    <div className="font-semibold">
                      Sulu Archipelago
                    </div>
                  </div>

                  <div>
                    <div className="font-mono text-[10px] text-neutral-500 uppercase">
                      Topic
                    </div>
                    <div className="font-semibold">
                      Historical Genealogy
                    </div>
                  </div>

                  <div>
                    <div className="font-mono text-[10px] text-neutral-500 uppercase">
                      Classification
                    </div>
                    <div className="font-semibold">
                      Archive Feature
                    </div>
                  </div>

                </div>

              </div>

            </aside>

          </div>

        </article>
      </main>
    </>
  );
}