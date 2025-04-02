"use client";


// icons
import Facebook from '@/components/atoms/Icons/Facebook';
import InstagramIcon from '@/components/atoms/Icons/InstagramIcon';
import Location from '@/components/atoms/Icons/Location';
import EmailIcon from '@/components/atoms/Icons/Mail';
import PhoneIcon from '@/components/atoms/Icons/Phone';


const TopBar = () => {
  return (
    <div className="w-full bg-secondary py-2 px-6 lg:px-14 md:px-8 text-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Left side - Contact Information */}
          <div className="flex flex-wrap items-center gap-x-3 md:gap-x-6 text-sm">
            <div className="flex items-center">
              <Location size={16} />
              <span className="hidden sm:inline ml-1">123 Excel Street, Ontario</span>
              <span className="sm:hidden ml-1">Ontario</span>
            </div>
            
            <div className="hidden md:flex items-center">
              <EmailIcon size={16} />
              <span className="ml-1">info@excelpro.com</span>
            </div>
            
            <div className="flex items-center">
              <PhoneIcon size={16} />
              <span className="ml-1">+1 (234) 567-8900</span>
            </div>
          </div>
          
          {/* Right side - Social Media Icons */}
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Facebook" className="hover:text-secondary-focus transition-colors">
              <InstagramIcon size={18} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-secondary-focus transition-colors">
              <Facebook size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;