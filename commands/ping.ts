import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!");

export async function execute(interaction: ChatInputCommandInteraction) {
    const ping = interaction.client.ws.ping;
    await interaction.reply(`Pong! Latency is ${ping}ms.`);
}
