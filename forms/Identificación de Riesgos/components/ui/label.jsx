// components/ui/label.jsx
import * as React from "react";

export function Label({ children, ...props }) {
  return (
    <label className="block text-sm font-medium text-gray-700 mb-1" {...props}>
      {children}
    </label>
  );
}