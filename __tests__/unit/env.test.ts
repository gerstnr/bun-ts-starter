import { describe, it, expect, vi, afterEach } from 'vitest';
import { loadEnv, getEnv } from '../../src/env.js';

describe('loadEnv', () => {
  const original = process.env.NODE_ENV;

  afterEach(() => {
    if (original === undefined) {
      delete process.env.NODE_ENV;
    } else {
      process.env.NODE_ENV = original;
    }
  });

  it('returns NODE_ENV when set', () => {
    process.env.NODE_ENV = 'test';
    const env = loadEnv();
    expect(env.nodeEnv).toBe('test');
  });

  it('returns undefined when NODE_ENV is not set', () => {
    delete process.env.NODE_ENV;
    const env = loadEnv();
    expect(env.nodeEnv).toBeUndefined();
  });
});

describe('getEnv', () => {
  const testVar = 'TEST_GET_ENV_VAR';

  afterEach(() => {
    delete process.env[testVar];
  });

  it('returns the value when set', () => {
    process.env[testVar] = 'some-value';
    expect(getEnv(testVar)).toBe('some-value');
  });

  it('returns undefined when the variable is missing', () => {
    delete process.env[testVar];
    expect(getEnv(testVar)).toBeUndefined();
  });

  it('returns undefined when the variable is empty string', () => {
    process.env[testVar] = '';
    expect(getEnv(testVar)).toBeUndefined();
  });

  it('logs a warning message when missing and message is provided', () => {
    delete process.env[testVar];
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    getEnv(testVar, 'Rate limiting applies without a key.');
    expect(spy).toHaveBeenCalledWith('Rate limiting applies without a key.');
    spy.mockRestore();
  });

  it('does not log when the variable is set', () => {
    process.env[testVar] = 'present';
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    getEnv(testVar, 'Should not appear');
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});
