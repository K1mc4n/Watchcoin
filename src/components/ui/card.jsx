// src/components/ui/card.jsx
import React from 'react';

export function Card({ children, ...props }) {
  return (
    <div className="bg-white shadow rounded" {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, ...props }) {
  return (
    <div className="p-4" {...props}>
      {children}
    </div>
  );
}
