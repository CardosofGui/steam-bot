<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f4736ca6-e2cf-4948-a2db-1c165799b2af/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210806%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210806T011351Z&X-Amz-Expires=86400&X-Amz-Signature=78070d28697c46597e29fcd791b1b9ad1ba830de4708b338b99bf1c5168e1615&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22" width="100%">

# Steam Bot 🤖
[![nodejs-badge][nodejs-img]][nodejs]

[nodejs-img]: https://img.shields.io/badge/Node.js-v14.17-green
[nodejs]: https://nodejs.org/en/

---

## Status do projeto:
Finalizado ✅

---

## Índice 📖
* __[Descrição](#description)__
* __[Tecnologias](#technologies)__

---

## Descrição 📌 <a name="description"></a>
Bot de mensagens automatica para Rocket League Traders ou usuarios Steam!

--- 

## Tecnologias 💻 <a name="technologies"></a>
* __[Node.js](https://nodejs.org/en/)__ - Baixe a versão recomendada LTS.

---

## Execução ✅ <a name="execution"></a>

```bash

# Clone este repositório
$ git clone https://github.com/CardosofGui/steam-bot.git

# Instalação de modulos node
$ npm install steam-user
$ npm install steam-totp
$ npm install readline

# Executar aplicação
$ node bot.js
```

---

## Configurações 🔧

### Credenciais do usuario
```
# Abra o arquivo config.js com um editor de texto
{
    "username" : "SeuUsuario",
    "password" : "SuaSenha",
    "sharedCode" : "" // Essa opção deverá ser usada caso tenha o SharedCode e queira evitar a verificação de duas etapas Steam
} 
```

### Mensagens pré configuradas
```
# Abra o arquivo bot.ks com um editor de texto

# Mensagem automatica quando um novo usuario lhe enviar solicitação de amizade
client.on('friendRelationship', function(sid, relationship){
    if(relationship == SteamUser.EFriendRelationship.RequestRecipient){
        client.addFriend(sid, function(error, name){
            if(error){
                console.log(error);
            }else{
                client.chatMessage(sid, 'Hi! If you added me to trade, please type "!trade" if for another reason type "!notrade"');
                // Mensagem de boas vindas ao usuario.
                // Neste exemplo o usuario será avisado que ele deverá digitar !trade ou !notrade

                
                timeOutDelete = setTimeout(function(){ 
                    client.removeFriend(sid) 
                    client.chatMessage(sid, "3 minutes have passed and you didn't type !trade or !notrade, so it was removed automatically!"); 
                }, 180000)
                // Caso o usuario não responda sua mensagem com !trade ou !notrade ele será deletado em 3 minutos.
            }
        });
    }
})

# Ações que serão realizada quando você enviar determinada mensagem
client.on("friendMessageEcho", function(recipientID, message){
    switch (message) {
        case 'ty':
            client.chatMessage(recipientID, "Have a nice day :)"); // Envia esta mensagem automatica
            client.removeFriend(recipientID); // Deleta o usuario a quem você enviou esta mensagem
            break;

        case 'srry':
            client.chatMessage(recipientID, "I already sold :/"); // Envia esta mensagem automatica
            client.removeFriend(recipientID); // Deleta o usuario a quem você enviou esta mensagem
            break;
    }
})

# Ações que serão realizdas quando você receber determinada mensagem
client.on("friendMessage", function(steamID, message) {
    
    switch (message) {
    
  // Quando o usuario escrever !trade
      case '!trade': 
          clearTimeout(timeOutDelete); // O cronometro de 3 minutos será zerado, assim evitando que ele seja deletado
          client.chatMessage(steamID, "Tell me your offer"); // Esta mensagem será enviada, neste exemplo servirá para que o usuario diga qual a oferta que ele tem a fazer
          break;

  // Quando o usuario escrever !notrade
      case '!notrade':
          clearTimeout(timeOutDelete); // O cronometro de 3 minutos será zerado, assim evitando que ele seja deletado
          client.chatMessage(steamID, "Tell me what you need"); // Esta mensagem será enviada, neste exemplo servirá para que o usuario diga o que ele precisa
          break;

    }
});
```
Licença MIT ©
