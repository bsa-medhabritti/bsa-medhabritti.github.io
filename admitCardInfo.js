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
  // console.log(id);
  const url = `https://ocwx.vercel.app/api/bsa/${id}`;

  const fetched = false;

  try {
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        showResponse(data.result);
        fetched = true;
      });
  } catch (error) {
    const data = {
      id: 24200103,
      trxID: "BAO0DNB8LE",
      email: "ms5918122@gmail.com",
      college: "MOSARRAF HOSSAIN KHAN CHOWDHURY DEGREE COLLEGE",
      year: "2nd Year",
      group: "Science",
      name: "Sabikun Nahar Sadia",
      phone: "01749587739",
      bkashNumber: "01303143379",
    };
    showResponse(data);
    console.log(error.message);
  }
};

function showResponse(d) {
  // console.log(d);

  let data = {
    id: 24200103,
    trxID: "BAO0DNB8LE",
    email: "ms5918122@gmail.com",
    college: "MOSARRAF HOSSAIN KHAN CHOWDHURY DEGREE COLLEGE",
    year: "2nd Year",
    group: "Science",
    name: "Sabikun Nahar Sadia",
    phone: "01749587739",
    bkashNumber: "01303143379",
  };

  let resultDiv = document.getElementById("result");

  // Creating elements for admitCardinfo
  let infoContent = document.createElement("div");
  infoContent.innerHTML = `<h2>ID: ${data.id}</h2>
  <h4>TrxID ${data.trxID}</h4>
  <p>Name: ${data.name}</p>
  <p>College: ${data.college}</p>
  <p>Year: ${data.year}</p>
  <p>Group/Department: ${data.group}</p>
  <div class="">
  <a href="./admit-card.html">Reset</a></div>
  <button onclick="printAdmit()">Print</button>
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
