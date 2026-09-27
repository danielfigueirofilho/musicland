/**
 * Rotas que exigem sessão. `/home`, `/quizzes` e o perfil ficam
 * abertos ao visitante (MVP). CA-09 aplica-se a estas rotas.
 */
export const PROTECTED_PATHS = ["/settings"] as const;

/**
 * Indica se o pathname precisa de autenticação.
 */
export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}
