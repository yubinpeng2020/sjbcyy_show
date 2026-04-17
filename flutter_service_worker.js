'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "f0d78b660c263a27ecc47f7deb3b3088",
"ws_logo.png": "fdc36e85902538f0cbd2148e5ba12b83",
"version.json": "5939b3fe96b7fef0c834354123d86499",
"main.dart.js_6.part.js": "fced874e8bd11de3e91f712166a9506a",
"index.html": "b0181e633c7328abbb42df53331e7521",
"/": "b0181e633c7328abbb42df53331e7521",
"main.dart.js_4.part.js": "e47be1841d379dd4536bf9535f69a488",
"main.dart.js": "83c93cfc29cde57328e2de46da58afed",
"404.html": "0a27a4163254fc8fce870c8cc3a3f94f",
"flutter.js": "83d881c1dbb6d6bcd6b42e274605b69c",
"main.dart.js_5.part.js": "a20b263c5bb5ce5298543c02fc16289b",
"icons/ws_icon.png": "b64a3837a2597e1b32adb37c79ddf6ae",
"manifest.json": "2aeb825b406eb7ed9a9e476e6ac59f0c",
"main.dart.js_1.part.js": "ba3468ede8864fa7da0f873b2e14a01a",
"assets/AssetManifest.json": "6acfe3313c2d5306bf55171b7360bc22",
"assets/NOTICES": "497c5568057cae750c75acb8767147cb",
"assets/FontManifest.json": "97bebd745934dc1784cbc29a45b32c9a",
"assets/AssetManifest.bin.json": "788a74de0b12f73e275206fda74e4c4e",
"assets/packages/flutter_gallery_assets/fonts/GalleryIcons.ttf": "5750220c0cbb3762ca4f060af8efc2ab",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "f1126486ccebd15d203af7169b536fc2",
"assets/packages/ws_sjbcyy/fonts/iconfont.json": "382d407fb41ff18c2c3c81c3c38d39fe",
"assets/packages/ws_sjbcyy/fonts/iconfont.ttf": "7d9d5388ac151b9cb63fca515a160a02",
"assets/packages/ws_sjbcyy/assets/logo/ws_logo.png": "f3bcc37d8fa3a69584018b928c9344f2",
"assets/packages/ws_sjbcyy/assets/logo/ws_logo_color.png": "f3bcc37d8fa3a69584018b928c9344f2",
"assets/packages/ws_sjbcyy/assets/material/project_qrcode.png": "02c44c4842592d56a69ccc66efd6f860",
"assets/packages/ws_sjbcyy/assets/material/qqtouxiang.jpeg": "5babd21e4b95279cd800358a52bb78e0",
"assets/packages/ws_sjbcyy/assets/material/id_photo.jpg": "b9450afc75dd4b925bfa30aac873bd32",
"assets/packages/ws_sjbcyy/assets/material/courseware_code.png": "51360c70bea9c588b99acd5563c98b34",
"assets/packages/ws_sjbcyy/assets/material/weixin_gzh.jpg": "f8e3406ad35f6563bd47e5d8fa47120d",
"assets/packages/ws_sjbcyy/assets/material/homework_check.jpg": "c0a482b638bf7a163e27854079850555",
"assets/packages/ws_sjbcyy/assets/material/homework_check_code.png": "a18461a5ed5ab9489b85c4dbad785de6",
"assets/packages/ws_sjbcyy/assets/material/wechat_gzh_qrcode.jpg": "55afc653bd1c214561593f8d83ef1a2a",
"assets/packages/flutter_sound_web/howler/howler.js": "2bba823e6b4d71ea019d81d384672823",
"assets/packages/flutter_sound_web/src/flutter_sound_recorder.js": "f7ac74c4e0fd5cd472d86c3fe93883fc",
"assets/packages/flutter_sound_web/src/flutter_sound_player.js": "6bf84579813fd481ec5e24e73927500d",
"assets/packages/flutter_sound_web/src/flutter_sound.js": "aecd83c80bf4faace0bcea4cd47ab307",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "523e87f530587bf054f85d5bf78d223d",
"assets/fonts/MaterialIcons-Regular.otf": "1ffd436cc4e1c723979efa93fa4b3906",
"assets/assets/mp3/song1.mp3": "92e3b95fbff6b9139cc40bbfc313c92d",
"main.dart.js_2.part.js": "ffdb47cc480014b9be8170a97bb54b7b",
"canvaskit/skwasm.js": "ea559890a088fe28b4ddf70e17e60052",
"canvaskit/skwasm.js.symbols": "9fe690d47b904d72c7d020bd303adf16",
"canvaskit/canvaskit.js.symbols": "27361387bc24144b46a745f1afe92b50",
"canvaskit/skwasm.wasm": "1c93738510f202d9ff44d36a4760126b",
"canvaskit/chromium/canvaskit.js.symbols": "f7c5e5502d577306fb6d530b1864ff86",
"canvaskit/chromium/canvaskit.js": "8191e843020c832c9cf8852a4b909d4c",
"canvaskit/chromium/canvaskit.wasm": "c054c2c892172308ca5a0bd1d7a7754b",
"canvaskit/canvaskit.js": "728b2d477d9b8c14593d4f9b82b484f3",
"canvaskit/canvaskit.wasm": "a37f2b0af4995714de856e21e882325c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
