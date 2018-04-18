/* jshint esversion: 6 */

const staticCacheName = 'news-v2';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/images/logo.jpg',
                '/assets/css/animate.css',
                '/assets/css/font.css',
                '/assets/css/theme.css',
                '/assets/css/style.css',
                '/assets/css/bootstrap.min.css',
                '/assets/css/font-awesome.min.css',
                '/assets/css/animajquery.fancybox.css',
                '/assets/css/images/status.gif',
                '/assets/js/bootstrap.min.js',
                '/js/services/news.services.js',
                '/js/news.js',
                'news.sw.js',
                'service-worker-controller.js'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {

    let requestUrl = new URL(event.request.url);

    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event);
        })
    );

    let theQuestions = [];
    let thisObj  = this;
    function data() {
            let dbName = 'news';
            let request = indexedDB.open(dbName, 3);
            
            request.onsuccess = ((event) => {
                let db = event.target.result;
          
             db.transaction("news").objectStore("news").getAll().onsuccess = function(event) {
                
                let someQuestions = [];
                let news = event.target.result;
                thisObj.news = news;
                return news;
            };
            
        });
    }

    data();

    function paymentStatus() {
        let dbName = 'payment-status';
        let request = indexedDB.open(dbName, 3);
        
        request.onsuccess = ((event) => {
            let db = event.target.result;
      
         db.transaction("payment-status").objectStore("payment-status").getAll().onsuccess = function(event) {
            
            let paymentStat = [];
            let payment = event.target.result;
            thisObj.payment = payment;
            return payment;
            };
        
        });
    }

    paymentStatus();
    let payment = thisObj.payment;
    switch(payment.payment_history){
        case "paid":
            //check

            if(requestUrl.origin === location.origin) {
                if(requestUrl.pathname === '/src/index.html'){
                    event.respondWith(caches.match('/src/index.html'));
                    return;
                }
        
               else
                 if(requestUrl.pathname === '/src/index.html'){
                    return thisObj.news;
                }
            }
        
            event.respondWith(
                caches.match(event.request).then((response) => {
                    return response || fetch(event);
                })
            );


            //check
        break;
    }
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).then((response) => {
            if(response.status == 404) {
                return new Response("Not found");
            }
            return response;
        }).catch(() => {
            return new Response("Didn't work!");
        })
    );
});

