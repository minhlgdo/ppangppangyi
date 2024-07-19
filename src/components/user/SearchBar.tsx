import {InputAdornment, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {FormEvent, useState} from 'react';

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const onClickSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(searchQuery);
    // should direct to the search result page
  };

  return (
    <form
      style={{display: 'flex', alignItems: 'center'}}
      onSubmit={onClickSearch}
    >
      <TextField
        id="search-bar"
        className={'text'}
        onChange={(val) => setSearchQuery(val.target.value)}
        placeholder={'검색어를 입력해주세요.'}
        variant={'outlined'}
        color={'info'}
        sx={{width: 350}}
        InputProps={{
          endAdornment: (
            <InputAdornment position={'end'}>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}

export default SearchBar;
