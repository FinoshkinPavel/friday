import React, { memo } from "react";
import { MenuItem, Select } from "@mui/material";

type SelectorPropsType = {
  pageCount?: number;
  setPageCount: (value: number) => void;
  itemsCount: Array<number>;
};

export const Selector: React.FC<SelectorPropsType> = memo(
  ({ pageCount, setPageCount, itemsCount }) => {
    return (
      <Select
        sx={{ height: 25 }}
        size={"small"}
        value={pageCount}
        onChange={(e) => {
          setPageCount(e.target.value as number);
        }}
      >
        <MenuItem value={itemsCount[0]}>{itemsCount[0]}</MenuItem>
        <MenuItem value={itemsCount[1]}>{itemsCount[1]}</MenuItem>
        <MenuItem value={itemsCount[2]}>{itemsCount[2]}</MenuItem>
      </Select>
    );
  }
);
