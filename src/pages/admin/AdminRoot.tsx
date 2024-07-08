import {Outlet} from 'react-router-dom';
import NavigationBar from '../../components/admin/NavigationBar.tsx';
import {Box, CssBaseline} from '@mui/material';

export default function AdminRoot() {
  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
    >
      <CssBaseline />
      <NavigationBar />
      <Outlet />
    </Box>
  );
}
