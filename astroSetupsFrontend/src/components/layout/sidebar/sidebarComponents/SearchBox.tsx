interface Props {
  value: string;
  onChange: (term: string) => void;
}

export default function SearchBox({ value, onChange }: Props) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-dark-text mb-3">Buscar productos</h3>
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar por nombre o marca..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 bg-dark-card border border-dark-border rounded-lg text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-[#FB5607] focus:border-transparent"
        />
        <svg className="absolute right-3 top-2.5 w-4 h-4 text-dark-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
}