const endPoint = "https://jsonplaceholder.typicode.com/users"
const listaUsuarios = document.getElementById("listaUsuarios")
const minAge = 18
const maxAge = 65
const getAgeRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);


function getUsers () {
  return fetch(endPoint)
  .then(response => {
    if(!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
    return response.json()
  })
}

getUsers().then(users => {
  const results = users.map(user => {
    const { id } = user
    const { street, suite, city } = user.address
    const newUser = {
      ...user,
      age: getAgeRandom(minAge, maxAge),
      img: `../assets/img/${id}.jpeg`,
      address: `${city} ${street} ${suite}`
    }

    const {name, img, age, address, username, phone, email} = newUser
    return template(name, img, age, address, username, phone, email)
  });
  listaUsuarios.innerHTML = results.join("")


}).catch(err => console.error(err))

function template (name, img, age, address, username, phone, email) {
  return `
    <li>
    <div class="container">
      <div class="info">
        <h2>name: ${name}</h2>
        <p>username: ${username}</p>
        <p>age: ${age}</p>
        <p>phone: ${phone}</p>
        <p>email: ${email}</p>
      </div>
      <div class="image">
        <img src=${img} alt=${name} />
      </div>

    </div>
    
      <p>address: ${address}</p>
    
    </li>
    `
}
