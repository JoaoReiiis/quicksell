async function getUser() {
    let key = "Authorization";
    const id = await fetch("http://3.92.139.182:8080/user", {
        method: "GET",
        headers: new Headers({
            Authorization: localStorage.getItem(key),
        }),
    });

    var userId = await id.json();

    const response = await fetch(`http://3.92.139.182:8080/user/${userId}`, {
        method: "GET",
        headers: new Headers({
            Authorization: localStorage.getItem(key),
        }),
    });

    var data = await response.json();
    buildTable(data);
}

getUser();


async function atualizarSenha() {
    const { value: atualizarSenha } = await Swal.fire({
        title: "Insira a sua nova senha",
        html: `
        <input id="password" class="swal2-input" placeholder="Password">   
        `,
        focusConfirm: false,
    });

    if (atualizarSenha) {
        let password = document.getElementById("password").value;
        let key = "Authorization";

        const id = await fetch("http://3.92.139.182:8080/user", {
            method: "GET",
            headers: new Headers({
                Authorization: localStorage.getItem(key),
            }),
        });

        var userId = await id.json();

        const response = await fetch(`http://3.92.139.182:8080/user/${userId}`, {
            method: "PUT",
            headers: new Headers({
                "Content-Type": "application/json; charset=utf8",
                Accept: "application/json",
                Authorization: localStorage.getItem(key),
            }),
            body: JSON.stringify({
                password: password,
            }),
        });

        if (response.status == 204) {
            Swal.fire({
                icon: "success",
                title: "Tudo certo!",
                text: "Seu produto foi atualizado com sucesso!"
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...Parece que algo deu errado",
                text: "Seu produto nao foi atualizado"
            });
        }
    }
}

async function deletarUser() {
    const { value: deleteUser } = await Swal.fire({
        title: "Informe o ID do produto.",
        html: `
        <input id="id" class="swal2-input" placeholder="ID">   
        `,
        focusConfirm: false,
    });

    if (deleteUser) {
        let id = document.getElementById("id").value;
        let key = "Authorization";
        
        const response = await fetch(`http://3.92.139.182:8080/user/${id}`, {
            method: "DELETE",
            headers: new Headers({
                Authorization: localStorage.getItem(key),
            })
        });

        if (response.status == 204) {
            Swal.fire({
                icon: "success",
                title: "Tudo certo!",
                text: "Seu produto foi deletado com sucesso."
            });
        } else{
            Swal.fire({
                icon: "error",
                title: "Oops...Parece que algo deu errado",
                text: "Você não tem permissão ou esse usuário não foi encontrado."
            });
        }
    }
}

function buildTable(data) {
    let tabela = `
      <thead>
        <th data-label="ID">ID</th>
        <th data-label="Nome">Username</th>
      </thead>
  `;
    tabela += `
    <tr>
      <td data-cell="id">${data.id}</td>
      <td data-cell="username">${data.username}</td>
    </tr>
    `;

    document.getElementById("user").innerHTML = tabela;
}