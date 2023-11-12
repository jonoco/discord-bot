import yaml from 'yaml';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const templateFilename = 'model.template.yml';

interface ModalAdapter {
  name: string;
  description: string;
  url: string;
}

export const models: ModalAdapter[] = [];

readdirSync(join(__dirname, './models')).forEach((filename) => {
  if (filename === templateFilename) {
    return;
  }

  const filepath = join(__dirname, `./models/${filename}`);
  const file = readFileSync(filepath, 'utf8');
  const model: ModalAdapter = yaml.parse(file);
  models.push(model);
});
