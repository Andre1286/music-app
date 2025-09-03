'use client';
import { useState } from 'react';

const WDTTG_YOUTUBE = 'https://youtu.be/l0rt4Z3cvQI';
const ETTIY_YOUTUBE = 'https://youtu.be/Y3I1V2e17hE';
const IFONLY_YOUTUBE = 'https://www.youtube.com/watch?v=p6j_7kjxa1o';
const PROMO_WDTTG_URL =
  'https://cmzysgvbivttzwyocogf.supabase.co/storage/v1/object/public/Audio/Image%20for%20Where%20did%20the%20time%20go.png';

const utm = (url: string) =>
  `${url}${url.includes('?') ? '&' : '?'}utm_source=site&utm_medium=music_page&utm_campaign=rhythmrealm`;

const PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#0ea5e9"/><stop offset="100%" stop-color="#22d3ee"/></linearGradient></defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <circle cx="400" cy="400" r="240" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="18"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="40" opacity="0.9">RHYTHM REALM</text>
</svg>`);

function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1);
    if (u.hostname.includes('youtube.com')) return u.searchParams.get('v');
    return null;
  } catch { return null; }
}
const youtubeThumbFromId = (id: string) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

function YouTubeExternalCard({ title, url }: { title: string; url: string }) {
  const id = getYouTubeId(url);
  const src = id ? youtubeThumbFromId(id) : PLACEHOLDER;
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} onError={(e) => (e.currentTarget.src = PLACEHOLDER)} alt={`${title} poster`} className="h-full w-full object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 grid place-items-center">
        <a href={utm(url)} target="_blank" rel="noopener noreferrer"
           className="pointer-events-auto inline-flex items-center gap-2 rounded-2xl bg-cyan-500 px-5 py-2 text-sm font-bold text-[#070B16] hover:brightness-110">
          ▶ Watch on YouTube
        </a>
      </div>
      <div className="pointer-events-none absolute left-4 top-4 rounded bg-black/60 px-2 py-1 text-xs font-semibold text-white/90">{title}</div>
    </div>
  );
}

function TrackCard({ title, href, blurb, cover, tag }:{
  title:string; href:string; blurb?:string; cover?:string; tag?:string;
}) {
  const ytId = getYouTubeId(href);
  const initial = cover || (ytId ? youtubeThumbFromId(ytId) : PLACEHOLDER);
  const [src, setSrc] = useState(initial);
  return (
    <a href={utm(href)} target="_blank" rel="noopener noreferrer"
       className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10" aria-label={`Open ${title}`}>
      <div className="relative mb-3 aspect-square overflow-hidden rounded-xl ring-1 ring-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={`${title} cover art — Rhythm Realm`}
             className="h-full w-full object-cover transition will-change-transform group-hover:scale-[1.02]"
             onError={() => setSrc(PLACEHOLDER)} />
      </div>
      {tag && <div className="mb-1 text-xs font-semibold text-cyan-200/90">{tag}</div>}
      <h3 className="text-lg font-semibold">{title}</h3>
      {blurb && <p className="opacity-80">{blurb}</p>}
    </a>
  );
}


    export default function MusicPage() {
  const tracks = [
    { 
      title: "Every Time I Think of You", 
      href: ETTIY_YOUTUBE, 
      blurb: "Pop music with rhythm and soul.", 
      tag: "Official Music Video" 
    },
    { 
      title: "If Only for the Love", 
      href: IFONLY_YOUTUBE, 
      blurb: "If only for the love.", 
      tag: "Official Music Video" 
    }
  ];

  return (
    <main className="mx-auto max-w-6xl p-6 text-white">

           className="rounded-xl bg-cyan-500/20 px-3 py-2 text-sm font-semibold text-cyan-200 ring-1 ring-cyan-400/30 transition hover:bg-cyan-500/30">
          Visit RhythmRealm.net
        </a>
      </header>

      <section className="mb-8">
        <YouTubeExternalCard title="Where Did the Time Go — Official Video" url={WDTTG_YOUTUBE} />
      </section>

      <section className="mb-8">
        <a href={utm('https://rhythmrealm.net/')} target="_blank" rel="noopener noreferrer"
           className="block overflow-hidden rounded-2xl border border-white/10 ring-1 ring-white/10 hover:brightness-[1.03]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PROMO_WDTTG_URL || (getYouTubeId(WDTTG_YOUTUBE) ? youtubeThumbFromId(getYouTubeId(WDTTG_YOUTUBE)!) : PLACEHOLDER)}
               alt="Where Did the Time Go — New Blog Out Now — Rhythm Realm" className="h-auto w-full object-cover" />
        </a>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        {tracks.map((t) => (<TrackCard key={t.title} {...t} />))}
      </section>

      <footer className="mt-10 text-center text-sm text-white/60">
        Pop music with rhythm and soul. Discover more on <a className="underline" href="https://rhythmrealm.net/" target="_blank" rel="noopener noreferrer">RhythmRealm.net</a>.
      </footer>
    </main>
  );
}
