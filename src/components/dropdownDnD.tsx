import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Dropdown } from "antd";
import { useState } from "react";

type MenuItem = Required<MenuProps>["items"][number];

const SortableItem = ({ id, item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const itemStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div style={itemStyle} ref={setNodeRef} {...attributes} {...listeners}>
      {item}
    </div>
  );
};

const useSortableMenu = ({
  value,
  onChange,
}: {
  value: MenuItem[];
  onChange: () => void;
}) => {
  const formatValue = (value || []).map((item) => ({
    label: <SortableItem id={item.key} key={item.key} item={item.label} />,
    key: item.key,
  }));

  const [sortItemKeys, setSortItemKeys] = useState(
    value.map((item) => item.key)
  );
  // const sortItemKeys = value.map((item) => item.key);
  // const items = formatValue;
  const [items, setItems] = useState(formatValue);

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
      const newItems = newSortedItems.map((value) =>
        items.find((obj) => obj.key === value)
      );
      onChange(newItems);
      setSortItemKeys(newSortedItems);
      setItems(newItems);
    }
  };

  return {
    sortItemKeys,
    items,
    sensors,
    handleDragEnd,
  };
};

const SortableDropDownMenu = ({
  value,
  onChange,
  children,
}: {
  children: React.ReactNode;
  onChange: () => void;
  children: ReactNode;
}) => {
  const { sortItemKeys, items, sensors, handleDragEnd } = useSortableMenu({
    value,
    onChange,
  });

  const id = "menu2";
  const { setNodeRef } = useDroppable({ id });

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext
        id={id}
        items={sortItemKeys}
        strategy={rectSortingStrategy}
      >
        <div ref={setNodeRef}>
          <Dropdown menu={{ items }} trigger={["click"]}>
            {children}
          </Dropdown>
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default SortableDropDownMenu;
