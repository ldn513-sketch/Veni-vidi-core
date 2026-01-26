import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.venividi.core',
  appName: 'Veni Vidi Core',
  webDir: 'dist/public',
  android: {
    backgroundColor: '#0a0a10',
    allowMixedContent: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      backgroundColor: '#0a0a10',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0a0a10',
    },
  },
};

export default config;
