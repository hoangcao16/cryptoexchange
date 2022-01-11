/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const FiatSpotPage = lazyLoad(
  () => import('./index'),
  module => module.FiatSpotPage,
);
