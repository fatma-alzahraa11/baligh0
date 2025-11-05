import { Target, Heart, Users, Award, BookOpen, Globe, Eye } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We approach every question with empathy and understanding',
    },
    {
      icon: BookOpen,
      title: 'Authenticity',
      description: 'All content is sourced from authentic Islamic scholars and texts',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a supportive community of learners and seekers',
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Making Islamic knowledge accessible to everyone, everywhere',
    },
  ];

  

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="relative text-white py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero2.jpg" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-brandBlue/90 to-brandGold/90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-white/80">
            Dedicated to spreading authentic Islamic knowledge
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-md p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="h-8 w-8 text-brandGold" />
              <h2 className="text-3xl font-bold text-gray-800">Our Vision</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              To be a trusted, global destination for authentic Islamic knowledge that
              enlightens hearts, strengthens faith, and inspires positive action.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We envision a world where everyone can access reliable Islamic guidance
              with clarity and confidence, anytime and anywhere.
            </p>
          </div>
        </section>
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-md p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Target className="h-8 w-8 text-brandBlue" />
              <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Islamic Guide is dedicated to providing authentic, accessible, and comprehensive Islamic
              knowledge to seekers around the world. We believe that understanding Islam should be
              available to everyone, regardless of their background or location.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Through our carefully curated content library, answered questions, and community resources,
              we strive to create a welcoming space where curiosity is encouraged and knowledge is shared
              with wisdom and compassion.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="bg-brandGold/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <value.icon className="h-7 w-7 text-brandGold" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-gradient-to-br from-brandBlue to-brandBlue/90 rounded-xl shadow-lg p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-6">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-white bg-opacity-20 w-12 h-12 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Comprehensive Library</h3>
                  <p className="text-white/80">
                    Access thousands of videos, audios, articles, and books from authentic sources
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-white bg-opacity-20 w-12 h-12 rounded-lg flex items-center justify-center">
                    <Award className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Expert Scholars</h3>
                  <p className="text-white/80">
                    Content verified and approved by qualified Islamic scholars
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-white bg-opacity-20 w-12 h-12 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Active Community</h3>
                  <p className="text-white/80">
                    Join thousands of learners in their journey to understand Islam
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-white bg-opacity-20 w-12 h-12 rounded-lg flex items-center justify-center">
                    <Globe className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
                  <p className="text-white/80">
                    Available worldwide, breaking down barriers to Islamic education
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        

        <section>
          <div className="bg-white rounded-xl shadow-md p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Join Our Journey</h2>
            <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
              Whether you're just beginning to explore Islam or deepening your existing knowledge,
              we're here to support you every step of the way. Together, we can build a more
              understanding and compassionate world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-brandBlue text-white px-8 py-3 rounded-lg font-semibold hover:bg-brandBlue/90 transition-colors">
                Explore Library
              </button>
              <button className="bg-white text-brandBlue px-8 py-3 rounded-lg font-semibold border-2 border-brandBlue hover:bg-brandBlue/5 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
