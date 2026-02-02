
import React from 'react';
import { CheckCircle, Briefcase, Smartphone, Footprints } from 'lucide-react';
import { PosterProps } from '../types';

const Poster: React.FC<PosterProps> = ({ winners, config }) => {
  // Mapping for default placeholders if no prize image is uploaded
  const DefaultPrizeIcons = [
    { Icon: Briefcase },
    { Icon: Smartphone },
    { Icon: Footprints }
  ];

  const renderBaseBackground = () => {
    const { background } = config;

    if (background.type === 'image') {
      return (
        <div className="absolute inset-0 z-0">
          <img src={background.value} className="w-full h-full object-cover" alt="Background" />
          {/* Subtle darkness overlay to ensure legibility on any image */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
      );
    }

    if (background.type === 'preset') {
      switch (background.presetId) {
        case 'royal-wine':
          return <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_40%,_#2a0101_0%,_#000000_100%)]"></div>;
        case 'midnight-blue':
          return <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_40%,_#001a35_0%,_#000000_100%)]"></div>;
        case 'ivory-champagne':
          return <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_40%,_#2c281e_0%,_#0c0c0b_100%)]"></div>;
        case 'platinum-silver':
          return <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_40%,_#1e1e24_0%,_#050505_100%)]"></div>;
        case 'mocha-bronze':
          return <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_40%,_#1f140a_0%,_#000000_100%)]"></div>;
        case 'black-gold':
        default:
          return <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_40%,_#0a0a0a_0%,_#000000_100%)]"></div>;
      }
    }

    if (background.type === 'solid') {
      return <div className="absolute inset-0 z-0" style={{ backgroundColor: background.value }}></div>;
    }

    return <div className="absolute inset-0 z-0 bg-black"></div>;
  };

  const getAccentColor = () => {
    switch (config.background.presetId) {
      case 'royal-wine': return 'rgba(160,0,0,0.18)';
      case 'midnight-blue': return 'rgba(0,100,255,0.12)';
      case 'ivory-champagne': return 'rgba(212,175,55,0.12)';
      case 'platinum-silver': return 'rgba(200,200,220,0.08)';
      case 'mocha-bronze': return 'rgba(140,90,50,0.12)';
      case 'black-gold':
      default: return 'rgba(212,175,55,0.08)';
    }
  };

  const getFocalColor = () => {
    switch (config.background.presetId) {
      case 'royal-wine': return 'rgba(220,38,38,0.1)';
      case 'midnight-blue': return 'rgba(37,99,235,0.1)';
      case 'ivory-champagne': return 'rgba(245,230,190,0.08)';
      case 'platinum-silver': return 'rgba(220,225,240,0.06)';
      case 'mocha-bronze': return 'rgba(180,130,80,0.08)';
      case 'black-gold':
      default: return 'rgba(212,175,55,0.06)';
    }
  };

  const getCardGradient = () => {
    switch (config.background.presetId) {
      case 'royal-wine': return 'from-[#3a0303] to-[#240202] border-red-900/30';
      case 'midnight-blue': return 'from-[#001e40] to-[#000d1c] border-blue-900/30';
      case 'ivory-champagne': return 'from-[#1e1b15] to-[#0f0e0b] border-yellow-900/20';
      case 'platinum-silver': return 'from-[#1a1a1e] to-[#0a0a0c] border-neutral-800/50';
      case 'mocha-bronze': return 'from-[#22160d] to-[#120a05] border-amber-900/30';
      case 'black-gold':
      default: return 'from-[#111111] to-[#050505] border-yellow-900/20';
    }
  };

  return (
    <div id="capture-poster" className="w-[800px] h-[800px] bg-[#000000] relative overflow-hidden flex flex-col items-center justify-between py-16 px-14 select-none shadow-2xl">
      
      {/* 1. DYNAMIC BASE LAYER */}
      {renderBaseBackground()}

      {/* 2. ATMOSPHERIC OVERLAYS (Locked Aesthetics) */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        
        {/* Metallic Sheen / Texture Overlay */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.05)_0%,_transparent_70%)]"></div>
        </div>

        {/* Dynamic Atmospheric Glow */}
        <div 
          className="absolute inset-0" 
          style={{ background: `radial-gradient(circle_at_50%_45%, ${getAccentColor()} 0%, transparent 75%)` }}
        ></div>

        {/* Liquid Metal Sharp Reflections */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-[10%] left-[-20%] w-[140%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-[15deg] transform"></div>
          <div className="absolute bottom-[40%] right-[-20%] w-[140%] h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent -rotate-[12deg] transform"></div>
        </div>

        {/* Luxury Gold Reflections */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(212,175,55,0.04)_0%,_transparent_50%)]"></div>

        {/* Focal Spotlight */}
        <div 
          className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[700px] h-[550px] blur-[160px] rounded-full opacity-60"
          style={{ backgroundColor: getFocalColor() }}
        ></div>
        
        {/* Premium Vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_250px_rgba(0,0,0,0.9)]"></div>
        
        {/* Decorative Golden Filaments */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[-5%] left-[-5%] w-[110%] h-[1px] bg-gradient-to-r from-transparent via-yellow-600/30 to-transparent rotate-[35deg] transform"></div>
          <div className="absolute top-[30%] left-[-10%] w-[120%] h-[1px] bg-gradient-to-r from-transparent via-yellow-700/20 to-transparent rotate-[5deg] transform"></div>
        </div>
      </div>

      {/* CONTENT LAYERS (Locked z-index 10+) */}
      <div className="relative z-10 text-center space-y-4 w-full pt-4 flex flex-col items-center">
        {/* MAIN HEADLINE */}
        <h1 
          className="text-[38px] font-bold tracking-[0.42em] font-luxury uppercase leading-none px-4 drop-shadow-[0_0_25px_rgba(212,175,55,0.35)]"
          style={{
            background: 'linear-gradient(to bottom, #fdfbf7 0%, #fdfbf7 50%, #d4af37 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))'
          }}
        >
          {config.title}
        </h1>

        {/* BRAND SIGNATURE */}
        <div className="pt-1 flex flex-col items-center">
           <h2 
             className="text-[14px] font-luxury font-medium tracking-[0.6em] uppercase opacity-95 leading-none"
             style={{
               background: 'linear-gradient(to bottom, #d4af37 0%, #c5a059 100%)',
               WebkitBackgroundClip: 'text',
               WebkitTextFillColor: 'transparent'
             }}
           >
            GIORGIO ARMANI
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent mt-4"></div>
        </div>
        
        {/* DESCRIPTION */}
        <p className="max-w-[620px] mx-auto text-[11.5px] text-[#e5d19a] font-medium leading-[1.8] tracking-[0.08em] italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] opacity-90 mt-2">
          {config.descLine1} <br />
          {config.descLine2}
        </p>
      </div>

      {/* WINNER CARDS + PRIZES GRID */}
      <div className="relative z-10 grid grid-cols-3 gap-8 w-full mt-2">
        {winners.map((winner, index) => {
          const defaultItem = DefaultPrizeIcons[index];
          const giftLabel = config.giftLabels[index] || '';
          
          return (
            <div key={winner.id} className="flex flex-col items-center gap-6">
              {/* Winner Card */}
              <div 
                className={`rounded-2xl p-4 shadow-[0_40px_80px_rgba(0,0,0,0.9)] flex flex-col items-center transition-transform hover:scale-[1.02] duration-700 relative overflow-hidden group border w-full bg-gradient-to-b ${getCardGradient()}`}
              >
                {/* Luxury Card Highlight */}
                <div className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] pointer-events-none z-20"></div>
                
                {/* Surface Sheen */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 via-transparent to-black/40 pointer-events-none z-10 opacity-70"></div>
                
                {/* Photo Area */}
                <div className="w-full aspect-[4/5] p-[1.5px] bg-gradient-to-tr from-yellow-700 via-yellow-400 to-yellow-600 rounded-xl mb-4 relative shadow-[0_4px_15px_rgba(0,0,0,0.4)] z-20">
                  <div className="w-full h-full bg-gradient-to-b from-[#fdfbf7] via-[#f9f7f4] to-[#f0eade] rounded-[10px] overflow-hidden relative">
                    {winner.photoUrl ? (
                      <img src={winner.photoUrl} alt={winner.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-b from-[#f9f7f4] via-[#f5f0e6] to-[#ece6d9] flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-yellow-600/5 opacity-30"></div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Winner Text Content */}
                <div className="text-center w-full space-y-1 mb-2 relative z-20">
                  <h4 className="text-[14px] font-bold text-[#fdfbf7] uppercase tracking-tight truncate w-full px-2 drop-shadow-md">{winner.name}</h4>
                  <p className="text-[10px] text-[#c5a059] font-bold tracking-widest truncate w-full px-2 uppercase drop-shadow-sm">USER ID: {winner.number}</p>
                </div>
                
                {/* Verification Badge */}
                <div className="absolute bottom-3 right-3 z-30 drop-shadow-lg">
                  <CheckCircle size={18} fill="currentColor" className="text-blue-500" fillOpacity={1} stroke="#fdfbf7" strokeWidth={1.5} />
                </div>
              </div>

              {/* PRIZE BOX */}
              <div className="flex flex-col items-center group w-full pt-2">
                <div className="relative">
                  <div 
                    className="absolute inset-[-20px] blur-[40px] rounded-full opacity-60 pointer-events-none"
                    style={{ backgroundColor: getFocalColor() }}
                  ></div>
                  
                  <div className={`w-[145px] h-[90px] bg-[#ffffff] rounded-xl border shadow-[0_20px_45px_rgba(0,0,0,0.7)] overflow-hidden relative transition-all duration-700 group-hover:scale-[1.05] border-white/20`}>
                    <div className="w-full h-full relative z-0">
                      {winner.prizeUrl ? (
                        <img 
                          src={winner.prizeUrl} 
                          alt="Prize Product" 
                          className="w-full h-full object-cover brightness-[1.15] contrast-[1.12] saturate-[1.08] filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.15)] transition-all duration-500 group-hover:brightness-[1.2]" 
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-white to-[#f0f0f0] opacity-50">
                           <defaultItem.Icon size={42} className="text-neutral-900 opacity-60" strokeWidth={0.5} />
                        </div>
                      )}
                    </div>
                    
                    <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/30 to-transparent pointer-events-none z-10"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(255,255,255,0.15)_0%,_transparent_60%)] pointer-events-none z-10"></div>
                    <div className="absolute top-0 left-[-150%] w-[100%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent rotate-[25deg] group-hover:translate-x-[300%] transition-transform duration-[2s] ease-in-out pointer-events-none z-20"></div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                   <p className="text-[8px] tracking-[0.28em] font-bold text-[#c5a059] uppercase italic mb-0.5">Exclusively Awarded</p>
                   <p className="text-[11px] font-bold text-[#fdfbf7] tracking-[0.2em] uppercase transition-colors duration-300">
                    {giftLabel}
                  </p>
                </div>
                <div 
                  className={`w-[75%] h-3 blur-xl rounded-full mt-[-4px] pointer-events-none opacity-60 group-hover:opacity-80 transition-all duration-700`}
                  style={{ backgroundColor: getFocalColor() }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FOOTER SECTION */}
      <div className="relative z-10 w-full flex flex-col items-center gap-4">
        
        {/* BRAND WATERMARK */}
        <div className="absolute bottom-16 opacity-[0.015] select-none pointer-events-none w-full text-center">
          <h2 className={`text-[120px] font-luxury font-bold tracking-[0.38em] whitespace-nowrap inline-block text-white`}>
            GIORGIO ARMANI
          </h2>
        </div>

        {/* DATE CAPSULES */}
        <div className="flex items-center gap-4 mt-8">
          <div className="bg-[#fdfbf7] border border-neutral-200 text-[10.5px] font-bold text-[#1a1a1a] px-6 py-2 rounded-full tracking-[0.25em] uppercase shadow-2xl">
            {config.footerLabel}
          </div>
          <div className={`bg-gradient-to-r border text-[10.5px] font-bold text-[#e5d19a] px-9 py-2 rounded-full tracking-[0.22em] shadow-[0_10px_30px_rgba(0,0,0,0.6)] from-neutral-900/40 to-neutral-800/20 border-white/10`}>
            {config.footerValue}
          </div>
        </div>
      </div>

      {/* Decorative Corner Borders */}
      <div className={`absolute top-12 left-12 w-16 h-16 border-t-[2px] border-l-[2px] drop-shadow-[0_0_8px_rgba(255,255,255,0.05)] border-white/10`}></div>
      <div className={`absolute top-12 right-12 w-16 h-16 border-t-[2px] border-r-[2px] drop-shadow-[0_0_8px_rgba(255,255,255,0.05)] border-white/10`}></div>
      <div className={`absolute bottom-12 left-12 w-16 h-16 border-b-[2px] border-l-[2px] drop-shadow-[0_0_8px_rgba(255,255,255,0.05)] border-white/10`}></div>
      <div className={`absolute bottom-12 right-12 w-16 h-16 border-b-[2px] border-r-[2px] drop-shadow-[0_0_8px_rgba(255,255,255,0.05)] border-white/10`}></div>
    </div>
  );
};

export default Poster;
