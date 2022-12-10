
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
    getTodoList();
    
  }

  async function getTodoList(){
    const chamadaTodo = await fetch('https://jsonplaceholder.typicode.com/todos');
    const listaTodo = await chamadaTodo.json(); //array de objetos
    listaTodo.forEach(({title, id}) => {
      const li = document.createElement("li");

      li.className = "list-group-item";
      li.innerHTML = `${id} - ${title}`;
      ul.appendChild(li);
      loading.classList.replace("d-flex", "d-none"); // após a api ser carregada trocamos a classe do loading
    });
  }

  window.onload =  async function() {
    setTimeout(getTodoList, 2000);
  }


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
