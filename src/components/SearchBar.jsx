import React, { useState } from 'react';
import { LuSearch } from 'react-icons/lu';

export default function SearchBar({ setLocation }) {
  const [input, setInput] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (input.trim()) setLocation(input.trim());
  };
  return (
    <form onSubmit={submit} className="glass !rounded-full flex items-center gap-2 pl-5 pr-2 py-2 mb-6">
      <LuSearch className="text-xl opacity-70" />
      <input
        className="flex-1 bg-transparent outline-none placeholder-white/60 py-1"
        placeholder="Search for a city..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="px-5 py-2 rounded-full bg-white text-slate-900 font-medium hover:bg-white/90 transition">
        Search
      </button>
    </form>
  );
}
