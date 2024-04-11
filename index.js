const loadBtn = document.querySelector(".load");
const loadBtnTwo = document.querySelector(".loadsecond");
const row = document.getElementById("row");

const funcForImage = (URL) => {
  fetch(URL, {
    method: "GET",
    body: JSON.stringify(),
    headers: {
      "Content-Type": "application/json",
      Authorization: "DdTHefpqhY4ypHGt4Y5HnQlVULMt8pE1z01GvGZOMg2dXMsAjf8AwyJI",
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Errore nella fetch");
      }
    })
    .then((data) => {
      console.log(data);

      data.photos.forEach((obj) => {
        const img = obj.src.medium;
        const title = obj.photographer;
        const description = obj.alt;
        const id = obj.id;

        const div = document.createElement("div");
        div.classList.add("col-md-4");

        div.innerHTML = `<div class="card">
            <img src= ${img} class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${description}</p>
            <div class="btn-group">
            <button
            type="button"
            class="btn btn-sm btn-outline-secondary"
            >
            View
            </button>
            <button
            type="button"
            id="btnHide"
            class="btn  btn-sm  btn-outline-secondary"
            >
            Hide
            </button>
            </div>
            <small class="text-muted">${id}</small>
            </div>
            </div> `;

        row.appendChild(div);
      });
    })
    .then(() => {
      //tasto hide
      const btnHide = document.querySelectorAll("#btnHide");
      console.log(btnHide);
      btnHide.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const card = e.target.parentNode.parentNode.parentNode.parentNode;
          card.remove();
        });
      });
    })
    .catch((err) => console.log(err));
};
window.onload = () => {
  loadBtn.addEventListener("click", (URL) => {
    funcForImage("https://api.pexels.com/v1/search?query=games");
  });
  loadBtnTwo.addEventListener("click", (URL) => {
    funcForImage("https://api.pexels.com/v1/search?query=party");
  });
};
