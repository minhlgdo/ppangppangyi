import {AdminPageType, AdminPageTypes, SubjectType} from '@src/common/constants.ts';
import {Button, Stack, Typography} from '@mui/material';
import React from 'react';

interface PageHeaderProps {
  subject: SubjectType;
  onCreateClick?: () => void;
  pageType: AdminPageType;
}

export function PageHeader({subject, onCreateClick, pageType}: PageHeaderProps) {
  if (pageType === AdminPageTypes.General) {
    return (
      <Stack
        direction={'row'}
        spacing={4}
      >
        <Typography variant={'h4'}>{subject}</Typography>
        <Button
          variant={'contained'}
          onClick={onCreateClick}
        >
          추가
        </Button>
      </Stack>
    );
  } else {
    return (
      <Typography variant={'h4'}>
        {subject} {pageType}
      </Typography>
    );
  }
}
