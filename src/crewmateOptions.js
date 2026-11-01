// The values a user can pick for each attribute

export const SPEEDS = [1, 2, 3, 4, 5];

export const COLORS = [
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Purple",
  "Pink",
  "Rainbow",
];

// The CSS color used to draw each crewmate
export const COLOR_VALUES = {
  Red: "#e5383b",
  Orange: "#f4842a",
  Yellow: "#f5d23c",
  Green: "#3ac46e",
  Blue: "#3a6ff0",
  Purple: "#8b4fd8",
  Pink: "#f06fb6",
  Rainbow:
    "linear-gradient(160deg, #e5383b, #f4842a, #f5d23c, #3ac46e, #3a6ff0, #8b4fd8)",
};

// A short line about a crewmate's speed, shown on their detail page
export function describeSpeed(speed) {
  if (speed >= 5) return "Zoom! Nobody gets to an emergency meeting faster.";
  if (speed >= 3) return "Quick enough to finish tasks and still make it to the meeting.";
  return "Slow and steady. Maybe find a faster crewmate to finish the tasks.";
}
