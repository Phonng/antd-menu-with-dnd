import React, { useId } from "react";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

import { Menu } from "antd";

// submenu keys of first level

const AntdMenu = ({ items }) => {
  const id = useId();
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <Menu
        ref={setNodeRef}
        mode="inline"
        style={{ width: 256, border: "none" }}
        items={items}
      />
    </SortableContext>
  );
};

export default AntdMenu;
