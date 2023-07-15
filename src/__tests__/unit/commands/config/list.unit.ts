import {test} from '@oclif/test';
import Conf from 'conf';
import chalk from 'chalk';

describe('config:list', () => {
  let iteratorSpy: jest.SpyInstance;

  beforeEach(() => {
    iteratorSpy = jest.spyOn(Conf.prototype, Symbol.iterator).mockImplementation(() => {
      return [
        ['key1', 'value1'],
        ['key2', 'value2'],
      ][Symbol.iterator]() as any;
    });
  });

  afterEach(() => {
    iteratorSpy.mockRestore();
  });

  test
    .stdout()
    .command(['config:list'])
    .it('lists all configurations', ctx => {
      expect(ctx.stdout).toContain(`"user" config from ${new Conf({projectSuffix: ''}).path}`);
      expect(ctx.stdout).toContain('key1=value1');
      expect(ctx.stdout).toContain('key2=value2');
    });
});
