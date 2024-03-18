async function getVenda() {
    let key = "Authorization";

    const response = await fetch("http://localhost:8080/sale/user", {
        method: "GET",
        headers: new Headers({
            Authorization: localStorage.getItem(key),
        }),
    });

    var data = await response.json();
    buildTable(data);
}

getVenda();

async function cadastroVenda() {
    const { value: cadastroVenda } = await Swal.fire({
        title: "Informe os dados da venda.",
        html: `   
        <input id="id" class="swal2-input" placeholder="Id do produto">
        <input id="quantidade" class="swal2-input" placeholder="Quantidade">
        `,
        focusConfirm: false,
    });

    if (cadastroVenda) {
        let id = document.getElementById("id").value;
        let quantidade = parseInt(document.getElementById("quantidade").value);
        let key = "Authorization";

        const product = new Object({
            id: id,
        });

        const response = await fetch("http://localhost:8080/sale", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json; charset=utf8",
                Accept: "application/json",
                Authorization: localStorage.getItem(key),
            }),
            body: JSON.stringify({
                product: product,
                quantity: quantidade,
            }),
        });



        if (response.status == 201) {
            Swal.fire({
                icon: "success",
                title: "Tudo certo!",
                text: "Sua venda foi realizada com sucesso!"
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...Parece que algo deu errado",
                text: "Sua venda não foi realizada."
            });
        }
    }
}

async function deletarVenda() {
    const { value: deletarVenda } = await Swal.fire({
        title: "Informe o ID da venda.",
        html: `
        <input id="id" class="swal2-input" placeholder="ID">   
        `,
        focusConfirm: false,
    });

    if (deletarVenda) {
        let id = document.getElementById("id").value;
        let key = "Authorization";

        const response = await fetch(`http://localhost:8080/sale/${id}`, {
            method: "DELETE",
            headers: new Headers({
                Authorization: localStorage.getItem(key),
            })
        });

        if (response.status == 204) {
            Swal.fire({
                icon: "success",
                title: "Tudo certo!",
                text: "Sua venda foi deletado com sucesso."
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

function buildTable(data) {
    let tabela = `
    <thead>
        <th data-label="ID">ID</th>
        <th data-label="Produto">Produto</th>
        <th data-label="Descricao">Descricao</th>
        <th data-label="Preco unitario">Preco unitario</th>
        <th data-label="Quantidade">Quantidade</th>
        <th data-label="Valor">Valor total</th>
    </thead>
    `;

    for (let sale of data) {
        tabela += `
        <tr>
            <td data-cell="id">${sale.id}</td>
            <td data-cell="produto">${sale.product.name}</td>
            <td data-cell="descricao">${sale.product.description}</td>
            <td data-cell="preco">R$ ${sale.product.price}</td>
            <td data-cell="quantidade">${sale.quantity}</td>
            <td data-cell="total">R$ ${sale.price}</td>
        </tr>
        `;
    }

    document.getElementById("vendas").innerHTML = tabela;

}