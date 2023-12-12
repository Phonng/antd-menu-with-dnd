import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { MenuProps } from "antd";
import { Button } from "antd";

import { useState } from "react";
import SortableDropDownMenu from "./components/dropdownDnD";
type MenuItem = Required<MenuProps>["items"][number];

const initialItems: MenuItem[] = [
  {
    label: " Navigation 1",
    key: "mail",
  },
  {
    label: " Navigation 2",
    key: "mail1",
  },
  {
    label: " Navigation 3",
    key: "mail2",
  },
  {
    label: " Navigation 4",
    key: "mail3",
  },
];

function App() {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
  };
  const [value, setValue] = useState<MenuItem[]>(initialItems);
  const handleChange = (newItems: MenuItem[]) => {
    setValue(newItems);
  };

  return (
    <div style={containerStyle}>
      <SortableDropDownMenu value={value} onChange={handleChange}>
        <a onClick={(e) => e.preventDefault()}>
          <Button>Click me</Button>
        </a>
      </SortableDropDownMenu>
    </div>
  );
}

export default App;
