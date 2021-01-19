const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const readline = require('readline');
 
const config = require('./config.json');
 
const client = new SteamUser();

var Spam;
var timeOutDelete;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const logOnOptions = {

    // Put your Steam credentials in config.json
	accountName: config.username,
    password: config.password,
    
    // If you want to use your SharedCode to automate the login without having the need for twoFactor, remove "//" below
    // twoFactorCode: SteamTotp.generateAuthCode(config.sharedCode)
};
 
client.logOn(logOnOptions);
 
	
    client.on('loggedOn', () => {
       
    console.log('Login successfully. Bot started!');
	client.setPersona(SteamUser.EPersonaState.Online, "Cadeira do Kirito :3");
    client.gamesPlayed('Rocket League Trading');

    rl.question("Type 'Exit' and the Bot will close automatically \n", function(exit) {
        if(exit == "Exit"){
            console.log("Closing...");
            process.exit(0);
        }
    });

});



// Automatic messages if the user types any of the messages below
client.on("friendMessage", function(steamID, message) {
    
    switch (message) {
        case '!trade':
            clearTimeout(timeOutDelete);
		    client.chatMessage(steamID, "Tell me your offer");
            break;

        case '!notrade':
            clearTimeout(timeOutDelete);
		    client.chatMessage(steamID, "Tell me what you need");
            break;
        
    }
});

// Automatic messages if you type any of the messages below
client.on("friendMessageEcho", function(recipientID, message){
    
    switch (message) {
        case 'ty':
            client.chatMessage(recipientID, "Have a nice day :)");
            client.removeFriend(recipientID);
            break;

        case 'srry':
            client.chatMessage(recipientID, "I already sold :/");
            client.removeFriend(recipientID);
            break;
        
        case '!spam':
            client.chatMessage(recipientID, "Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam ");
            client.chatMessage(recipientID, "Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam ");
            client.chatMessage(recipientID, "Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam ");
            break;

        case '!stop':
            clearInterval(Spam);
            client.chatMessage(recipientID, "Spam canceled!");
            break;
    }

})

// Automatically adding any user and sending a message
client.on('friendRelationship', function(sid, relationship){
    if(relationship == SteamUser.EFriendRelationship.RequestRecipient){
        client.addFriend(sid, function(error, name){


            if(error){
                console.log(error);

            }else{

                client.chatMessage(sid, 'Hi! If you added me to trade, please type "!trade" if for another reason type "!notrade"');
                
                timeOutDelete = setTimeout(function(){ 
                    client.removeFriend(sid) 
                    client.chatMessage(sid, "3 minutes have passed and you didn't type !trade or !notrade, so it was removed automatically!");
                }, 180000)
            }

        });
    }
})


 
