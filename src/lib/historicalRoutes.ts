// src/lib/historicalRoutes.ts

export interface HistoricalRoute {
  action: '200' | '301' | '410';
  targetUrl?: string; // Redirect destination for 301
}

// Map of historical URLs for backlink/authority preservation.
// Can be scaled easily to 1000+ paths.
export const HISTORICAL_ROUTES: Record<string, HistoricalRoute> = {
  // Backlink preservation URL (must return 200)
  '/archives/7439-Genealogy-of-Sultan-Sharif-Ul-Hashim-of-Sulu-Sultanate.html': {
    action: '200',
  },
  // Example of spam/junk paths to return 410 Gone (explicit drop of crawled bad pages)
  '/wp-login.php': { action: '410' },
  '/xmlrpc.php': { action: '410' },
  '/administrator/index.php': { action: '410' },
  
  // Reconstructed/Redirect routes to close matching topics
  '/politics-old-stuff': {
    action: '301',
    targetUrl: '/category/politics',
  },
  '/startups-news-legacy': {
    action: '301',
    targetUrl: '/category/startups',
  },
  '/sports-updates-old': {
    action: '301',
    targetUrl: '/category/sports',
  },
  '/tech-general-archive': {
    action: '301',
    targetUrl: '/category/technology',
  },
};

/**
 * Returns historical routing action for a given request path.
 */
export function getHistoricalRoute(path: string): HistoricalRoute | undefined {
  // Normalize path by removing trailing slash, query parameters, or hash fragments
  const normalizedPath = path.split('?')[0].split('#')[0].replace(/\/$/, '');
  
  // Try matching exact path or adding back trailing slash if omitted
  return HISTORICAL_ROUTES[normalizedPath] || HISTORICAL_ROUTES[normalizedPath + '/'];
}
