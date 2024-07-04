import {AppBar, Box, Button, Toolbar} from '@mui/material';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <Box>
      <AppBar
        color={'default'}
        position={'static'}
        enableColorOnDark
      >
        <Toolbar sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Button
            color={'inherit'}
            href={'/'}
            target={'_self'}
            size={'large'}
          >
            빵빵이
          </Button>
          <SearchBar />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
