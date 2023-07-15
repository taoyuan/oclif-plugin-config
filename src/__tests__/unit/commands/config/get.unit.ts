import {test} from '@oclif/test';
import Conf from 'conf';

describe('config:get', () => {
  let getSpy: jest.SpyInstance;

  beforeEach(() => {
    getSpy = jest.spyOn(Conf.prototype, 'get').mockImplementation(() => 'value');
  });

  afterEach(() => {
    getSpy.mockRestore();
  });

  test
    .stdout()
    .command(['config:get', 'key'])
    .it('gets the specified key', ctx => {
      expect(getSpy).toHaveBeenCalledWith('key');
      expect(ctx.stdout).toContain('value');
    });
});
