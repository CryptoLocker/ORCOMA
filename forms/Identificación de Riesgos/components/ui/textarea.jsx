// components/ui/textarea.jsx
import * as React from "react";

export function Textarea({ ...props }) {
  return (
    <textarea
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      rows="4"
      {...props}
    />
  );
}