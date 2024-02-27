import students from "./_regData.js";

function showResponse(phone) {
  let resultDiv = document.getElementById("result");
  // Creating elements for admitCardinfo
  let infoContent = document.createElement("div");
  let errorDiv = document.getElementById("error");
  let errorChild = document.createElement("div");
  let table = document.createElement("table");

  let pdfHeader = document.createElement("div");
  pdfHeader.setAttribute("id", "pdfHeader");
  pdfHeader.innerHTML = `
  <img src="./bsa-logo.jpg">
  <h3>BSA College Scholarship 2024 (Admit card)</h3>
  <p>Exam date: 1st March, 2024 [Friday]</p>
  <hr>

  `;

  let pdfFooter = document.createElement("div");
  pdfFooter.setAttribute("id", "pdfFooter");
  pdfFooter.innerHTML = `
  <hr>
  <p>Admit card generated from https://bsa-medhabritti.github.io</p>
  `;

  if (phone.length == 10) {
    const resByTrxID = students.filter((s) => {
      return s.trxID == phone;
    });

    if (resByTrxID.length == 1) {
      const data = resByTrxID[0];
      // check trxID
      let trxid = "Invalid";
      if (data.trxID.length == 10) {
        trxid = data.trxID;
      }

      infoContent.innerHTML = `
        <div class="name_roll">
        <h4>Name: ${data.name}</h4>
        <h4>Exam Roll: ${data.id}</h4>
        </div>
        <p>College: ${data.college}</p>
        <p>Year: ${data.year}</p>
        <p>Group/Department: ${data.group}</p>
        <h4>Contact: ${data.contact}</h4>
        <p>TrxID: ${trxid} </p>`;

      // appendChild and proceed
      resultDiv.style.display = "block";
      resultDiv.appendChild(pdfHeader);
      resultDiv.appendChild(infoContent);
      resultDiv.appendChild(pdfFooter);

      let printBtn = document.getElementById("generatePdf");
      printBtn.disabled = false;
      printBtn.style.display = "block";
    } else {
      errorChild.innerHTML = `<h4>No student found with  trxID ${phone}</h4>`;
      errorDiv.appendChild(errorChild);
    }
  } else if (phone.length === 11) {
    const result = students.filter((s) => {
      return s.contact == phone;
    });

    if (result.length == 1) {
      const data = result[0];

      // check trxID
      let trxid = "Invalid";
      if (data.trxID.length == 10) {
        trxid = data.trxID;
      }

      infoContent.innerHTML = `
      <div class="name_roll">
      <h4>Name: ${data.name}</h4>
      <h4>Exam Roll: ${data.id}</h4>
      </div>
      <p>College: ${data.college}</p>
      <p>Year: ${data.year}</p>
      <p>Group/Department: ${data.group}</p>
      <h4>Contact: ${data.contact}</h4>
      <p>TrxID: ${trxid} </p>`;

      // appendChild and proceed
      resultDiv.style.display = "block";
      resultDiv.appendChild(pdfHeader);
      resultDiv.appendChild(infoContent);
      resultDiv.appendChild(pdfFooter);

      let printBtn = document.getElementById("generatePdf");
      printBtn.disabled = false;
      printBtn.style.display = "block";
    }
    if (result.length > 1) {
      errorChild.innerHTML = `<h4>Multiple students found with same phone number</h4>
      <p>Identify the correct student from below & search again by trxID</p>`;

      table.innerHTML = `
      <tr>
      <th>Phone</th>
      <th>Name</th>
      <th>trxID</th>
      </tr>
      `;

      result.forEach((s) => {
        table.innerHTML += `
        <tr>
        <td>${s.contact}</td>
        <td>${s.name}</td>
        
        <td>${s.trxID}</td>
        </tr>
        `;
      });

      console.log("Multiple students found");
      console.log(result);

      // appendChild and proceed with error
      errorDiv.appendChild(errorChild);
      errorDiv.appendChild(table);
    }
  } else {
    errorChild.innerHTML = `<h4>No student found with ${phone}</h4>
    <p>Click Reset & Try agin with valid credentials</p>`;

    errorDiv.appendChild(errorChild);
  }
}

jQuery(document).ready(function () {
  $("reset").click(function () {

    location.go(0);

  });

  $("#searchBtn").click(function () {
    let searchBtn = document.getElementById("searchBtn");

    let phone = document.getElementById("phone").value;
    phone = phone.trim();
    // validate element
    if (phone.length < 10 || phone.length > 11) {
      alert("Please enter a 11 digit phone number or 10 digit trxID");
      return;
    }
    showResponse(phone);
    searchBtn.disabled = true;
    searchBtn.style.background = "grey";

  });
});
