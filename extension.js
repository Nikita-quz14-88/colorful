const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('The "colorful-brackets" extension is now active!');

    // Создаем массив цветов
    const colors = ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#00FFFF', '#0000FF', '#800080'];
    const decorationTypes = colors.map(color =>
        vscode.window.createTextEditorDecorationType({ color })
    );

    // Регистрируем событие изменения текста
    vscode.workspace.onDidChangeTextDocument(event => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const text = editor.document.getText();
        const ranges = Array(colors.length).fill(null).map(() => []);

        const stack = [];
        for (let i = 0; i < text.length; i++) {
            const char = text[i];

            if (char === '(' || char === '{' || char === '[') {
                stack.push({ char, position: i });
            } else if (char === ')' || char === '}' || char === ']') {
                if (stack.length > 0) {
                    const last = stack.pop();
                    if (
                        (last.char === '(' && char === ')') ||
                        (last.char === '{' && char === '}') ||
                        (last.char === '[' && char === ']')
                    ) {
                        const colorIndex = stack.length % colors.length;
                        const startRange = new vscode.Range(
                            editor.document.positionAt(last.position),
                            editor.document.positionAt(last.position + 1)
                        );
                        const endRange = new vscode.Range(
                            editor.document.positionAt(i),
                            editor.document.positionAt(i + 1)
                        );
                        ranges[colorIndex].push(startRange, endRange);
                    }
                }
            }
        }

        // Применяем цвета к диапазонам
        decorationTypes.forEach((type, index) => {
            editor.setDecorations(type, ranges[index]);
        });
    });

    console.log('Colorful brackets are now enabled!');
}

// Деактивация расширения
function deactivate() {}

module.exports = {
    activate,
    deactivate
};
