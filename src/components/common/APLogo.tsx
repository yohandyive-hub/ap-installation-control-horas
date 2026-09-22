import React from 'react';

interface APLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
}

export const APLogo: React.FC<APLogoProps> = ({
  className = 'w-9 h-9',
  size,
  showText = false,
}) => {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`} style={style}>
      <svg
        viewBox="0 0 512 512"
        className="w-full h-full shrink-0 select-none overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="AP Installation Logo"
      >
        {/* Cobalt / Royal Blue Circle */}
        <circle cx="256" cy="256" r="212" fill="#04269e" />

        {/* Monogram AP in high contrast Black */}
        <g fill="#050505">
          {/* Main unified geometric path for A & P */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="
              M 195 160
              L 352 160
              C 394 160 418 184 418 232
              C 418 280 394 304 352 304
              L 310 304
              L 310 376
              C 310 398 288 412 268 412
              C 248 412 240 398 240 376
              L 240 342
              L 190 388
              L 142 388
              L 100 388
              L 170 160
              L 195 160
              Z

              M 188 232
              L 165 304
              L 230 304
              L 204 232
              Z

              M 265 196
              L 348 196
              C 370 196 382 208 382 232
              C 382 256 370 268 348 268
              L 265 268
              Z
            "
          />
        </g>
      </svg>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span className="font-black text-slate-100 tracking-tight text-sm sm:text-base">
            AP Installation
          </span>
          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
            División 10 Especialidades
          </span>
        </div>
      )}
    </div>
  );
};
