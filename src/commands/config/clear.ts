import {BaseConfigCommand} from '../../config.base';
import {ux} from '@oclif/core';
import chalk from 'chalk';

export default class ClearCommand extends BaseConfigCommand<typeof ClearCommand> {
  static description = 'clear configuration';

  async run() {
    const {flags, conf} = this;

    if (await ux.confirm(chalk.yellow('Are you sure to clear all configs?'))) {
      conf.clear();
      this.hint(chalk.green('Configuration has been cleared'));
    } else {
      this.hint(chalk.grey('Configuration clear has been cancelled'));
    }
  }
}
