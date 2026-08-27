import React from 'react';
import brandLogoImg from '../assets/images/regenerated_image_1787347112518.png';

interface BrandLogoProps {
  variant?: 'full' | 'compact' | 'badge' | 'minimal' | 'horizontal';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  showTagline?: boolean;
  withBackground?: boolean;
  inverted?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  showTagline = true,
  withBackground = false,
}) => {
  // Dimension mapping
  const sizeMap = {
    xs: { iconW: 'w-10', iconH: 'h-8', text: 'text-base', subText: 'text-[8px]', gap: 'gap-0.5', badgePadding: 'p-1.5' },
    sm: { iconW: 'w-16', iconH: 'h-11', text: 'text-xl', subText: 'text-[9px]', gap: 'gap-1', badgePadding: 'p-2' },
    md: { iconW: 'w-24', iconH: 'h-16', text: 'text-3xl', subText: 'text-[11px]', gap: 'gap-1.5', badgePadding: 'p-3' },
    lg: { iconW: 'w-36', iconH: 'h-24', text: 'text-5xl', subText: 'text-[14px]', gap: 'gap-2', badgePadding: 'p-4' },
    xl: { iconW: 'w-48', iconH: 'h-32', text: 'text-6xl', subText: 'text-[16px]', gap: 'gap-2.5', badgePadding: 'p-6' },
    '2xl': { iconW: 'w-64', iconH: 'h-44', text: 'text-7xl', subText: 'text-[18px]', gap: 'gap-3', badgePadding: 'p-8' },
  };

  const currentSize = sizeMap[size];

  // If badge mode requested, wrap inside the signature emerald green square card
  if (variant === 'badge') {
    return (
      <div
        className={`inline-flex flex-col items-center justify-center bg-[#18564D] rounded-2xl shadow-lg border border-[#EDA124]/30 ${currentSize.badgePadding} ${className}`}
        style={{ aspectRatio: '1/1' }}
      >
        <img
          src={brandLogoImg}
          alt="२१ कळ्या Modak Logo"
          className="w-full h-full object-contain filter drop-shadow-sm"
        />
      </div>
    );
  }

  // Horizontal layout for header/navbar
  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-3 select-none ${className}`}>
        {/* Emblem */}
        <div className="relative shrink-0 flex items-center justify-center">
          <svg
            viewBox="0 0 280 180"
            className="w-14 h-10 sm:w-16 sm:h-12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Marathi '२' */}
            <path
              d="M50 40 C50 24 72 16 94 16 C124 16 150 36 150 72 C150 98 126 122 102 140 C88 150 78 162 74 172 C70 182 82 192 100 192 C124 192 144 170 148 186 C150 196 136 208 114 208 C78 208 48 186 48 154 C48 126 72 104 96 86 C110 76 116 66 116 54 C116 42 102 36 86 36 C70 36 50 44 50 40 Z"
              fill="#EDA124"
              transform="scale(0.8) translate(10, 0)"
            />
            {/* Crown */}
            <path d="M194 22 C194 17 199 12 203 12 C207 12 212 17 212 22 Z" fill="#EDA124" />
            <path d="M186 30 C186 24 220 24 220 30 Z" fill="#EDA124" />
            <path d="M178 39 C178 33 228 33 228 39 Z" fill="#EDA124" />

            {/* Ganesha 1 Motif */}
            <path
              d="M204 44 C182 44 160 58 160 84 C160 106 174 122 190 130 C198 134 204 144 196 154 C188 164 174 172 170 180 C184 182 200 180 211 172 C224 162 232 146 230 130 C227 114 216 104 211 93 C206 82 213 67 226 75 C231 77 236 72 234 64 C229 53 216 44 204 44 Z"
              fill="#EDA124"
            />
            {/* Trunk */}
            <path
              d="M188 88 C180 88 176 97 176 108 C176 124 192 132 204 134 C218 138 232 136 239 126 C232 123 222 120 212 116 C202 112 196 104 196 96 C196 90 192 88 188 88 Z"
              fill="#EDA124"
            />
            {/* Ribbon Tail */}
            <path
              d="M196 154 C204 144 210 156 217 170 C225 186 237 208 247 226 L227 220 L213 234 C207 212 194 184 188 164 Z"
              fill="#EDA124"
              transform="scale(0.8) translate(35, -10)"
            />
            <text x="240" y="42" fontFamily="sans-serif" fontSize="16" fontWeight="bold" fill="#EDA124">TM</text>
          </svg>
        </div>

        {/* Text Details */}
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="font-devanagari font-black text-2xl text-[#F8EDE0] leading-none tracking-wider">
              कळ्या
            </span>
            <span className="text-xs font-bold text-[#EDA124] tracking-widest uppercase">
              MODAK
            </span>
          </div>
          {showTagline && (
            <span className="text-[10px] text-[#F8EDE0]/90 font-devanagari-body tracking-wider mt-0.5 whitespace-nowrap">
              स्वादः परमानन्दः
            </span>
          )}
        </div>
      </div>
    );
  }

  // Full stacked brand mark (Exact match to official brand artwork)
  return (
    <div
      className={`inline-flex flex-col items-center justify-center select-none text-center ${
        withBackground ? 'bg-[#18564D] p-5 rounded-2xl border border-[#EDA124]/30 shadow-md' : ''
      } ${className}`}
    >
      {/* Golden 21 Ganesha Emblem */}
      <div className={`relative flex items-center justify-center ${currentSize.iconW}`}>
        <svg
          viewBox="0 0 340 240"
          className="w-full h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* MARATHI '२' (Gold Ochre #EDA124) */}
          <g fill="#EDA124">
            <path d="M42 36 C42 16 68 8 98 8 C140 8 178 34 178 84 C178 124 142 158 108 184 C88 200 72 218 66 238 C60 256 78 270 102 270 C136 270 166 238 172 262 C174 276 154 294 122 294 C70 294 28 262 28 216 C28 174 66 142 102 114 C122 98 132 82 132 66 C132 48 110 38 88 38 C64 38 42 48 42 36 Z" transform="scale(0.72) translate(15, 0)" />

            {/* GANESHA CROWN / MUKUT */}
            <path d="M216 12 C216 6 222 0 227 0 C232 0 238 6 238 12 Z" />
            <path d="M206 20 C206 14 248 14 248 20 Z" />
            <path d="M196 30 C196 23 258 23 258 30 Z" />

            {/* GANESHA FACE & '१' SILHOUETTE */}
            <path d="M228 36 C200 36 172 54 172 88 C172 116 190 138 212 148 C222 154 228 168 218 182 C206 196 188 206 184 218 C202 222 224 218 238 208 C256 194 266 172 263 150 C260 128 246 114 238 100 C232 86 242 66 258 76 C264 80 272 73 268 62 C262 48 246 36 228 36 Z" />
            
            {/* Trunk Sweep */}
            <path d="M208 96 C198 96 192 108 192 122 C192 144 214 154 230 158 C250 162 268 160 278 146 C268 142 254 138 240 132 C228 126 220 116 220 106 C220 98 214 96 208 96 Z" />

            {/* Ribbon Tail flowing down */}
            <path d="M218 182 C228 168 236 184 246 204 C257 226 274 256 288 282 L260 272 L240 292 C230 260 212 222 204 196 Z" transform="scale(0.85) translate(30, -5)" />

            {/* TM Superscript */}
            <text x="274" y="32" fontFamily="sans-serif" fontSize="18" fontWeight="800" fill="#EDA124">TM</text>
          </g>

          {/* Ganesha Eye cutout in negative space */}
          <ellipse cx="212" cy="78" rx="3.5" ry="6" fill="#18564D" />
          <path d="M218 82 C228 86 236 82 242 78" stroke="#18564D" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Main Text: "कळ्या" in Cream Ivory */}
      <div className={`mt-1 font-bold tracking-wider leading-none text-center`}>
        <div className="relative inline-block">
          {/* Top Shirorekha Bar */}
          <div className="w-full h-[3px] sm:h-[4px] bg-[#F8EDE0] rounded-full mb-0.5" />
          <span
            className={`font-devanagari font-black text-[#F8EDE0] tracking-widest drop-shadow-sm ${currentSize.text}`}
            style={{ letterSpacing: '0.06em', fontFamily: "'Yantramanav', 'Rozha One', sans-serif" }}
          >
            कळ्या
          </span>
        </div>
      </div>

      {/* SANSKRIT MOTTO: — स्वादः परमानन्दः — */}
      {showTagline && (
        <div className={`flex items-center justify-center gap-2 mt-1.5 w-full ${currentSize.gap}`}>
          <div className="h-[1.5px] w-6 sm:w-10 bg-[#F8EDE0]/80 rounded-full" />
          <span
            className={`font-devanagari-body font-bold text-[#F8EDE0] uppercase tracking-wider whitespace-nowrap ${currentSize.subText}`}
            style={{ letterSpacing: '0.08em' }}
          >
            स्वादः परमानन्दः
          </span>
          <div className="h-[1.5px] w-6 sm:w-10 bg-[#F8EDE0]/80 rounded-full" />
        </div>
      )}
    </div>
  );
};
