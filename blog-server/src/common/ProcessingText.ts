export interface HeadingItem {
    hLevel: number;
    id: string;
    level?: number;
    title: string;
    children?: HeadingItem[];
}


export const getTitle = (content: string): HeadingItem[] => {
    const type = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    const tempArr: HeadingItem[] = [];

    // 正则表达式优化：简化和精确匹配<h1>到<h6>标签
    const regex = /<h([1-6])[^>]*id="([^"]+)"[^>]*>([^<]+)<\/h\1>/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content)) !== null) {
        const hLevel = parseInt(match[1], 10);
        const id = match[2];
        const title = match[3].trim();

        tempArr.push({ hLevel, id, title });
    }
    return toTree(tempArr);
};

const toTree = (flatArr: HeadingItem[]): HeadingItem[] => {

    const tree: HeadingItem[] = [];  // 最终的树形结构
    const stack: HeadingItem[] = []; // 用来追踪当前层级的栈

    for (const item of flatArr) {
        const newItem: HeadingItem = { ...item, children: [] };  // 确保 `children` 存在

        while (stack.length > 0 && stack[stack.length - 1].hLevel >= item.hLevel) {
            stack.pop();  // 当前项层级低于栈顶，弹出栈顶
        }

        if (stack.length > 0) {
            // 当前元素是栈顶元素的子节点
            stack[stack.length - 1].children?.push(newItem);
        } else {
            // 当前元素是根节点
            tree.push(newItem);
        }

        stack.push(newItem);  // 将当前元素压入栈中
    }

    return tree;
};