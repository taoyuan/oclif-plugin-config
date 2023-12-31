import {Command, Flags, Interfaces} from '@oclif/core';
import Conf from 'conf';

export type Flags<T extends typeof Command> = Interfaces.InferredFlags<
  (typeof BaseConfigCommand)['baseFlags'] & T['flags']
>;
export type Args<T extends typeof Command> = Interfaces.InferredArgs<T['args']>;

export abstract class BaseConfigCommand<T extends typeof Command> extends Command {
  // add the --json flag
  // static enableJsonFlag = true;

  // define flags that can be inherited by any command that extends BaseCommand
  static baseFlags = {
    name: Flags.string({char: 'c', description: 'config file name'}),
    cwd: Flags.string({char: 'd', description: 'config file location'}),
    quiet: Flags.boolean({char: 'q', description: 'quiet'}),
  };

  protected flags: Flags<T>;
  protected args: Args<T>;
  protected conf: Conf;

  public async init(): Promise<void> {
    await super.init();
    const {args, flags} = await this.parse({
      flags: this.ctor.flags,
      baseFlags: (super.ctor as typeof BaseConfigCommand).baseFlags,
      args: this.ctor.args,
      strict: this.ctor.strict,
    });
    this.flags = flags as Flags<T>;
    this.args = args as Args<T>;

    const cfg = this.config.pjson.oclif as any;
    const optsInConfig =
      cfg['oclif-plugin-config'] ??
      cfg['oclifPluginConfig'] ??
      cfg['plugin-config'] ??
      cfg['pluginConfig'] ??
      cfg.config ??
      {};

    this.conf = new Conf({
      projectSuffix: '',
      projectName: this.config.name,
      ...optsInConfig,
      ...(flags.name && {configName: flags.name}),
      ...(flags.cwd && {cwd: flags.cwd}),
    });
  }

  protected print(...args: any[]) {
    console.log(...args);
  }

  protected hint(...args: any[]) {
    if (this.flags.quiet) return;
    console.log(...args);
  }
}
