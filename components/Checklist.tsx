"use client";

import React, { useState } from "react";
import Typography from "./Typography/Typography";

type ChecklistItem = {
  id: string;
  name: string;
  description?: string;
  mandatory?: boolean;
};

type ChecklistProps = {
  items: ChecklistItem[];
  onChange?: (checkedItems: string[]) => void;
  title?: string;
};

const Checklist: React.FC<ChecklistProps> = ({ items, onChange, title }) => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const handleToggle = (id: string) => {
    setChecked((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      onChange?.(Object.keys(updated).filter((k) => updated[k]));
      return updated;
    });
  };

  const allMandatoryChecked = items
    .filter((i) => i.mandatory)
    .every((i) => checked[i.id]);

  return (
    <>
      {title && (
        <Typography variant="subsectionTitle" className="text-center">
          {title}
        </Typography>
      )}

      <ul className="space-y-4">
        {items.map(({ id, name, description, mandatory }) => (
          <li
            key={id}
            onClick={() => handleToggle(id)}
            className="flex items-center gap-3 border border-gray-200 p-3 rounded-sm cursor-pointer hover:border-[var(--primary)] hover:bg-[var(--background)]/40 transition select-none"
          >
            <input
              id={id}
              type="checkbox"
              checked={checked[id] || false}
              onChange={(e) => e.stopPropagation()}
              className="accent-green-600 cursor-pointer"
            />
            <div className="flex flex-col">
              <Typography variant="subsectionTitle" size="base">
                {name}{" "}
                {mandatory && (
                  <span className="mt-[-1px] text-red-500 text-sm font-normal">
                    *
                  </span>
                )}
              </Typography>

              {description && (
                <Typography variant="paragraph" size="sm">
                  {description}
                </Typography>
              )}
            </div>
          </li>
        ))}
      </ul>

      {allMandatoryChecked && (
        <div className="text-center bg-green-500 p-2 rounded-sm">
          <Typography
            variant="subsectionSubtitle"
            size="base"
            className="!text-[var(--background)]"
          >
            🎉 You’re all good to go!
          </Typography>
        </div>
      )}
    </>
  );
};

export default Checklist;
