import {Divider, Drawer, List, ListItem, ListItemText, Toolbar} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const DRAWER_WIDTH = 240;

export default function NavigationBar() {
  const navigate = useNavigate();
  const onNavigationItem = (itemName: string) => {
    switch (itemName) {
      case 'Brand':
        navigate(`/admin/brand/`);
        break;
      case 'Fuel':
        navigate(`/admin/fuel/`);
        break;
      case 'Category':
        navigate(`/admin/category/`);
        break;
      case 'Model':
        navigate(`/admin/model/`);
        break;
      case 'Car':
        navigate(`/admin/car`);
        break;
    }
  };

  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List component={'nav'}>
        {['Brand', 'Fuel', 'Category', 'Model', 'Car'].map((item) => (
          <ListItem
            key={item}
            onClick={() => onNavigationItem(item)}
          >
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
