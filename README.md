# Prueba técnica DEVHunter

Esta preuba es realizada por David Sandoval, con el usuario de github https://github.com/LDavid-Sandoval

## Instalación

Se requiere clonar el repositorio del siguiente enlace: https://github.com/LDavid-Sandoval/devhunter-challenge-backend

O por medio de SSH

```bash
  git clone git@github.com:LDavid-Sandoval/devhunter-challenge-backend.git
```

Abrir la carpeta de archivos dentro de Visual Studio Code, para poder instalar dependencias requeridas.

```bash
  npm i
```

## Ejecución

Se tiene que agregar in archivo .env con los siguientes valores

```bash
  MONGODB_USER=''
  MONGODB_PASSWORD=''
  MONGODB_CLUSTER=''
  MONGODB_URI=''
  HASH_PASSWORD=''
```

Para ejecutar el proyecto ejecuté lo siguiente

```bash
  npm start
```

Las rutas son las siguientes

```bash
  POST   /api/login
  POST   /api/register
  POST   /api/profile
```
