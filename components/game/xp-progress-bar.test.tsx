import { render, screen } from "@testing-library/react";

import { XpProgressBar } from "@/components/game/xp-progress-bar";
import { LevelBadge } from "@/components/game/level-badge";

describe("dashboard gamification UI", () => {
  it("mostra nível 2 e progresso a partir de 100 XP", () => {
    render(
      <>
        <LevelBadge xp={100} />
        <XpProgressBar xp={100} />
      </>,
    );
    expect(screen.getByText("Nível 2")).toBeInTheDocument();
    expect(screen.getByText("100 / 300 XP")).toBeInTheDocument();
  });
});
