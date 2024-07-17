import {ReactElement, ReactNode} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {Box, Button, Typography} from '@mui/material';
import {QueryErrorResetBoundary} from '@tanstack/react-query';

interface ErrorBoundaryWrapperProps {
  children: ReactNode;
}

export default function ErrorBoundaryWrapper({children}: ErrorBoundaryWrapperProps): ReactElement {
  return (
    <QueryErrorResetBoundary>
      {({reset}) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({resetErrorBoundary}) => (
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
              sx={{gap: 4}}
            >
              <Typography variant={'h5'}>데이터 조회가 실패합니다.</Typography>
              <Button
                variant={'contained'}
                onClick={() => resetErrorBoundary()}
                size={'large'}
              >
                다시 시도하기
              </Button>
            </Box>
          )}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
