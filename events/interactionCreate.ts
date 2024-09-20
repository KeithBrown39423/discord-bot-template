import { Events, type ChatInputCommandInteraction } from "discord.js";
import { commands } from "..";
import { LogLevel, log } from "../logger";

export const name = Events.InteractionCreate;
export const once = false;

export async function execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.commandName);

    if (!command) return log(`No command matching ${interaction.commandName} was found.`, LogLevel.ERROR);

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        const func = (interaction.replied || interaction.deferred) ? interaction.followUp : interaction.reply;
        await func({ content: "There was an error while executing this command!", ephemeral: true });
    }
}