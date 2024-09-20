import { Client, GatewayIntentBits, Collection } from "discord.js";
import config from "./config.json";
import { type CommandModule, type EventModule } from "./index.d";
import { readdirSync } from "fs";
import { join } from "path";
import { log, LogLevel } from "./logger";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers,
    ],
});

export const commands = new Collection<string, CommandModule>();
const commandsPath = join(__dirname, "commands");
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith(".ts"));

for (const file of commandFiles) {
    const commandFilePath = join(commandsPath, file);
    const command = (await import(commandFilePath)) as CommandModule;
    if (!command.data || !command.execute) {
        log(`Invalid command file: ${commandFilePath}`, LogLevel.WARN);
        continue;
    }
    
    commands.set(command.data.name, command);
}

const eventsPath = join(__dirname, "events");
const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith(".ts"));

for (const file of eventFiles) {
    const eventFilePath = join(eventsPath, file);
    const event = (await import(eventFilePath)) as EventModule;
    if (!event.name || !event.execute || !event.once) {
        log(`Invalid event file: ${eventFilePath}`, LogLevel.WARN);
        continue;
    }

    const func = event.once ? client.once : client.on;
    func(event.name, event.execute);
}

client.login(config.token);