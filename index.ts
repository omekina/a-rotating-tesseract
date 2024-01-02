import { exit } from "process";


async function run_build_hook(name: string, build_hook: () => Promise<boolean>): Promise<void> {
    console.log("-> \x1b[34mRunning build hook:\x1b[0m " + name);
    try {
        const result = await build_hook();
        if (!result) { throw new Error(); }
    } catch (e) {
        console.log(e);
        console.log("=> \x1b[31mBuild hook failed:\x1b[0m " + name);
        exit(1);
    }
}

import script from "./build_hooks/script";
import style from "./build_hooks/style";
import html from "./build_hooks/html";

await run_build_hook("scripts", script);
await run_build_hook("styles", style);
await run_build_hook("html", html);
