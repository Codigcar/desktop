if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js',
  )
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded')
    // workbox.setConfig({ debug: true });
    // workbox.googleAnalytics.initialize();

    workbox.core.setCacheNameDetails({
      prefix: 'gec',
      suffix: 'v2.1',
    })
    workbox.core.skipWaiting()
    workbox.core.clientsClaim()
    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([])

    /* custom cache rules */
    /* workbox.routing.registerNavigationRoute('/index.html', {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
    }); */

    /* workbox.routing.registerNavigationRoute(
      // Assuming '/single-page-app.html' has been precached,
      // look up its corresponding cache key.
      workbox.precaching.getCacheKeyForURL('/index.html'),
      {
        whitelist: [],
        blacklist: [],
      }
    ); */
    // workbox.routing.registerNavigationRoute('/index.html');

    /* workbox.routing.registerRoute(
      /\/beta\/service\/news\/v\d+\/(elcomercio|gestion|peru21|depor|trome)\//,
      new workbox.strategies.NetworkFirst({
        cacheName: 'categories',
        plugins: [
          new workbox.cacheableResponse.Plugin({
            statuses: [0, 200],
          }),
          new workbox.expiration.Plugin({
            maxAgeSeconds: 1 * 60 * 24 * 60,
          }),
        ],
      })
    ); */

    /* workbox.routing.registerRoute(
      /\.(?:js|css)$/,
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'static-resources',
      })
    ); */

    /* workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|svg)$/,
      new workbox.strategies.CacheFirst({
        cacheName: 'images',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
            purgeOnQuotaError: true,
          }),
        ],
      })
    ); */
  } else {
    console.log('Workbox could not be loaded. No Offline support')
  }
}
