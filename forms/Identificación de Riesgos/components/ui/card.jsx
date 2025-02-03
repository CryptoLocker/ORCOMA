// components/ui/card.jsx
import * as React from "react";

export function Card({ children, ...props }) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden" {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, ...props }) {
  return (
    <div className="p-4 bg-gray-50 border-b border-gray-200" {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, ...props }) {
  return (
    <h3 className="text-lg font-semibold text-gray-800" {...props}>
      {children}
    </h3>
  );
}

export function CardContent({ children, ...props }) {
  return (
    <div className="p-4" {...props}>
      {children}
    </div>
  );
}