import chalk from 'chalk';
import {dump} from 'js-yaml';

import {BaseConfigCommand} from '../../config.base';

export default class ListCommand extends BaseConfigCommand<typeof ListCommand> {
  static description = 'list configuration';

  static aliases = ['config:ls'];

  async run() {
    const {conf} = this;

    this.print(chalk.cyan('➤'), `config from ${conf.path}\n`);
    const configs = [...conf].reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as Record<string, any>);
    this.print(dump(configs));
  }
}
