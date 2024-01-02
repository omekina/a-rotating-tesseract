export default async function (): Promise<boolean> {
    const result = await Bun.build({
        entrypoints: ["src/main.ts"],
        outdir: "dst",
        minify: true,
    });
    if (!result.success) {
        console.log(result.logs);
        return false;
    }
    return true;
}
