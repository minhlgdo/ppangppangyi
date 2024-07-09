import {AdminPageTypes} from '@src/common/common.ts';
import {Button, Stack, Typography} from '@mui/material';
import React, {FC} from 'react';

interface PageHeaderProps {
  text?: string;
  onCreateClick?: () => void;
  pageType: string;
}

export const PageHeader: FC<PageHeaderProps> = ({text, onCreateClick, pageType}) => {
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
};
