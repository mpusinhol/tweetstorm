# Tweet Storm Generator

An application to receive a tweet, break it into smaller pieces if it's too big, and post it on Twitter.

## To run

First, go to /src/twitter/twitter-api and fill your Twitter application credentials (I tried using env variables, but it seems that the library used to read them and the twitter one were not getting along).
If you don't have them, you can register on https://apps.twitter.com/

then, run (make sure you have node installed):

```
sudo npm i
```

and finally,
```
npm start "YOUR_TWEET_HERE"
```

## Thought Process

First, I spent the time trying to break a huge tweet text into smaller ones in a way that made sense, trying not to spoile the content. I tried to look for quotes, then dots, commas, spaces and only if none of them could be found, I would break a word.
Then, once the hard part was done, it was just a matter os calling the api endpoints to post them on twiiter.

## Edge cases

I tried to cover as much cases as possible, however it's impossible to prevent all of them. Eventually, the logic will break.

## Maintanance

The whole code is commented on the parts that are a bit harder to understand, as well as all the methods and functions, trying to easy other mainteners lives.

## Third-party libraries

- async

  In order to turn asynchronous calls to the Twitter api synchronous

- babel-cli & babel-preset-es2015

  In order to be able to use ECMAScript 6 and make my life a bit easier :)

- twitter

  In order to make api calls easier

## Technical Questions

# CSS
1. **Qual a diferença entre progressive enhancement e graceful degradation? Por que você escolheria um ou outro?**

R.: Progressive enhancement foca em ter funcionalidades báscias que funcionem em qualquer navegador, mesmo os mais antigos, assegurando que tudo esteja sempre funcionando e depois ir incrementando pouco a pouco para os navegadores mais modernos. Graceful Degradation, foca em ter as melhores funcionalidades possíveis da atualidade para navegeadores mais modernos, mas que se adapte em navegadores mais antigos para não deixar o usuário na mão. Eu escolheria Graceful Degradation, para focar no melhor produto possível para os navegadores mais modernos (que são os mais utilizados) primeiramente e adaptações para navegadores mais antigos.

2. **Como centralizar o bloco segundo o desenho abaixo considerando que as medidas da div.outer são indefinidas?**
```
 ________________________________________
|                                        |
|  div.outer                             |
|          ________200px______           |
|          |                  |          |
|     100px|  div.inner       |          |
|          |                  |          |
|          |__________________|          |
|                                        |
|                                        |
|________________________________________|
```

R.: 
```
.outer {
	position: relative;
}
.inner {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
```

3. **Você já usou algum framework de CSS? Qual? Por que?**

R.: Já utilizei reactstrap para facilitar com componentes já pré-prontos.

4. **Você já usou algum pré-processador de CSS? Qual? Por que?**

R.: Já utilizei SCSS por poder utilizar variáveis e funções como mixings para otimizar código.

5. **Você já usou algum pós-processador de JS? Qual? Por que?**

R.: Nunca utilizei.

6. Como alinhar horizontalmente um bloco com largura definida?

R.: 

```
margin: 0 auto;
```

7. **Como você mantem os seletores (classes, ids, etc) de uma base de código que evolui com o tempo? Como faz para remover o que não está sendo usado (e pior, como saber o que está sendo usado)?**

R.: Manteria um linter como CSSLint para deixar tudo sempre organizado e impedir que o código vire bagunça.

# Questions
1. **Qual a sua experiência com automação de qualidade no front end (ex testes unitários, testes de integração)**

R.: Tenho experiência com unit e integration tests apenas no backend quando trabalhei com C# e Java. Já li um pouco sobre Jest, porém não cheguei a utilizá-lo.

1. **Qual o bug mais difícil que depurou nos últimos anos?**

R.: Um bug relacionado à integração de uma biblioteca do Spotify com React-Native, na qual, por algum motivo, após ser feita em Java e modularizada para o Native, não exportava os métodos de maneira correta, sempre ficando undefined. Apesar de não ser especificamente um bug meu, era crucial para o projeto e acabei perdendo varios dias tentando todas as formas possíveis para encontrar uma solução. Felizmente, uma hora consegui :)

1. **Tem alguma experiência com programação funcional? Caso tenha, como ela pode ajudar no desenvolvimento de UI?**

R.: Tenho experiência com React e React-Native, que podem auxiliar muito ao permitirem a componentização e reutilização de vários elementos na UI.

1. **Como você controla dependências? Você usa um gerenciador de pacotes? Qual? Por quê?**

R.: Sempre utilizei npm, pois a comunidade a quantia de pacotes disponíveis é bem grande, auxiliando muito no desenvolvimento.

1. **Tem alguma experiência com Reactive Programming (rx)? Caso tenha, como ela pode ajudar no desenvolvimento de UI?**

R.: Sim, já desenvolvi um projeto do zero, que integrado ao Spotify, permitia que o usuário gerenciasse músicas e playlists, além de submeter suas próprias no caso de ser um artista e descobrir novas tendências.
