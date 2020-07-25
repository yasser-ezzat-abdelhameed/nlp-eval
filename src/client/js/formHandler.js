async function handleSubmit(event) {
  event.preventDefault();
  console.log(event);

  let formText = document.getElementById("name").value;
  if (!Client.checkForName(formText)) {
    alert("Please enter text of 3 to 32 characters long!");
    return false;
  }

  const loaderElm = document.querySelector(".loading-indicator");
  loaderElm.className = "loading-indicator";

  const resultElm = document.querySelector("#results > div");
  resultElm.innerHTML = null;
  const response = await fetch(`/api/get-data`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ title: formText }),
  });
  const { data, error } = await response.json();
  if (data) {
    if (data.length) {
      const ulElem = document.createElement("ul");
      for (let { title, source } of data) {
        const liElm = document.createElement("li");
        liElm.innerText = `${title} - ${source}`;
        ulElem.appendChild(liElm);
      }
      resultElm.appendChild(ulElem);
    } else {
      resultElm.innerText = "Couldn't find a possible result for your search";
    }
  } else if (error) {
    resultElm.innerText = JSON.stringify(error);
  } else {
    resultElm.innerText = "Something went wrong, please try again later";
  }
  loaderElm.className = "loading-indicator hide";
  return true;
}

export { handleSubmit };
