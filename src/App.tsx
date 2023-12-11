import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { MenuProps } from "antd";
import { Menu as AntdMenu, Button, Dropdown } from "antd";

import {
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
type MenuItem = Required<MenuProps>["items"][number];
// const SortableItem = ({ id, children }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({
//       id,
//     });

//   const itemStyle = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <div style={itemStyle} ref={setNodeRef} {...attributes} {...listeners}>
//       {children}
//     </div>
//   );
// };
const SortableItem = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const itemStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: 110,
    height: 30,
    display: "flex",
    alignItems: "center",
    paddingLeft: 5,
    border: "1px solid gray",
    borderRadius: 5,
    marginBottom: 5,
    userSelect: "none",
    cursor: "grab",
    boxSizing: "border-box",
  };
  return (
    <div style={itemStyle} ref={setNodeRef} {...attributes} {...listeners}>
      Item {props.id}
    </div>
  );
};

const items2: MenuItem[] = [
  {
    label: (
      <SortableItem id="mail" key="mail">
        Navigation 1
      </SortableItem>
    ),
    key: "mail",
  },
  {
    label: (
      <SortableItem id="mail1" key="mail1">
        Navigation 2
      </SortableItem>
    ),
    key: "app1",
  },
  {
    label: (
      <SortableItem id="mail2" key="mail2">
        Navigation 3
      </SortableItem>
    ),
    key: "mail1",
  },
  {
    label: (
      <SortableItem id="mail3" key="mail3">
        Navigation 4
      </SortableItem>
    ),
    key: "app",
  },
];
const Menu = ({ items }) => {
  const id = "menu2";
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <div ref={setNodeRef}>
        <Dropdown menu={{ items: items2 }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Button>Click me</Button>
          </a>
        </Dropdown>
      </div>
    </SortableContext>
  );
};
function App() {
  const [items, setItems] = useState({
    group1: ["mail", "mail1", "mail2", "mail3"],
  });
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const handleDragEnd = ({ active, over }) => {
    console.log(123123, { active, over });
  };
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div style={containerStyle}>
        <Menu items={items.group1} />
      </div>
    </DndContext>
  );
}

export default App;
