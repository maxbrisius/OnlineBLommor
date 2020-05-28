let flower_template;


window.onload = () => {

  flower_template = document.getElementById('flower_template').cloneNode(true);
  flower_template.setAttribute('id', '');
  flower_template.style.display = "";
  document.getElementById('flower_template').remove();

  //ladda in flowers.json filen
  let xhttp = new XMLHttpRequest();
  let flowers = [];

  xhttp.onreadystatechange = () => {
    if(xhttp.readyState == 4 && xhttp.status == 200) {
      try {
        flowers = JSON.parse(xhttp.responseText);
      }catch(e) {
        return console.error(e);
      }

      generateFlowers(flowers);
    }
  }

  xhttp.open('GET', "flowers.json", true);
  xhttp.send();
}

let generateFlowers = (flowers) => {
  const parent = document.getElementById('flowers_container');
  for(let flower of flowers) {
    let div = flower_template.cloneNode(true);
    div.innerHTML = div.innerHTML.replace('[name]', flower.name);
    div.innerHTML = div.innerHTML.replace('[price]', flower.price);
    div.innerHTML = div.innerHTML.replace('[alt]', flower.name);

    div.children[0].setAttribute('src', flower.image);

    div.addEventListener('click', () => {
      openPopup(flower);
    })

    parent.appendChild(div);
  }
}

let openPopup = (flower) => {
  //assign values

  document.getElementById('flower_popup_name').textContent = flower.name;

  document.getElementById('flower_popup_image').setAttribute('src', flower.image);
  document.getElementById('flower_popup_image').setAttribute('alt', flower.name);

  document.getElementById('flower_popup_price').textContent = "Pris: " + flower.price;

  document.getElementById('flower_popup_desc').textContent = flower.description;


  document.getElementById('flower_popup').style.display = "flex";
}

let closePopup = () => {
  document.getElementById('flower_popup').style.display = "none";
}

let currentTab = "home";

let switchTab = (name) => {
  document.getElementById(currentTab).classList.remove('open');
  document.getElementById(name).classList.add('open');
  currentTab = name;
}
