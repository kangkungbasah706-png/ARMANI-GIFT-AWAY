
export interface BackgroundConfig {
  type: 'preset' | 'solid' | 'gradient' | 'image';
  value: string; // Hex color, gradient string, or image URL
  presetId?: 'black-gold' | 'ivory-champagne' | 'midnight-blue' | 'platinum-silver' | 'mocha-bronze' | 'royal-wine';
}

export interface WinnerData {
  id: number;
  name: string;
  number: string;
  photoUrl: string | null;
  prizeUrl: string | null;
}

export interface PosterConfig {
  title: string;
  descLine1: string;
  descLine2: string;
  giftLabels: string[];
  footerLabel: string;
  footerValue: string;
  background: BackgroundConfig;
}

export interface PosterProps {
  winners: WinnerData[];
  config: PosterConfig;
}
