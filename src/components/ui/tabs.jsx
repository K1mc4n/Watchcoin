import React, { useState } from "react";

export function Tabs({ defaultValue, children }) {
  const [value, setValue] = useState(defaultValue);
  return React.Children.map(children, child =>
    React.cloneElement(child, { value, setValue })
  );
}

export function TabsList({ children }) {
  return <div className="flex space-x-2 my-4">{children}</div>;
}

export function TabsTrigger({ value: tab, value: currentValue, setValue, children }) {
  const active = currentValue === tab;
  return (
    <button
      onClick={() => setValue(tab)}
      className={`px-4 py-2 rounded ${active ? "bg-black text-white" : "bg-gray-100"}`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }) {
  return <div>{children}</div>;
}
