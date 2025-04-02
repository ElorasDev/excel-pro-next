"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menuItems } from './data';

const Menu = ({ variant = 'default', orientation = 'horizontal' }: { variant?: 'default' | 'footer'; orientation?: 'horizontal' | 'vertical' }) => {
  const pathname = usePathname();

  // Define variants for different contexts
  const variants = {
    default: {
      textColor: 'text-[#393939]',
      activeTextColor: 'text-[#151313]',
      hoverColor: 'hover:text-primary',
      showIndicator: true
    },
    footer: {
      textColor: 'text-white',
      activeTextColor: 'text-white font-bold',
      hoverColor: 'hover:text-primary',
      showIndicator: false
    }
  };

  // Get the selected variant or use default if not found
  const currentVariant = variants[variant] || variants.default;

  return (
    <nav>
      <ul className={`flex ${orientation === 'horizontal' ? 'md:flex-row md:space-x-14 space-y-4 md:space-y-0' : 'flex-col space-y-4'}`}>
        {menuItems.map((item) => (
          <li key={item.id}>
            <Link 
              href={item.href}
              className={`relative font-montserrat transition-all duration-300 ${
                pathname === item.href
                  ? currentVariant.activeTextColor
                  : `${currentVariant.textColor} ${currentVariant.hoverColor}`
              }`}
            >
              {item.label}
              {pathname === item.href && currentVariant.showIndicator && (
                <span className="absolute top-0 right-[-12px] w-2 h-2 bg-primary rounded-full"></span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;