const socketClient= oi();
 
const form = document.getElementById("form");
const inputName = document.getElementById("name");
const inputPrice = document.getElementById("price");

form.onsubmit = (e) => {
  e.preventDefault();
  const userName = inputName.value;
  const price = inputPrice.value;
  socketClient.emit("firstEvent", userName,price);
};

socketClient.on("secondEvent", (info) => {
    console.log(`New info: ${info}`);
});

const deleteButton = document.getElementById("deleteButton");

deleteButton.addEventListener("click", () => {
  const userName = inputName.value; 
  const price = inputPrice.value; 

  socketClient.emit("deleteProduct", { userName, price });
});