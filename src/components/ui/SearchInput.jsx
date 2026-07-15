"use client";

import { Search } from "lucide-react";

export function SearchInput({ value, onChange, placeholder = "Search...", className = "" }) {
  return (
    <div className={`search-wrap ${className}`}>
      <Search size={16} className="search-icon" />
      <input
        type="text"
        className="form-control search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={placeholder}
      />
    </div>
  );
}
