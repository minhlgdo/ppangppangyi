import {Box, Button, Stack, Typography} from '@mui/material';
import {useState} from 'react';
import BrandList from '../../components/admin/BrandList.tsx';

export default function BrandPage() {
  const [totalItems, setTotalItems] = useState(0);
  const [brandList, setBrandList] = useState([{brandId: 1, brandName: 'Kia'}]);

  return (
    <Box sx={{m: 4, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 4}}>
      {/*Header*/}
      <Stack
        direction={'row'}
        spacing={6}
      >
        <Typography variant={'h4'}>Brand</Typography>
        <Button variant={'contained'}>추가</Button>
      </Stack>
      <Typography>Total: {totalItems} brands</Typography>
      <BrandList brands={brandList} />
    </Box>
  );
}
