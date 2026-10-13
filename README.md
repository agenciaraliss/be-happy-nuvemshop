# Be Happy Perfumes · layout personalizado (Nuvemshop)

Personalização da loja **Be Happy Perfumes** no tema **Amazonas** da Nuvemshop, feita pela Agência Raliss (Sites com a Lari).

## Como usar

```bash
npm install
npm run build
```

O build gera dois arquivos em `dist/`:

| Arquivo | Onde colar no painel da Nuvemshop |
|---|---|
| `dist/be-happy.min.css` | Campo de **CSS** personalizado |
| `dist/be-happy-rodape.html` | Campo de **código HTML do rodapé** |

`dist/be-happy-rodape-legivel.html` é a mesma coisa do rodapé, só que sem compressão (para consulta; não colar).

## Por que dois arquivos

O campo de CSS do painel apaga algumas regras quando você salva: `:has()`, `min()`/`max()`/`clamp()`, unidades `cqw`, `font-stretch`, `-webkit-*`, `filter`, `scroll-snap`, variáveis `--x`, cores hex de 4/8 dígitos, `@supports`, seletores `[style*=…]` e outras. O `build.js` separa automaticamente tudo isso e manda para o rodapé (que o painel não filtra). O build também confere, no fim, que não sobrou nada proibido no CSS do painel.

O rodapé vai comprimido (deflate + base64) com um descompactador pequeno (tiny-inflate), para caber no limite de ~30 KB do campo.

## Estrutura

- `src/style.css`: todos os estilos
- `src/app.js`: script único (cabeçalho, mega-menu, busca, gaveta, barra de anúncio com cupom, banner informativo, cards e compra, marcas, guia do decant, newsletter, rodapé e rastreio)
- `src/icons.js`: ícones (viram máscaras CSS)
- `src/tx.js`: atalhos aplicados no build para reduzir o tamanho do script
- `src/lari-watermark.txt`: marca d'água "Criado por Sites com a Lari"
- `build.js`: gera os arquivos de `dist/`

O prefixo `bh-` dos arquivos-fonte vira `h_` no build.

## Tudo vinculado ao painel

Categorias, subcategorias, banners informativos, marcas, rodapé, contatos, redes sociais, textos do newsletter e tamanhos (ml) dos decants são lidos da loja. Se a cliente mudar no painel, o layout se reorganiza sozinho.
