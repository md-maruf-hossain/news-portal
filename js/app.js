// catagory
const loadCatagories = () => {
  try {
    const url = "https://openapi.programming-hero.com/api/news/categories";
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayCatagories(data.data.news_category));
  } catch (error) {
    console.log(error);
  }
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
  try {
    const url = `https://openapi.programming-hero.com/api/news/category/${newsId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayClickedCatagory(data.data));
  } catch (error) {
    console.log(error);
  }
};

const displayClickedCatagory = (clickedCatagories) => {
  // console.log(clickedCatagories);
  const clickedCatagoriesSection = document.getElementById("news-container");
  clickedCatagoriesSection.textContent = "";
  // not found message
  const notFoundMessage = document.getElementById("not-found-message");
  if (clickedCatagories.length === 0) {
    notFoundMessage.classList.remove("d-none");
  } else {
    notFoundMessage.classList.add("d-none");
  }
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
                  ${clickedCatagory.author.name ? clickedCatagory.author.name : "No author found"} 
                  <br> 
                  ${clickedCatagory.author.published_date ? clickedCatagory.author.published_date : "no date found"}
                  </p>
                  </div>
                <div>
                  <i class="fa-sharp fa-solid fa-eye"> ${clickedCatagory.total_view}</i>
                    <div>
                      <i class="fa-sharp fa-solid fa-star"></i>
                      <i class="fa-sharp fa-solid fa-star"></i>
                      <i class="fa-sharp fa-solid fa-star"></i>
                      <i class="fa-sharp fa-solid fa-star"></i>
                      <i class="fa-regular fa-star"></i>
                    </div>
                    <button type="button" class="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="news_id('${clickedCatagory._id}')">More Details</button>
                </div>
                  </div>
          </div>
      </div>
    `;
    clickedCatagoriesSection.appendChild(clickedCatagoriesDiv);
  }
};
const news_id = (news_id) => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayModal(data.data));
  } catch (error) {
    console.log(error);
  }
};
const displayModal = (modals) => {
  console.log(modals);
  const modalContainer = document.getElementById("modal-body");
  modalContainer.textContent = "";
  for (const modal of modals) {
    const modalDiv = document.createElement("div");
    modalDiv.innerHTML = `
    <h5>News Title: ${modal.title}</h5>
    <p class= "fs-5">News Author: ${modal.author.name}</p>
    <p class= "fs-5">Oublished Date: ${modal.author.published_date}</p> 
    `;
    modalContainer.appendChild(modalDiv);
  }
};

loadCatagories();
