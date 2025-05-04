import React from 'react';

const AboutUs = () => {
  // Team members data
  const team = [
    {
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      image: '/api/placeholder/300/300',
      bio: 'Alex has over 10 years of experience in web development and a passion for creating innovative solutions.',
    },
    {
      name: 'Sarah Chen',
      role: 'Creative Director',
      image: '/api/placeholder/300/300',
      bio: 'With a background in design and user experience, Sarah ensures our products are beautiful and intuitive.',
    },
    {
      name: 'Michael Rodriguez',
      role: 'Lead Developer',
      image: '/api/placeholder/300/300',
      bio: 'Michael specializes in building robust applications with cutting-edge technology.',
    }
  ];

  return (
    <div className="bg-[#EEEEEE] min-h-screen pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#222831]">
        <div className="relative px-4 py-16 mx-auto max-w-6xl sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-[#EEEEEE] sm:text-5xl">
            About Us
          </h1>
          <div className="w-16 h-1 mt-4 mb-6 bg-[#00ADB5] rounded-full"></div>
          <p className="max-w-3xl mt-6 text-xl text-[#EEEEEE] opacity-90">
            We're passionate about building products that make a difference in people's lives through thoughtful design and powerful functionality.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="px-4 py-16 mx-auto max-w-6xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#222831]">Our Story</h2>
            <div className="w-16 h-1 mt-2 mb-6 bg-[#00ADB5] rounded-full"></div>
            <p className="text-lg text-[#393E46] leading-relaxed">
              Founded in 2020, our company began with a simple idea: create digital experiences that people love. What started as a small team working out of a coffee shop has grown into a dedicated group of professionals committed to excellence.
            </p>
            <p className="mt-4 text-lg text-[#393E46] leading-relaxed">
              We believe in the power of technology to transform businesses and enhance lives. Every project we undertake is approached with creativity, technical expertise, and a deep understanding of our clients' needs.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img 
                src="/api/placeholder/600/400" 
                alt="Our team working together" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-[#393E46] py-16">
        <div className="px-4 mx-auto max-w-6xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#EEEEEE]">Our Values</h2>
            <div className="w-16 h-1 mx-auto mt-2 mb-10 bg-[#00ADB5] rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {/* Innovation */}
            <div className="p-6 bg-[#222831] rounded-lg text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 mx-auto text-[#222831] bg-[#00ADB5] rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-medium text-[#EEEEEE]">Innovation</h3>
              <p className="mt-3 text-base text-[#EEEEEE] opacity-80">
                We constantly explore new ideas and technologies to create cutting-edge solutions.
              </p>
            </div>

            {/* Quality */}
            <div className="p-6 bg-[#222831] rounded-lg text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 mx-auto text-[#222831] bg-[#00ADB5] rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-medium text-[#EEEEEE]">Quality</h3>
              <p className="mt-3 text-base text-[#EEEEEE] opacity-80">
                We never compromise on quality, ensuring every product meets the highest standards.
              </p>
            </div>

            {/* Collaboration */}
            <div className="p-6 bg-[#222831] rounded-lg text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 mx-auto text-[#222831] bg-[#00ADB5] rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-medium text-[#EEEEEE]">Collaboration</h3>
              <p className="mt-3 text-base text-[#EEEEEE] opacity-80">
                We believe great ideas come from diverse perspectives working together.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="px-4 py-16 mx-auto max-w-6xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#222831]">Our Team</h2>
          <div className="w-16 h-1 mx-auto mt-2 mb-10 bg-[#00ADB5] rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <div key={index} className="overflow-hidden bg-white rounded-lg shadow-lg">
              <img 
                src={member.image} 
                alt={member.name} 
                className="object-cover w-full h-64"
              />
              <div className="p-6">
                <h3 className="text-xl font-medium text-[#222831]">{member.name}</h3>
                <p className="mt-1 text-[#00ADB5] font-medium">{member.role}</p>
                <p className="mt-3 text-[#393E46]">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-[#222831]">
        <div className="px-4 py-12 mx-auto max-w-6xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#EEEEEE]">Get In Touch</h2>
            <div className="w-16 h-1 mx-auto mt-2 mb-6 bg-[#00ADB5] rounded-full"></div>
            <p className="max-w-2xl mx-auto mt-4 text-lg text-[#EEEEEE] opacity-90">
              Have a question or interested in working with us? We'd love to hear from you.
            </p>
            <div className="mt-8">
              <button 
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-[#222831] bg-[#00ADB5] border border-transparent rounded-md shadow-sm hover:bg-opacity-90 transition-all duration-200"
              >
                Contact Us
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;