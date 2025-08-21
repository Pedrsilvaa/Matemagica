export async function sendRecuperationCode(e_mail){
    const url = "https://matemagica-api.vercel.app/api/forgot-password";
    const corpo = {
       email: e_mail
    }
    const init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(corpo)
    }
    const data = await fetch(url, init);
    return data;
}

export async function receiveRecuperationCode(e_mail, newPassword, codigo){
    const url = "https://matemagica-api.vercel.app/api/alter-password";
    const corpo = {
        email: e_mail,
        code: codigo,
        password: newPassword
    }
    const init = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(corpo)
    }
    const resRecCode = await fetch(url, init);
    return resRecCode
}

export async function updateLevelUser() {
    let url = "https://matemagica-api.vercel.app/api/user/level";
    const token = localStorage.getItem("token");
    let init = {
        method: "PATCH",
        headers: { 'authorization': token }
    };

    const data = await fetch(url, init);
    return data;
}