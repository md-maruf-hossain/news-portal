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
    .then((data) => displayClickedCatagory(data.data[0]));
};

const displayClickedCatagory = (clickedCatagories) => {
  console.log(clickedCatagories);
};

loadCatagories();

