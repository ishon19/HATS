import { Autocomplete, TextField } from "@mui/material";
import { SEARCH_SUGGESTIONS } from "../../constants";
import { ISearchField } from "../../interfaces/interface";

const SearchField = (props: ISearchField) => {
  const { value, handleChange } = props;

  return (
    <Autocomplete
      freeSolo
      onChange={(event, newValue) => handleChange(event, newValue)}
      disableClearable
      options={props.options || SEARCH_SUGGESTIONS}
      renderInput={(params) => (
        <TextField
          {...params}
          value={value}
          onChange={(event) => handleChange(event, event.target.value)}
          variant="filled"
          fullWidth
          size="small"
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
    />
  );
};

export default SearchField;
