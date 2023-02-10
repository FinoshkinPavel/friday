import * as React from "react";
import { memo } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type QuestionSelectorPropsType = {
  variant: string;
  setVariant: (value: string) => void;
};

export const QuestionSelect: React.FC<QuestionSelectorPropsType> = memo(
  ({ variant, setVariant }) => {
    const handleChange = (event: SelectChangeEvent) => {
      setVariant(event.target.value);
    };

    return (
      <Box sx={{ width: "80%" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Choose a question format
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={variant}
            label="Question variant"
            variant="standard"
            size="small"
            onChange={handleChange}
          >
            <MenuItem value={"text"}>text</MenuItem>
            <MenuItem value={"pictures"}>pictures</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  }
);
