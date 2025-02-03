// components/ui/checkbox.jsx
import * as React from "react";

export function Checkbox({ ...props }) {
  return (
    <input
      type="checkbox"
      className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
      {...props}
    />
  );
}