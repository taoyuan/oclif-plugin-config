import {Args, run} from '@oclif/core';

import {BaseConfigCommand} from '../../config.base';

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
      await run(['config:list'], this.config);
    }
  }
}
