
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F5F4F0] pt-20 pb-10 px-4 border-t border-stone-200/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="font-serif text-2xl font-medium tracking-tight mb-6 inline-block">
              Ship Inn Stanley<span className="text-stone-400">.</span>
            </a>
            <p className="text-stone-500 max-w-xs leading-relaxed">
              We specialize in curating heritage Tasmanian experiences, connecting you with luxury, history, and the rugged beauty of Stanley.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-6">Explore</h4>
            <ul className="space-y-4 text-stone-500 text-sm">
              <li><a href="#" className="hover:text-stone-900 transition-colors">Accommodations</a></li>
              <li><a href="#" className="hover:text-stone-900 transition-colors">Local History</a></li>
              <li><a href="#" className="hover:text-stone-900 transition-colors">Coastal Trails</a></li>
              <li><a href="#" className="hover:text-stone-900 transition-colors">The Nut</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-stone-500 text-sm">
              <li>16 Church St, Stanley, TAS 7331</li>
              <li>+61 3 6458 1234</li>
              <li>stay@shipinnstanley.com.au</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-200/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-400 uppercase tracking-wider">
          <p>&copy; 2025 Ship Inn Stanley. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-stone-600">Privacy Policy</a>
            <a href="#" className="hover:text-stone-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
