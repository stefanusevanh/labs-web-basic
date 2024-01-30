isUserLogged();
function isUserLogged() {
  const loginElement = document.getElementById("login-nav");
  const registerElement = document.getElementById("register-nav");
  const trackerElement = document.getElementById("tracker-nav");

  const loggedEmail = JSON.parse(localStorage.getItem("loggedEmail"));
  if (loggedEmail === null) {
    loginElement.classList.remove("is-logged");
    registerElement.classList.remove("is-logged");
    trackerElement.classList.remove("is-not-logged");

    loginElement.classList.add("is-not-logged");
    registerElement.classList.add("is-not-logged");
    trackerElement.classList.add("is-logged");
    return;
  }
  loginElement.classList.remove("is-not-logged");
  registerElement.classList.remove("is-not-logged");
  trackerElement.classList.remove("is-logged");

  loginElement.classList.add("is-logged");
  registerElement.classList.add("is-logged");
  trackerElement.classList.add("is-not-logged");
  return;
}
