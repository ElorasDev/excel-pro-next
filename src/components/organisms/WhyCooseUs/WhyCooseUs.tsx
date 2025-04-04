import { Fragment } from 'react'
import Image from 'next/image';

import PrimaryIcon from '@/components/atoms/Icons/primaryIcons/PrimaryIcon';
import { services } from './data';

const WhyChooseUs = () => {
  return (
    <div className="w-full max-w-6xl mx-auto bg-[#FAFAFA] p-4 text-center rounded-xl relative overflow-hidden">
      {/* Add the red semi-circle with proper dimensions */}
      <div className="absolute top-0 left-0 w-24 h-24 md:w-32 md:h-32">
        <Image 
            src="/images/other/red-semi-circle.png"
            alt="Red semi-circle"
            width={80}
            height={80}
            className="object-contain"
            priority
        />
      </div>
      
      <h2 className="text-2xl font-bold text-[#181D27] my-10 relative z-10">Why choose us?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-x-8 justify-items-center mt-4 lg:mt-10 md:mt-8 relative z-10">
        {services.map((service, index) => (
          <Fragment key={index}>
            <PrimaryIcon 
              icon={`/icons/${service.title}.png`}
              text={service.title}
              variant="dark"
              className="w-[64px] h-[64px]"
              fontWeight="bold"
              width={35}
              height={35}
            />
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default WhyChooseUs;