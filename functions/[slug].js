// Pré-relatórios: tangit.com.br/<cliente>-relatorio-<6 dígitos> mostra a página que está no sistema de prospecção.
// Qualquer outro endereço segue normal para o site (next()).
// O endereço do sistema vem da variável SISTEMA_URL do projeto; sem ela, usa o padrão abaixo.

const PADRAO_SISTEMA = "https://prospeccao-tangit.pages.dev";
const RELATORIO = /^[a-z0-9]+(?:-[a-z0-9]+)*-relatorio-\d{6}$/;

export async function onRequest({ request, params, env, next }) {
  const slug = String(params.slug || "").toLowerCase();
  if (!RELATORIO.test(slug) || !["GET", "HEAD"].includes(request.method)) return next();

  const sistema = String(env.SISTEMA_URL || PADRAO_SISTEMA).replace(/\/+$/, "");
  const busca = new URL(request.url).searchParams.has("interno") ? "?interno=1" : "";
  let r;
  try {
    r = await fetch(`${sistema}/api/public/relatorio/${slug}${busca}`, {
      method: request.method,
      headers: {
        "user-agent": request.headers.get("user-agent") || "",
        "accept-language": request.headers.get("accept-language") || "",
        "x-relatorio-via": "tangit.com.br",
      },
    });
  } catch {
    return new Response("Página temporariamente indisponível.", { status: 503, headers: { "content-type": "text/plain; charset=utf-8" } });
  }
  return new Response(r.body, {
    status: r.status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow",
      "referrer-policy": "no-referrer",
    },
  });
}
