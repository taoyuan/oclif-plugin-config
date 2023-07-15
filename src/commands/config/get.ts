import {BaseConfigCommand} from '../../config.base';
import * as os from 'os';
import {Args} from '@oclif/core';
import chalk from 'chalk';

export default class GetCommand extends BaseConfigCommand<typeof GetCommand> {
  static description = 'get configuration';

  static args = {
    key: Args.string({description: 'key of the config'}),
  };

  async run() {
    const {args, conf} = this;
    const key = args.key;

    if (key) {
      const value = conf.get(key) as string;
      if (value !== null && value !== undefined) {
        this.print(value);
      }
    } else {
      this.print(chalk.cyan('➤'), `"user" config from ${conf.path}\n`);
      for (let c of conf) {
        this.print(`${c[0]}=${c[1]}`);
      }
    }
  }
}
