<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# <p align="center">Proyecto de NestJS con MongoDB Atlas</p>

# <p align="center">Documentación <a href="https://github.com/02Alexis/postsapi/wiki/Componente-T%C3%A9cnico" target="_blank">como usar la app</a></p>

Este repositorio contiene un proyecto de backend desarrollado con NestJS y MongoDB. A continuación, se detalla cómo configurar el proyecto y acceder a la documentación generada por Swagger.

# Requisitos previos

Asegúrate de tener los siguientes requisitos previos instalados en tu sistema:
* [Node.js: ](https://nodejs.org/en/download) + v18.15.0
* [MongoDB: ](https://www.mongodb.com/try/download/community) 


## Configuración de Variables de Entorno

Para que el proyecto funcione correctamente, es necesario configurar las variables de entorno en un archivo `.env` en la raíz del proyecto. Puedes crear este archivo y pegar los siguientes datos:

```bash
BD_URI=mongodbyourdb
JWT_SECRET=codingwithabbas
JWT_EXPIRES=3d
```

Asegúrate de reemplazar `mongodbyourdb` con la URL de tu base de datos MongoDB ya sea local o en la nube usando MongoDB Atlas. Estas variables se utilizan para configurar la conexión a la base de datos y para la autenticación JWT.

## Proceso de Instalación

# Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local:

1. Clona el repositorio utilizando el siguiente comando:

```sh
git clone https://github.com/02Alexis/postsapi.git

# Navega al directorio del proyecto:
cd postsapi

# Instala las dependencias del proyecto
npm install

# Inicia el servidor de desarrollo:
npm run start:dev
```

<p align="center">A progressive <a href="https://github.com/02Alexis/postsapi/wiki/Componente-T%C3%A9cnico" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

# Acceso a la Documentación de Swagger

Una vez que el servidor esté en funcionamiento, puedes acceder a la documentación de la API generada por Swagger en tu navegador web. Abre el siguiente enlace:

`http://localhost:8000/docs`

Esta interfaz interactiva te permitirá explorar los endpoints de la API, probar las solicitudes y ver las respuestas en tiempo real.

![imagen](https://github.com/02Alexis/postsapi/assets/99287560/08a02b93-f27f-4783-8fce-ddf9cf75b266)


¡Disfruta explorando y probando este proyecto de NestJS con MongoDB!
