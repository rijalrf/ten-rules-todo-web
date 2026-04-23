import { describe, it, expect } from 'vitest';
import { formatDate } from './formatDate';

describe('formatDate utility', () => {
  it('should format date string to Indonesian format correctly', () => {
    const date = '2026-04-23T10:00:00Z';
    const formatted = formatDate(date);
    
    // Hasil yang diharapkan mengandung 'April' dan '2026'
    expect(formatted).toContain('April');
    expect(formatted).toContain('2026');
  });

  it('should return "Invalid Date" for incorrect date strings', () => {
    const result = formatDate('not-a-date');
    expect(result).toBe('Invalid Date');
  });
});
