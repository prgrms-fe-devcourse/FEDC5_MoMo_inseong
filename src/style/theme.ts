export const theme = {
  // 미디어 쿼리
  mediaQueries: {
    small: '@media (max-width: 480px)',
    medium: '@media (max-width: 768px)',
    large: '@media (max-width: 1024px)',
  },
  // 폰트 패밀리
  fonts: 'Roboto, sans-serif',
  // 색상
  colors: {
    primaryBlue: {
      default: '#228BB4',
      hover: '#1E779A',
      transparent: '#228BB41A',
    },
    secondaryNavy: {
      default: '#364954',
      hover: '#232E34',
      transparent: '#3649541A',
    },
    grey: {
      bright: '#F8F9FA',
      light: '#EDEDED',
      default: '#B2B2B2',
      dark: '#939393',
    },
    beige: '#EEEAE2',
    semiWhite: '#F8F9Fa',
    red: '#F03D3E',
    background: {
      default: '#ffffff',
      dark: '#333333',
    },
  },
  // 기본 padding, 헤더 높이, z-index 등
  space: {
    padding: '16px',
  },
  sizes: {
    headerHeight: '60px',
  },
  zIndex: {
    tooltip: '100',
  },
  // 유틸리티 스타일
  utils: {
    center: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    hidden: {
      display: 'none',
    },
    visible: {
      display: 'block',
    },
  },
  // 스크롤바
  scrollBar: {
    default: `
      &::-webkit-scrollbar {
        width: 8px;
      }

      &::-webkit-scrollbar-thumb {
        height: 30%;
        background: #228BB4;

        border-radius: 10px;
      }

      &::-webkit-scrollbar-track {
        background: #EDEDED;
      }
    `,
  },
};
