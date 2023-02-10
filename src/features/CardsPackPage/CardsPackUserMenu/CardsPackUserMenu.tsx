import React, { memo, useState } from "react";
import s from "./cards-pack-user-menu.module.scss";
import { DeletePackListModal } from "../../PackListPage/Table/PacksListTable/DeletePackListModal/DeletePackListModal";
import { UpdatePackListModal } from "../../PackListPage/Table/PacksListTable/UpdatePackListModal/UpdatePackListModal";
import { LearnBtnPacksListTable } from "../../PackListPage/Table/PacksListTable/LearnBtnPacksListTable/LearnBtnPacksListTablePropsType";
import { Navigate, useParams } from "react-router-dom";
import { PATH } from "../../../enums/enum-route";

type CardsPackUserMenuPropsType = {
  packName: string;
  cardsCount: number;
};

export const CardsPackUserMenu: React.FC<CardsPackUserMenuPropsType> = memo(
  (props) => {
    const { packName, cardsCount } = props;
    const { cardsPack_id } = useParams();
    const [successDelete, setSuccessDelete] = useState<boolean>(false);

    if (successDelete) return <Navigate to={PATH.PACK_LIST} />;

    return (
      <div className={s.menu}>
        <div className={s.corner}></div>
        <div className={s.menuList}>
          <LearnBtnPacksListTable
            cards_packId={cardsPack_id}
            cardsCount={cardsCount}
          />
          <UpdatePackListModal
            packId={cardsPack_id}
            packName={packName}
            privatePack={false}
          />
          <DeletePackListModal
            packId={cardsPack_id}
            packName={packName}
            callBack={setSuccessDelete}
          />
        </div>
      </div>
    );
  }
);
