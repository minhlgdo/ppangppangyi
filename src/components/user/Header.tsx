import {AppBar, Box, Button, IconButton, Toolbar} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

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
          <IconButton
            href={'/search'}
            target={'_self'}
          >
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
