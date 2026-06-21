import { NextRequest, NextResponse } from "next/server";
import { getHistoricalRoute } from "../../lib/historicalRoutes";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ spam: string[] }> }
) {
  const resolvedParams = await params;
  const path = "/" + resolvedParams.spam.join("/");
  
  const route = getHistoricalRoute(path);
  
  if (route) {
    if (route.action === '301' && route.targetUrl) {
      return NextResponse.redirect(new URL(route.targetUrl, request.url), 301);
    }
    if (route.action === '410') {
      return new Response(
        `<!DOCTYPE html>
        <html lang="en">
        <head>
          <title>410 Gone</title>
          <style>
            body { font-family: monospace; padding: 50px; background: #fafafa; color: #333; }
            h1 { color: #cc0000; }
          </style>
        </head>
        <body>
          <h1>410 Gone</h1>
          <p>This historical resource has been permanently removed and is no longer available.</p>
        </body>
        </html>`,
        {
          status: 410,
          headers: { "Content-Type": "text/html" },
        }
      );
    }
  }

  // Detect typical malicious spam/hacking paths on expired domains and return 410 Gone
  const spamKeywords = [
    'wp-admin', 'wp-content', 'wp-includes', 'xmlrpc', 'login', 'admin',
    '.env', '.git', 'config', 'setup', 'mysql', 'phpmyadmin', 'eval-stdin'
  ];
  
  const isSpam = spamKeywords.some(keyword => path.toLowerCase().includes(keyword)) ||
                  path.endsWith('.php') ||
                  path.endsWith('.asp') ||
                  path.endsWith('.aspx');

  if (isSpam) {
    return new Response(
      `<!DOCTYPE html>
      <html lang="en">
      <head>
        <title>410 Gone</title>
        <style>
          body { font-family: monospace; padding: 50px; background: #fafafa; color: #333; }
          h1 { color: #cc0000; }
        </style>
      </head>
      <body>
        <h1>410 Gone</h1>
        <p>This resource is permanently gone.</p>
      </body>
      </html>`,
      {
        status: 410,
        headers: { "Content-Type": "text/html" },
      }
    );
  }

  // Default to 404
  return new Response(
    `<!DOCTYPE html>
    <html lang="en">
    <head>
      <title>404 Not Found</title>
      <style>
        body { font-family: monospace; padding: 50px; background: #fafafa; color: #333; }
      </style>
    </head>
    <body>
      <h1>404 Not Found</h1>
      <p>The requested page does not exist on this server.</p>
    </body>
    </html>`,
    {
      status: 404,
      headers: { "Content-Type": "text/html" },
    }
  );
}
export async function POST(request: NextRequest) {
  return new Response("Method Not Allowed", { status: 405 });
}
export async function PUT(request: NextRequest) {
  return new Response("Method Not Allowed", { status: 405 });
}
export async function DELETE(request: NextRequest) {
  return new Response("Method Not Allowed", { status: 405 });
}
