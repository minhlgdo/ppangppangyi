import {Outlet} from 'react-router-dom';
import Header from '@src/components/user/Header.tsx';
import {CssBaseline} from '@mui/material';

export default function Root() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Outlet />
    </>
  );
}
