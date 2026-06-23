function SearchBox({ value, onChange }) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search employee by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBox;
