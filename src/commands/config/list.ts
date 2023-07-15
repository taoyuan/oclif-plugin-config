import {BaseConfigCommand} from '../../config.base';
import chalk from 'chalk';

export default class ListCommand extends BaseConfigCommand<typeof ListCommand> {
  static description = 'list configuration';

  async run() {
    const {args, flags, conf} = this;

    this.print(chalk.cyan('➤'), `"user" config from ${conf.path}\n`);
    for (let c of conf) {
      this.print(`${c[0]}=${c[1]}`);
    }
  }
}
