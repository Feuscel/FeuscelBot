const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);
const Logger = require('../Logger')
const eventList = ['apiRequest', 'apiResponse', 'applicationCommandCreate', 'applicationCommandDelete', 'applicationCommandUpdate', 'channelCreate', 'channelDelete', 'channelPinsUpdate', 'channelUpdate', 'debug', 'emojiCreate', 'emojiDelete', 'emojiUpdate', 'error', 'guildBanAdd', 'guildBanRemove', 'guildCreate', 'guildDelete', 'guildIntegrationsUpdate', 'guildMemberAdd', 'guildMemberAvailable', 'guildMemberRemove', 'guildMembersChunk', 'guildMemberUpdate', 'guildScheduledEventCreate', 'guildScheduledEventDelete', 'guildScheduledEventUpdate', 'guildScheduledEventUserAdd', 'guildScheduledEventUserRemove', 'guildUnavailable', 'guildUpdate', 'interaction', 'interactionCreate', 'invalidate', 'invalidRequestWarning', 'inviteCreate', 'inviteDelete', 'message', 'messageCreate', 'messageDelete', 'messageDeleteBulk', 'messageReactionAdd', 'messageReactionRemove', 'messageReactionRemoveAll', 'messageReactionRemoveEmoji', 'messageUpdate', 'presenceUpdate', 'rateLimit', 'ready', 'roleCreate', 'roleDelete', 'roleUpdate', 'shardDisconnect', 'shardError', 'shardReady', 'shardReconnecting', 'shardResume', 'stageInstanceCreate', 'stageInstanceDelete', 'stageInstanceUpdate', 'stickerCreate', 'stickerDelete', 'stickerUpdate', 'threadCreate', 'threadDelete', 'threadListSync', 'threadMembersUpdate', 'threadMemberUpdate', 'threadUpdate', 'typingStart', 'userUpdate', 'voiceStateUpdate', 'warn', 'webhookUpdate']


module.exports = async client => {
    //Search all event files 
    (await pGlob(`${process.cwd()}/src/events/*/*.js`)).map(async eventFile => {
        const event = require(eventFile);
        if(!event.name) return Logger.warn(`Event not triggered : Don't have name\nIn file -> ${cmdFile}`)
        if(!eventList.includes(event.name)) return Logger.typo(`Event not triggered : typo error\nIn file -> ${eventFile}`);
        if(event.once) client.once(event.name, (...args) => event.execute(client, ...args));
        else client.on(event.name, (...args) => event.execute(client, ...args));
        Logger.event(`- ${event.name}`);
    })
}