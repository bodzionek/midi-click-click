import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const FIRST_OCTAVE_START = 24;
const OCTAVE_LENGTH = 12;

const notesConfig = [
  { kIndex: 0, name: "C", subKey: ["C#", "Db"] },
  { kIndex: 2, name: "D", subKey: ["D#", "Eb"] },
  { kIndex: 4, name: "E" },
  { kIndex: 5, name: "F", subKey: ["F#", "Gb"] },
  { kIndex: 7, name: "G", subKey: ["G#", "Ab"] },
  { kIndex: 9, name: "A", subKey: ["A#", "Bb"] },
  { kIndex: 11, name: "B" },
];

const getOctave = (noteIndex) => {
  const oIndex =
    Math.floor((noteIndex - FIRST_OCTAVE_START) / OCTAVE_LENGTH) + 1;
  const firstNoteIndex = FIRST_OCTAVE_START + (oIndex - 1) * OCTAVE_LENGTH;
  const lastNoteIndex = firstNoteIndex + OCTAVE_LENGTH - 1;
  return { oIndex, first: firstNoteIndex, last: lastNoteIndex };
};

const getOctaveConfig = (octave, start, end) => {
  const noteStartIndex = start <= octave.first ? 0 : start - octave.first;
  const noteEndIndex = end >= octave.last ? 11 : 11 + end - octave.last;

  return { number: octave.oIndex, start: noteStartIndex, end: noteEndIndex };
};

export const classMerge = (...inputs) => {
  return twMerge(clsx(inputs));
};

export const getFirstNoteNumber = (index) => {
  return 24 + (index - 1) * 12;
};

export const getNotesConfig = (start, end) => {
  if (start < 0 || start > end || end > 12) return [];
  return notesConfig.filter(({ kIndex }) => kIndex >= start && kIndex <= end);
};

export const validateIfValuesInRange = (start, end, rangeStart, rangeEnd) => {
  return start >= rangeStart && end <= rangeEnd && start <= end;
};

export const getKeyboardConfig = (start, end) => {
  const config = [];

  let current = start;
  do {
    const octave = getOctave(current);
    config.push(getOctaveConfig(octave, start, end));
    current = octave.first + OCTAVE_LENGTH;
  } while (current <= end);

  return config;
};
