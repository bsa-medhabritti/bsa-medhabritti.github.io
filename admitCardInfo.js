// fetch data here

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Permissions-Policy":
      "ch-ua-form-factor,ch-ua-full-version=*,ch-ua-platform=*,ch-ua-platform-version=*,ch-ua-model=*,ch-ua-mobile=false,ch-ua-bitness=*",
  },
};

const getData = async (id) => {
  // const params = new URLSearchParams(window.location.search);

  // const id = params.get("id");
  console.log(id);
  const url = `https://ocwx.vervel.app/api/bsa/${id}`;

  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      showResponse(data.data);
    });
};

function showResponse(data) {
  console.log(data);
  let resultDiv = document.getElementById("result");

  // Creating elements for admitCardinfo
  let infoContent = document.createElement("div");
  infoContent.innerHTML = `<h2>ID: ${data.id}</h2>
  <p>TrxID${data.trxID}</p>
  <p>Name: ${data.name}</p>
  <p>College: ${data.college}</p>
  <p>Year: ${data.year}</p>
  <p>group: ${data.group}</p>
  <div class="course-info-link"><a href="./videos.html?id=${data.name}">Tutorials</a>
  <a href="./resources.html?id=${data.name}">Resources</a></div>
  </div>`;

  resultDiv.appendChild(infoContent);
}

const form = document.getElementById("searchForm");
form.addEventListener("submit", onFormSubmit);
async function onFormSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const obj = Object.fromEntries(data.entries());
  console.log(obj);

  getData(obj.id);
}
