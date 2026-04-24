import {
  FaLongArrowAltRight,
  FaPhoneAlt,
  FaFacebook,
  FaInstagram,
} from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { TfiEmail } from 'react-icons/tfi';
import { getGlobalSettings } from '@/lib/services/global';

export default async function page() {
  const globals = await getGlobalSettings();
  const {
    contact_title_first,
    contact_title_second,
    contact_description,
    contact_email,
    contact_text,
    address,
    google_map_link,
    social_links,
  } = globals;
  return (
    <main className='pt-32 pb-20 px-8 max-w-7xl mx-auto my-12'>
      <div className='mb-16'>
        <h1 className='text-5xl md:text-6xl font-extrabold tracking-tight text-primary mb-4'>
          {contact_title_first}{' '}
          <span className='text-secondary lowercase'>
            {contact_title_second}
          </span>
        </h1>
        <p className='text-on-surface-variant max-w-2xl text-lg leading-relaxed'>
          {contact_description}
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-16'>
        <div className='lg:col-span-7'>
          <div className='bg-surface-container-lowest p-8 md:p-12 shadow-[0px_24px_48px_-12px_rgba(9,20,38,0.08)]'>
            <h2 className='text-2xl font-bold text-primary mb-8'>
              Send a Message
            </h2>
            {/* Contact Form */}
            <form className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <label className='text-sm font-semibold text-primary/70 uppercase tracking-wider'>
                    Full Name
                  </label>
                  <input
                    className='w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:ring-0 focus:border-primary px-0 py-3 transition-all placeholder:text-outline-variant'
                    placeholder='John Doe'
                    type='text'
                  />
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-semibold text-primary/70 uppercase tracking-wider'>
                    Email Address
                  </label>
                  <input
                    className='w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:ring-0 focus:border-primary px-0 py-3 transition-all placeholder:text-outline-variant'
                    placeholder='john@company.com'
                    type='email'
                  />
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <label className='text-sm font-semibold text-primary/70 uppercase tracking-wider'>
                    Company Name
                  </label>
                  <input
                    className='w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:ring-0 focus:border-primary px-0 py-3 transition-all placeholder:text-outline-variant'
                    placeholder='Maverick Industries'
                    type='text'
                  />
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-semibold text-primary/70 uppercase tracking-wider'>
                    Subject
                  </label>
                  <input
                    className='w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:ring-0 focus:border-primary px-0 py-3 transition-all placeholder:text-outline-variant'
                    placeholder='Project Inquiry'
                    type='text'
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-semibold text-primary/70 uppercase tracking-wider'>
                  Message
                </label>
                <textarea
                  className='w-full bg-surface-container-low border-0 border-b-2 border-transparent focus:ring-0 focus:border-primary px-0 py-3 transition-all placeholder:text-outline-variant resize-none'
                  placeholder='Tell us about your project goals...'
                  rows={5}
                ></textarea>
              </div>
              <div className='pt-4'>
                <button
                  className='bg-secondary text-on-secondary px-10 py-4 rounded font-bold hover:scale-[1.02] transition-transform duration-200 flex items-center gap-2 group'
                  type='submit'
                >
                  Send Inquiry
                  <span className='material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform'>
                    <FaLongArrowAltRight />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className='lg:col-span-5 flex flex-col gap-8'>
          <div className='bg-primary text-on-primary p-8 md:p-12'>
            <h2 className='text-2xl font-bold mb-8'>Contact Details</h2>
            <div className='space-y-8'>
              <div className='flex gap-4 items-start'>
                <span className='material-symbols-outlined text-secondary-container'>
                  <FaLocationDot />
                </span>
                <div>
                  <h3 className='font-semibold text-white/60 text-sm uppercase tracking-widest mb-1'>
                    Office
                  </h3>
                  <p className='text-lg leading-snug'>{address}</p>
                </div>
              </div>
              <div className='flex gap-4 items-start'>
                <span className='material-symbols-outlined text-secondary-container'>
                  <FaPhoneAlt />
                </span>
                <div>
                  <h3 className='font-semibold text-white/60 text-sm uppercase tracking-widest mb-1'>
                    Phone
                  </h3>
                  <p className='text-lg'>{contact_text}</p>
                </div>
              </div>
              <div className='flex gap-4 items-start'>
                <span className='material-symbols-outlined text-secondary-container'>
                  <TfiEmail />
                </span>
                <div>
                  <h3 className='font-semibold text-white/60 text-sm uppercase tracking-widest mb-1'>
                    Email
                  </h3>
                  <p className='text-lg'>{contact_email}</p>
                </div>
              </div>
            </div>

            <div className='mt-12 pt-12 border-t border-white/10'>
              <h3 className='font-semibold text-white/60 text-sm uppercase tracking-widest mb-6'>
                Follow Us
              </h3>
              <div className='flex gap-4'>
                <a
                  className='w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-secondary transition-colors group'
                  href={social_links[0]?.url}
                >
                  <span className='material-symbols-outlined text-xl'>
                    <FaFacebook />
                  </span>
                </a>
                <a
                  className='w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-secondary transition-colors group'
                  href={social_links[1]?.url}
                >
                  <span className='material-symbols-outlined text-xl'>
                    <FaInstagram />
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className='flex-grow min-h-[300px] relative overflow-hidden shadow-lg grayscale hover:grayscale-0 transition-all duration-700'>
            <iframe
              src={google_map_link}
              width='600'
              height='450'
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
            <div className='absolute inset-0 bg-secondary/10 pointer-events-none'></div>
            <div className='absolute bottom-6 left-6 bg-white p-4 shadow-xl'>
              <p className='text-xs font-bold text-primary tracking-tighter uppercase'>
                Our Office
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
