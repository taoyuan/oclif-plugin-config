import chalk from 'chalk';

import {BaseConfigCommand} from '../../config.base';

export default class ListCommand extends BaseConfigCommand<typeof ListCommand> {
  static description = 'list configuration';

  async run() {
    const {conf} = this;

    this.print(chalk.cyan('➤'), `"user" config from ${conf.path}\n`);
    for (const c of conf) {
      this.print(`${c[0]}=${c[1]}`);
    }
  }
}
