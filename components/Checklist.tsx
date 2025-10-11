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
    <div className="w-full mx-auto bg-transparent rounded-2xl shadow-md space-y-4">
      {title && (
        <Typography
          variant="subsectionTitle"
          className="text-center text-gray-900"
        >
          {title}
        </Typography>
      )}

      <ul className="space-y-3">
        {items.map(({ id, name, description, mandatory }) => (
          <li
            key={id}
            onClick={() => handleToggle(id)}
            className="flex items-center gap-3 border border-gray-200 p-3 rounded-lg cursor-pointer select-none"
          >
            <input
              id={id}
              type="checkbox"
              checked={checked[id] || false}
              onChange={(e) => e.stopPropagation()}
              className="accent-green-600 cursor-pointer"
            />
            <div className="flex flex-col">
              <Typography
                variant="paragraph"
                size="text-base"
                className="font-medium text-gray-900"
              >
                {name}{" "}
                {mandatory && (
                  <span className="mt-[-1px] text-red-500 text-sm font-normal">
                    *
                  </span>
                )}
              </Typography>

              {description && (
                <Typography
                  variant="paragraph"
                  size="text-sm"
                  className="text-gray-500"
                >
                  {description}
                </Typography>
              )}
            </div>
          </li>
        ))}
      </ul>

      {allMandatoryChecked && (
        <div className="text-center bg-green-400/80 text-green-700 p-2 rounded-lg">
          <Typography
            variant="subsectionSubtitle"
            size="text-base"
            className="font-medium"
          >
            🎉 You’re all good to go!
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Checklist;
