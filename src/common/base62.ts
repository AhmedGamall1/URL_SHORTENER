const ALPHABET =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE = BigInt(ALPHABET.length); // 62n

/** Turn a positive integer id into a short Base62 code. */
export function encodeBase62(id: bigint): string {
  if (id < 0n) {
    throw new Error('id must be non-negative');
  }
  if (id === 0n) {
    return ALPHABET[0];
  }

  let n = id;
  let code = '';
  while (n > 0n) {
    const remainder = Number(n % BASE);
    code = ALPHABET[remainder] + code;
    n = n / BASE;
  }
  return code;
}

/** Turn a Base62 code back into the original id */
export function decodeBase62(code: string): bigint {
  let n = 0n;
  for (const char of code) {
    const value = ALPHABET.indexOf(char);
    if (value === -1) {
      throw new Error(`invalid Base62 character: ${char}`);
    }
    n = n * BASE + BigInt(value);
  }
  return n;
}
