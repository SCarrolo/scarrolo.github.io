import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const inlineMarkdownProcessor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify);

export async function renderInlineMarkdown(markdown: string): Promise<string> {
    const html = String(await inlineMarkdownProcessor.process(markdown)).trim();

    if (html.startsWith("<p>") && html.endsWith("</p>")) {
        return html.slice(3, -4);
    }

    return html;
}
