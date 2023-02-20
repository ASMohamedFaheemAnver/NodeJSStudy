import { writeFile } from 'fs';
import { join } from 'path';

export const outputJson = (data) => {
  writeFile(join('src', 'utils', 'out.json'), data, (err) => {
    if (err) {
      console.log({ err });
    }
  });
};
