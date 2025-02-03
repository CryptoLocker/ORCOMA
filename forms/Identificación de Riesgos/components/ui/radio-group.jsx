// components/ui/radio-group.jsx
import * as React from "react";

export function RadioGroup({ children, ...props }) {
  return (
    <div role="radiogroup" {...props}>
      {children}
    </div>
  );
}

export function RadioGroupItem({ children, ...props }) {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        className="rounded-full border-gray-300 text-blue-500 focus:ring-blue-500"
        {...props}
      />
      <label className="text-sm text-gray-700">{children}</label>
    </div>
  );
}