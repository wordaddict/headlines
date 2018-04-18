/* jshint esversion: 6 */

navigator.serviceWorker.register('./news.sw.js')
    .then((reg) => {
        //If no controller, the page wasn't loaded via a service worker, exit!
        if(!navigator.serviceWorker.controller){
            return;
        }

        // If there is an updated worker already waiting,Please use
        if(reg.waiting){
            return alert('Update ready!');
        }

        function trackInstalling(worker) {
            worker.addEventListener('statechange', () => {
                if(worker.state == 'installed') {
                    return alert('Update ready!');
                }
            });
        }
        // Progress of an updated service worker installing
        if (reg.installing) {
            trackInstalling(reg.installing);
            return; 
        }

        //Otherwise listen for new installing workers arriving
        reg.addEventListener('updatefound', () => {
            trackInstalling(reg.installing);
        });

        console.log('Registered');
    }).catch((err) => {
        console.log(err, 'Not registered!');
    });