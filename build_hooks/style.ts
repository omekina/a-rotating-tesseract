const sass = require("sass");


export default async function (): Promise<boolean> {
    const result = sass.compile("src/main.scss", { style: "compressed" });
    await Bun.write("dst/main.css", result.css);
    return true;
}
