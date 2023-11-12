import { Level } from 'level';

export const db = new Level<string, any>('../../data', {
  valueEncoding: 'json',
});
