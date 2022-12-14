const ul = document.querySelector("ul.list-group.mt-3");
const loading = document.querySelector("#loading");
const reload = document.querySelector("#reload");
const inputNome = document.getElementById("nomeCompleto");
const nomeUsuario = document.getElementById("userName");
const emailUsuario = document.getElementById("userEmail");
const form = document.querySelector("#form-user");
const modalBody = document.querySelector(".modal-body");

reload.onclick = async function (event) {
  event.preventDefault();
  loading.classList.replace("d-none", "d-flex");
  ul.innerHTML = "";
  setTimeout(getTodoList, 1000);
};

async function getTodoList() {
  try {
    const chamadaTodo = await fetch(
      "https://jsonplaceholder.typicode.com/todos"
    );
    const listaTodo = await chamadaTodo.json(); //array de objetos

    listaTodo.forEach(({ title, id, completed, userId }) => {
      const li = document.createElement("li");
      li.setAttribute("data-bs-toggle", "modal");
      li.setAttribute("data-bs-target", "#modalLindao");
      const badge = document.createElement("span");

      li.className = "list-group-item flex-grow-1";
      li.innerHTML = `${id} - ${title}`;

      badge.innerHTML = `${completed}`;
      li.append(badge);
      ul.appendChild(li);
      loading.classList.replace("d-flex", "d-none"); // após a api ser carregada trocamos a classe do loading

      if (completed == true) {
        badge.className = "badge bg-success";
      } else {
        badge.className = "badge bg-warning text-dark";
      }

      li.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
          const usuarioId = await fetch(
            `https://jsonplaceholder.typicode.com/users/${userId}`
          );
          const objetoUsuario = await usuarioId.json();

          inputNome.value = objetoUsuario.name;
          nomeUsuario.value = objetoUsuario.username;
          emailUsuario.value = objetoUsuario.email;
        } catch (error) {
          form.style.display = "none";
          modalBody.textContent =
            "Ops... Infelizmente não encontramos os dados desse usuário 😞";
          modalBody.style.color = "red";
        }
      });
    });
  } catch (error) {
    loading.classList.replace("d-flex", "d-none");
    const pMsg = document.createElement("p");
    ul.append(pMsg);
    pMsg.innerHTML = "Ops... Parece que o To do List está fora do ar 😞";
    pMsg.style.color = "red";
  }
}

window.onload = async function () {
  setTimeout(getTodoList, 2000);
};
