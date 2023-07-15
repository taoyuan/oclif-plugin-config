import {run} from '@oclif/core';
import {BaseConfigCommand} from '../../config.base';

export default class ConfigCommand extends BaseConfigCommand<typeof ConfigCommand> {
  static description = `Manage the configuration files`;

  async run() {
    await run(['config', '--help']);
  }
}
