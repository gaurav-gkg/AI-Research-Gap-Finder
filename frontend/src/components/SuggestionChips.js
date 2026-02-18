import React from "react";

const chips = [
  { color: "#4285f4", label: "Identify research gaps" },
  { color: "#81c995", label: "Missing evaluations" },
  { color: "#c58af9", label: "Future opportunities" },
  { color: "#fdd663", label: "Citation analysis" },
];

function SuggestionChips() {
  return (
    <div className="chips-container anim-chips">
      {chips.map((chip, i) => (
        <button key={i} className="chip">
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: chip.color,
              flexShrink: 0,
            }}
          />
          {chip.label}
        </button>
      ))}
    </div>
  );
}

export default SuggestionChips;
