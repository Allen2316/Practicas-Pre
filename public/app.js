(() => {
    document.addEventListener("DOMContentLoaded", () => {
        console.log("listo");
        let today = new Date();
        let dia = today.getDate();
        let mes = (today.getMonth() + 1);
        dia = ("0" + dia).slice(-2);
        mes = ("0" + mes).slice(-2);
        let horas = today.getHours();
        let minutos = today.getMinutes();
        let segundos = today.getSeconds();
        horas = ("0" + horas).slice(-2);
        minutos = ("0" + minutos).slice(-2);
        segundos = ("0" + segundos).slice(-2);
        let date = today.getFullYear() + '-' + mes + '-' + dia;
        let time = horas + ':' + minutos + ':' + segundos;
        let date_registered = date + ' ' + time;

        listar();
        function listar() {
            fetch("http://localhost:8000/api/")
                .then(response => response.json())
                .then(data => {
                    const tblUsers = document.getElementById("tblUsers");
                    if (tblUsers) {
                        tblUsers.innerHTML = "";
                        data.forEach(user => {

                            tblUsers.innerHTML += `
                <tr user_id=${user.user_id}>
                    <th scope="row">${user.user_id}</th>
                    <td>${user.username}</td>
                    <td>${user.first_name}</td>
                    <td>${user.last_name}</td>
                    <td>${user.email}</td>
                    <td>${user.profile_pic}</td>
                    <td>
                        <button class="btn btn-warning btnPoemas">Ver Lista</button> </td>
                    <td>
                        <button class="btn btn-primary btnUpdate" data-bs-toggle="modal" data-bs-target="#modalEdit">Editar</button>                    
                        <button class="btn btn-danger btnDelete" data-bs-toggle="modal" data-bs-target="#modalDelete">Eliminar</button></td>
                </tr>`;
                        })
                    }
                    irPoe();
                    edit();
                    delet();
                })

        }

        const btnRegUser = document.getElementById("btnRegUser");
        if (btnRegUser) {
            btnRegUser.addEventListener("click", (e) => {
                e.preventDefault();
                let first_name = document.getElementById("first_name").value;
                console.log(first_name);
                let last_name = document.getElementById("last_name").value;
                let email = document.getElementById("email").value;
                let username = document.getElementById("username").value;
                let pass_phrase = document.getElementById("pass_phrase").value;
                let is_admin = 0;
                let profile_pic = document.getElementById("profile_pic").value;
                let registration_confirmed = 1;
                const data = {
                    user_id: null,
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    username: username,
                    pass_phrase: pass_phrase,
                    is_admin: is_admin,
                    date_registered: date_registered,
                    profile_pic: profile_pic,
                    registration_confirmed: registration_confirmed
                }
                fetch("http://localhost:8000/api/", {
                    method: "post",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data != null) {
                            window.alert("Hecho");
                            document.getElementById("frmUser").reset();
                        }
                    });

                let us_id;
                fetch("http://localhost:8000/api/user")
                    .then(res => res.json())
                    .then(data => {
                        us_id = data[0].user_id
                        console.log(us_id);
                        const data_token = {
                            token_id: null,
                            token: "Generar token aqui",
                            user_id: us_id,
                            token_expires: date_registered

                        }
                        fetch("http://localhost:8000/api/token", {
                            method: "post",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data_token)
                        }).then(res => res.json())
                            .then(data => {
                                console.log(data);
                            });
                    });
            });
        }

        function edit() {
            const btnUpdate = document.getElementsByClassName("btnUpdate");
            if (btnUpdate) {
                for (let i = 0; i < btnUpdate.length; i++) {
                    btnUpdate[i].addEventListener("click", (e) => {
                        e.preventDefault();
                        id = btnUpdate[i].parentElement.parentElement.getAttribute("user_id")
                        id = parseInt(id, 10);
                        console.log(id);
                        let first_name;
                        let last_name;
                        let email;
                        let username;
                        let pass_phrase;
                        let is_admin;
                        let date_registered;
                        let profile_pic;
                        let registration_confirmed;
                        fetch("http://localhost:8000/api/user/" + id)
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                                first_name = document.getElementById("first_name").value = data[0].first_name;

                                last_name = document.getElementById("last_name").value = data[0].last_name;
                                email = document.getElementById("email").value = data[0].email;
                                username = document.getElementById("username").value = data[0].username;
                                pass_phrase = document.getElementById("pass_phrase").value = data[0].pass_phrase;
                                is_admin = data[0].is_admin;
                                date_registered = data[0].date_registered;
                                date_registered = date_registered.replace("T", " ");
                                date_registered = date_registered.replace("0Z", " ");
                                profile_pic = document.getElementById("profile_pic").value = data[0].profile_pic;
                                registration_confirmed = data[0].registration_confirmed;

                                const btnGuardarEdit = document.getElementById("btnGuardarEdit");


                                btnGuardarEdit.addEventListener("click", (e) => {
                                    first_name = document.getElementById("first_name").value;
                                    last_name = document.getElementById("last_name").value;
                                    email = document.getElementById("email").value;
                                    username = document.getElementById("username").value;
                                    pass_phrase = document.getElementById("pass_phrase").value;
                                    is_admin = is_admin;
                                    date_registered = date_registered;
                                    profile_pic = document.getElementById("profile_pic").value;
                                    registration_confirmed = registration_confirmed;
                                    e.preventDefault();
                                    const data = {
                                        user_id: id,
                                        first_name: first_name,
                                        last_name: last_name,
                                        email: email,
                                        username: username,
                                        pass_phrase: pass_phrase,
                                        is_admin: is_admin,
                                        date_registered: date_registered,
                                        profile_pic: profile_pic,
                                        registration_confirmed: registration_confirmed
                                    }
                                    fetch("http://localhost:8000/api/" + id, {
                                        method: "PUT",
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(data)
                                    })
                                        .then(response => response.json())
                                        .then(data => {
                                            listar();
                                        })
                                });

                            });

                    });
                }
            }

        }

        function delet() {
            const btnDelete = document.getElementsByClassName("btnDelete");
            if (btnDelete) {
                for (let i = 0; i < btnDelete.length; i++) {
                    btnDelete[i].addEventListener("click", (e) => {
                        e.preventDefault();

                        const modalEliminar = document.getElementById("modalEliminar");
                        modalEliminar.addEventListener("click", (e) => {
                            e.preventDefault();
                            id = btnDelete[i].parentElement.parentElement.getAttribute("user_id")
                            id = parseInt(id, 10);
                            console.log(id);
                            fetch("http://localhost:8000/api/" + id, {
                                method: "DELETE",
                            })
                                .then(response => response.json())
                                .then(data => {
                                    listar();
                                })
                        });
                    });

                }
            }
        }


        /* poems */
        let id = -1;
        function irPoe() {
            const btnVer = document.getElementsByClassName("btnPoemas");
            if (btnVer) {
                for (let i = 0; i < btnVer.length; i++) {
                    btnVer[i].addEventListener("click", (e) => {
                        e.preventDefault();
                        id = btnVer[i].parentElement.parentElement.getAttribute("user_id")
                        console.log(id);
                        window.location.href = "poem" + id;
                    });
                }

            }
        }

        const categories = document.getElementById("categories");
        if (categories) {
            categories.innerHTML = "";
            fetch("http://localhost:8000/api/category")
                .then(response => response.json())
                .then(data => {
                    data.forEach(cat => {
                        categories.innerHTML += `
                    <option value="${cat.category_id}">${cat.category}</option>
                    `;
                    });
                });
        }

        const regPoem = document.getElementById("regPoem");
        if (regPoem) {
            regPoem.addEventListener("click", e => {
                e.preventDefault();
                let title = document.getElementById("title").value;
                let poem = document.getElementById("poem").value;
                let date_submitted = date_registered;
                let category_id = document.getElementById("categories").value;
                let user_id = window.location.toString().slice(-1);
                let date_approved = date_registered;
                const data = {
                    poem_id: null,
                    title: title,
                    poem: poem,
                    date_submitted: date,
                    category_id: category_id,
                    user_id: user_id,
                    date_approved: date_approved
                }

                fetch("http://localhost:8000/api/poems", {
                    method: "post",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data != null) {
                            window.alert("Hecho");
                            document.getElementById("frmPoem").reset();
                        }
                        listarPoe();
                    });
            });
        }

        listarPoe();
        function listarPoe() {
            const tblPoems = document.getElementById("tblPoems");
            if (tblPoems) {

                tblPoems.innerHTML = "";
                let id = window.location.toString().slice(-1);
                console.log(id);
                let cat = "";
                fetch(`http://localhost:8000/api/poems/${id}/`)
                    .then(response => response.json())
                    .then(data => {
                        data.forEach(poem => {
                            fetch(`http://localhost:8000/api/category/${poem.category_id}`)
                                .then(response => response.json())
                                .then(data => {
                                    cat = data[0].category;
                                    console.log(cat);
                                    tblPoems.innerHTML += `
                                        <tr poem_id=${poem.poem_id}>                                        
                                        <th scope="row">${poem.poem_id}</th>
                                        <td>${poem.title}</td>
                                        <td>${poem.poem}</td>
                                        <td>${cat}</td>
                                        `;
                                });

                        })
                    })
            }
        }



        /* categorias */
        listarCat();
        function listarCat() {
            const tblCategory = document.getElementById("tblCategory");
            if (tblCategory) {
                tblCategory.innerHTML = "";
                fetch("http://localhost:8000/api/category")
                    .then(response => response.json())
                    .then(data => {
                        data.forEach(category => {
                            tblCategory.innerHTML += `
                        <tr category_id=${category.category_id}>                                        
                        <th scope="row">${category.category_id}</th>
                        <td>${category.category}</td>                        
                        `;
                        });
                    });
            }
        }

        const regCat = document.getElementById("regCat");
        if (regCat) {
            regCat.addEventListener("click", e => {
                e.preventDefault();
                let category = document.getElementById("category").value;
                const data = {
                    category_id: null,
                    category: category
                }
                fetch("http://localhost:8000/api/category", {
                    method: "post",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data != null) {
                            document.getElementById("frmCat").reset();
                            window.alert("Hecho");
                        }
                        listarCat();
                    });
            });
        }


        /* AQUI LA API DE Nodo */

        /* fetch("https://cors-anywhere.herokuapp.com/http://45.161.32.194:8086/account/")
            .then(response => response.json())
            .then(data => {
                console.log(data);
            }); */

        /* let xhr;
        if (window.XMLHttpRequest) xhr = new XMLHttpRequest();
        else xhr = new ActiveXObject("Microsoft.XMLHTTP");

        xhr.open("GET", "https://cors-anywhere.herokuapp.com/http://45.161.32.194:8086/account/");

        xhr.addEventListener("load", data =>{
            console.log(data.target.response);
        });

        xhr.send(); */

        /* ---------------------- */
    });
})();