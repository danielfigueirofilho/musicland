import { ODS_ITEMS } from "@/lib/constants";

/**
 * Contexto extensionista: público-alvo e alinhamento aos ODS.
 */
export function ImpactSection() {
  return (
    <section
      id="impacto"
      className="bg-primary text-primary-foreground"
      aria-labelledby="impacto-heading"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-semibold tracking-wide uppercase opacity-90">
            Extensão universitária · UNINTER
          </p>
          <h2
            id="impacto-heading"
            className="font-heading mt-2 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Feito para quem aprende em Manaus
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed opacity-95">
            Crianças, adolescentes e jovens de escolas públicas, centros
            comunitários e projetos sociais — em especial comunidades de baixa
            renda. O app prioriza celular, dados leves e uso sem cadastro.
          </p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {ODS_ITEMS.map((item) => (
            <li
              key={item.code}
              className="border-primary-foreground/20 bg-primary-foreground/10 rounded-2xl border px-4 py-4"
            >
              <p className="font-heading text-2xl font-semibold">ODS {item.code}</p>
              <p className="mt-1 text-sm leading-relaxed opacity-95">{item.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
