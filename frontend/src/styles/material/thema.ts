import { createTheme } from '@mui/material';

const paletteModes = ['light', 'dark'];
/**
 * @desc defaultのテーマを上書きする。
 */
export const theme = createTheme({
  palette: {
    mode: paletteMode,
  },
});
