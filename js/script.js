document.addEventListener("DOMContentLoaded", () => {
    const listaUsuarios = document.getElementById("listaUsuarios");

    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(usuarios => {
            const usuariosModificados = usuarios.map(({ id, name, username, email, phone, company, address }) => {
                const edadAleatoria = Math.floor(Math.random() * (60 - 18 + 1)) + 18;
                const imgSrc = `./assets/img/${id}.jpeg`;
                
                return {
                    ...{ id, name, username, email, phone },
                    age: edadAleatoria,
                    img: imgSrc,
                    company: company.name,
                    address: `${address.street}, ${address.suite}, ${address.city}`
                };
            });

            usuariosModificados.forEach(({ name, age, username, img, phone, email, company, address }) => {
                const li = document.createElement("li");
                li.classList.add("usuario-card");
                li.innerHTML = `
                    <img src="${img}" alt="${name}">
                    <div class="usuario-info">
                        <strong>Nombre:</strong> ${name} <br>
                        <strong>Edad:</strong> ${age} años <br>
                        <strong>Usuario:</strong> ${username} <br>
                        <strong>Email:</strong> ${email} <br>
                        <strong>Teléfono:</strong> ${phone} <br>
                        <strong>Compañía:</strong> ${company} <br>
                        <strong>Dirección:</strong> ${address} <br>
                    </div>
                `;
                listaUsuarios.appendChild(li);
            });
        })
        .catch(error => console.error("Error al obtener los usuarios:", error));
});

