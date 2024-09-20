import { Client, Events } from "discord.js";
import { LogLevel, log } from "../logger";

export const name = Events.ClientReady;
export const once = true;

export async function execute(client: Client) {
    log(`Ready! Logged in as ${client.user!.tag}`, LogLevel.INFO);
}