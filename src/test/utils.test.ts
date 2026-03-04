import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('Utility Functions', () => {
  describe('cn (Tailwind Class Merger)', () => {
    it('should merge basic classes', () => {
      expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
    });

    it('should resolve conflicts using tailwind-merge', () => {
      // Overriding a padding class
      expect(cn('p-4 px-2', 'p-8')).toBe('p-8');

      // Overriding a text color
      expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
    });

    it('should filter out falsy values using clsx', () => {
      expect(cn('btn', false && 'hidden', null, undefined, 0, 'active')).toBe(
        'btn active',
      );
    });

    it('should handle arrays and conditional objects', () => {
      expect(
        cn(['text-sm', 'font-bold'], { 'bg-blue-500': true, hidden: false }),
      ).toBe('text-sm font-bold bg-blue-500');
    });
  });
});
