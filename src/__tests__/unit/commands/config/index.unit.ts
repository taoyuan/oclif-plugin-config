import {test} from '@oclif/test';

describe('config', () => {
  test
    .stdout()
    .command(['config'])
    .it('runs config', ctx => {
      expect(ctx.stdout).toContain('Manage the configuration files');
    });
});
