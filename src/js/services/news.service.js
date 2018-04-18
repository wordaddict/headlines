const newsService = (function(){
    const BASE_URL = "https://newsapi.org/v2"
    const returnObj = {
        getTechArticles: getTechArticles
    }

    function getTechArticles(){
        return fetch(BASE_URL+ '/top-headlines?sources=techcrunch&apiKey=3abeaad22d4c439ca3655beb8cbe267d').then(function(response){
            return(response.json());
        }).then(function(response) {
            let dbName = "news";

            let request = indexedDB.open(dbName, 3);
    
            request.onerror = ((event) => {
               console.log('IndexDB error', event);
            });
    
            request.onsuccess = ((event) => {
               let db = event.target.result;
               let transaction = db.transaction("news", "readwrite");
               let questionObjectStore = transaction.objectStore("news");
               response.articles.forEach((quest) => {
                   questionObjectStore.add(quest, quest.title);
              });
            });
    
            request.onupgradeneeded = ((event) => {
                let db = event.target.result;
               const objectStore  = db.createObjectStore("news");
            });

            return response;
        }).catch(function (err) {
            console.log('error geting api', err);
        });
    };
    return returnObj;
})();