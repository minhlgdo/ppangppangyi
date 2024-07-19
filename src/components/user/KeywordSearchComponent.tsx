import {Button, Stack, TextField, Typography} from '@mui/material';
import {SearchKeywordTypes} from '@src/common/constants.ts';
import {useSearchInputValues} from '@src/context/SearchContext.tsx';
import SearchIcon from '@mui/icons-material/Search';

interface KeywordSearchComponentProps {
  handleButtonClick: () => void;
}

export default function KeywordSearchComponent({handleButtonClick}: KeywordSearchComponentProps) {
  const options = Object.entries(SearchKeywordTypes);
  const {searchInput, setSearchInput} = useSearchInputValues();

  const handleInputChange = (name: string, value: string) => {
    setSearchInput({...searchInput, [name]: value});
  };

  return (
    <Stack
      direction={'row'}
      gap={6}
    >
      <Stack
        direction={'row'}
        gap={4}
      >
        {options.map(([key, type]) => (
          <Stack
            key={key}
            direction={'row'}
            gap={2}
            alignItems={'center'}
          >
            <Typography>{key}</Typography>
            <TextField
              variant={'filled'}
              label={key}
              onChange={(e) => handleInputChange(type, e.target.value)}
            />
          </Stack>
        ))}
      </Stack>
      <Button
        variant={'contained'}
        sx={{margin: '10'}}
        endIcon={<SearchIcon />}
        onClick={handleButtonClick}
      >
        검색
      </Button>
    </Stack>
  );
}
