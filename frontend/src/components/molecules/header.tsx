import type { NextComponentType, NextPageContext } from 'next';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import { useApp } from '@/hooks';

type Props = {};

export const Header: NextComponentType<NextPageContext, null, Props> = () => {
  const { theme, isDarkMode, handleChangePaletteMode } = useApp();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Switch checked={isDarkMode} onChange={handleChangePaletteMode} />
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            ヘッダー
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
