import './style.css';
import './cube.js';






const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const { name, email, message } = event.target;

  const body = JSON.stringify({
    name: name.value,
    email: email.value,
    message: message.value
  });
  const requestOptions = {
    method: "POST",
    body
  };

  fetch("https://qdlweyi09f.execute-api.us-east-1.amazonaws.com/emailpost", requestOptions)
    .then((response) => {
      if (!response.ok) throw new Error("Error in fetch");
      return response.json();
    })
    .then((response) => {
      document.getElementById("result-text").innerText =
        "Email sent successfully!";
      console.log(response);
    })
    .catch((error) => {
      document.getElementById("result-text").innerText =
        "An unkown error occured.";
      console.log(error);
    });
});