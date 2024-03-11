async function login() {
  
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
  
    const response = await fetch("http://3.92.139.182:8080/login", {
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
  
    let key = "Authorization";
    let token = response.headers.get(key);
    window.localStorage.setItem(key, token);
  
    if (response.ok) {
      window.setTimeout(function () {
        window.location.href = "index.html";
      }, 1000);

      Swal.fire({
        icon: "success",
        title: "Bem-vindo de volta!",
        text: "Estamos te redirecionando para a pagina principal!"
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...Parece que algo deu errado",
        text: "Insira as credenciais corretas e tente novamente!"
      });
    }  
  }




  
