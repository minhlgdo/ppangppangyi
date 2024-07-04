import {Box, Button, Typography} from '@mui/material';
import {useRouteError} from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
        height: '100vh',
        padding: '20px',
      }}
      sx={{gap: 2}}
    >
      <Typography variant={'h3'}>페이지를 찾을 수 없습니다.</Typography>
      <Typography variant={'body1'}>주소를 잘못 입력했거나 페이지가 이동했을 수 있습니다.</Typography>
      <Box sx={{margin: 1}} />
      <Button
        href={'/'}
        target={'_self'}
        size={'large'}
        variant={'contained'}
      >
        홈으로
      </Button>
    </Box>
  );
}
