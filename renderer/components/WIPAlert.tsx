import { InformationCircleIcon } from '@heroicons/react/24/solid';

const WIPAlert = () => (
  <section className="alert alert-info mt-5 flex flex-row">
    <InformationCircleIcon className="h-16 w-16" />
    Esta funcionalidad está deshabilitada por el momento.
  </section>
);

export default WIPAlert;
