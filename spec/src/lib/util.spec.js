import formatThousands from '../../../src/lib/util.js';

describe('src/lib/util.js', () => {

  describe('formatThousands()', () => {

    it('should be defined', () => {
      expect(formatThousands).toBeDefined();
    });

    it('should parse a number less than 1K', () => {
      expect(formatThousands(999)).toBe('999');
    });

    it('should parse a number more than 1K', () => {
      expect(formatThousands(9999)).toBe('9.999');
    });

    it('should parse a million as number', () => {
      expect(formatThousands(9999999)).toBe('9.999.999');
    });

    it('should parse a number with decimals', () => {
      expect(formatThousands(9999.95)).toBe('9.999,95');
    });

    it('should parse a string less than 1K', () => {
      expect(formatThousands('999')).toBe('999');
    });

    it('should parse a string more than 1K', () => {
      expect(formatThousands('9999')).toBe('9.999');
    });

    it('should parse a million as string', () => {
      expect(formatThousands('9999999')).toBe('9.999.999');
    });

    it('should parse a string with decimals', () => {
      expect(formatThousands('9999.95')).toBe('9.999,95');
    });
  });

});