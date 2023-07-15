import {test} from '@oclif/test';
import {ux} from '@oclif/core';
import chalk from 'chalk';

describe('config:clear', () => {
  test
    .stdout()
    .stub(ux, 'confirm', () => Promise.resolve(true))
    .command(['config:clear'])
    .it('clears the configuration when confirmed', ctx => {
      expect(ctx.stdout).toContain('Configuration has been cleared');
    });

  test
    .stdout()
    .stub(ux, 'confirm', () => Promise.resolve(false))
    .command(['config:clear'])
    .it('does not clear the configuration when cancelled', ctx => {
      expect(ctx.stdout).toContain('Configuration clear has been cancelled');
    });
});
