# Node Study

노마드 코더 무료 강의 보고 소캣 공부

### 폴더 구조

```bash
/node_study
    | --- node_modules
    | --- src
    |      | --- public
    |      |       | --- js
    |      |       |      | --- app.js
    |      |       |      | --- app_chat.js
    |      | --- views
    |      |       | --- home.pug
    |      |       | --- home_chat.pug
    |      | --- server.js
    |      | --- server_chat.js
    | --- .gitignore
    | --- babel.config.json
    | --- nodemon.json
    | --- package-lock.json
    | --- package.json
```

### Scripts

```json
{
  "name": "node_study",
  "version": "1.0.0",
  "description": "Zoom Clone using NodeJS, WebRTC and Websockets",
  "license": "MIT",
  "scripts": {
    "dev": "nodemon"
  },
  "devDependencies": {
    "@babel/cli": "^7.20.7",
    "@babel/core": "^7.20.12",
    "@babel/node": "^7.20.7",
    "@babel/preset-env": "^7.20.2",
    "connect-livereload": "^0.6.1",
    "livereload": "^0.9.3",
    "nodemon": "^2.0.20"
  },
  "dependencies": {
    "@socket.io/admin-ui": "^0.5.1",
    "express": "^4.18.2",
    "localtunnel": "^2.0.2",
    "pug": "^3.0.2",
    "socket.io": "^4.6.0",
    "ws": "^8.12.0"
  }
}
```

### 실행

```bash
$ npm run dev
$ lt --port 3000  ==> localtunnel 실행
```
