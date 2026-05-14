import { useState } from 'react';
import { Search } from 'lucide-react';

export function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(`Searching for: ${query}`); // Placeholder for future implementation
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center bg-gray-700 rounded-md px-2 py-1 border border-white hover:border-silver"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar productos..."
        className="bg-transparent text-white placeholder-gray-400 focus:outline-none px-2"
      />
      <button type="submit" className="text-orange-500 hover:text-orange-400">
        <Search className="w-5 h-5" />
      </button>
    </form>
  );
}