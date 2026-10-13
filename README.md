# Beleza Segura — versão v3

Projeto frontend estático reorganizado com páginas na raiz e assets centralizados em `assets/css`, `assets/js` e `assets/images`. Para executar localmente, use `python3 -m http.server 4174` dentro desta pasta e abra `http://localhost:4174/index.html`.

A landing page possui três banners locais em **1270 × 372 px**, catálogo com produtos reais e URLs diretas para as páginas oficiais dos produtos, filtros funcionais de **Todos**, **Maquiagem** e **Skin Care**, modal de detalhes e botão de compra que abre o produto correspondente.

A comunidade foi separada em áreas de **Beleza**, **Maquiagem**, **Dicas** e **Alertas**. Os filtros, curtidas, comentários e criação de tópico usam `assets/js/community.js`.

Todos os perfis, participantes da comunidade e autores de comentários usam avatares tipográficos circulares com a inicial do nome, estilizados em `assets/css/initials.css`. As fotos de pessoas foram removidas do projeto. O ícone de notificações também foi removido das páginas.

A navbar tem dimensões unificadas e comportamento sticky, com estado visual ao rolar. A especificação de origem dos produtos e imagens está em [PRODUCT_SOURCES.md](PRODUCT_SOURCES.md).
