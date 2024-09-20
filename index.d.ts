import { ChatInputCommandInteraction, SlashCommandBuilder, type ClientEvents } from "discord.js";

export interface CommandModule {
    data: SlashCommandBuilder;
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export interface EventModule {
    name: keyof ClientEvents;
    once: boolean;
    execute: (...params: unknown) => Promise<void>;
}

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
