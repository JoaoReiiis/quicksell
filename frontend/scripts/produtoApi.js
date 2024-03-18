async function getProduto() {
    let key = "Authorization";

    const response = await fetch("http://localhost:8080/product", {
        method: "GET",
        headers: new Headers({
            Authorization: localStorage.getItem(key),
        }),
    });

    var data = await response.json();
    buildTable(data);
}

getProduto();

async function cadastroProduto() {
    const { value: cadastroProduto } = await Swal.fire({
        title: "Insira os dados do produto.",
        html: `   
        <input id="nome" class="swal2-input" placeholder="Nome">
        <input id="preco" class="swal2-input" placeholder="Preco">
        <input id="descricao" class="swal2-input" placeholder="Descricao">
        `,
        focusConfirm: false,
    });

    if (cadastroProduto) {
        let nome = document.getElementById("nome").value;
        let preco = parseFloat(document.getElementById("preco").value);
        let descricao = document.getElementById("descricao").value;
        let key = "Authorization";

        const response = await fetch("http://localhost:8080/product", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json; charset=utf8",
                Accept: "application/json",
                Authorization: localStorage.getItem(key),
            }),
            body: JSON.stringify({
                name: nome,
                price: preco,
                description: descricao,
            }),
        });



        if (response.status == 201) {
            Swal.fire({
                icon: "success",
                title: "Tudo certo!",
                text: "Seu produto foi cadastrado com sucesso."
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...Parece que algo deu errado",
                text: "Seu produto não foi cadastrado."
            });
        }
    }
}

async function atualizarProduto() {
    const { value: atualizarProduto } = await Swal.fire({
        title: "Informe os dados do produto.",
        html: `
        <input id="id" class="swal2-input" placeholder="Id">   
        <input id="nome" class="swal2-input" placeholder="Nome">
        <input id="preco" class="swal2-input" placeholder="Preco">
        <input id="descricao" class="swal2-input" placeholder="Descricao">
        `,
        focusConfirm: false,
    });

    if (atualizarProduto) {
        let id = document.getElementById("id").value;
        let nome = document.getElementById("nome").value;
        let preco = parseFloat(document.getElementById("preco").value);
        let descricao = document.getElementById("descricao").value;
        let key = "Authorization";

        const response = await fetch(`http://localhost:8080/product/${id}`, {
            method: "PUT",
            headers: new Headers({
                "Content-Type": "application/json; charset=utf8",
                Accept: "application/json",
                Authorization: localStorage.getItem(key),
            }),
            body: JSON.stringify({
                name: nome,
                price: preco,
                description: descricao,
            }),
        });

        if (response.status == 204) {
            Swal.fire({
                icon: "success",
                title: "Tudo certo!",
                text: "Seu produto foi atualizado com sucesso."
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...Parece que algo deu errado",
                text: "Seu produto não foi atualizado."
            });
        }
    }
}

async function deletarProduto() {
    const { value: deletarProduto } = await Swal.fire({
        title: "Informe o ID do produto.",
        html: `
        <input id="id" class="swal2-input" placeholder="ID">   
        `,
        focusConfirm: false,
    });

    if (deletarProduto) {
        let id = document.getElementById("id").value;
        let key = "Authorization";

        const response = await fetch(`http://localhost:8080/product/${id}`, {
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
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...Parece que algo deu errado",
                text: "Seu produto não foi deletado."
            });
        }
    }
}

function buildTable(data){
    let tabela = `
    <thead>
        <th data-label="ID">ID</th>
        <th data-label="Produto">Produto</th>
        <th data-label="Descricao">Descricao</th>
        <th data-label="Preco unitario">Preco unitario</th>
    </thead>
  `;

  for (let product of data) {
    tabela += `
    <tr>
        <td data-cell="id">${product.id}</td>
        <td data-cell="produto">${product.name}</td>
        <td data-cell="descricao">${product.description}</td>
        <td data-cell="preco">R$ ${product.price}</td>
    </tr>
    `;
  }

  document.getElementById("produtos").innerHTML = tabela;
}