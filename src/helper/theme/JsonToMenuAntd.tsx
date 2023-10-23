import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

const convertMenu = (menu: any, pathName: string, router: any) => {
  let keyCounter = 0;
  const newSelectKey: Array<string> = [];
  let newOpenKey: Array<string> = [];

  function convertItem(item: any) {
    const key = keyCounter++;
    const newItem: any = {
      key: key.toString(),
      icon: <Icon icon={item.icon} />,
      label: item.label,
      onClick: () => {
        if (!item.children) {
          router.push(item.route);
        }
      },
    };

    if (item.children) {
      newItem.children = item.children.map(convertItem);
    } else {
      if (pathName == item.route) {
        newSelectKey.push(key.toString());
      }
    }

    return newItem;
  }

  return {
    menu: menu.map(convertItem),
    selectKey: newSelectKey,
    openKey: newOpenKey,
  };
};
export default convertMenu;
