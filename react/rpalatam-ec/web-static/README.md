<h1 align="center">
  Webview - Grupo El Comercio Apps
</h1>

Este repositorio sirve como webview para las aplicaciones.

## 🏭 Infraestructura

Este proyecto es una web estática, por lo que todas las vistas son generadas por JS. Cuando se ejecuta el job `build` se crean los diferentes assets, estos a su vez son subidos a un bucket S3. Entre los assets se encuentra el `index.html` al cual apunta un cloudfront.

- **Producción**

  - AWS S3: `pwa.elcomercio.pe`
  - AWS Cloudfront: [https://d33f12wnwxh1qh.cloudfront.net/](https://d33f12wnwxh1qh.cloudfront.net/)

- **Desarrollo**

  - AWS S3: `pwa.dev.elcomercio.pe`
  - AWS Cloudfront: [https://d33f12wnwxh1qh.cloudfront.net/](https://d33f12wnwxh1qh.cloudfront.net/)
