import React from "react";
import * as R from "ramda";
import { colors, textColor } from "./data";

const MarketCell = ({ value, legend, par, colSpan }) => {
  let color = null;
  let companies = null;

  let classes = [];
  if (!value) {
    classes.push("empty");
  } else {
    color = colors["plain"];
  }

  let labelColor = textColor("plain");
  if (value && value.color) {
    color = colors[value.color];
    labelColor = colors[value.textColor] || textColor(value.color || "white");
  } else if (
    value &&
    Number.isInteger(value.legend) &&
    value.legend < legend.length
  ) {
    color = colors[legend[value.legend].color];
    labelColor =
      colors[value.textColor] || textColor(legend[value.legend].color);
  } else if (value && value.par) {
    color = colors[(par && par.color) || "gray"];
    labelColor =
      colors[value.textColor] || textColor((par && par.color) || "gray");
  }

  if (value && value.companies) {
    companies = (
      <div
        className="MarketCell--Companies"
        style={{ gridTemplateRows: `repeat(8, 0.1in)` }}
      >
        {R.map(
          c => (
            <div
              key={`row-${c.row}`}
              style={{
                backgroundColor: colors[c.color],
                color: textColor(c.color),
                gridRow: `${c.row} / span 1`
              }}
              className="MarketCell--Company"
            />
          ),
          value.companies
        )}
      </div>
    );
  }

  return (
    <td
      style={{ backgroundColor: color, color: labelColor }}
      className={classes.join(" ")}
      colSpan={colSpan}
    >
      {(value && value.label) || value}
      {value &&
        value.subLabel && (
          <span className="MarketCell--SubLabel">{value.subLabel}</span>
        )}
      {companies}
      {value &&
        value.arrow && (
          <span
            style={{
              color: value.arrowColor
                ? colors[value.arrowColor]
                : colors["black"]
            }}
            className={`Arrow Arrow--${value.arrow}`}
          >
            {value.arrow === "up" ? "↑" : "↓"}
          </span>
        )}
    </td>
  );
};

export default MarketCell;
