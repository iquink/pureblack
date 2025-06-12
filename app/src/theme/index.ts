  export const getTheme = (themeMode: 'light' | 'dark') => ({
    token: {
      colorPrimary: themeMode === 'dark' ? '#222' : '#222', // dark grey/black for both
      colorBgBase: themeMode === 'dark' ? '#111' : '#fff',   // black for dark, white for light
      colorTextBase: themeMode === 'dark' ? '#f5f5f5' : '#232323', // light grey for dark, dark grey for light
      borderRadius: 6,
      fontFamily: 'system-ui, Helvetica, Arial, sans-serif',
    },
  });