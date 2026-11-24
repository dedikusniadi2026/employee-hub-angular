import { describe, it, expect, beforeEach, vi } from 'vitest';
import { OnlyNumberDirective } from './only-number.directive';

describe('OnlyNumberDirective', () => {
  let directive: OnlyNumberDirective;

  beforeEach(() => {
    directive = new OnlyNumberDirective();
  });

  it('should block e key', () => {
    const event = new KeyboardEvent('keydown', { key: 'e' });
    const spy = vi.spyOn(event, 'preventDefault');
    directive.onKeyDown(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should allow number key', () => {
    const event = new KeyboardEvent('keydown', { key: '5' });
    const spy = vi.spyOn(event, 'preventDefault');
    directive.onKeyDown(event);
    expect(spy).not.toHaveBeenCalled();
  });
});