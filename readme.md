# Image optimizer

Este código premite comprimir/otimizar imagens sem perder a qualidade, utilizando a biblioteca [sharp](https://github.com/lovell/sharp).

## Como utilizar

1. Instale o nodeJS caso não tenha, no minimo na versão 12^ (https://nodejs.org/en/download/) 

2. Clone o repositório

```shell
git clone https://github.com/xkHeitor/image-optimizer.git
```

3. caso não tenha o `yarn` instalado, execute o comando a seguir para intala-lo; Se já tiver, pule está etapa
```shell
npm install --global yarn 
```

4. Agora com yarn instalado execute na pasta do projeto o `yarn`
```shell
yarn
```

4. Enfim está pronto para ser utilizado, com o `yarn start`
```shell
yarn start
```

5. Após o yarn start, será feito perguntas para configurar o otmizador, se não quiser configura-lo e marcar não para perguntas, irá usar as config padrão que está no .env

## Considerações finais
  Este código é apenas um protótipo/teste.