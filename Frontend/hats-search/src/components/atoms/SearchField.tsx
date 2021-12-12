import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useNavigate } from "react-router";
import { SEARCH_SUGGESTIONS } from "../../constants";
import { ISearchField } from "../../interfaces/interface";

const SearchField = (props: ISearchField) => {
  const [query, setQuery] = React.useState("");
  const { value, handleChange } = props;
  const navigate = useNavigate();

  return (
    <Autocomplete
      freeSolo
      onChange={(event, newValue) => handleChange(event, newValue)}
      disableClearable
      options={props.options || SEARCH_SUGGESTIONS}
      renderInput={(params) => (
        <TextField
          {...params}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              navigate(`/search?q=${query}`);
            }
          }}
          value={query}
          onChange={(event) => {
            handleChange(event, event.target.value);
            setQuery(event.target.value);
          }}
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
