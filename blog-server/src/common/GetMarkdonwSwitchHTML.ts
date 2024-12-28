import * as MarkdownIt from 'markdown-it'
import uslug from 'uslug'


export const GetMarkdownSwitchHtml = (str: string): string => {
    const uslugify = (s: string) => uslug(s)
    const md = new MarkdownIt({
        html: false,
        xhtmlOut: true,
        typographer: true
    })
    md.use(require("markdown-it-anchor"), {  permalinkBefore: true, permalinkSymbol: '§', slugify: uslugify })
        .use(require("markdown-it-toc-done-right"), { slugify: uslugify })
    return md.render(str)
}