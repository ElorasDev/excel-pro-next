"use client";
import Location from '@/components/atoms/Icons/Location';
import EmailIcon from '@/components/atoms/Icons/Mail';
import PhoneIcon from '@/components/atoms/Icons/Phone';
import React from 'react';

const ContactInfoCard = () => {
  return (
    <div 
      className="w-[268px] h-[152px] pt-[22px] pr-6 pb-[22px] pl-6 flex flex-col gap-6 rounded-[20px]"
      style={{ border: '1px solid rgba(255, 255, 255, 0.16)' }}
    >
      <div className="flex items-center text-white">
        <Location size={20}/>
        <span className="text-sm ml-2">Canada, Ontario</span>
      </div>

      <div className="text-white flex items-center">
        <PhoneIcon size={20} />
        <span className="text-sm ml-2">+1 647-703-7821</span>
      </div>

      <div className="text-white flex items-center">
        <EmailIcon size={20}/>
        <span className="text-sm ml-2">excelprosocceracademy@gmail.com</span>
      </div>
    </div>
  );
};

export default ContactInfoCard;