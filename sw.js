/* 免费小工具站 Service Worker：只缓存本站自己的页面、清单和图标。
   传文件仍走实时网络，不缓存、不中转文件；页面导航优先走网络，断网时才回退缓存（小恐龙可离线玩）。
   教学实验区（2026-11-20 本地托管）：labs/ 下的演示文件不进预缓存（体积太大，约 200MB），
   走运行时缓存——演示打开过一次即按自己的 URL 缓存，断网后可再打开互动；导航分支已区分
   站根首页与演示页，演示页不再覆盖首页缓存。 */
var CACHE = 'free-tools-v7';
var CORE = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './labs-data.js', './labs.js'];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) { return cache.addAll(CORE); }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) {
        return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // 第三方脚本（如 PeerJS CDN）不缓存
  if (req.mode === 'navigate') {
    // 站根/首页：优先走网络，避免旧版页面被缓存钉住；断网时回退缓存的首页。
    // 演示页（iframe 内打开）：同样网络优先，但按自己的 URL 缓存、断网时回退自己的缓存，
    // 这样演示打开过一次后离线也能再打开；且不再覆盖首页缓存。
    // 注意：不能用 endsWith('/index.html') 判断首页，因为 labs/*/index.html 也是这个名字。
    var shellUrl = new URL('./index.html', self.location.href).href;
    var rootUrl = new URL('./', self.location.href).href;
    var isShell = (req.url === shellUrl || req.url === rootUrl);
    event.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (cache) {
          cache.put(isShell ? './index.html' : req, copy);
        });
        return res;
      }).catch(function () { return caches.match(isShell ? './index.html' : req); })
    );
    return;
  }
  // 本站静态资源：缓存优先，后台静默更新
  event.respondWith(
    caches.match(req).then(function (cached) {
      var network = fetch(req).then(function (res) {
        if (res && res.status === 200) {
          var copy = res.clone();
          caches.open(CACHE).then(function (cache) { cache.put(req, copy); });
        }
        return res;
      }).catch(function () { return cached; });
      return cached || network;
    })
  );
});
