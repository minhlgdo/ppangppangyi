import {AdminPageTypes} from '@src/common/constants.ts';
import {Button, Stack, Typography} from '@mui/material';
import React from 'react';

interface PageHeaderProps {
  text?: string;
  onCreateClick?: () => void;
  pageType: AdminPageTypes;
}

export function PageHeader({text, onCreateClick, pageType}: PageHeaderProps) {
  if (pageType === AdminPageTypes.General) {
    return (
      <Stack
        direction={'row'}
        spacing={4}
      >
        <Typography variant={'h4'}>{text}</Typography>
        <Button
          variant={'contained'}
          onClick={onCreateClick}
        >
          추가
        </Button>
      </Stack>
    );
  } else {
    return <Typography variant={'h4'}>{pageType}</Typography>;
  }
}
