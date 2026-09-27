import { render, screen } from "@testing-library/react";

import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";

describe("Landing — F1", () => {
  it("exibe o CTA Começar a jogar apontando para o modo visitante", () => {
    render(<Hero />);

    const cta = screen.getByRole("link", { name: /começar a jogar/i });
    expect(cta).toHaveAttribute("href", "/home");
    expect(
      screen.getByRole("heading", {
        name: /teoria musical que se joga, no celular/i,
      }),
    ).toBeInTheDocument();
  });

  it("explica o conceito em três passos", () => {
    render(<HowItWorks />);

    expect(screen.getByRole("heading", { name: /joga, evolui, aprende/i })).toBeInTheDocument();
    expect(screen.getByText("Joga")).toBeInTheDocument();
    expect(screen.getByText("Evolui")).toBeInTheDocument();
    expect(screen.getByText("Aprende")).toBeInTheDocument();
  });
});
