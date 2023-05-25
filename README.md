This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Projeto Peludin Pet Shop - Front End

Esse é o front end do projeto de estudo no qual criei um site de Pet Shop com um front end feito com Next.js e um back end separado usando Node.js e um banco de dados PostgreSQL.

## Notas

FEITO COM PROPÓSITO DE ESTUDO

Não há implementado metodos de pagamento, conexão com banco ou correios.

Uso Typescript e para estilização Bootstrap e Sass

## Paginas

Pricipal(Home) - Tem dois Sliders, um apresentando serviços do site e o outro com alguns produtos em destaque que se quer mostrar.

Loja(Shop) - Apresenta cards de produtos que podem ser separados por categorias, ordenados por nome e preço e também com paginação e input de pesquisa.

Pesquisa(Search) - Apresenta os produtos pesquisados com paginação.

Produto(Products/id) - Mostra uma imagem do produto, suas informações e um botão para adicionar ao carrinho de compras.

Carrinho(Cart) - Tem uma lista de cards de produtos adicionados, um calculador de frete (Que não foi implementado, só é visual), o preço total e um botão para ir ao checkout. (A quantidade que produtos no carrinho fica marcado no icone do carrinho no header).

(Conferir compra)Checkout - Só é possivel acessar se estiver logado. Exibe o endereço do usuario e as informações da compra junto com um botão para realizar a compra.

Contato(Contact) - Pagina aonde você podem mandar um email de contato para a empresa.

Empresa(About) - Pagina com a história da empresa, funcionarios e endereço.

Entrar(Login) - Pagina para login do usuário.

Registro(Register) - Aonde você pode fazer o registo de um novo usuário.

Perfil(Profile) - Quando você está logado, no header aparece um dropdown com seu nome aonde você acessa o seu perfil. No perfil pode-se alterar os dados cadastrais e senha, criar e alterar o endereço e ver as compras feitas por esse usuário.

## Dependencias

    "axios": "^1.3.6",
    "bootstrap": "^5.2.3",
    "next": "13.3.1",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-modal": "^3.16.1",
    "reactstrap": "^9.1.9",
    "sass": "^1.62.0",
    "swr": "^2.1.3",
    "typescript": "5.0.4"
