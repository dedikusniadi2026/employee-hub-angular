import { Component, Input } from '@angular/core';

const ICON_PATHS: Record<string, string[]> = {
  'shield-check': ['M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11', 'm9 12 2 2 4-4'],
  'chevron-left': ['m15 18-6-6 6-6'],
  users: [
    'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2',
    'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8',
    'M22 21v-2a4 4 0 0 0-3-3.87',
    'M16 3.13a4 4 0 0 1 0 7.75',
  ],
  'log-out': ['M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4', 'm16 17 5-5-5-5', 'M21 12H9'],
  menu: ['M4 6h16', 'M4 12h16', 'M4 18h16'],
  plus: ['M12 5v14', 'M5 12h14'],
  search: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16', 'm21 21-4.35-4.35'],
  mail: [
    'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2',
    'm22 6-10 7L2 6',
  ],
  eye: ['M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6'],
  pencil: ['M12 20h9', 'M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z'],
  'trash-2': ['M3 6h18', 'M8 6V4h8v2', 'm19 6-1 14H6L5 6', 'M10 11v6', 'M14 11v6'],
  'chart-no-axes-column-increasing': ['M3 3v18h18', 'M18 17V9', 'M13 17V5', 'M8 17v-3'],
  'circle-alert': ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20', 'M12 8v5', 'M12 16h.01'],
  'arrow-right': ['M5 12h14', 'm12 5 7 7-7 7'],
  lock: ['M5 11h14v10H5z', 'M8 11V7a4 4 0 1 1 8 0v4', 'M12 15v2'],
  'badge-check': [
    'M12 3 14.5 5l3.2-.2.8 3.1 2.5 2-1.3 2.9.5 3.2-3 1.2-1.5 2.8-3.2-.8L9.3 20l-1.7-2.7-3.1-.7.1-3.2L2.5 11l2.1-2.4.1-3.2 3.2-.5L10 2.5Z',
    'm9 11 2 2 4-4',
  ],
  'chart-pie': ['M21.2 15A9 9 0 1 1 9 2.8', 'M22 12A10 10 0 0 0 12 2v10z'],
};

@Component({
  selector: 'app-lucide-icon',
  standalone: true,
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      [attr.stroke-width]="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      @for (path of paths; track $index) {
        <path [attr.d]="path" />
      }
    </svg>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        flex: 0 0 auto;
        vertical-align: middle;
        line-height: 0;
      }
      svg {
        display: block;
      }
    `,
  ],
})
export class LucideIconComponent {
  @Input({ required: true }) name = '';
  @Input() size = 20;
  @Input() strokeWidth = 1.8;

  get paths(): string[] {
    return ICON_PATHS[this.name] ?? ICON_PATHS['circle-alert'];
  }
}
