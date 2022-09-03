// catagory
const loadCatagories = () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCatagories(data.data.news_category));
};

function displayCatagories(catagories) {
  // console.log(catagories)
  const catagorySection = document.getElementById("catagory-section");
  for (const catagory of catagories) {
    const catagoryDiv = document.createElement("div");
    catagoryDiv.innerHTML = `
    <a class="nav-link" href="#" onclick="clickedCatagoryLoad('${catagory.category_id}')">${catagory.category_name}</a>
    `;
    catagorySection.appendChild(catagoryDiv);
  }
}

const clickedCatagoryLoad = (newsId) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${newsId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayClickedCatagory(data.data));
};

const displayClickedCatagory = (clickedCatagories) => {
  console.log(clickedCatagories);
  const clickedCatagoriesSection = document.getElementById("news-container");
  clickedCatagoriesSection.textContent = "";
  for (const clickedCatagory of clickedCatagories) {
    const clickedCatagoriesDiv = document.createElement("div");
    clickedCatagoriesDiv.classList.add("col");
    clickedCatagoriesDiv.innerHTML = `
    <div class="card">
        <img src="${clickedCatagory.image_url}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${clickedCatagory.title.length > 30 ? clickedCatagory.title.slice(0, 40) + "..." : clickedCatagory.title}</h5>
            <p class="card-text">${clickedCatagory.details.length > 30 ? clickedCatagory.details.slice(0, 100) + "..." : clickedCatagory.details}</p>
              <div class="d-flex justify-content-between">
                <div>
                  <img class ="author-img me-2" src ="${clickedCatagory.author.img}">
                  <p>
                  ${clickedCatagory.author.name ? clickedCatagory.author.name : 'No author found'} 
                  <br> 
                  ${clickedCatagory.author.published_date ? clickedCatagory.author.published_date : "no date found"}
                  </p>
                  </div>
                <div>
                  <i class="fa-sharp fa-solid fa-eye">${clickedCatagory.total_view}</i>
                    <div>
                      <i class="fa-sharp fa-solid fa-star"></i>
                      <i class="fa-sharp fa-solid fa-star"></i>
                      <i class="fa-sharp fa-solid fa-star"></i>
                      <i class="fa-sharp fa-solid fa-star"></i>
                      <i class="fa-regular fa-star"></i>
                    </div>
                    <button type="button" class="btn btn-primary mt-2">Details</button>
                </div>
                  
                  </div>
          </div>
      </div>
    `;
    clickedCatagoriesSection.appendChild(clickedCatagoriesDiv);
  }
};
loadCatagories();
