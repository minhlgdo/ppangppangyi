import {Box, Button, Stack, Typography} from '@mui/material';
import {useState} from 'react';

const parentCategories = ['경형', '대형', '소형', '스포츠카', '준대형', '준중형', '중형'];
const subCategories = [
  {parent: '경형', subs: ['RV', 'SUV', '벤', '세단', '왜건', '컨버티블', '트럭', '해치백']},
  {parent: '대형', subs: ['RV', 'SUV', '밴', '세단', '왜건', '컨버터블', '쿠페', '트럭']},
  {parent: '소형', subs: ['RV', 'SUV', '밴', '세단', '왜건', '컨버터블', '쿠페', '트럭', '해치백']},
  {parent: '스포츠카', subs: ['스포츠카', '왜건', '컨버터블', '쿠페', '해치백']},
  {parent: '준대형', subs: ['RV', 'SUV', '세단', '왜건', '컨버터블', '쿠페', '트럭', '해치백']},
  {parent: '준중형', subs: ['RV', 'SUV', '밴', '세단', '왜건', '컨버터블', '쿠페', '트럭', '해치백']},
  {parent: '중형', subs: ['RV', 'SUV', '밴', '세단', '왜건', '컨버터블', '쿠페', '트럭', '해치백']},
];

const Filter = () => {
  const [parentCategory, setParentCategory] = useState('경형');
  const [childCategory, setChildCategory] = useState('');
  const onParentCategoryChange = (category: string) => {
    setParentCategory(category);
    setChildCategory('');
  };
  const childCategories = subCategories.find((sub) => sub.parent === parentCategory)?.subs || [];

  return (
    <Box>
      {/*Parent Category*/}
      <Stack
        direction={'row'}
        spacing={4}
        style={{alignItems: 'center'}}
      >
        <Typography
          color={'inherit'}
          sx={{fontWeight: 'bold'}}
        >
          차종
        </Typography>
        <Stack
          direction={'row'}
          spacing={2}
        >
          {parentCategories.map((category) => (
            <Button
              key={category}
              color={parentCategory === category ? 'primary' : 'inherit'}
              variant={parentCategory === category ? 'contained' : 'text'}
              onClick={() => onParentCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </Stack>
      </Stack>
      {/*Sub category*/}
      <Stack
        direction={'row'}
        spacing={4}
        style={{alignItems: 'center', marginTop: 4}}
      >
        <Typography
          color={'inherit'}
          sx={{fontWeight: 'bold'}}
        >
          분류
        </Typography>
        <Stack
          direction={'row'}
          spacing={2}
        >
          {childCategories.map((category) => (
            <Button
              key={category}
              color={childCategory === category ? 'primary' : 'inherit'}
              variant={childCategory === category ? 'contained' : 'text'}
              onClick={() => setChildCategory(category)}
            >
              {category}
            </Button>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Filter;
