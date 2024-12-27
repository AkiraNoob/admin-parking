import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { ParkingLotsDetailView } from 'src/sections/parking-lots-detail/view/parking-lots-detail-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Chi tiết bãi xe - ${CONFIG.appName}`}</title>
        <meta
          name="description"
          content="The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style"
        />
        <meta name="keywords" content="react,material,kit,application,dashboard,admin,template" />
      </Helmet>

      <ParkingLotsDetailView />
    </>
  );
}
