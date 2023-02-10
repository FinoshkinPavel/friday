import * as React from "react";
import { ReactNode } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import s from "./modal.module.scss";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import { CloseModalBtn } from "./CloseModalBtn/CloseModalBtn";
import { UniversalIconBtn } from "../UniversalIconBtn/UniversalIconBtn";

type BasicModalPropsType = {
  children: ReactNode;
  titleBtn?: string;
  titleHeader: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  icon?: OverridableComponent<SvgIconTypeMap>;
};

export const BasicModal: React.FC<BasicModalPropsType> = (props) => {
  const { titleBtn, titleHeader, children, icon, setOpen, open } = props;

  const openCloseHandler = () => {
    setOpen(!open);
  };

  return (
    <div style={{ display: "inline-block" }}>
      {icon ? (
        <UniversalIconBtn icon={icon} callback={openCloseHandler} />
      ) : (
        <Button
          variant="outlined"
          color="inherit"
          size={"small"}
          onClick={openCloseHandler}
        >
          {titleBtn}
        </Button>
      )}

      <Modal open={open} onClose={openCloseHandler}>
        <Box className={s.modalWrap}>
          <div className={s.headerModal}>
            <h2 className={s.headerTitle}>{titleHeader}</h2>
            <CloseModalBtn value={open} callBack={openCloseHandler} />
          </div>
          {children}
        </Box>
      </Modal>
    </div>
  );
};
