let isIDVerified = false;
let extractedGender = "";

function processID() {
  const file = document.getElementById("idImage").files[0];
  const resultBox = document.getElementById("verifyResult");

  if (!file) {
    alert("Please upload an ID image.");
    return;
  }

  resultBox.innerHTML = "🔍 Reading ID...";

  Tesseract.recognize(file, 'eng')
  .then(({ data: { text } }) => {

    const txt = text.toLowerCase();

    if (txt.includes("female") || txt.includes("f ")) extractedGender = "Female";
    else if (txt.includes("male") || txt.includes("m ")) extractedGender = "Male";

    if (extractedGender === "Female") {
      isIDVerified = true;
      resultBox.style.color = "lightgreen";
      resultBox.innerHTML = "✔ ID Verified: FEMALE";
    } else {
      isIDVerified = false;
      resultBox.style.color = "red";
      resultBox.innerHTML = "❌ ID does not belong to a female.";
    }

  });
}

function signup() {
  if (!isIDVerified) {
    alert("Please verify your ID first.");
    return;
  }

  const name = document.getElementById("signupName").value;
  const user = document.getElementById("signupID").value;
  const pass = document.getElementById("signupPassword").value;

  if (!name || !user || !pass) {
    alert("Fill all details.");
    return;
  }

  const userData = {
    name,
    pass,
    verified: true,
  };

  localStorage.setItem("ws_user_" + user, JSON.stringify(userData));

  alert("Account created successfully!");
  window.location.href = "login.html";
}
