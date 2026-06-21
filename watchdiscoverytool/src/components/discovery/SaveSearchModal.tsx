import { useState } from "react";
import type { DiscoveryState } from "../../types/savedSearch";

type Props = {
  discoveryState: DiscoveryState;
  onSave: (input: { name: string; description?: string }) => void;
  onClose: () => void;
};

export default function SaveSearchModal({
  discoveryState,
  onSave,
  onClose,
}: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    onSave({
      name: trimmedName,
      description: description.trim() || undefined,
    });
  };

  const { filters } = discoveryState;
  const summaryParts = [
    discoveryState.searchQuery
      ? `Search: "${discoveryState.searchQuery}"`
      : null,
    filters.maxPrice ? `Max $${filters.maxPrice}` : null,
    filters.condition !== "all" ? `Condition: ${filters.condition}` : null,
    filters.marketplace !== "all" ? `Marketplace: ${filters.marketplace}` : null,
    filters.sort !== "none" ? `Sort: ${filters.sort}` : null,
    discoveryState.shippingLocation
      ? `Ship to: ${discoveryState.shippingLocation}`
      : null,
  ].filter(Boolean);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          padding: 16,
          borderRadius: 12,
          width: "100%",
          maxWidth: 420,
          boxSizing: "border-box",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ margin: 0 }}>Save discovery lens</h3>
        <p style={{ fontSize: 12, color: "#666", marginTop: 6 }}>
          Save your current filters and search as a reusable lens you can apply
          with one click.
        </p>

        {summaryParts.length > 0 && (
          <p
            style={{
              fontSize: 12,
              color: "#888",
              margin: "12px 0",
              textAlign: "left",
            }}
          >
            {summaryParts.join(" · ")}
          </p>
        )}

        <label
          style={{
            display: "block",
            fontSize: 12,
            fontWeight: 600,
            color: "#666",
            marginBottom: 4,
            textAlign: "left",
          }}
        >
          Name
        </label>
        <input
          autoFocus
          placeholder="e.g. Timex — flexible budget"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "8px 10px",
            borderRadius: 8,
            border: "1px solid #ddd",
            fontSize: 13,
            marginBottom: 12,
          }}
        />

        <label
          style={{
            display: "block",
            fontSize: 12,
            fontWeight: 600,
            color: "#666",
            marginBottom: 4,
            textAlign: "left",
          }}
        >
          Description (optional)
        </label>
        <input
          placeholder="What is this lens for?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "8px 10px",
            borderRadius: 8,
            border: "1px solid #ddd",
            fontSize: 13,
            marginBottom: 16,
          }}
        />

        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!name.trim()}
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: 8,
              border: "none",
              background: name.trim() ? "#111" : "#ccc",
              color: "#fff",
              fontSize: 13,
              cursor: name.trim() ? "pointer" : "not-allowed",
            }}
          >
            Save lens
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: "1px solid #ddd",
              background: "#fff",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
