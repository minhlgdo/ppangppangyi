import {Divider, Drawer, List, ListItemButton, ListItemText, Toolbar} from '@mui/material';
import {NavLink} from 'react-router-dom';
import {BRAND_MAIN_PATH, CAR_MAIN_PATH, CATEGORY_MAIN_PATH, FUEL_MAIN_PATH, MODEL_MAIN_PATH} from '@src/common/navigation.ts';

const DRAWER_WIDTH = 240;

const NAVIGATION_ITEMS = ['Brand', 'Fuel', 'Category', 'Model', 'Car'];
type NavigationItemType = (typeof NAVIGATION_ITEMS)[number];

const NAVIGATION_PATHS: Record<NavigationItemType, string> = {
  Brand: BRAND_MAIN_PATH,
  Fuel: FUEL_MAIN_PATH,
  Category: CATEGORY_MAIN_PATH,
  Model: MODEL_MAIN_PATH,
  Car: CAR_MAIN_PATH,
};

export default function NavigationBar() {
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
          <ListItemButton
            key={item}
            component={NavLink}
            to={NAVIGATION_PATHS[item]}
            sx={{'&.active': {background: 'lightgrey'}}}
          >
            <ListItemText primary={item} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
