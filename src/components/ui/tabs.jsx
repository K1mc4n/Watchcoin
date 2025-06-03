import React, { useState } from 'react';

export function Tabs({ defaultValue, children }) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <div>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, { activeTab, setActiveTab });
      })}
    </div>
  );
}

export function TabsList({ children }) {
  return <div className="flex space-x-2 mb-4">{children}</div>;
}

export function TabsTrigger({ value, children, activeTab, setActiveTab }) {
  const isActive = activeTab === value;
  return (
    <button
      className={`px-4 py-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, activeTab }) {
  if (value !== activeTab) return null;
  return <div>{children}</div>;
}
