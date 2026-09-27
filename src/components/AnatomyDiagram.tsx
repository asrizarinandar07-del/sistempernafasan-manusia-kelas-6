import React, { useState } from 'react';
import { ORGANS_DATA } from '../data/respiratoryData';
import { OrganInfo } from '../types';
import { Play, RotateCcw, Sparkles } from 'lucide-react';

interface AnatomyDiagramProps {
  selectedOrganId: string | null;
  onSelectOrgan: (organ: OrganInfo) => void;
  isBreathingIn?: boolean;
  showAirflow?: boolean;
}

export const AnatomyDiagram: React.FC<AnatomyDiagramProps> = ({
  selectedOrganId,
  onSelectOrgan,
  isBreathingIn = true,
  showAirflow = true,
}) => {
  const [hoveredOrganId, setHoveredOrganId] = useState<string | null>(null);

  const activeId = hoveredOrganId || selectedOrganId;

  // Labels on the left column (matching the poster)
  const leftLabels = [
    { id: 'rongga-hidung', label: 'Rongga hidung' },
    { id: 'rongga-mulut', label: 'Rongga mulut' },
    { id: 'faring', label: 'Faring (tenggorokan)' },
    { id: 'laring', label: 'Laring (kotak suara)' },
    { id: 'trakea', label: 'Trakea (batang tenggorokan)' },
    { id: 'paru-kanan', label: 'Paru-paru kanan' },
    { id: 'bronkus', label: 'Bronkus' },
    { id: 'diafragma', label: 'Diafragma' },
  ];

  // Labels on the right column
  const rightLabels = [
    { id: 'paru-kiri', label: 'Paru-paru kiri' },
    { id: 'alveolus', label: 'Alveolus' },
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto select-none bg-gradient-to-b from-sky-50/70 via-white to-blue-50/40 rounded-3xl p-4 sm:p-6 border border-sky-100 shadow-sm">
      
      {/* Interactive Title & Controls Bar */}
      <div className="flex items-center justify-between mb-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-100 text-sky-800 font-bold text-[11px]">
            <Sparkles size={12} className="text-sky-600" />
            Anatomi Interaktif
          </span>
          <span className="text-slate-500 hidden sm:inline text-[11px]">
            Klik organ atau label untuk melihat fungsi
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-medium text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{isBreathingIn ? 'Menghirup (O₂ masuk)' : 'Menghembus (CO₂ keluar)'}</span>
        </div>
      </div>

      {/* SVG Canvas and Interactive Anatomical View */}
      <div className="relative aspect-[4/5] w-full max-h-[600px]">
        <svg
          viewBox="0 0 500 620"
          className="w-full h-full drop-shadow-sm"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="bodySkin" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff1e6" />
              <stop offset="40%" stopColor="#fed7aa" />
              <stop offset="85%" stopColor="#fba068" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>

            <linearGradient id="skinFace" x1="20%" y1="10%" x2="90%" y2="80%">
              <stop offset="0%" stopColor="#fff4ed" />
              <stop offset="35%" stopColor="#fed7aa" />
              <stop offset="70%" stopColor="#fdb883" />
              <stop offset="100%" stopColor="#f98d45" />
            </linearGradient>

            <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="40%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            <linearGradient id="lipGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="50%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#be123c" />
            </linearGradient>

            <radialGradient id="irisGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#854d0e" />
              <stop offset="60%" stopColor="#451a03" />
              <stop offset="100%" stopColor="#1c1917" />
            </radialGradient>

            <linearGradient id="lungGradientRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fda4af" />
              <stop offset="40%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#be123c" />
            </linearGradient>

            <linearGradient id="lungGradientLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="50%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#9f1239" />
            </linearGradient>

            <linearGradient id="tracheaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="50%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#7dd3fc" />
            </linearGradient>

            <linearGradient id="diaphragmGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#c2410c" />
            </linearGradient>

            {/* Glowing filters for active/hovered state */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* 1. Realistic Human Head, Face & Torso Base Structure */}
          <g className="realistic-human-body">
            
            {/* Torso & Shoulders base outline */}
            <path
              d="M 120,400 
                 C 115,350 135,280 185,250
                 L 200,240
                 C 200,240 240,255 265,255
                 L 285,245
                 C 325,265 375,295 410,350
                 C 425,375 425,440 425,550
                 L 115,550
                 C 115,480 118,440 120,400 Z"
              fill="url(#bodySkin)"
              stroke="#fdba74"
              strokeWidth="2"
              opacity="0.92"
            />

            {/* Collarbone / Clavicle anatomically framing neck base */}
            <path d="M 200,270 Q 235,285 260,275" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.4" />
            <path d="M 270,275 Q 305,285 340,270" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.4" />

            {/* Neck contours */}
            <path
              d="M 200,225 
                 C 200,225 205,185 210,165 
                 C 210,165 240,195 285,215
                 C 285,230 275,250 268,255
                 L 200,250 Z"
              fill="url(#skinFace)"
              opacity="0.8"
            />
            {/* Sternocleidomastoid muscle line */}
            <path d="M 225,175 Q 240,220 262,260" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />

            {/* Realistic Human Head Profile (Forehead, Nose, Lips, Chin, Jaw) */}
            <path
              d="M 195,120
                 C 185,85 200,45 240,35
                 C 270,28 295,45 305,65
                 C 310,75 312,90 310,105
                 C 308,110 305,114 304,118
                 C 305,120 318,132 334,142
                 C 336,144 335,147 330,150
                 C 326,152 322,154 318,154
                 C 320,158 326,163 326,168
                 C 326,171 322,174 316,174
                 C 320,178 324,183 322,188
                 C 320,192 312,194 308,194
                 C 314,198 318,204 316,210
                 C 314,216 304,222 288,222
                 C 270,222 248,205 240,190
                 C 230,190 220,185 215,170
                 C 205,170 195,145 195,120 Z"
              fill="url(#skinFace)"
              stroke="#fb923c"
              strokeWidth="2"
            />

            {/* Cheekbone & Soft Facial Shading */}
            <ellipse cx="270" cy="148" rx="20" ry="14" fill="#fb7185" opacity="0.18" />
            <ellipse cx="300" cy="140" rx="8" ry="5" fill="#ffffff" opacity="0.25" />

            {/* Realistic Human Eye in Profile */}
            <g className="realistic-human-eye">
              {/* Eye socket / shadow */}
              <ellipse cx="288" cy="122" rx="14" ry="10" fill="#f97316" opacity="0.15" />
              
              {/* Sclera (Eye white) */}
              <path
                d="M 280,123 Q 290,116 298,122 Q 290,128 280,123 Z"
                fill="#ffffff"
                stroke="#cbd5e1"
                strokeWidth="0.8"
              />
              
              {/* Iris (Natural Warm Brown) */}
              <circle cx="291" cy="122" r="4.5" fill="url(#irisGrad)" />
              
              {/* Pupil */}
              <circle cx="292" cy="122" r="2.2" fill="#09090b" />
              
              {/* Specular Catchlight / Shine */}
              <circle cx="293.2" cy="121" r="1.1" fill="#ffffff" />
              <circle cx="291" cy="123" r="0.5" fill="#ffffff" opacity="0.8" />
              
              {/* Upper Eyelid & Lash line */}
              <path d="M 278,122 Q 290,114 300,121" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M 298,119 L 302,117" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
              
              {/* Upper Eyelid Fold / Crease */}
              <path d="M 281,116 Q 291,111 297,115" stroke="#ea580c" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6" />
              
              {/* Lower eyelid line */}
              <path d="M 280,124 Q 289,129 297,123" stroke="#ea580c" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
            </g>

            {/* Realistic Natural Eyebrow */}
            <g className="realistic-eyebrow">
              <path
                d="M 276,108 
                   C 285,102 296,102 305,105 
                   C 310,107 312,110 312,111
                   C 306,109 294,107 282,112 Z"
                fill="#1e293b"
              />
            </g>

            {/* Realistic Human Nose & Nostril Detailing */}
            <g className="realistic-nose-details">
              {/* Nasal bridge shadow & contour */}
              <path d="M 304,118 Q 318,132 334,142" stroke="#ea580c" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.6" />
              {/* Nose tip highlight */}
              <ellipse cx="330" cy="142" rx="3.5" ry="3" fill="#ffffff" opacity="0.5" />
              {/* Alar wing / cup of nostril */}
              <path d="M 314,148 Q 324,146 327,152" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" fill="none" />
              {/* Nostril opening (Narise - Airway entry point) */}
              <ellipse cx="321" cy="151" rx="4.5" ry="2.2" fill="#3f1c07" transform="rotate(-15 321 151)" />
            </g>

            {/* Realistic Human Lips & Mouth Profile */}
            <g className="realistic-lips">
              {/* Philtrum groove */}
              <path d="M 320,154 Q 322,160 324,166" stroke="#ea580c" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />
              
              {/* Upper Lip (Vermilion) */}
              <path
                d="M 317,164 
                   C 322,164 327,166 326,170 
                   C 324,171 318,172 314,172 Z"
                fill="url(#lipGrad)"
              />
              {/* Mouth Aperture (Parted slightly for air entry) */}
              <path d="M 313,172 Q 320,172.5 324,171" stroke="#881337" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              
              {/* Lower Lip (Vermilion with natural fullness) */}
              <path
                d="M 314,173 
                   C 321,173 325,178 322,184 
                   C 319,187 312,187 308,186 Z"
                fill="url(#lipGrad)"
              />
              {/* Lower lip highlight */}
              <ellipse cx="317" cy="180" rx="3" ry="1.5" fill="#ffffff" opacity="0.4" />
              
              {/* Labiomental groove indent below lower lip */}
              <path d="M 309,188 Q 314,192 311,195" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />
            </g>

            {/* Realistic Human Ear (Anatomical Auricle) */}
            <g className="realistic-human-ear">
              {/* Outer ear helix */}
              <path
                d="M 225,134 
                   C 214,136 210,148 212,162 
                   C 214,172 222,176 228,174 
                   C 232,172 234,166 233,160 
                   C 231,154 225,152 225,142
                   C 225,138 230,136 225,134 Z"
                fill="#fdb883"
                stroke="#ea580c"
                strokeWidth="1.5"
              />
              {/* Antihelix & Concha internal shading */}
              <path d="M 218,142 Q 223,150 220,162" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
              <ellipse cx="225" cy="154" rx="4" ry="6" fill="#c2410c" opacity="0.3" />
              {/* Tragus flap */}
              <path d="M 230,150 Q 226,154 230,157" stroke="#ea580c" strokeWidth="1.5" fill="#fdb883" />
              {/* Earlobe */}
              <ellipse cx="228" cy="170" rx="3.5" ry="4.5" fill="#fdb883" stroke="#ea580c" strokeWidth="1" />
            </g>

            {/* Realistic Human Hair with natural styling & hairline */}
            <g className="realistic-human-hair">
              {/* Main Hair Volume */}
              <path
                d="M 188,140 
                   C 182,90 200,45 240,30 
                   C 275,20 305,35 315,55 
                   C 320,68 316,78 300,78 
                   C 285,78 275,68 250,68 
                   C 220,68 205,95 205,120
                   C 205,135 198,142 188,140 Z"
                fill="url(#hairGrad)"
              />
              {/* Forehead fringe & natural hairline texture */}
              <path
                d="M 300,78 
                   C 295,85 285,90 275,85 
                   C 265,80 250,85 242,92
                   C 238,98 235,115 234,132
                   L 230,132
                   C 230,110 236,92 245,80
                   C 255,70 280,68 300,78 Z"
                fill="url(#hairGrad)"
              />
              {/* Sideburn in front of ear */}
              <path
                d="M 235,124 L 235,142 L 231,142 L 232,124 Z"
                fill="#1e293b"
              />
              {/* Hair strands and gentle highlights */}
              <path d="M 225,38 Q 260,34 290,48" stroke="#64748b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
              <path d="M 205,65 Q 240,55 275,70" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.6" />
              <path d="M 190,95 Q 205,75 230,65" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
            </g>

          </g>

          {/* 2. Rib Cage subtle background guide */}
          <g className="opacity-25 stroke-slate-400" strokeWidth="2" fill="none">
            <path d="M 210,310 C 230,300 260,300 280,310" />
            <path d="M 190,340 C 230,330 260,330 300,340" />
            <path d="M 180,380 C 230,370 260,370 310,380" />
            <path d="M 175,420 C 230,410 260,410 315,420" />
            <path d="M 170,460 C 230,450 260,450 320,460" />
          </g>

          {/* 3. Nasal & Oral Cavity cross-section (Rongga Hidung & Mulut) */}
          <g
            id="svg-rongga-hidung"
            className="cursor-pointer transition-all duration-300"
            onClick={() => onSelectOrgan(ORGANS_DATA.find(o => o.id === 'rongga-hidung')!)}
            onMouseEnter={() => setHoveredOrganId('rongga-hidung')}
            onMouseLeave={() => setHoveredOrganId(null)}
          >
            {/* Nasal Cavity path aligned directly behind realistic nose */}
            <path
              d="M 320,150 
                 C 305,135 285,130 265,138 
                 C 252,144 250,162 262,168 
                 C 280,165 300,160 316,155 Z"
              fill={activeId === 'rongga-hidung' ? '#38bdf8' : '#e0f2fe'}
              stroke={activeId === 'rongga-hidung' ? '#0284c7' : '#7dd3fc'}
              strokeWidth={activeId === 'rongga-hidung' ? 3.5 : 2}
              className="transition-colors"
            />
            {/* Nasal Conchae (Turbinates) interior ridges */}
            <path d="M 270,146 C 285,142 298,145 308,148" stroke="#0284c7" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.7" />
            <path d="M 268,154 C 282,150 295,153 305,155" stroke="#0284c7" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.7" />
          </g>

          <g
            id="svg-rongga-mulut"
            className="cursor-pointer transition-all duration-300"
            onClick={() => onSelectOrgan(ORGANS_DATA.find(o => o.id === 'rongga-mulut')!)}
            onMouseEnter={() => setHoveredOrganId('rongga-mulut')}
            onMouseLeave={() => setHoveredOrganId(null)}
          >
            {/* Oral Cavity path directly behind realistic lips */}
            <path
              d="M 314,173 
                 C 298,170 278,172 262,178 
                 C 256,184 260,195 274,195 
                 C 290,195 304,188 312,185 Z"
              fill={activeId === 'rongga-mulut' ? '#f472b6' : '#fce7f3'}
              stroke={activeId === 'rongga-mulut' ? '#db2777' : '#f472b6'}
              strokeWidth={activeId === 'rongga-mulut' ? 3.5 : 2}
              className="transition-colors"
            />
            {/* Tongue */}
            <path d="M 270,190 C 285,185 300,187 308,187" stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            {/* Teeth profile */}
            <rect x="309" y="172" width="3" height="3" rx="0.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
            <rect x="308" y="182" width="3" height="3" rx="0.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
          </g>

          {/* 4. Faring (Tenggorokan persimpangan) */}
          <g
            id="svg-faring"
            className="cursor-pointer transition-all duration-300"
            onClick={() => onSelectOrgan(ORGANS_DATA.find(o => o.id === 'faring')!)}
            onMouseEnter={() => setHoveredOrganId('faring')}
            onMouseLeave={() => setHoveredOrganId(null)}
          >
            <path
              d="M 252,155 
                 C 240,165 240,195 250,210 
                 L 262,210 
                 C 255,195 255,170 262,158 Z"
              fill={activeId === 'faring' ? '#60a5fa' : '#dbeafe'}
              stroke={activeId === 'faring' ? '#2563eb' : '#93c5fd'}
              strokeWidth={activeId === 'faring' ? 3.5 : 2}
            />
          </g>

          {/* 5. Laring (Kotak Suara & Epiglotis) */}
          <g
            id="svg-laring"
            className="cursor-pointer transition-all duration-300"
            onClick={() => onSelectOrgan(ORGANS_DATA.find(o => o.id === 'laring')!)}
            onMouseEnter={() => setHoveredOrganId('laring')}
            onMouseLeave={() => setHoveredOrganId(null)}
          >
            <rect
              x="245"
              y="212"
              width="22"
              height="26"
              rx="6"
              fill={activeId === 'laring' ? '#818cf8' : '#e0e7ff'}
              stroke={activeId === 'laring' ? '#4f46e5' : '#a5b4fc'}
              strokeWidth={activeId === 'laring' ? 3.5 : 2}
            />
            {/* Vocal fold line */}
            <line x1="250" y1="225" x2="262" y2="225" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* 6. Trakea (Batang Tenggorokan dengan Cincin Tulang Rawan) */}
          <g
            id="svg-trakea"
            className="cursor-pointer transition-all duration-300"
            onClick={() => onSelectOrgan(ORGANS_DATA.find(o => o.id === 'trakea')!)}
            onMouseEnter={() => setHoveredOrganId('trakea')}
            onMouseLeave={() => setHoveredOrganId(null)}
          >
            {/* Main tube */}
            <rect
              x="248"
              y="240"
              width="18"
              height="80"
              rx="4"
              fill={activeId === 'trakea' ? '#38bdf8' : 'url(#tracheaGradient)'}
              stroke={activeId === 'trakea' ? '#0284c7' : '#0369a1'}
              strokeWidth={activeId === 'trakea' ? 3.5 : 2}
            />
            {/* Cartilage C-rings */}
            {[248, 258, 268, 278, 288, 298, 308].map((yPos, idx) => (
              <path
                key={idx}
                d={`M 248,${yPos} C 257,${yPos + 4} 266,${yPos} 266,${yPos}`}
                stroke="#0284c7"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            ))}
          </g>

          {/* 7. Diafragma (Otot Kubah di Bawah Paru-paru) */}
          <g
            id="svg-diafragma"
            className="cursor-pointer transition-all duration-300"
            onClick={() => onSelectOrgan(ORGANS_DATA.find(o => o.id === 'diafragma')!)}
            onMouseEnter={() => setHoveredOrganId('diafragma')}
            onMouseLeave={() => setHoveredOrganId(null)}
          >
            {/* Dynamic dome depending on breathing mode: flatter when inhaling, dome when exhaling */}
            <path
              d={
                isBreathingIn
                  ? "M 155,490 Q 255,475 360,490 L 360,510 Q 255,498 155,510 Z"
                  : "M 155,490 Q 255,445 360,490 L 360,510 Q 255,465 155,510 Z"
              }
              fill={activeId === 'diafragma' ? '#f97316' : 'url(#diaphragmGradient)'}
              stroke={activeId === 'diafragma' ? '#c2410c' : '#9a3412'}
              strokeWidth={activeId === 'diafragma' ? 3.5 : 2}
              className="transition-all duration-700"
            />
            {/* Muscular striation accents */}
            <path d="M 210,488 L 210,502 M 255,483 L 255,498 M 300,488 L 300,502" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* 8. Paru-Paru Kanan (3 Lobus) */}
          <g
            id="svg-paru-kanan"
            className="cursor-pointer transition-all duration-500"
            style={{
              transformOrigin: '200px 410px',
              transform: isBreathingIn ? 'scale(1.05)' : 'scale(0.96)',
            }}
            onClick={() => onSelectOrgan(ORGANS_DATA.find(o => o.id === 'paru-kanan')!)}
            onMouseEnter={() => setHoveredOrganId('paru-kanan')}
            onMouseLeave={() => setHoveredOrganId(null)}
          >
            {/* Right Lung Body (larger, 3 lobes) */}
            <path
              d="M 244,325 
                 C 220,320 185,340 170,380 
                 C 155,420 160,460 175,480 
                 C 200,490 230,485 244,480 
                 C 250,440 248,360 244,325 Z"
              fill={activeId === 'paru-kanan' ? '#fb7185' : 'url(#lungGradientRight)'}
              stroke={activeId === 'paru-kanan' ? '#be123c' : '#9f1239'}
              strokeWidth={activeId === 'paru-kanan' ? 4 : 2}
              filter="url(#softShadow)"
            />
            {/* 3 Lobes separation fissure lines */}
            <path d="M 175,395 C 205,405 235,400 244,402" stroke="#881337" strokeWidth="2" strokeDasharray="3 2" fill="none" />
            <path d="M 180,445 C 205,448 230,445 244,440" stroke="#881337" strokeWidth="2" strokeDasharray="3 2" fill="none" />
          </g>

          {/* 9. Paru-Paru Kiri (2 Lobus, Cardiac Notch for Heart) */}
          <g
            id="svg-paru-kiri"
            className="cursor-pointer transition-all duration-500"
            style={{
              transformOrigin: '310px 410px',
              transform: isBreathingIn ? 'scale(1.05)' : 'scale(0.96)',
            }}
            onClick={() => onSelectOrgan(ORGANS_DATA.find(o => o.id === 'paru-kiri')!)}
            onMouseEnter={() => setHoveredOrganId('paru-kiri')}
            onMouseLeave={() => setHoveredOrganId(null)}
          >
            {/* Left Lung Body with cardiac notch indentation */}
            <path
              d="M 270,325 
                 C 290,320 325,340 340,380 
                 C 355,420 350,460 335,480 
                 C 310,490 285,485 272,475 
                 C 275,445 262,430 262,400 
                 C 262,370 268,340 270,325 Z"
              fill={activeId === 'paru-kiri' ? '#fb7185' : 'url(#lungGradientLeft)'}
              stroke={activeId === 'paru-kiri' ? '#be123c' : '#9f1239'}
              strokeWidth={activeId === 'paru-kiri' ? 4 : 2}
              filter="url(#softShadow)"
            />
            {/* 2 Lobes oblique fissure line */}
            <path d="M 275,370 C 305,400 325,435 335,445" stroke="#881337" strokeWidth="2" strokeDasharray="3 2" fill="none" />
          </g>

          {/* 10. Bronkus & Bronchial Tree inside Lungs */}
          <g
            id="svg-bronkus"
            className="cursor-pointer transition-all duration-300"
            onClick={() => onSelectOrgan(ORGANS_DATA.find(o => o.id === 'bronkus')!)}
            onMouseEnter={() => setHoveredOrganId('bronkus')}
            onMouseLeave={() => setHoveredOrganId(null)}
          >
            {/* Bronchial Carina Fork */}
            <path
              d="M 252,320 L 235,345 L 210,380 M 235,345 L 220,360
                 M 262,320 L 275,345 L 300,380 M 275,345 L 290,360"
              stroke={activeId === 'bronkus' ? '#0284c7' : '#38bdf8'}
              strokeWidth={activeId === 'bronkus' ? 4.5 : 3.5}
              strokeLinecap="round"
              fill="none"
            />
            {/* Finer Bronchioles branches */}
            <path
              d="M 210,380 L 195,410 M 210,380 L 215,420 M 195,410 L 185,435
                 M 220,360 L 205,385 M 205,385 L 190,390
                 M 300,380 L 315,410 M 300,380 L 295,420 M 315,410 L 325,435
                 M 290,360 L 305,385 M 305,385 L 320,390"
              stroke="#bae6fd"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* 11. Alveolus Microscopic Cluster Highlight on Left Lung */}
          <g
            id="svg-alveolus-spot"
            className="cursor-pointer transition-transform hover:scale-110"
            onClick={() => onSelectOrgan(ORGANS_DATA.find(o => o.id === 'alveolus')!)}
            onMouseEnter={() => setHoveredOrganId('alveolus')}
            onMouseLeave={() => setHoveredOrganId(null)}
          >
            {/* Cluster of grape-like small circles */}
            <circle cx="310" cy="415" r="7" fill="#fb7185" stroke="#e11d48" strokeWidth="1.5" />
            <circle cx="320" cy="410" r="8" fill="#fda4af" stroke="#e11d48" strokeWidth="1.5" />
            <circle cx="322" cy="423" r="7" fill="#f43f5e" stroke="#e11d48" strokeWidth="1.5" />
            <circle cx="312" cy="426" r="6" fill="#fb7185" stroke="#e11d48" strokeWidth="1.5" />
            <circle cx="316" cy="418" r="5" fill="#ffffff" opacity="0.6" />
            
            {/* Zoom ring cue */}
            <circle
              cx="317"
              cy="418"
              r="18"
              fill="none"
              stroke="#0284c7"
              strokeWidth="2"
              strokeDasharray="4 3"
              className="animate-spin"
              style={{ transformOrigin: '317px 418px', animationDuration: '8s' }}
            />
          </g>

          {/* 12. Animated Airflow Particles */}
          {showAirflow && (
            <g className="airflow-stream">
              {isBreathingIn ? (
                // Inhaling: blue/cyan O2 entering from nose/mouth down to lungs
                <>
                  <circle cx="325" cy="148" r="3.5" fill="#0284c7" className="animate-pulse" />
                  <path
                    d="M 320,150 Q 285,145 260,170 T 255,230 T 256,310"
                    stroke="#0284c7"
                    strokeWidth="3"
                    strokeDasharray="6 8"
                    strokeLinecap="round"
                    fill="none"
                    className="animate-pulse"
                  />
                  <path
                    d="M 256,315 L 225,370 M 256,315 L 285,370"
                    stroke="#0284c7"
                    strokeWidth="2.5"
                    strokeDasharray="4 6"
                    strokeLinecap="round"
                    fill="none"
                  />
                </>
              ) : (
                // Exhaling: orange/red CO2 leaving from lungs up to mouth/nose
                <>
                  <path
                    d="M 225,370 L 256,315 M 285,370 L 256,315"
                    stroke="#ea580c"
                    strokeWidth="2.5"
                    strokeDasharray="4 6"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M 256,310 T 255,230 T 260,170 Q 285,150 325,150"
                    stroke="#ea580c"
                    strokeWidth="3"
                    strokeDasharray="6 8"
                    strokeLinecap="round"
                    fill="none"
                    className="animate-pulse"
                  />
                </>
              )}
            </g>
          )}

          {/* 13. Interactive Pointer Callout Lines connecting to Organ Hotspots */}
          
          {/* Rongga Hidung line */}
          <path d="M 125,95 L 220,95 L 285,148" stroke="#0284c7" strokeWidth="2" strokeDasharray="2 2" fill="none" />
          <circle cx="285" cy="148" r="4" fill="#0284c7" />

          {/* Rongga Mulut line */}
          <path d="M 125,135 L 220,135 L 285,180" stroke="#0284c7" strokeWidth="2" strokeDasharray="2 2" fill="none" />
          <circle cx="285" cy="180" r="4" fill="#0284c7" />

          {/* Faring line */}
          <path d="M 125,175 L 210,175 L 254,195" stroke="#0284c7" strokeWidth="2" strokeDasharray="2 2" fill="none" />
          <circle cx="254" cy="195" r="4" fill="#0284c7" />

          {/* Laring line */}
          <path d="M 125,215 L 205,215 L 254,226" stroke="#0284c7" strokeWidth="2" strokeDasharray="2 2" fill="none" />
          <circle cx="254" cy="226" r="4" fill="#0284c7" />

          {/* Trakea line */}
          <path d="M 125,260 L 205,260 L 256,270" stroke="#0284c7" strokeWidth="2" strokeDasharray="2 2" fill="none" />
          <circle cx="256" cy="270" r="4" fill="#0284c7" />

          {/* Paru Kanan line */}
          <path d="M 125,370 L 155,370 L 190,400" stroke="#0284c7" strokeWidth="2" strokeDasharray="2 2" fill="none" />
          <circle cx="190" cy="400" r="4" fill="#0284c7" />

          {/* Bronkus line */}
          <path d="M 125,435 L 175,435 L 225,355" stroke="#0284c7" strokeWidth="2" strokeDasharray="2 2" fill="none" />
          <circle cx="225" cy="355" r="4" fill="#0284c7" />

          {/* Diafragma line */}
          <path d="M 125,510 L 195,510 L 230,490" stroke="#0284c7" strokeWidth="2" strokeDasharray="2 2" fill="none" />
          <circle cx="230" cy="490" r="4" fill="#0284c7" />

          {/* Paru Kiri line (Right side) */}
          <path d="M 375,340 L 335,340 L 315,360" stroke="#0284c7" strokeWidth="2" strokeDasharray="2 2" fill="none" />
          <circle cx="315" cy="360" r="4" fill="#0284c7" />

          {/* Alveolus line (Right side) */}
          <path d="M 375,418 L 335,418" stroke="#0284c7" strokeWidth="2" strokeDasharray="2 2" fill="none" />
          <circle cx="335" cy="418" r="4" fill="#0284c7" />
        </svg>

        {/* Floating Callout Labels (Left Column) - Exact Match to the Poster Blue Pills */}
        <div className="absolute left-1 top-2 bottom-4 flex flex-col justify-between pointer-events-auto py-2">
          {leftLabels.map((item) => {
            const isActive = activeId === item.id;
            const organObj = ORGANS_DATA.find((o) => o.id === item.id)!;
            return (
              <button
                key={item.id}
                id={`btn-label-${item.id}`}
                type="button"
                onClick={() => onSelectOrgan(organObj)}
                onMouseEnter={() => setHoveredOrganId(item.id)}
                onMouseLeave={() => setHoveredOrganId(null)}
                className={`text-left px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all shadow-sm border ${
                  isActive
                    ? 'bg-sky-600 text-white border-sky-700 scale-105 shadow-md shadow-sky-600/30 ring-2 ring-sky-300'
                    : 'bg-sky-500/90 hover:bg-sky-600 text-white border-sky-400 hover:scale-102'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Floating Callout Labels (Right Column) */}
        <div className="absolute right-1 top-[52%] flex flex-col gap-9 pointer-events-auto">
          {rightLabels.map((item) => {
            const isActive = activeId === item.id;
            const organObj = ORGANS_DATA.find((o) => o.id === item.id)!;
            return (
              <button
                key={item.id}
                id={`btn-label-${item.id}`}
                type="button"
                onClick={() => onSelectOrgan(organObj)}
                onMouseEnter={() => setHoveredOrganId(item.id)}
                onMouseLeave={() => setHoveredOrganId(null)}
                className={`text-left px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all shadow-sm border ${
                  isActive
                    ? 'bg-sky-600 text-white border-sky-700 scale-105 shadow-md shadow-sky-600/30 ring-2 ring-sky-300'
                    : 'bg-sky-500/90 hover:bg-sky-600 text-white border-sky-400 hover:scale-102'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* Quick Organ Prompt Banner */}
      <div className="mt-3 p-2.5 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-between text-xs text-sky-900">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sky-700">Tips Belajar:</span>
          <span>Klik tombol organ di atas untuk mendengar penjelasan suara bahasa Indonesia.</span>
        </div>
      </div>

    </div>
  );
};
