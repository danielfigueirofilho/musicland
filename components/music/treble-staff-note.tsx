import type { StaffNote } from "@/lib/quiz/score-reading/generator";

const LINE_GAP = 18;
const STAFF_TOP = 48;
const NOTE_X = 210;

type TrebleStaffNoteProps = {
  note: StaffNote;
};

function staffY(offset: number): number {
  return STAFF_TOP + (8 - offset) * (LINE_GAP / 2);
}

/**
 * Renderiza uma nota na pauta em clave de sol (CA-13).
 */
export function TrebleStaffNote({ note }: TrebleStaffNoteProps) {
  const y = staffY(note.staffOffset);
  const needsLedgerBelow = note.staffOffset < 0;
  const needsLedgerAbove = note.staffOffset > 8;
  const label = `${note.name}${note.octave}`;

  return (
    <svg
      viewBox="0 0 320 220"
      className="h-auto w-full max-w-md"
      role="img"
      aria-label={`Nota ${label} na clave de sol`}
    >
      {[0, 1, 2, 3, 4].map((line) => {
        const lineY = STAFF_TOP + line * LINE_GAP;
        return (
          <line
            key={line}
            x1="36"
            x2="292"
            y1={lineY}
            y2={lineY}
            stroke="currentColor"
            strokeWidth="2"
          />
        );
      })}

      <path
        d="M70 120
           c0-22 16-36 16-58
           c0-22-14-36-26-36
           c-16 0-26 16-26 32
           c0 28 30 32 30 56
           c0 18-12 26-24 26
           c-16 0-26-12-26-26
           c0-10 6-18 16-22
           m14-86 c6-16 4-34-6-44"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {needsLedgerBelow ? (
        <line
          x1={NOTE_X - 28}
          x2={NOTE_X + 28}
          y1={staffY(-2)}
          y2={staffY(-2)}
          stroke="currentColor"
          strokeWidth="2"
        />
      ) : null}
      {note.staffOffset <= -1 ? (
        <line
          x1={NOTE_X - 28}
          x2={NOTE_X + 28}
          y1={staffY(0) + LINE_GAP}
          y2={staffY(0) + LINE_GAP}
          stroke="currentColor"
          strokeWidth="2"
          opacity={note.staffOffset === -1 ? 1 : 0}
        />
      ) : null}
      {needsLedgerAbove ? (
        <line
          x1={NOTE_X - 28}
          x2={NOTE_X + 28}
          y1={staffY(10)}
          y2={staffY(10)}
          stroke="currentColor"
          strokeWidth="2"
        />
      ) : null}

      <ellipse
        cx={NOTE_X}
        cy={y}
        rx="14"
        ry="10"
        transform={`rotate(-18 ${NOTE_X} ${y})`}
        fill="currentColor"
      />
      <line
        x1={NOTE_X + 12}
        x2={NOTE_X + 12}
        y1={y - 2}
        y2={y - 56}
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
