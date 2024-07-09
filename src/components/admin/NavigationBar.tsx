import {Divider, Drawer, List, ListItem, ListItemText, Toolbar} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const DRAWER_WIDTH = 240;

const NAVIGATION_ITEMS = ['Brand', 'Fuel', 'Category', 'Model', 'Car'];
type NavigationItemType = (typeof NAVIGATION_ITEMS)[number];

const NAVIGATION_PATHS: Record<NavigationItemType, string> = {
  Brand: '/admin/brand',
  Fuel: '/admin/fuel',
  Category: '/admin/category',
  Model: '/admin/model',
  Car: '/admin/car',
};

export default function NavigationBar() {
  const navigate = useNavigate();
  const onNavigationItem = (itemName: NavigationItemType) => {
    const path = NAVIGATION_PATHS[itemName];
    if (path) {
      navigate(path);
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
        {NAVIGATION_ITEMS.map((item) => (
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
