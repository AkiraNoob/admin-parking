import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import ActivityView from 'src/sections/activity/view/activity-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Hoạt động - ${CONFIG.appName}`}</title>
      </Helmet>

      <ActivityView />
    </>
  );
}
