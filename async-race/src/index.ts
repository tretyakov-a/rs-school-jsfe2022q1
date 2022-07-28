import { App } from '@components/app';
import './index.scss';
import { Emmiter } from './core/emmiter';

new App({
  emmiter: new Emmiter(),
});
