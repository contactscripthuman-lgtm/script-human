const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else {
            callback(dirPath);
        }
    });
}

const targetDirs = [
    path.join(__dirname, 'app'),
    path.join(__dirname, 'components')
];

let changedFiles = 0;

targetDirs.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    walkDir(dir, (filepath) => {
        if (filepath.endsWith('.tsx') || filepath.endsWith('.ts')) {
            let content = fs.readFileSync(filepath, 'utf8');
            let originalContent = content;

            // 1. Replace explicit dark text colors that are gray/slate/black with dark:text-white
            content = content.replace(/dark:text-(gray|slate|zinc|neutral|stone)(-[1-9]00)?/g, 'dark:text-white');
            content = content.replace(/dark:text-black/g, 'dark:text-white');

            // 2. Append dark:text-white to text-gray-xxx and text-black
            // Only if it doesn't have a prefix like hover:, focus:, md:, etc.
            // Using a lookbehind to ensure no colon precedes the text- class
            content = content.replace(/(?<![a-z0-9-]:)text-(gray|slate|zinc|neutral|stone)(-[1-9]00)?/g, '$& dark:text-white');
            content = content.replace(/(?<![a-z0-9-]:)text-black/g, '$& dark:text-white');

            // 3. Deduplicate dark:text-white everywhere inside className="..." or className={`...`}
            content = content.replace(/className=(["'`])([\s\S]*?)\1/g, (match, quote, classes) => {
                let cls = classes.split(/\s+/);
                let finalCls = [];
                let otherDarkText = false;

                // Check for other dark:text- classes (e.g. dark:text-blue-500)
                for (let c of cls) {
                    if (c.startsWith('dark:text-') && c !== 'dark:text-white') {
                        otherDarkText = true;
                    }
                }

                for (let c of cls) {
                    const trimmed = c.trim();
                    if (trimmed === 'dark:text-white') {
                        if (!finalCls.includes(trimmed) && !otherDarkText) {
                            finalCls.push(trimmed);
                        }
                    } else if (trimmed.length > 0) {
                        // Allow duplicates of other classes if they were there? Just deduplicate everything for safety or just check if includes.
                        // Actually, duplicate classes are harmless but we can dedupe for cleanliness
                        if (!finalCls.includes(trimmed)) {
                            finalCls.push(trimmed);
                        }
                    }
                }
                return `className=${quote}${finalCls.join(' ')}${quote}`;
            });

            // One more global cleanup of adjacent duplicates just in case
            content = content.replace(/(dark:text-white\s*){2,}/g, 'dark:text-white ');
            // Clean up trailing space in classNames if any
            content = content.replace(/ \}/g, '}').replace(/ "/g, '"').replace(/ \`/g, '`');

            if (content !== originalContent) {
                fs.writeFileSync(filepath, content, 'utf8');
                changedFiles++;
            }
        }
    });
});
console.log(`Updated ${changedFiles} files`);
