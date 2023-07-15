import {test} from '@oclif/test';
import Conf from 'conf';

describe('config:get', () => {
  let getSpy: jest.SpyInstance;
  let iteratorSpy: jest.SpyInstance;

  beforeEach(() => {
    getSpy = jest.spyOn(Conf.prototype, 'get').mockImplementation(() => 'value');
    iteratorSpy = jest.spyOn(Conf.prototype, Symbol.iterator).mockImplementation(() => {
      return [
        ['key1', 'value1'],
        ['key2', 'value2'],
      ][Symbol.iterator]() as any;
    });
  });

  afterEach(() => {
    getSpy.mockRestore();
    iteratorSpy.mockRestore();
  });

  test
    .stdout()
    .command(['config:get', 'key'])
    .it('gets the specified key', ctx => {
      expect(getSpy).toHaveBeenCalledWith('key');
      expect(ctx.stdout).toContain('value');
    });

  test
    .stdout()
    .command(['config:get'])
    .it('lists all configurations', ctx => {
      expect(iteratorSpy).toHaveBeenCalled();
      expect(ctx.stdout).toContain('key1=value1');
      expect(ctx.stdout).toContain('key2=value2');
    });
});
