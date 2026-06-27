import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sp: {
          black: '#030303',
          gold:  '#c58641',
          olive: '#666632',
          red:   '#932f1a',
          lime:  '#d6ccb0',
          bone:  '#f4efe3',
          ink:   '#0b0b08',
        },
      },
      fontFamily: {
        display: ['Gothicon', 'Cinzel', 'Georgia', 'serif'],
        body:    ['Caudex', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        'sp-ease': 'cubic-bezier(.8,0,.2,1)',
        'sp-slow': 'cubic-bezier(.16,1,.3,1)',
      },
      transitionDuration: {
        '550': '550ms',
        '850': '850ms',
        '900': '900ms',
      },
      spacing: {
        'pad': 'clamp(20px,5vw,86px)',
      },
      fontSize: {
        'hero':    ['clamp(64px,12vw,210px)',  { lineHeight: '.78',  letterSpacing: '-.045em' }],
        'hero-sm': ['clamp(48px,7vw,110px)',   { lineHeight: '.78',  letterSpacing: '-.045em' }],
        'title':   ['clamp(48px,7.8vw,126px)', { lineHeight: '.88',  letterSpacing: '-.035em' }],
        'eyebrow': ['12px',                    { lineHeight: '1',    letterSpacing: '.24em'   }],
        'nav':     ['13px',                    { lineHeight: '1',    letterSpacing: '.08em'   }],
        'label':   ['12px',                    { lineHeight: '1',    letterSpacing: '.12em'   }],
      },
      minHeight: {
        'screen-sv': '100svh',
      },
      height: {
        'screen-sv': '100svh',
      },
      maxWidth: {
        'hero': '1300px',
        'page': '1280px',
        'copy': '760px',
        'copy-sm': '680px',
      },
      boxShadow: {
        'hero': '0 42px 120px rgba(0,0,0,.54)',
        'altar': '0 30px 80px rgba(0,0,0,.5)',
      },
      animation: {
        'spin-slow':  'slowSpin 15s linear infinite',
        'spin-halo':  'slowSpin 16s linear infinite',
        'blink-dot':  'eyeBlinkDot 3.4s ease-in-out infinite',
        'scroll-cue': 'scrollCueBounce 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
