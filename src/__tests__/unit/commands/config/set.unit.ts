import {test} from '@oclif/test';
import Conf from 'conf';
import {ux} from '@oclif/core';

describe('config:set', () => {
  let hasSpy: jest.SpyInstance;
  let setSpy: jest.SpyInstance;
  let promptStub: jest.SpyInstance;

  beforeEach(() => {
    hasSpy = jest.spyOn(Conf.prototype, 'has').mockImplementation(() => false);
    setSpy = jest.spyOn(Conf.prototype, 'set').mockImplementation(() => null);
  });

  afterEach(() => {
    hasSpy.mockRestore();
    setSpy.mockRestore();
    if (promptStub) promptStub.mockRestore();
  });

  test
    .stdout()
    .command(['config:set', 'key', 'value'])
    .it('sets a value for the specified key', ctx => {
      expect(hasSpy).toHaveBeenCalledWith('key');
      expect(setSpy).toHaveBeenCalledWith('key', 'value');
      expect(ctx.stdout).toContain('Configuration "key" has been added');
    });

  describe('set with prompt', function () {
    beforeEach(() => {
      promptStub = jest.spyOn(ux, 'prompt').mockImplementation(() => Promise.resolve('value'));
    });

    test
      .stdout()
      .command(['config:set', 'key'])
      .it('prompts for a value if none is provided', ctx => {
        expect(hasSpy).toHaveBeenCalledWith('key');
        expect(setSpy).toHaveBeenCalledWith('key', 'value');
        expect(ctx.stdout).toContain('Configuration "key" has been added');
      });
  });

  describe('ignore with blank value from prompt', function () {
    beforeEach(() => {
      promptStub = jest.spyOn(ux, 'prompt').mockImplementation(() => Promise.resolve(''));
    });

    test
      .stdout()
      .command(['config:set', 'key'])
      .it('ignores setting a value if the prompted value is blank', ctx => {
        expect(hasSpy).toHaveBeenCalledWith('key');
        expect(setSpy).not.toHaveBeenCalled();
        expect(ctx.stdout).toContain('Configuration "key" has been ignored');
      });
  });
});
