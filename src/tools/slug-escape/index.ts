import { lazy } from 'react';
import { meta } from './meta';
export default { meta, Component: lazy(() => import('./Tool')) };
