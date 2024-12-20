import * as path from 'path';
import { runTests } from '@vscode/test-electron';

async function main() {
    try {
        // Путь к вашему расширению
        const extensionDevelopmentPath = path.resolve(__dirname, '../');
        // Путь к тестам расширения
        const extensionTestsPath = path.resolve(__dirname, './suite/index');

        // Запуск тестов
        await runTests({ extensionDevelopmentPath, extensionTestsPath });
    } catch (err) {
        console.error('Не удалось запустить тесты: ' + err);
        process.exit(1);
    }
}

main();
