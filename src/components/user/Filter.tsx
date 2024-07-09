import {Box, Button, Stack, Typography} from '@mui/material';
import React, {useState} from 'react';
import {useHome} from '@src/context/HomeContext.tsx';

const parentCategories = ['경형', '대형', '소형', '스포츠카', '준대형', '준중형', '중형'];
const subCategories = [
  {parent: '경형', subs: ['전체', 'RV', 'SUV', '벤', '세단', '왜건', '컨버티블', '트럭', '해치백']},
  {parent: '대형', subs: ['전체', 'RV', 'SUV', '밴', '세단', '왜건', '컨버터블', '쿠페', '트럭']},
  {parent: '소형', subs: ['전체', 'RV', 'SUV', '밴', '세단', '왜건', '컨버터블', '쿠페', '트럭', '해치백']},
  {parent: '스포츠카', subs: ['전체', '스포츠카', '왜건', '컨버터블', '쿠페', '해치백']},
  {parent: '준대형', subs: ['전체', 'RV', 'SUV', '세단', '왜건', '컨버터블', '쿠페', '트럭', '해치백']},
  {parent: '준중형', subs: ['전체', 'RV', 'SUV', '밴', '세단', '왜건', '컨버터블', '쿠페', '트럭', '해치백']},
  {parent: '중형', subs: ['전체', 'RV', 'SUV', '밴', '세단', '왜건', '컨버터블', '쿠페', '트럭', '해치백']},
];

const Filter = () => {
  const {setSearchCategory} = useHome();
  const [parentCategory, setParentCategory] = useState(subCategories[0].parent);
  const [childCategory, setChildCategory] = useState('전체');

  const onParentCategoryChange = (category: string) => {
    setParentCategory(category);
    setChildCategory('전체');
    setSearchCategory(category);
  };
  const childCategories = subCategories.find((sub) => sub.parent === parentCategory)?.subs || [];

  const onChildCategoryChange = (category: string) => {
    setChildCategory(category);
    const keyword = category === '전체' ? parentCategory : parentCategory + ' ' + category;
    setSearchCategory(keyword);
  };

  const getButtonProps = (selectedCategory: string, category: string) => ({
    color: selectedCategory === category ? 'primary' : 'inherit',
    variant: selectedCategory === category ? 'contained' : 'text',
  });

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
              {...getButtonProps(parentCategory, category)}
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
              {...getButtonProps(childCategory, category)}
              onClick={() => onChildCategoryChange(category)}
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
