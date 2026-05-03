export default function SessionFilters({ filters, onChange }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        flexWrap: "wrap",
        marginBottom: 24,
        alignItems: "flex-end",
      }}>
      <div>
        <label
          style={{
            display: "block",
            fontSize: 12,
            color: "#888",
            marginBottom: 4,
          }}>
          Dal
        </label>
        <input
          type="date"
          value={filters.from}
          onChange={(e) => onChange({ ...filters, from: e.target.value })}
        />
      </div>
      <div>
        <label
          style={{
            display: "block",
            fontSize: 12,
            color: "#888",
            marginBottom: 4,
          }}>
          Al
        </label>
        <input
          type="date"
          value={filters.to}
          onChange={(e) => onChange({ ...filters, to: e.target.value })}
        />
      </div>
      <div>
        <label
          style={{
            display: "block",
            fontSize: 12,
            color: "#888",
            marginBottom: 4,
          }}>
          Kcal minime
        </label>
        <input
          type="number"
          placeholder="es. 200"
          value={filters.minKcal}
          onChange={(e) => onChange({ ...filters, minKcal: e.target.value })}
          style={{ width: 100 }}
        />
      </div>
      <button onClick={() => onChange({ from: "", to: "", minKcal: "" })}>
        Reset filtri
      </button>
    </div>
  );
}
