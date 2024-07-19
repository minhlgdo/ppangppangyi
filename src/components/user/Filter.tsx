import {Box, Button, Stack, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useSearchCategory} from '@src/context/HomeContext.tsx';
import {useSuspenseQuery} from '@tanstack/react-query';
import {getAllCategories, getParentCategories} from '@src/api/admin-api.ts';

function Filter() {
  const {setSearchCategory} = useSearchCategory();

  // TODO: Load the actual parent categories
  const {data: parentCategories} = useSuspenseQuery({
    queryKey: ['parent-categories'],
    queryFn: () => getParentCategories(),
  });

  // TODO: Load all categories
  const {data: allCategories} = useSuspenseQuery({
    queryKey: ['all-categories'],
    queryFn: () => getAllCategories(),
  });

  const [parentCategoryId, setParentCategoryId] = useState(parentCategories[0]?.categoryId);
  const [childCategoryId, setChildCategoryId] = useState('');

  useEffect(() => {
    if (parentCategoryId) {
      const firstChildCategory = allCategories.find((cat) => cat.parentCategoryId === parentCategoryId)?.categoryId || '';
      setChildCategoryId(firstChildCategory);
      setSearchCategory(firstChildCategory);
    }
    // eslint-disable-next-line
  }, []);

  const onParentCategoryChange = (category: string) => {
    setParentCategoryId(category);
    const firstCategory = allCategories.find((cat) => cat.parentCategoryId === category)?.categoryId || '';
    setChildCategoryId(firstCategory);
    setSearchCategory(firstCategory);
  };

  const childCategories = allCategories.filter((cat) => cat.parentCategoryId === parentCategoryId);

  const onChildCategoryChange = (categoryId: string) => {
    setChildCategoryId(categoryId);
    setSearchCategory(categoryId);
  };

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
              key={category.categoryId}
              color={parentCategoryId! === category.categoryId! ? 'primary' : 'inherit'}
              variant={parentCategoryId! === category.categoryId! ? 'contained' : 'text'}
              onClick={() => onParentCategoryChange(category.categoryId!)}
            >
              {category.categoryName}
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
          {childCategories?.map((category) => (
            <Button
              key={category.categoryId}
              color={childCategoryId === category.categoryId! ? 'primary' : 'inherit'}
              variant={childCategoryId === category.categoryId! ? 'contained' : 'text'}
              onClick={() => onChildCategoryChange(category.categoryId!)}
            >
              {category.categoryName}
            </Button>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}

export default Filter;
