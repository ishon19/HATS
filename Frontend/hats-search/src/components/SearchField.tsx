import { Autocomplete, TextField } from "@mui/material";
import { ISearchField } from "../interfaces/interface";

const SearchField = (props: ISearchField) => {
  const { value, handleChange } = props;

  return (
    <Autocomplete
      freeSolo
      onChange={(event, newValue) => handleChange(event, newValue)}
      disableClearable
      options={["Test", "covid", "india"]}
      renderInput={(params) => (
        <TextField
          {...params}
          value={value}
          onChange={(event) => handleChange(event, event.target.value)}
          variant="filled"
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
