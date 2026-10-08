# Tangit — site institucional

Site estático (HTML + assets), sem etapa de build.

## Estrutura

```
index.html          página inicial
assets/fonts/       Inter Tight e Stack Sans Headline (embutidas localmente)
assets/img/         logos, ícones e imagens dos projetos
_headers            cache e cabeçalhos de segurança (Cloudflare Pages)
robots.txt
```

## Deploy no Cloudflare Pages

1. Suba esta pasta para um repositório no GitHub (os arquivos na raiz do repositório).
2. Cloudflare → Workers & Pages → Create → Pages → Connect to Git → escolha o repositório.
3. Configuração de build:
   - Framework preset: **None**
   - Build command: *(vazio)*
   - Build output directory: `/`
4. Deploy. Depois, em **Custom domains**, aponte `tangit.com.br`.

Cada `git push` na branch principal publica automaticamente.

## Observação de cache

Arquivos em `assets/` ficam em cache por 1 ano. Ao trocar uma imagem, **mude o nome do arquivo**
(ex.: `privilege-moveis-decoracoes-v2.jpg`) e atualize a referência no `index.html`.
