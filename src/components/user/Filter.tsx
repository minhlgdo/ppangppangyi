import {Box, Button, Stack, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useSearchCategory} from '@src/context/HomeContext.tsx';
import {useSuspenseQuery} from '@tanstack/react-query';
import {getAllCategories, getParentCategories} from '@src/api/admin-api.ts';

function Filter() {
  const {setSearchCategory} = useSearchCategory();

  // TODO: Load the actual parent categories
  const {data: parentCategories, isError: parentsError} = useSuspenseQuery({
    queryKey: ['parent-categories'],
    queryFn: () => getParentCategories(),
  });

  // TODO: Load all categories
  const {data: allCategories, isError: childsError} = useSuspenseQuery({
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
              key={category.categoryId}
              {...getButtonProps(parentCategoryId!, category.categoryId!)}
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
              {...getButtonProps(childCategoryId, category.categoryId!)}
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
