let input = document.getElementById('input');
let btn = document.getElementById('btn');
btn.addEventListener('click', () => {
  urlName = `?username=${input.value}`;
}); 



let urlName = window.location.search;
if(urlName == ''){
  urlName = '?username=snypoon';
}
let userName = urlName.split('=')[1];
let url = `https://api.github.com/users/${userName}`;
let name = document.getElementById('name');
let bio = document.getElementById('bio');
let img = document.getElementById('img');

fetch(url)
  .then(response => {
    if(response.ok){
      return response.json()
    } else {
      return alert('"Информация о пользователе не доступна"')
    }
  })
  .then(json => {
    name.innerHTML = json.name,
    name.href = json.html_url,
    bio.innerHTML = json.bio,
    img.src = json.avatar_url
  })
  .catch(error => {
    console.log(error)
  })




