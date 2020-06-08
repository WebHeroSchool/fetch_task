const input = document.getElementById('input');
const btn = document.getElementById('btn');
const urlName = window.location.search || '?username=snypoon';
const preloader = document.querySelector('.preloader');
const active = () => preloader.classList.toggle('active');

const gitHubFinder = (urlName) => {
  const userName = urlName.split('=')[1];
  const name = document.getElementById('name');
  const url = fetch(`https://api.github.com/users/${userName}`);
  const bio = document.getElementById('bio');
  const img = document.getElementById('img');
  const date = document.getElementById('date');
  const getDate = new Promise ((resolve) => {
    setTimeout(() => resolve(date.innerHTML = new Date), 1000);
   })
     
  Promise.all([url, getDate])
    .then(([response]) => response)
    .then(response => {
      if(response.ok){
        return response.json();
      } else {
        alert('"Информация о пользователе не доступна"');
      }
    })
    .then(json => {
      name.innerHTML = json.name;
      name.href = json.html_url;
      bio.innerHTML = json.bio;
      img.src = json.avatar_url;
    })
    .finally(() => {
      setTimeout(() => active(), 1000);
    })
    .catch(error => {
      console.log('Error:', error);
    })
  }

btn.addEventListener('click', () => {
  gitHubFinder(`?username=${input.value}`);
  active();
  input.value = "";
}); 

input.addEventListener('keydown', (keydown) => {
  if(keydown.keyCode == 13){
    gitHubFinder(`?username=${input.value}`);
    active();
    input.value = "";
  }
}); 

gitHubFinder(urlName);





