/*
Copyright 2016 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
(function() {
  'use strict';
   var CACHE_NAME = 'staticCache';
   var urlsToCache = ['.', 'index.html', 'assets/style.css'];

   var fetchAndCache = function(url){
    return fetch(url)
   .then(function(response){
      if (!response.ok) {
        throw Error(response.statusText);
      }
      
      return caches.open(CACHE_NAME)
      .then(function(cache){
        cache.put(url, response.clone());
        return response;
      });
    })
    .catch(function(err) { 
      console.log('Request failed : ', err);
    });
  }

  // TODO - 3.1: Add install and activate event listeners
  self.addEventListener('install', function(event){ 
    console.log('Installing the service worker...');
    event.waitUntil(
      caches.open(CACHE_NAME)
      .then(function(cache){
        return cache.addAll(urlsToCache);
      })
      .catch(function(err){
        console.log(err);
      })
    );
  });


  self.addEventListener('activated', function(event) {
    console.log('Service worker has been activated');
  });

  // TODO - 3.3: Add a comment to change the service worker
  // I'am a new service worker
  self.skipWaiting();
  // TODO - 4: Add fetch listener
  self.addEventListener('fetch', function(event) { 
    console.log('A fetch event occured : ' + event.request.url);
    event.respondWith(
      caches.match(event.request)
      .then(function(response){
        //return response || fetch(event.request);
        return response || fetchAndCache(event.request);
      })
    );
  });


})();
