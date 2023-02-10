import React from "react";
import s from "./pagination-width-selector.module.scss";
import { Pagination } from "@mui/material";
import { Selector } from "../Selector/Selector";

type PaginationWidthSelectorPropsType = {
  totalPages: number;
  page: number;
  setPage: (value: number) => void;
  pageCount: number;
  setPageCount: (value: number) => void;
};

export const PaginationWidthSelector: React.FC<
  PaginationWidthSelectorPropsType
> = (props) => {
  const { page, totalPages, pageCount, setPage, setPageCount } = props;

  return (
    <div className={s.pagination}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, num) => {
          setPage(num);
        }}
        showFirstButton
        showLastButton
      />
      <span style={{ marginRight: "10px" }}>Show</span>
      <Selector
        pageCount={pageCount}
        itemsCount={[4, 8, 16]}
        setPageCount={setPageCount}
      />
      <span style={{ marginLeft: "10px" }}>Cards per Page</span>
    </div>
  );
};
