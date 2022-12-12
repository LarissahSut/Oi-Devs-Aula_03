
// window.addEventListener("load", () => {

  // const progressbar = document.querySelector(".progress-bar")
  // const arrayProgress = []

  // for (let index = 0; index < 10; index++) {
  //     setTimeout(() => {
  //         arrayProgress.push(10)
  //         const percent = arrayProgress.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  //         progressbar.style.width = `${percent}%`
  //         progressbar.innerHTML = `${percent}%`
  //         if (percent == 100) {
  //             document.querySelector(".progress").style.display = "none"
  //         }
  //     }, index * 200)
  // }
  const ul = document.querySelector('ul.list-group.mt-3');
  const loading = document.querySelector('#loading');
  const reload = document.querySelector('#reload');


  reload.onclick = async function(event){
    event.preventDefault();
    loading.classList.replace("d-none", "d-flex");
    ul.innerHTML = "";
    setTimeout(getTodoList, 1000);
    
  }

  async function getTodoList(){
    const chamadaTodo = await fetch('https://jsonplaceholder.typicode.com/todos');
    const listaTodo = await chamadaTodo.json(); //array de objetos
    listaTodo.forEach(({title, id, completed, userId}) => {
      const li = document.createElement("li");
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

      return userId;
    });
  } 

  window.onload =  async function() {
    setTimeout(getTodoList, 2000);

  }

  const listali = document.getElementsByTagName("li");

  listali.onclick = console.log("cliquei");

  // const loading = document.querySelector("#loading")
  // setTimeout(() => {
          // await(response => response.json())
          // await(obj => {
  //             const ulParent = document.querySelector("ul")
  //             obj.forEach((todo, index) => {
  //                 loading.style.display = "none"
  //                 loading.removeAttribute("class")
  //                 const liChildElement = document.createElement("li")
  //                 liChildElement.className = "list-group-item"
  //                 liChildElement.innerHTML = `${index + 1} - ${todo.title}`
  //                 ulParent.append(liChildElement)
  //             });
             
  //         })
  // }, 2000)
// }) 
