import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";
type Props = {
  selectKey: Array<string>;
  openKey: Array<string>;
  item: ItemType<MenuItemType>[] | undefined;
};
function VerticalMenu({ selectKey, item, openKey }: Props) {
  return (
    <div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={selectKey}
        defaultOpenKeys={openKey}
        items={item}
      />
    </div>
  );
}

export default VerticalMenu;
