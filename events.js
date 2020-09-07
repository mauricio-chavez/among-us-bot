const { start, shh, meeting, kill, unkill, finish } = require('./commands');
const { createRoles } = require('./utils');
const prefix = '!';

function guildCreated(guild) {
  createRoles(guild);
}

function handleMessage(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const withoutPrefix = message.content.slice(prefix.length);
  const split = withoutPrefix.split(/ +/);
  const command = split[0];
  const args = split.slice(1);
  const channel = message.member.voice.channel;

  if (['start', 'init', 'begin'].includes(command)) {
    start(message, channel);
  } else if (['s', 'shh', 'mute'].includes(command)) {
    shh(message, channel);
  } else if (['m', 'meeting', 'unmute'].includes(command)) {
    meeting(message, channel);
  } else if (['k', 'kill'].includes(command)) {
    kill(message, channel, args);
  } else if (['uk', 'unkill'].includes(command)) {
    unkill(message, channel, args);
  } else if (['finish', 'end'].includes(command)) {
    finish(message, channel);
  }
}

module.exports = {
  guildCreated,
  handleMessage,
};
