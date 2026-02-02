
import React, { useState } from 'react';
import { Upload, Download, Gift, Type, Layout, Calendar, Palette, Image as ImageIcon, User } from 'lucide-react';
import Poster from './components/Poster';
import { WinnerData, PosterConfig, BackgroundConfig } from './types';

const App: React.FC = () => {
  const [winners, setWinners] = useState<WinnerData[]>([
    { id: 1, name: '{NAMA_1}', number: '{NOMOR_1}', photoUrl: null, prizeUrl: null },
    { id: 2, name: '{NAMA_2}', number: '{NOMOR_2}', photoUrl: null, prizeUrl: null },
    { id: 3, name: '{NAMA_3}', number: '{NOMOR_3}', photoUrl: null, prizeUrl: null }
  ]);

  const [config, setConfig] = useState<PosterConfig>({
    title: 'CONGRATULATION',
    descLine1: 'Selamat untuk ketiga pemenang giveaway, dengan bangga kami umumkan',
    descLine2: 'bahwa giveaway kali ini resmi dimenangkan oleh 3 anggota yang telah terverifikasi',
    giftLabels: ['LUXURY HANDBAG', 'FLAGSHIP DEVICE', 'PREMIUM FOOTWEAR'],
    footerLabel: 'VALID UNTIL',
    footerValue: '01 FEBRUARY 2026 | 20:30 WIB',
    background: {
      type: 'preset',
      value: '',
      presetId: 'black-gold'
    }
  });

  const handleConfigChange = (field: keyof PosterConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleBackgroundChange = (bg: Partial<BackgroundConfig>) => {
    setConfig(prev => ({ ...prev, background: { ...prev.background, ...bg } }));
  };

  const handleWinnerFieldChange = (id: number, field: keyof WinnerData, value: string) => {
    setWinners(prev => prev.map(w => w.id === id ? { ...w, [field]: value } : w));
  };

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleBackgroundChange({ type: 'image', value: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGiftLabelChange = (index: number, value: string) => {
    const newLabels = [...config.giftLabels];
    newLabels[index] = value;
    setConfig(prev => ({ ...prev, giftLabels: newLabels }));
  };

  const handlePhotoUpload = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setWinners(prev => prev.map(w => w.id === id ? { ...w, photoUrl: reader.result as string } : w));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrizeUpload = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setWinners(prev => prev.map(w => w.id === id ? { ...w, prizeUrl: reader.result as string } : w));
      };
      reader.readAsDataURL(file);
    }
  };

  const presets = [
    { id: 'black-gold', label: 'Black Gold' },
    { id: 'ivory-champagne', label: 'Ivory Champagne' },
    { id: 'midnight-blue', label: 'Midnight Blue' },
    { id: 'platinum-silver', label: 'Platinum Silver' },
    { id: 'mocha-bronze', label: 'Mocha Bronze' },
    { id: 'royal-wine', label: 'Royal Wine' },
  ] as const;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col lg:flex-row font-sans">
      {/* Sidebar Controls */}
      <div className="w-full lg:w-96 p-8 border-r border-neutral-900 space-y-10 overflow-y-auto max-h-screen pb-32 scrollbar-hide">
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 font-luxury italic text-center">Poster Lab</h1>
          <p className="text-neutral-500 text-[10px] tracking-[0.3em] uppercase font-bold text-center">High-End Italian Suite</p>
        </header>

        <div className="space-y-8">
          {/* Background Studio Section */}
          <section className="space-y-5">
            <div className="flex items-center gap-3 border-b border-neutral-800 pb-3">
              <Palette className="w-4 h-4 text-yellow-600" />
              <h3 className="font-bold text-[11px] uppercase tracking-[0.2em] text-neutral-300">Background Studio</h3>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {presets.map((preset) => (
                  <button 
                    key={preset.id}
                    onClick={() => handleBackgroundChange({ type: 'preset', presetId: preset.id })}
                    className={`py-2 px-1 rounded-xl border text-[9px] font-bold tracking-widest uppercase transition-all ${config.background.presetId === preset.id ? 'bg-yellow-600/20 border-yellow-500 text-yellow-100' : 'bg-neutral-900/50 border-neutral-800 text-neutral-500 hover:border-neutral-700'}`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <div className="relative group">
                <input type="file" accept="image/*" onChange={handleBgUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                <div className={`flex items-center justify-center gap-3 py-4 border border-dashed rounded-xl transition-all ${config.background.type === 'image' ? 'bg-yellow-600/10 border-yellow-600/50' : 'bg-neutral-900/50 border-neutral-800 group-hover:border-neutral-700'}`}>
                  <ImageIcon className={`w-4 h-4 ${config.background.type === 'image' ? 'text-yellow-600' : 'text-neutral-600'}`} />
                  <span className={`text-[10px] uppercase font-bold tracking-widest ${config.background.type === 'image' ? 'text-yellow-100' : 'text-neutral-500'}`}>
                    {config.background.type === 'image' ? 'Custom Image Active' : 'Upload Texture'}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Headline & Description Section */}
          <section className="space-y-5">
            <div className="flex items-center gap-3 border-b border-neutral-800 pb-3">
              <Type className="w-4 h-4 text-yellow-600" />
              <h3 className="font-bold text-[11px] uppercase tracking-[0.2em] text-neutral-300">Typography Suite</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] text-neutral-500 uppercase font-bold mb-1.5 tracking-wider">Main Title</label>
                <input
                  type="text"
                  value={config.title}
                  onChange={(e) => handleConfigChange('title', e.target.value)}
                  className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-yellow-600/50 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] text-neutral-500 uppercase font-bold mb-1.5 tracking-wider">Description (2 Lines)</label>
                <input
                  type="text"
                  value={config.descLine1}
                  onChange={(e) => handleConfigChange('descLine1', e.target.value)}
                  className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-yellow-600/50 outline-none"
                />
                <input
                  type="text"
                  value={config.descLine2}
                  onChange={(e) => handleConfigChange('descLine2', e.target.value)}
                  className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-yellow-600/50 outline-none"
                />
              </div>
            </div>
          </section>

          {/* Winner Data Section */}
          <section className="space-y-5">
            <div className="flex items-center gap-3 border-b border-neutral-800 pb-3">
              <User className="w-4 h-4 text-yellow-600" />
              <h3 className="font-bold text-[11px] uppercase tracking-[0.2em] text-neutral-300">Winner Registry</h3>
            </div>
            <div className="space-y-6">
              {winners.map((winner, idx) => (
                <div key={winner.id} className="space-y-3 p-4 bg-neutral-900/30 rounded-2xl border border-neutral-800/40">
                  <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Winner {idx + 1} Details</p>
                  <div>
                    <label className="block text-[9px] text-neutral-600 uppercase font-bold mb-1 tracking-wider">Name</label>
                    <input
                      type="text"
                      value={winner.name}
                      onChange={(e) => handleWinnerFieldChange(winner.id, 'name', e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-yellow-600/50 outline-none text-neutral-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-neutral-600 uppercase font-bold mb-1 tracking-wider">User ID / WhatsApp</label>
                    <input
                      type="text"
                      value={winner.number}
                      onChange={(e) => handleWinnerFieldChange(winner.id, 'number', e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-yellow-600/50 outline-none text-[#c5a059]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Gift Labels Section */}
          <section className="space-y-5">
            <div className="flex items-center gap-3 border-b border-neutral-800 pb-3">
              <Gift className="w-4 h-4 text-yellow-600" />
              <h3 className="font-bold text-[11px] uppercase tracking-[0.2em] text-neutral-300">Prize Inventory</h3>
            </div>
            <div className="space-y-4">
              {config.giftLabels.map((label, idx) => (
                <div key={idx}>
                  <label className="block text-[10px] text-neutral-500 uppercase font-bold mb-1.5 tracking-wider">Gift Label {idx + 1}</label>
                  <input
                    type="text"
                    value={label}
                    onChange={(e) => handleGiftLabelChange(idx, e.target.value)}
                    className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-yellow-600/50 outline-none"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Campaign Validity */}
          <section className="space-y-5">
            <div className="flex items-center gap-3 border-b border-neutral-800 pb-3">
              <Calendar className="w-4 h-4 text-yellow-600" />
              <h3 className="font-bold text-[11px] uppercase tracking-[0.2em] text-neutral-300">Campaign Validity</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-[10px] text-neutral-500 uppercase font-bold mb-1.5 tracking-wider">Footer Label</label>
                <input
                  type="text"
                  value={config.footerLabel}
                  onChange={(e) => handleConfigChange('footerLabel', e.target.value)}
                  className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-yellow-600/50 outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] text-neutral-500 uppercase font-bold mb-1.5 tracking-wider">Schedule Info</label>
                <input
                  type="text"
                  value={config.footerValue}
                  onChange={(e) => handleConfigChange('footerValue', e.target.value)}
                  className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-yellow-600/50 outline-none"
                />
              </div>
            </div>
          </section>

          {/* Visual Assets (Photos) */}
          <section className="space-y-5">
            <div className="flex items-center gap-3 border-b border-neutral-800 pb-3">
              <Layout className="w-4 h-4 text-yellow-600" />
              <h3 className="font-bold text-[11px] uppercase tracking-[0.2em] text-neutral-300">Media Assets</h3>
            </div>
            <div className="space-y-4 pb-20">
              {winners.map((winner, index) => (
                <div key={winner.id} className="p-4 bg-neutral-900/20 rounded-2xl border border-neutral-800/50 space-y-4">
                  <header className="flex justify-between items-center">
                    <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">
                      Position: <span className="text-neutral-400">{index === 0 ? 'LEFT' : index === 1 ? 'CENTER' : 'RIGHT'}</span>
                    </p>
                  </header>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative group">
                      <input type="file" accept="image/*" onChange={(e) => handlePhotoUpload(winner.id, e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      <div className="flex flex-col items-center justify-center gap-2 py-4 border border-dashed border-neutral-800 group-hover:border-yellow-600/40 group-hover:bg-yellow-600/5 rounded-xl bg-neutral-950/50 transition-all">
                        {winner.photoUrl ? <img src={winner.photoUrl} className="w-8 h-8 rounded-lg object-cover" /> : <Upload className="w-4 h-4 text-neutral-600" />}
                        <span className="text-[9px] text-neutral-600 uppercase font-bold">Profile</span>
                      </div>
                    </div>
                    <div className="relative group">
                      <input type="file" accept="image/*" onChange={(e) => handlePrizeUpload(winner.id, e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      <div className="flex flex-col items-center justify-center gap-2 py-4 border border-dashed border-neutral-800 group-hover:border-yellow-600/40 group-hover:bg-yellow-600/5 rounded-xl bg-neutral-950/50 transition-all">
                        {winner.prizeUrl ? <img src={winner.prizeUrl} className="w-8 h-8 rounded-lg object-cover" /> : <Upload className="w-4 h-4 text-neutral-600" />}
                        <span className="text-[9px] text-neutral-600 uppercase font-bold">Prize</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="fixed bottom-0 left-0 w-full lg:w-96 p-8 bg-neutral-950 border-t border-neutral-900 z-50">
          <button 
            onClick={() => window.print()}
            className="w-full flex items-center justify-center gap-3 bg-white text-black font-bold py-4 rounded-2xl hover:bg-neutral-200 transition-all active:scale-95 uppercase tracking-[0.2em] text-xs shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
          >
            <Download className="w-4 h-4" />
            Export Composition
          </button>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 p-4 md:p-12 flex items-center justify-center bg-[#050505] overflow-auto">
        <div className="relative shadow-[0_0_120px_rgba(0,0,0,1)] border border-neutral-900 p-2 bg-neutral-950 rounded-[2rem] transform scale-[0.55] sm:scale-[0.75] md:scale-[0.85] lg:scale-100 xl:scale-105 origin-center transition-transform duration-500">
          <Poster winners={winners} config={config} />
        </div>
      </div>
    </div>
  );
};

export default App;
