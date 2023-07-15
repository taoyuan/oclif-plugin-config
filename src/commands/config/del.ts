import {Args} from '@oclif/core';

import {BaseConfigCommand} from '../../config.base';

export default class DelCommand extends BaseConfigCommand<typeof DelCommand> {
  static description = 'delete configuration';

  static args = {
    key: Args.string({description: 'key of the config', required: true}),
  };

  async run() {
    const {args, conf} = this;
    const key = args.key;

    conf.delete(key);

    this.hint(`Configuration "${key}" deleted`);
  }
}
