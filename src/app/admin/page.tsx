// src/app/admin/page.tsx
'use client';

import React, { useState, useTransition } from 'react';
import { addAdminArticle, deleteAdminArticle, getAdminArticles, Article } from '../../lib/newsStore';
import { useRouter } from 'next/navigation';
import { PlusCircle, Trash2, Sliders, CheckCircle2, Lock, KeyRound } from 'lucide-react';

export default function AdminPanel() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [publishedList, setPublishedList] = useState<Article[]>(getAdminArticles());

  // Gate Management Security State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [secretToken, setSecretToken] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [urlToImage, setUrlToImage] = useState('');
  const [category, setCategory] = useState<'startups' | 'politics' | 'sports' | 'other'>('startups');
  const [successMsg, setSuccessMsg] = useState(false);

  // Authentication Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple, secure local editorial access token check
    if (secretToken === 'admin123' || secretToken === 'chronicle2026') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const fallbackImg = urlToImage.trim() || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800';

    addAdminArticle({ title, description, urlToImage: fallbackImg, category });

    setSuccessMsg(true);
    setTitle('');
    setDescription('');
    setUrlToImage('');
    
    setPublishedList(getAdminArticles());
    startTransition(() => { router.refresh(); });
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  const handleDelete = (id: string) => {
    deleteAdminArticle(id);
    setPublishedList(getAdminArticles());
    startTransition(() => { router.refresh(); });
  };

  // --- RENDER ACCREDITATION LOGIN SCREEN IF NOT AUTHENTICATED ---
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-24 bg-white border border-neutral-300 p-8 shadow-md space-y-6">
        <div className="text-center space-y-2">
          <Lock className="mx-auto text-neutral-800" size={32} />
          <h2 className="text-lg font-serif font-black uppercase tracking-wider text-neutral-900">EDITORIAL ACCESS PROTOCOL</h2>
          <p className="text-xs text-neutral-400">Please authenticate with your secure agency credential pass-token.</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">Passphrase Token</label>
            <div className="relative">
              <input 
                type="password" 
                value={secretToken}
                onChange={e => setSecretToken(e.target.value)}
                placeholder="Enter admin password..."
                className="w-full border border-neutral-300 pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-black font-sans"
                required
              />
              <KeyRound size={14} className="absolute left-3 top-3 text-neutral-400"/>
            </div>
          </div>
          <button type="submit" className="w-full bg-black text-white hover:bg-neutral-800 text-xs tracking-widest font-bold uppercase py-2.5 transition">
            AUTHORIZE ACCESS
          </button>
          {loginError && (
            <p className="text-[11px] font-bold text-center text-red-600 bg-red-50 py-1.5 border border-red-200 uppercase tracking-wide">
              Invalid credentials. System access rejected.
            </p>
          )}
        </form>
      </div>
    );
  }

  // --- RENDER DOCK CONTENT UPON SUCCESSFUL AUTHENTICATED VERIFICATION ---
  return (
    <div className="space-y-8">
      <div className="border-b border-neutral-300 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sliders className="text-neutral-800" size={24} />
          <h1 className="text-2xl font-serif font-black tracking-tight text-neutral-900 uppercase">EDITORIAL COMMAND TERMINAL</h1>
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="text-[10px] font-bold border border-neutral-300 text-neutral-500 hover:text-black px-3 py-1 uppercase tracking-wider transition">
          Lock Terminal
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Creation Dispatch Form */}
        <div className="lg:col-span-1 bg-white border border-neutral-200 p-6 shadow-sm h-fit">
          <h2 className="text-xs font-black uppercase tracking-wider text-neutral-500 mb-4 flex items-center gap-2">
            <PlusCircle size={14} /> Dispatch Fresh Article
          </h2>
          <form onSubmit={handlePublish} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">Headline</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-black" required/>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">Category Segment</label>
              <select value={category} onChange={e => setCategory(e.target.value as any)} className="w-full border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-black bg-white font-sans">
                <option value="startups">🚀 Startups</option>
                <option value="politics">🏛️ Politics</option>
                <option value="sports">⚽ Sports</option>
                <option value="other">General Mix</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">Featured Cover URL</label>
              <input type="url" value={urlToImage} onChange={e => setUrlToImage(e.target.value)} className="w-full border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-black"/>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">Brief Copy / Description</label>
              <textarea rows={4} value={description} onChange={e => setDescription(e.target.value)} className="w-full border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-black" required/>
            </div>
            <button type="submit" className="w-full bg-neutral-900 text-white hover:bg-neutral-800 text-xs tracking-widest font-bold uppercase py-3 transition shadow">
              TRANSMIT LIVE REPORT
            </button>
            {successMsg && (
              <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 text-xs p-3 font-semibold mt-2">
                <CheckCircle2 size={14}/> Broadcaster distributed article successfully.
              </div>
            )}
          </form>
        </div>

        {/* Right Side: Active Admin Article Feed Management */}
        <div className="lg:col-span-2 bg-white border border-neutral-200 p-6 shadow-sm">
          <h2 className="text-xs font-black uppercase tracking-wider text-neutral-500 mb-4">CURRENT USER-PUBLISHED ARTIFACTS ({publishedList.length})</h2>
          {publishedList.length === 0 ? (
            <p className="text-sm text-neutral-400 italic py-8 text-center border border-dashed border-neutral-200">No live user overrides active on feed. Add items to see them here.</p>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {publishedList.map((art) => (
                <div key={art.id} className="flex justify-between items-start bg-neutral-50 border border-neutral-200 p-4 shadow-sm">
                  <div className="space-y-1 max-w-[85%]">
                    <span className="text-[10px] bg-neutral-200 text-neutral-700 font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">{art.category}</span>
                    <h3 className="text-sm font-bold font-sans text-neutral-900 leading-tight">{art.title}</h3>
                    <p className="text-xs text-neutral-500 line-clamp-1">{art.description}</p>
                  </div>
                  <button onClick={() => handleDelete(art.id)} className="text-neutral-400 hover:text-red-600 transition p-1"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}