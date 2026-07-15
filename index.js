const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.channelId !== process.env.CHANNEL_ID) return;
  if (message.author.bot) return;

  try {
    await fetch(process.env.WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `**${message.author.username}**: ${message.content}`,
      }),
    });
    console.log(`Forwarded message from ${message.author.username}`);
  } catch (error) {
    console.error('Error forwarding message:', error);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
