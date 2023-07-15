import {Args, ux} from '@oclif/core';

import {BaseConfigCommand} from '../../config.base';

export default class SetCommand extends BaseConfigCommand<typeof SetCommand> {
  static description = 'set configuration';

  static args = {
    key: Args.string({char: 'k', description: 'key of the config', required: true}),
    value: Args.string({char: 'v', description: 'value of the config'}),
  };

  async run() {
    const {args, conf} = this;
    const key = args.key;
    let value = args.value;

    const update = conf.has(key);

    if (!value) {
      value = await ux.prompt(`Enter value for ${key} (blank to ignore)`, {required: false});
    }

    if (value) {
      conf.set(key, value);
      this.hint(`Configuration "${key}" has been ${update ? 'updated' : 'added'}`);
    } else {
      this.hint(`Configuration "${key}" has been ignored`);
    }
  }
}
