"use client";

import { ReactNode } from "react";

interface SelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}

export default function Select({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  className = "",
}: SelectProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-2">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-bg-surface border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-200 appearance-none cursor-pointer"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface TextareaProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  error?: string;
  className?: string;
}

export function Textarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  error,
  className = "",
}: TextareaProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-2">
          {label}
        </label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full bg-bg-surface border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-200 resize-none ${
          error ? "border-error" : ""
        }`}
      />
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  );
}
