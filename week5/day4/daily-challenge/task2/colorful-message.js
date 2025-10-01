import chalk from "chalk";

export function showMessage() {
    console.log(
        chalk.blue('Hello! ') + chalk.red('This is a colorful ') + chalk.green('message!')
    );
}
