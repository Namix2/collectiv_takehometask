import type { PotCategory } from './pot.types';

export const POT_CATEGORIES: Array<{
  label: string;
  value: PotCategory;
  icon: string;
}> = [
  { label: 'To travel somewhere cool', value: 'Travel', icon: '\u2708\uFE0F' },
  { label: 'To do a whip-round for a gift', value: 'Gift', icon: '\uD83C\uDF81' },
  { label: 'To get sweaty and sporty', value: 'Sport', icon: '\u26F9\uFE0F' },
  { label: 'To do something fun with your peeps', value: 'Friends', icon: '\uD83C\uDF89' },
  { label: 'Something else entirely', value: 'Other', icon: '\u2728' },
  { label: 'To raise money for charity', value: 'Charity', icon: '\u2665' },
];

export const MAX_POT_NAME_LENGTH = 50;
