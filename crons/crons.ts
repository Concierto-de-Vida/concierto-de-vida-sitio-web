import deleteUnusedSessions from "./deleteUnusedSessions.ts";

// Every hour delete unused sessions
Deno.cron("Delete unused sessions", "7 * * * *", deleteUnusedSessions);

console.log("Crons started");
