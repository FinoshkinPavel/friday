import React from "react";
import s from "./header-packs-list.module.scss";
import { AddPackListModal } from "./AddNewPackModal/AddPackListModal";

export const HeaderPacksList = () => {
  return (
    <div className={s.header}>
      <h3>Packs list</h3>
      <AddPackListModal />
    </div>
  );
};
