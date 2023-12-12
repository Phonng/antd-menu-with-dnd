import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";

import {
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { arrayMove, insertAtIndex, removeAtIndex } from "./utils/array";
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
const moveBetweenContainers = (
  items,
  activeContainer,
  activeIndex,
  overContainer,
  overIndex,
  item
) => {
  return {
    ...items,
    [overContainer]: insertAtIndex(items[overContainer], overIndex, item),
  };
};
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
const initialSortItemKeys: string[] = ["mail", "mail1", "mail2", "mail3"];

const initialItems: MenuItem[] = [
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
    key: "mail1",
  },
  {
    label: (
      <SortableItem id="mail2" key="mail2">
        Navigation 3
      </SortableItem>
    ),
    key: "mail2",
  },
  {
    label: (
      <SortableItem id="mail3" key="mail3">
        Navigation 4
      </SortableItem>
    ),
    key: "mail3",
  },
];
const Menu = ({ items, sortItemKeys }) => {
  const id = "menu2";
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext
      id={id}
      items={sortItemKeys}
      strategy={rectSortingStrategy}
    >
      <div ref={setNodeRef}>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Button>Click me</Button>
          </a>
        </Dropdown>
      </div>
    </SortableContext>
  );
};
function App() {
  const [sortItemKeys, setSortItemKeys] = useState(initialSortItemKeys);
  const [items, setItems] = useState(initialItems);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current?.sortable.index || 0;
      const newSortedItems = arrayMove(sortItemKeys, activeIndex, overIndex);
      setSortItemKeys(newSortedItems);
      setItems((items) => {
        const newItems = newSortedItems.map((value) =>
          items.find((obj) => obj.key === value)
        );
        return newItems;
      });
    }
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
        <Menu items={items} sortItemKeys={sortItemKeys} />
      </div>
    </DndContext>
  );
}

export default App;
