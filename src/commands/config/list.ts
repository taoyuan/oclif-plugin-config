import chalk from 'chalk';

import {BaseConfigCommand} from '../../config.base';

export default class ListCommand extends BaseConfigCommand<typeof ListCommand> {
  static description = 'list configuration';

  static aliases = ['config:ls'];

  async run() {
    const {conf} = this;

    this.print(chalk.cyan('➤'), `"user" config from ${conf.path}\n`);
    for (const c of conf) {
      this.print(c[0], '=', typeof c[1] === 'string' ? c[1] : JSON.stringify(c[1]));
    }
  }
}
