async function signup() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  console.log(username, password);

  const response = await fetch("http://localhost:8080/user", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json; charset=utf8",
      Accept: "application/json",
    }),
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  if (response.ok) {
    Swal.fire({
      icon: "success",
      title: "Que bom ter voce no nosso time!",
      text: "Conta criada com sucesso. Faça login para acessar sua conta!"
    });
  } else if (response.status == 409) {
    Swal.fire({
      icon: "error",
      title: "Oops...Parece que algo deu errado",
      text: "Já existe um usuário com esse nome."
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...Parece que algo deu errado",
      text: "Insira as credenciais corretas e tente novamente!"
    });
  }
}

