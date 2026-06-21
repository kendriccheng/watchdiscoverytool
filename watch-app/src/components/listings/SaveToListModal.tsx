import { useState } from "react";
import type { WatchListing } from "../../data/mockListings";
import { cn } from "../../utils/cn";
import { Button, FieldLabel, Input, Modal } from "../ui";

type Props = {
  watch: WatchListing;
  lists: Record<string, WatchListing[]>;
  onClose: () => void;
  onToggleList: (listName: string) => void;
  onDeleteList: (listName: string) => void;
  onCreateList: (name: string) => void;
};

export default function SaveToListModal({
  watch,
  lists,
  onClose,
  onToggleList,
  onDeleteList,
  onCreateList,
}: Props) {
  const listNames = Object.keys(lists);

  return (
    <Modal
      title="Save to list"
      description="Select a list or create a new one. You can save the same watch to multiple lists."
      className="modal-panel--scroll"
      onClose={onClose}
      footer={
        <>
          <Button variant="primary" block onClick={onClose}>
            Done
          </Button>
          <Button variant="secondary" block onClick={onClose}>
            Cancel
          </Button>
        </>
      }
    >
      <h4 className="modal-section-title">Existing lists</h4>

      <div className="list-picker">
        {listNames.map((listName) => {
          const alreadySaved = lists[listName]?.some((w) => w.id === watch.id);
          const isEmpty = lists[listName]?.length === 0;
          const canDelete = isEmpty && listName !== "Favorites";

          return (
            <div key={listName} className="list-picker__group">
              <button
                type="button"
                className={cn(
                  "list-picker__row",
                  alreadySaved && "list-picker__row--selected"
                )}
                onClick={() => onToggleList(listName)}
              >
                <span
                  className={cn(
                    "list-picker__checkbox",
                    alreadySaved && "list-picker__checkbox--checked"
                  )}
                  aria-hidden="true"
                >
                  {alreadySaved ? "✓" : ""}
                </span>
                <span className="list-picker__name">{listName}</span>
                {alreadySaved && (
                  <span className="list-picker__status text-success">Saved</span>
                )}
              </button>

              {canDelete && (
                <Button
                  type="button"
                  variant="ghost"
                  sm
                  className="list-picker__delete"
                  onClick={() => onDeleteList(listName)}
                >
                  Delete empty list
                </Button>
              )}
            </div>
          );
        })}
      </div>

      <h4 className="modal-section-title">Create new list</h4>
      <CreateListInput onCreate={onCreateList} />
    </Modal>
  );
}

function CreateListInput({ onCreate }: { onCreate: (name: string) => void }) {
  const [value, setValue] = useState("");

  const handleCreate = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onCreate(trimmed);
    setValue("");
  };

  return (
    <div className="create-list-panel">
      <FieldLabel htmlFor="new-list-name">List name</FieldLabel>
      <Input
        id="new-list-name"
        placeholder="New list name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleCreate();
        }}
      />

      <Button
        variant="primary"
        block
        className="create-list-panel__submit"
        disabled={!value.trim()}
        onClick={handleCreate}
      >
        + Create list
      </Button>
    </div>
  );
}
