(function(service){

    function getData() {
        return service.getTechArticles()
            .then((resp) => {
                return resp;
            })
    }

    function createHTMLContent(){
      getData().then((response) => {
        let html;
        let latestPost = '';
        let sticker = '';

        response.articles.forEach(article => {
          html += `
                    <div class="single_iteam"> <a href="${article.url}"> <img src="${article.urlToImage}" alt=""></a>
                      <div class="slider_article">
                        <h2><a class="slider_tittle" href="${article.url}">${article.author}</a></h2>
                        <p>${article.description}</p>
                      </div>
                    </div>
                  `;

          latestPost += `
          <div class="latest_post_container">
          <div id="prev-button"><i class="fa fa-chevron-up"></i></div>
          <ul class="latest_postnav">
            <li>
              <div class="media"> <a href="${article.url}" class="media-left"> <img alt="" src="${article.urlToImage}"> </a>
                <div class="media-body"> <a href="${article.url}" class="catg_title">${article.description}</a> </div>
              </div>
            </li>
          </ul>
          <div id="next-button"><i class="fa  fa-chevron-down"></i></div>
        </div>
                `;

        sticker += `
        <li><a href="#"><img src="${article.urlToImage}" alt="">${article.title}</a></li>
        `;
            
              });
  
        let slickSlider = document.querySelector('.slick_slider');
        slickSlider.innerHTML = html;

        let latest = document.querySelector('#latest_post');
        latest.innerHTML = latestPost;

        let newsSticker = document.querySelector('#news_sticker');
        newsSticker.innerHTML = sticker;

      });
    }

    createHTMLContent();
})(newsService);