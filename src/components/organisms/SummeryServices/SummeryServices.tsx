import PrimaryIcon from '@/components/atoms/Icons/primaryIcons/PrimaryIcon';
import { Fragment } from 'react';
import { services } from './data';

const SummeryServices = () => {

  return (
    <div className="bg-secondary p-4 text-center">
      <h2 className="text-md font-semibold text-primary my-3"> Our Services </h2>
      <h2 className="text-2xl font-bold text-white my-5">Excel Pro Academy Services</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-8 justify-items-center mt-4 lg:mt-10 md:mt-8">
        {services.map((service, index) => (
          <Fragment key={index}>
              <PrimaryIcon 
                icon={`/icons/${service.title}.png`}
                text={service.title}
                variant="light"
                className="w-[64px] h-[64px]"
                fontWeight = "bold"
                width={35}
                height={35}
              />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default SummeryServices;
