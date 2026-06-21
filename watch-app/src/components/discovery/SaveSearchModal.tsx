import { useState } from "react";
import type { DiscoveryState } from "../../types/savedSearch";
import {
  Button,
  Field,
  FieldLabel,
  Input,
  Modal,
  Tag,
} from "../ui";

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
  ].filter(Boolean) as string[];

  const canSave = name.trim().length > 0;

  return (
    <Modal
      title="Save discovery lens"
      description="Save your current filters and search as a reusable lens you can apply with one click."
      onClose={onClose}
      footer={
        <>
          <Button
            variant="primary"
            block
            disabled={!canSave}
            onClick={handleSubmit}
          >
            Save lens
          </Button>
          <Button variant="secondary" block onClick={onClose}>
            Cancel
          </Button>
        </>
      }
    >
      {summaryParts.length > 0 && (
        <div className="tag-list">
          {summaryParts.map((part) => (
            <Tag key={part}>{part}</Tag>
          ))}
        </div>
      )}

      <Field>
        <FieldLabel htmlFor="lens-name">Name</FieldLabel>
        <Input
          id="lens-name"
          autoFocus
          placeholder="e.g. Timex — flexible budget"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="lens-description">
          Description (optional)
        </FieldLabel>
        <Input
          id="lens-description"
          placeholder="What is this lens for?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Field>
    </Modal>
  );
}
