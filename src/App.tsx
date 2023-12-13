import { Button } from "antd";

import { useState } from "react";
import SortableDropDownMenu from "./components/dropdownDnD";

const initialItems = [
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
  const [value, setValue] = useState<string[]>(initialItems);
  const handleChange = (newItems: string[]) => {
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
