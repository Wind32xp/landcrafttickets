const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { TOKEN, tellenChannelID } = require('./configs/config.json');

const { registerTicketBot } = require('./modules/ticket-system/ticketBot');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction,
    ],
});

// Evento que se ejecuta cuando el bot está listo
client.once('ready', () => {
    console.log(`¡Bot conectado como ${client.user.tag}!`);
    console.log('Estableciendo actividad...'); // Agregado para depuración

    // Cambia la actividad del bot
    client.user.setActivity('Jugando a un juego', { type: 'PLAYING' });
    console.log('Actividad establecida correctamente.');

    // Cambia el estado del bot
    client.user.setStatus('online'); // 'online', 'idle', 'dnd' (no molestar), 'invisible'
});

client.on('messageCreate', (message) => {
    // Ignora los mensajes del propio bot
    if (message.author.bot) return;

    // Comando !ping
    if (message.content === '!ping') {
        const ping = Math.round(client.ws.ping); // Obtener el ping
        message.channel.send(`🏓 Pong! Latencia: ${ping} ms`);
    }

    // Comando !say
    if (message.content.startsWith('!say')) {
        const textToSay = message.content.slice(5).trim();
        if (textToSay) {
            message.channel.send(textToSay);
        } else {
            message.channel.send('¡Por favor, proporciona un mensaje para decir!');
        }
    }
});

// Registra el sistema de tickets
registerTicketBot(client);

// Inicia sesión con el token
client.login(TOKEN)
    .then(() => console.log('Inicio de sesión exitoso.'))
    .catch(err => console.error('Error al iniciar sesión:', err));