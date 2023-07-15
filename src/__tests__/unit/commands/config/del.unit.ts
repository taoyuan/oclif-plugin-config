import {test} from '@oclif/test';
import Conf from 'conf';

describe('config:del', () => {
  let deleteSpy: jest.SpyInstance;
  beforeEach(() => {
    deleteSpy = jest.spyOn(Conf.prototype, 'delete').mockImplementation(() => null);
  });

  afterEach(() => {
    deleteSpy.mockRestore();
  });

  test
    .stdout()
    .command(['config:del', 'key'])
    .it('deletes the specified key', ctx => {
      expect(deleteSpy).toHaveBeenCalledWith('key');
      expect(ctx.stdout).toContain('Configuration "key" deleted');
    });
});
