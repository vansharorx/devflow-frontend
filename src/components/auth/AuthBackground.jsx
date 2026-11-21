/**
 * AuthBackground — Dense animated geometric background for auth pages.
 * Shapes, lines, arcs, and waves drift across the viewport with clear visibility.
 * Pure CSS keyframes + inline SVG. Zero JS, zero deps.
 */
export default function AuthBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
            {/* Drifting dot-grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#000000_1.5px,transparent_1.5px)] [background-size:28px_28px] opacity-[0.09] auth-bg-grid" />

            {/* ═══ GEOMETRIC SHAPES ═══ */}

            <div className="absolute auth-bg-drift-1">
                <div className="w-20 h-20 sm:w-28 sm:h-28 bg-[#FFE600] border-[3px] border-black shadow-[6px_6px_0px_#000] opacity-[0.38] rotate-12" />
            </div>
            <div className="absolute auth-bg-drift-2">
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-[#FF5E7E] border-[3px] border-black shadow-[5px_5px_0px_#000] opacity-[0.35]" />
            </div>
            <div className="absolute auth-bg-drift-3">
                <div className="w-14 h-14 sm:w-20 sm:h-20 bg-[#00D2FF] border-[3px] border-black shadow-[5px_5px_0px_#000] opacity-[0.35] rotate-45" />
            </div>
            <div className="absolute auth-bg-drift-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#00E676] border-[3px] border-black shadow-[4px_4px_0px_#000] opacity-[0.32] -rotate-6" />
            </div>
            <div className="absolute auth-bg-drift-5">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#FFE600] border-2 border-black shadow-[4px_4px_0px_#000] opacity-[0.35]" />
            </div>
            <div className="absolute auth-bg-drift-7">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-[#FF5E7E] border-2 border-black shadow-[3px_3px_0px_#000] opacity-[0.30] rotate-[22deg]" />
            </div>

            {/* Extra shapes for density */}
            <div className="absolute auth-bg-extra-1">
                <div className="w-7 h-7 sm:w-11 sm:h-11 bg-[#00D2FF] border-2 border-black shadow-[3px_3px_0px_#000] opacity-[0.32] rotate-[55deg]" />
            </div>
            <div className="absolute auth-bg-extra-2">
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-[#00E676] border-[3px] border-black shadow-[4px_4px_0px_#000] opacity-[0.30]" />
            </div>
            <div className="absolute auth-bg-extra-3">
                <div className="w-9 h-9 sm:w-14 sm:h-14 bg-[#FFE600] border-2 border-black shadow-[4px_4px_0px_#000] opacity-[0.35] rotate-[70deg]" />
            </div>
            <div className="absolute auth-bg-extra-4">
                <div className="w-18 h-18 sm:w-24 sm:h-24 bg-[#FF5E7E] border-[3px] border-black shadow-[5px_5px_0px_#000] opacity-[0.32] rotate-[35deg]" />
            </div>
            <div className="absolute auth-bg-extra-5">
                <div className="w-7 h-7 sm:w-11 sm:h-11 rounded-full bg-[#00D2FF] border-2 border-black shadow-[3px_3px_0px_#000] opacity-[0.32]" />
            </div>
            <div className="absolute auth-bg-extra-6">
                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#00E676] border-2 border-black shadow-[4px_4px_0px_#000] opacity-[0.28] rotate-[15deg]" />
            </div>

            {/* ═══ LINES ═══ */}

            <div className="absolute auth-bg-drift-8">
                <div className="w-44 sm:w-72 h-[3.5px] bg-black opacity-[0.22] rotate-[15deg]" />
            </div>
            <div className="absolute auth-bg-line-2">
                <svg width="280" height="6" className="sm:w-[420px]" viewBox="0 0 420 6" fill="none">
                    <line x1="0" y1="3" x2="420" y2="3" stroke="#FFE600" strokeWidth="4" strokeDasharray="18 10" opacity="0.45" />
                </svg>
            </div>
            <div className="absolute auth-bg-line-3">
                <svg width="220" height="6" className="sm:w-[340px]" viewBox="0 0 340 6" fill="none">
                    <line x1="0" y1="3" x2="340" y2="3" stroke="#00D2FF" strokeWidth="3.5" opacity="0.40" />
                </svg>
            </div>
            <div className="absolute auth-bg-line-4">
                <div className="w-28 sm:w-44 h-[3.5px] bg-[#00E676] opacity-[0.40] rotate-[-20deg]" />
            </div>
            <div className="absolute auth-bg-line-5">
                <svg width="280" height="6" className="sm:w-[400px]" viewBox="0 0 400 6" fill="none">
                    <line x1="0" y1="3" x2="400" y2="3" stroke="#FF5E7E" strokeWidth="3.5" strokeDasharray="20 12" opacity="0.38" />
                </svg>
            </div>
            <div className="absolute auth-bg-line-6">
                <div className="w-36 sm:w-60 h-[3px] bg-black opacity-[0.20] rotate-[-30deg]" />
            </div>
            <div className="absolute auth-bg-line-7">
                <svg width="200" height="6" className="sm:w-[300px]" viewBox="0 0 300 6" fill="none">
                    <line x1="0" y1="3" x2="300" y2="3" stroke="#FFE600" strokeWidth="3" opacity="0.42" />
                </svg>
            </div>

            {/* ═══ ARCS & CURVES ═══ */}

            <div className="absolute auth-bg-arc-1">
                <svg width="200" height="110" className="sm:w-[280px] sm:h-[150px]" viewBox="0 0 280 150" fill="none">
                    <path d="M10 140 Q140 -20 270 140" stroke="#FFE600" strokeWidth="4" fill="none" opacity="0.45" />
                </svg>
            </div>
            <div className="absolute auth-bg-arc-2">
                <svg width="150" height="90" className="sm:w-[220px] sm:h-[120px]" viewBox="0 0 220 120" fill="none">
                    <path d="M10 110 Q110 -10 210 110" stroke="#FF5E7E" strokeWidth="3.5" fill="none" opacity="0.38" />
                </svg>
            </div>
            <div className="absolute auth-bg-arc-3">
                <svg width="170" height="210" className="sm:w-[230px] sm:h-[290px]" viewBox="0 0 230 290" fill="none">
                    <path d="M20 10 Q190 75 65 145 Q-55 215 210 280" stroke="#00D2FF" strokeWidth="3.5" fill="none" opacity="0.35" />
                </svg>
            </div>
            <div className="absolute auth-bg-arc-4">
                <svg width="130" height="130" className="sm:w-[190px] sm:h-[190px]" viewBox="0 0 190 190" fill="none">
                    <path d="M10 180 Q10 10 180 10" stroke="#00E676" strokeWidth="3.5" strokeDasharray="14 9" fill="none" opacity="0.40" />
                </svg>
            </div>
            <div className="absolute auth-bg-arc-5">
                <svg width="210" height="130" className="sm:w-[320px] sm:h-[170px]" viewBox="0 0 320 170" fill="none">
                    <path d="M10 160 Q160 -30 310 160" stroke="#FF5E7E" strokeWidth="3" strokeDasharray="15 10" fill="none" opacity="0.36" />
                </svg>
            </div>
            <div className="absolute auth-bg-arc-6">
                <svg width="170" height="170" className="sm:w-[230px] sm:h-[230px]" viewBox="0 0 230 230" fill="none">
                    <path d="M10 115 Q115 10 220 115 Q115 220 10 115" stroke="#FFE600" strokeWidth="3" fill="none" opacity="0.35" />
                </svg>
            </div>

            {/* ═══ WAVES ═══ */}

            <div className="absolute auth-bg-wave-1">
                <svg width="600" height="70" className="sm:w-[950px] sm:h-[90px]" viewBox="0 0 950 90" fill="none" preserveAspectRatio="none">
                    <path d="M0 45 Q80 0 160 45 Q240 90 320 45 Q400 0 480 45 Q560 90 640 45 Q720 0 800 45 Q880 90 950 45" stroke="#FFE600" strokeWidth="3.5" fill="none" opacity="0.40" />
                </svg>
            </div>
            <div className="absolute auth-bg-wave-2">
                <svg width="520" height="60" className="sm:w-[850px] sm:h-[80px]" viewBox="0 0 850 80" fill="none" preserveAspectRatio="none">
                    <path d="M0 40 Q71 0 142 40 Q213 80 284 40 Q355 0 426 40 Q497 80 568 40 Q639 0 710 40 Q781 80 850 40" stroke="#FF5E7E" strokeWidth="3" fill="none" opacity="0.35" />
                </svg>
            </div>
            <div className="absolute auth-bg-wave-3">
                <svg width="520" height="50" className="sm:w-[750px] sm:h-[65px]" viewBox="0 0 750 65" fill="none" preserveAspectRatio="none">
                    <path d="M0 32 Q62 0 125 32 Q187 65 250 32 Q312 0 375 32 Q437 65 500 32 Q562 0 625 32 Q687 65 750 32" stroke="#00D2FF" strokeWidth="3" strokeDasharray="12 7" fill="none" opacity="0.38" />
                </svg>
            </div>
            <div className="absolute auth-bg-wave-4">
                <svg width="720" height="60" className="sm:w-[1050px] sm:h-[80px]" viewBox="0 0 1050 80" fill="none" preserveAspectRatio="none">
                    <path d="M0 40 Q88 0 175 40 Q262 80 350 40 Q438 0 525 40 Q612 80 700 40 Q788 0 875 40 Q962 80 1050 40" stroke="#00E676" strokeWidth="2.8" fill="none" opacity="0.32" />
                </svg>
            </div>
            <div className="absolute auth-bg-wave-5">
                <svg width="420" height="50" className="sm:w-[680px] sm:h-[70px]" viewBox="0 0 680 70" fill="none" preserveAspectRatio="none">
                    <path d="M0 35 Q57 0 113 35 Q170 70 227 35 Q283 0 340 35 Q397 70 453 35 Q510 0 567 35 Q623 70 680 35" stroke="#FFE600" strokeWidth="3" strokeDasharray="10 6" fill="none" opacity="0.35" />
                </svg>
            </div>
        </div>
    );
}
