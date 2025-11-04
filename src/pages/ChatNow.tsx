import { MessageCircle, Bot } from 'lucide-react';

export default function ChatNow() {
  // WhatsApp Icon SVG
  const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );

  // Messenger Icon SVG
  const MessengerIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M12 0C5.373 0 0 4.925 0 11c0 3.584 1.837 6.761 4.64 8.675V24l4.277-2.348c1.145.314 2.352.481 3.583.481 6.627 0 12-4.924 12-11S18.627 0 12 0zm1.336 15.5l-3.205-3.396L4.767 15.5l5.843-6.188L13.832 5.5l3.205 3.396L22.233 5.5l-5.843 6.188L13.336 15.5z"/>
    </svg>
  );
  const cards = [
    {
      id: 1,
      title: 'Introduction',
      content: 'Welcome to a welcoming space for exploring Islam through live chat. Whether you\'re curious about the faith, considering conversion, or seeking to learn more, our platform provides a supportive environment for your journey.',
      image: 'src/images/hero.jpeg'
    },
    {
      id: 2,
      title: 'Understanding Islam',
      content: 'What does Islam truly mean? What are its core beliefs, values, and traditions? Our knowledgeable chat moderators are here to provide insights and answer your questions about the fundamental aspects of Islam.',
      image: 'src/images/hero2.jpg'
    },
    {
      id: 3,
      title: 'Becoming A Muslim',
      content: 'Interested in embracing Islam? Our live chat offers guidance for individuals considering conversion. Learn about the steps to becoming a Muslim, the significance of the Shahada, and how to begin your spiritual journey.',
      image: 'src/images/mostpopular.jpeg'
    },
    {
      id: 4,
      title: 'Engage In Enlightening Conversations',
      content: 'Join our vibrant community where thought-provoking conversations await. Connect with others who share your curiosity, ask questions, and engage in meaningful discussions about Islam and spirituality.',
      image: 'src/images/hero.jpeg'
    },
    {
      id: 5,
      title: 'Facts And Information',
      content: 'Access accurate and insightful information about Islam. From basic concepts to in-depth analyses, our platform provides resources to help you understand Islam better and make informed decisions.',
      image: 'src/images/hero2.jpg'
    },
    {
      id: 6,
      title: 'Why Convert To Islam?',
      content: 'Discover the reasons why millions have chosen to embrace Islam. Explore personal stories of faith, transformation, and the peace that comes with submitting to the will of Allah.',
      image: 'src/images/mostpopular.jpeg'
    },
    {
      id: 7,
      title: 'Conclusion',
      content: 'Your journey to understanding Islam begins here. We invite you to explore, ask questions, and engage in conversations that will help you discover the beauty and truth of Islam. Start your journey today.',
      image: 'src/images/hero.jpeg'
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-brandBlue to-brandGold">
        <div className="absolute inset-0 opacity-100">
          <img 
            src="src/images/hero.jpeg" 
            alt="Background" 
            className="w-full h-full object-cover blur-sm"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/0"></div>
        
        {/* Decorative Elements */}
        <div className="absolute left-10 top-20 opacity-20">
          <div className="w-16 h-16 bg-white/10 rounded-lg backdrop-blur-sm flex items-center justify-center mb-4">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
          <div className="w-16 h-16 bg-white/10 rounded-lg backdrop-blur-sm flex items-center justify-center mb-4">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
          <div className="w-16 h-16 bg-white/10 rounded-lg backdrop-blur-sm flex items-center justify-center">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
        </div>

        <div className="absolute right-10 top-20 opacity-20">
          <div className="w-16 h-16 bg-white/10 rounded-lg backdrop-blur-sm flex items-center justify-center mb-4">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
          <div className="w-16 h-16 bg-white/10 rounded-lg backdrop-blur-sm flex items-center justify-center mb-4">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
          <div className="w-16 h-16 bg-white/10 rounded-lg backdrop-blur-sm flex items-center justify-center">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="heading-font text-5xl md:text-7xl mb-6 leading-tight text-white" data-aos="fade-up">
              Explore Islam | Chat & Decide
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-aos="fade-up" data-aos-delay="100">
              Learn about Islam through live chat. Ask questions, discover the truth, and connect with friendly guides.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              className="group relative w-16 h-16 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white transition-all transform hover:scale-105 hover:shadow-2xl shadow-xl flex items-center justify-center"
              data-aos="zoom-in"
            >
              <WhatsAppIcon />
            </button>
            <button
              className="group relative w-16 h-16 rounded-full bg-[#0084FF] hover:bg-[#0073E6] text-white transition-all transform hover:scale-105 hover:shadow-2xl shadow-xl flex items-center justify-center"
              data-aos="zoom-in" data-aos-delay="100"
            >
              <MessengerIcon />
            </button>
            <button
              className="group relative w-16 h-16 rounded-full bg-[#dbac42] hover:bg-[#c99a38] text-white transition-all transform hover:scale-105 hover:shadow-2xl shadow-xl flex items-center justify-center"
              data-aos="zoom-in" data-aos-delay="200"
            >
              <Bot className="h-8 w-8" />
            </button>
          </div>
        </div>
      </section>

      {/* Explore Islam Section - Cards without vertical timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-font text-3xl md:text-5xl text-brandBlue mb-12 text-center" data-aos="fade-up">
            Explore Islam
          </h2>
          
          {/* Cards Grid - No vertical timeline, alternating left/right */}
          <div className="space-y-8 lg:space-y-12">
            {cards.map((card, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={card.id}
                  className={`flex flex-col md:flex-row items-center ${
                    isEven ? '' : 'md:flex-row-reverse'
                  }`}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  {/* Card */}
                  <div className="w-full md:w-5/12">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                      {/* Image at the top */}
                      <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                      </div>
                      
                      {/* Teal Header */}
                      <div className="bg-brandBlue px-6 py-5">
                        <h3 className="text-xl font-bold text-white">{card.title}</h3>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6 bg-white">
                        <p className="text-gray-700 leading-relaxed text-base">{card.content}</p>
                      </div>
                    </div>
                  </div>
                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-2/12"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

