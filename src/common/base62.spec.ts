import { encodeBase62, decodeBase62 } from './base62';

describe('Base62', () => {
  it('encodes known ids to the expected codes', () => {
    expect(encodeBase62(0n)).toBe('0');
    expect(encodeBase62(1n)).toBe('1');
    expect(encodeBase62(61n)).toBe('Z');
    expect(encodeBase62(62n)).toBe('10');
  });

  it('round-trips: decoding an encoded id gives the id back', () => {
    const ids = [1n, 100n, 12345n, 9999999999n];
    for (const id of ids) {
      expect(decodeBase62(encodeBase62(id))).toBe(id);
    }
  });

  it('produces only Base62 characters', () => {
    expect(encodeBase62(123456789n)).toMatch(/^[0-9a-zA-Z]+$/);
  });

  it('rejects invalid characters when decoding', () => {
    expect(() => decodeBase62('bad-code!')).toThrow();
  });
});
