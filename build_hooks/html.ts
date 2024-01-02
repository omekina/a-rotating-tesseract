const minify = require("html-minifier").minify;


export default async function (): Promise<boolean> {
    const file_contents = await Bun.file("src/main.html").text();
    const minified = minify(file_contents, {
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
    });
    await Bun.write("dst/index.html", minified);
    return true;
}