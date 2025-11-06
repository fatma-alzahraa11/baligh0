import { 
  BookOpen, 
  MessageCircle, 
  Play, 
  Music, 
  FileText, 
  Video, 
  ChevronRight, 
  ChevronLeft,
  Download,
  Eye,
  ArrowRight,
  Share2,
  User
} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { supabase, Question, LibraryItem } from '../lib/supabase';
import ShareModal from '../components/ShareModal';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [featuredQuestions, setFeaturedQuestions] = useState<Question[]>([]);
  const [popularVideos, setPopularVideos] = useState<LibraryItem[]>([]);
  const [popularShorts, setPopularShorts] = useState<LibraryItem[]>([]);
  const [popularBooks, setPopularBooks] = useState<LibraryItem[]>([]);
  const [popularAudios, setPopularAudios] = useState<LibraryItem[]>([]);
  const [popularArticles, setPopularArticles] = useState<LibraryItem[]>([]);
  const [questionTab, setQuestionTab] = useState<string>('How?');
  const [videoCarouselIndex, setVideoCarouselIndex] = useState(0);
  const [hoveredBookId, setHoveredBookId] = useState<string | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState<string>('');
  const [shareTitle, setShareTitle] = useState<string>('');
  const videoCarouselRef = useRef<HTMLDivElement>(null);

  const questionTabs = ['What?', 'Where?', 'When?', 'Why?', 'How?'];

  useEffect(() => {
    loadFeaturedContent();
  }, []);

  useEffect(() => {
    filterQuestionsByTab();
  }, [questionTab]);

  const loadFeaturedContent = async () => {
    // Load popular videos
    const { data: videos } = await supabase
      .from('library_items')
      .select('*')
      .eq('type', 'video')
      .order('view_count', { ascending: false })
      .limit(6);

    // Load popular shorts (short videos - we'll use videos with shorter duration or specific tag)
    const { data: shorts } = await supabase
      .from('library_items')
      .select('*')
      .eq('type', 'video')
      .order('view_count', { ascending: false })
      .limit(5);

    // Load popular books
    const { data: books } = await supabase
      .from('library_items')
      .select('*')
      .eq('type', 'book')
      .order('view_count', { ascending: false })
      .limit(6);

    // Load popular audios
    const { data: audios } = await supabase
      .from('library_items')
      .select('*')
      .eq('type', 'audio')
      .order('view_count', { ascending: false })
      .limit(4);

    // Load popular articles
    const { data: articles } = await supabase
      .from('library_items')
      .select('*')
      .eq('type', 'article')
      .order('view_count', { ascending: false })
      .limit(3);

    if (videos) setPopularVideos(videos);
    if (shorts) setPopularShorts(shorts);
    if (books) setPopularBooks(books);
    if (audios) setPopularAudios(audios);
    if (articles) setPopularArticles(articles);
  };

  const filterQuestionsByTab = async () => {
    // Map tabs to categories
    const categoryMap: { [key: string]: string } = {
      'What?': 'definition',
      'Where?': 'location',
      'When?': 'history',
      'Why?': 'reason',
      'How?': 'method'
    };

    const category = categoryMap[questionTab] || 'method';
    
    const { data: questions } = await supabase
      .from('questions')
      .select('*')
      .or(`category.ilike.%${category}%,tags.cs.{${category}}`)
      .order('view_count', { ascending: false })
      .limit(2);

    if (questions && questions.length > 0) {
      setFeaturedQuestions(questions);
    } else {
      // Fallback to all popular questions if no match
      const { data: allQuestions } = await supabase
        .from('questions')
        .select('*')
        .order('view_count', { ascending: false })
        .limit(2);
      if (allQuestions) setFeaturedQuestions(allQuestions);
    }
  };

  const scrollVideoCarousel = (direction: 'left' | 'right', pages: number) => {
    if (!videoCarouselRef.current) return;
    const scrollAmount = 400;
    const currentScroll = videoCarouselRef.current.scrollLeft;
    const nextIndex = direction === 'right'
      ? Math.min(videoCarouselIndex + 1, pages - 1)
      : Math.max(videoCarouselIndex - 1, 0);
    setVideoCarouselIndex(nextIndex);
    videoCarouselRef.current.scrollTo({
      left: currentScroll + (direction === 'right' ? scrollAmount : -scrollAmount),
      behavior: 'smooth'
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-brandBlue to-brandGold">
        <div className="absolute inset-0">
          <img 
            src="/images/hero.png" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="heading-font text-5xl md:text-7xl mb-6 leading-tight" data-aos="fade-up">
              <span className="text-blue-400 drop-shadow-2xl">Discover</span>{' '}
              <span className="text-yellow-400 drop-shadow-2xl">And Learn</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8" data-aos="fade-up" data-aos-delay="100">
              Your gateway to authentic Islamic knowledge through interactive content, 
              engaging questions, and comprehensive resources
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => onNavigate('questions')}
              className="group relative cta-gradient px-10 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 hover:shadow-2xl shadow-xl flex items-center gap-2"
              data-aos="zoom-in"
            >
              <MessageCircle className="h-5 w-5" />
              Explore Questions
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('library')}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-10 py-4 rounded-full font-semibold text-lg border-2 border-white/30 hover:border-white/50 transition-all transform hover:scale-105 flex items-center gap-2"
              data-aos="zoom-in" data-aos-delay="100"
            >
              <BookOpen className="h-5 w-5" />
              Browse Library
            </button>
          </div>
          
          {/* Video Icon */}
          <div className="mt-8 flex justify-center" data-aos="fade-up" data-aos-delay="200">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-4 border-2 border-white/30 animate-bounce">
                <Video className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Most Popular Questions Section */}
      <section className="py-20 bg-white" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-font text-3xl md:text-5xl text-gray-700 mb-8 flex items-center gap-3">
            <MessageCircle className="h-8 w-8 text-brandBlue" />
            Most Popular Questions
          </h2>
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-3 mb-12">
            {questionTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setQuestionTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  questionTab === tab
                    ? 'bg-brandBlue text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Question Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredQuestions.map((q) => (
              <div
                key={q.id}
                className="group relative card-glass rounded-2xl overflow-hidden hover-lift"
              >
                <div className="relative h-64 bg-gradient-to-br from-brandBlue to-brandBlue overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://chatanddecide.com/assets/media/what-are-the-five-pillars-of-islam157_carousalThumb.jpg')] bg-cover bg-center group-hover:scale-110 transition-transform duration-500"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2">{q.question}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 line-clamp-3 mb-4">{q.answer}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-brandBlue font-semibold">{q.category}</span>
                    <button className="flex items-center text-brandBlue hover:text-brandBlue/90 font-semibold group-hover:gap-2 transition-all">
                      Read More
                      <span className="w-2 h-2 bg-brandBlue rounded-full ml-2 group-hover:ml-0"></span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {featuredQuestions.length === 0 && (
              <div className="col-span-2 text-center py-12 text-gray-500">
                No questions found for this category. Check back soon!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Most Popular Audios Section */}
      <section className="relative py-20 text-white overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8" data-aos="fade-up">
        <div className="absolute inset-0">
          <img 
            src="/images/mostpopular.jpeg" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="heading-font text-3xl md:text-5xl flex items-center gap-3">
              <Music className="h-8 w-8 text-white" />
              Most Popular Audios
            </h2>
            <button
              onClick={() => onNavigate('library')}
              className="hidden md:inline-flex bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 items-center gap-2"
            >
              View More
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularAudios.map((audio) => (
              <div
                key={audio.id}
                className="group bg-white text-gray-900 rounded-3xl px-6 py-6 flex items-center gap-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* thumbnail */}
                <div className="h-24 w-24 rounded-full overflow-hidden flex-shrink-0">
                  {audio.thumbnail_url ? (
                    <img src={audio.thumbnail_url} alt={audio.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <Music className="h-10 w-10 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2">{audio.title}</h3>
                  <button className="inline-flex items-center gap-3 text-gray-900/80 hover:text-gray-900 font-semibold">
                    <span className="h-9 w-9 rounded-full bg-orange-400 flex items-center justify-center">
                      <Play className="h-4 w-4 text-white" />
                    </span>
                    Listen Now
                  </button>
                </div>
              </div>
            ))}
            {popularAudios.length === 0 && (
              <div className="col-span-3 text-center py-12 text-white/80">No audios available yet. Check back soon!</div>
            )}
          </div>
        </div>
      </section>

      {/* Most Popular Shorts Section */}
      <section className="py-20 bg-white" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="heading-font text-3xl md:text-5xl text-gray-700 flex items-center gap-3">
              <Video className="h-8 w-8 text-brandBlue" />
              Most Popular Shorts
            </h2>
            <button
              onClick={() => onNavigate('library')}
              className="hidden md:inline-flex bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 items-center gap-2"
            >
              View More
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {popularShorts.slice(0, 5).map((short) => (
              <div
                key={short.id}
                className="relative group bg-gray-900 rounded-xl overflow-hidden aspect-[9/16] cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900">
                  {short.thumbnail_url ? (
                    <img
                      src={short.thumbnail_url}
                      alt={short.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Video className="h-12 w-12 text-gray-600" />
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <div className="mb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4 text-brandGold" />
                      <span className="text-xs text-brandGold font-semibold">IDC</span>
                    </div>
                    <p className="text-white text-sm font-medium line-clamp-2">{short.title}</p>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button className="flex-1 bg-brandBlue hover:bg-brandBlue/90 text-white py-2 rounded-lg flex items-center justify-center gap-1 text-xs font-semibold transition-colors">
                      <Play className="h-3 w-3" />
                    </button>
                    <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg flex items-center justify-center gap-1 text-xs font-semibold transition-colors">
                      <Download className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Most Popular Videos Section */}
      <section className="relative py-20 text-white overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8" data-aos="fade-up">
        <div className="absolute inset-0">
          <img 
            src="/images/mostpopular.jpeg" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="heading-font text-3xl md:text-5xl flex items-center gap-3">
              <Play className="h-8 w-8 text-brandGold" />
              Most Popular Videos
            </h2>
            <button
              onClick={() => onNavigate('library')}
              className="hidden md:inline-flex bg-brandGold hover:bg-brandGold/90 text-white px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 flex items-center gap-2"
            >
              View More
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <div className="relative">
            {/** calculate pages for dots indicator */}
            {(() => {
              const pages = Math.max(1, Math.ceil(popularVideos.length / 3));
              return (
                <>
            <div
              ref={videoCarouselRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {popularVideos.map((video) => (
                <div
                  key={video.id}
                  className="flex-shrink-0 w-80 bg-gray-800 rounded-xl overflow-hidden group hover:shadow-2xl transition-all"
                >
                  <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-900 overflow-hidden">
                    {video.thumbnail_url ? (
                      <img
                        src={video.thumbnail_url}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Video className="h-16 w-16 text-gray-600" />
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white rounded-full p-4 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <Play className="h-8 w-8 text-brandBlue fill-brandBlue" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 border-l-2 border-brandGold pl-3">{video.title}</h3>
                    <button className="flex items-center gap-2 text-brandBlue hover:text-brandBlue/80 font-semibold">
                      <Play className="h-4 w-4" />
                      Play video
                    </button>
                  </div>
                </div>
              ))}
            </div>
              {/* arrows */}
              {popularVideos.length > 3 && (
                <>
                  <button
                    onClick={() => scrollVideoCarousel('left', pages)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all"
                  >
                    <ChevronLeft className="h-6 w-6 text-white" />
                  </button>
                  <button
                    onClick={() => scrollVideoCarousel('right', pages)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all"
                  >
                    <ChevronRight className="h-6 w-6 text-white" />
                  </button>
                </>
              )}

              {/* dots indicator */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {Array.from({ length: pages }).map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-2 w-2 rounded-full ${idx === videoCarouselIndex ? 'bg-brandGold' : 'bg-white/30'}`}
                  />
                ))}
              </div>
              </>
              );
            })()}
          </div>
        </div>
      </section>

      {/* Most Popular Articles Section */}
      <section className="py-20 bg-white" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="heading-font text-3xl md:text-5xl text-gray-700 flex items-center gap-3">
              <FileText className="h-8 w-8 text-brandBlue" />
              Most Popular Articles
            </h2>
            <button
              onClick={() => onNavigate('library')}
              className="hidden md:inline-flex bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 items-center gap-2"
            >
              View More
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile horizontal scroll, grid on md+ */}
          <div className="flex md:grid overflow-x-auto md:overflow-visible gap-6 md:gap-8 md:grid-cols-3 scrollbar-hide pb-3">
            {popularArticles.map((article) => (
              <div
                key={article.id}
                className="group card-glass rounded-xl overflow-hidden hover-lift flex-shrink-0 w-80 md:w-auto"
              >
                <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-400 overflow-hidden">
                  {article.thumbnail_url ? (
                    <img
                      src={article.thumbnail_url}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileText className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-700 mb-3 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-600 line-clamp-4 mb-4">{article.description}</p>
                  <button className="text-brandBlue hover:text-brandBlue/90 font-semibold flex items-center gap-2">
                    Read Article
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            {popularArticles.length === 0 && (
              <div className="col-span-3 text-center py-12 text-gray-500">
                No articles available yet. Check back soon!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Most Popular Books Section */}
      <section className="py-20 bg-white" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="heading-font text-3xl md:text-5xl text-gray-700 flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-brandBlue" />
              Most Popular Books
            </h2>
            <button
              onClick={() => onNavigate('library')}
              className="hidden md:inline-flex bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 items-center gap-2"
            >
              View More
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* Two-column grid with 3D book covers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {popularBooks.slice(0, 4).map((book, idx) => {
              const isHovered = hoveredBookId === book.id;
              const isEven = idx % 2 === 0;
              
              return (
              <div 
                key={book.id} 
                className="group relative bg-white rounded-2xl p-6 hover:shadow-lg transition-all"
                onMouseEnter={() => setHoveredBookId(book.id)}
                onMouseLeave={() => setHoveredBookId(null)}
              >
                <div className={`flex items-start gap-6 ${idx % 2 === 1 ? 'flex-row-reverse' : ''}`}>
                  {/* Book Cover with 3D perspective and open effect on hover */}
                  <div className="flex-shrink-0 relative">
                    <div 
                      className="relative w-32 h-44 md:w-36 md:h-52 transition-all duration-500 ease-out"
                      style={{
                        perspective: '1200px',
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      {/* Book cover with 3D rotation - opens on hover */}
                      <div 
                        className="absolute inset-0 rounded-lg shadow-2xl overflow-hidden transition-transform duration-500 ease-out origin-left"
                        style={{
                          transform: isHovered
                            ? (isEven 
                              ? 'perspective(1200px) rotateY(-45deg) rotateX(8deg) scale(1.05)' 
                              : 'perspective(1200px) rotateY(45deg) rotateX(8deg) scale(1.05)')
                            : (isEven 
                              ? 'perspective(1200px) rotateY(-20deg) rotateX(5deg)' 
                              : 'perspective(1200px) rotateY(20deg) rotateX(5deg)'),
                          transformStyle: 'preserve-3d',
                          backfaceVisibility: 'hidden'
                        }}
                      >
                        {book.thumbnail_url ? (
                          <img 
                            src={book.thumbnail_url} 
                            alt={book.title} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-brandBlue to-brandGold flex items-center justify-center">
                            <BookOpen className="h-12 w-12 text-white opacity-50" />
                          </div>
                        )}
                      </div>
                      
                      {/* Book spine shadow for 3D effect - fades when opening */}
                      <div 
                        className="absolute inset-0 rounded-lg transition-all duration-500"
                        style={{
                          background: 'linear-gradient(to right, rgba(0,0,0,0.15) 0%, transparent 10%)',
                          transform: isHovered
                            ? (isEven ? 'perspective(1200px) rotateY(-45deg)' : 'perspective(1200px) rotateY(45deg)')
                            : (isEven ? 'rotateY(-20deg)' : 'rotateY(20deg)'),
                          opacity: isHovered ? 0 : 1,
                          pointerEvents: 'none'
                        }}
                      ></div>
                      
                      {/* Inner pages effect when opening - shows white pages inside */}
                      <div 
                        className="absolute inset-0 rounded-lg transition-all duration-500"
                        style={{
                          background: isEven
                            ? 'linear-gradient(to right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 5%, transparent 15%)'
                            : 'linear-gradient(to left, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 5%, transparent 15%)',
                          transform: isHovered
                            ? (isEven 
                              ? 'perspective(1200px) rotateY(-20deg) translateX(2px)' 
                              : 'perspective(1200px) rotateY(20deg) translateX(-2px)')
                            : (isEven 
                              ? 'perspective(1200px) rotateY(-20deg) translateX(0)' 
                              : 'perspective(1200px) rotateY(20deg) translateX(0)'),
                          opacity: isHovered ? 1 : 0,
                          pointerEvents: 'none',
                          clipPath: isEven ? 'inset(0 0 0 5%)' : 'inset(0 5% 0 0)'
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    {/* Publisher/Author */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <div className="w-4 h-4 rounded-full overflow-hidden relative flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-orange-300 via-pink-400 to-purple-500"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-t from-blue-500 to-blue-400"></div>
                      </div>
                      <span className="font-semibold">{book.author || 'Chat and decide'}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-2 hover:text-brandBlue cursor-pointer line-clamp-2 leading-tight">
                      {book.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {book.description || book.title}
                    </p>

                    {/* Date and Views */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      {book.created_at && (
                        <span className="font-medium">{formatDate(book.created_at)}</span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <Eye className="h-4 w-4" />
                        <span className="font-medium">{book.view_count || 0}</span>
                      </span>
                    </div>

                    {/* Action Buttons Bar */}
                    <div className="flex items-center rounded-lg overflow-hidden divide-x divide-gray-300/30" style={{ backgroundColor: '#E6885F' }}>
                      <button 
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-white transition-colors relative group" 
                        style={{ backgroundColor: '#E6885F' }} 
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D77A52'} 
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E6885F'}
                        title="Share"
                        onClick={() => {
                          const url = book.url || (typeof window !== 'undefined' ? window.location.href : '');
                          setShareUrl(url);
                          setShareTitle(book.title);
                          setShareOpen(true);
                        }}
                      >
                        <Share2 className="h-4 w-4" />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          Share
                        </span>
                      </button>
                      <div 
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-white border-l border-gray-300/30 relative group cursor-default" 
                        style={{ backgroundColor: '#E6885F' }}
                        title="Views"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="text-sm font-medium">{book.view_count || 0}</span>
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          Views
                        </span>
                      </div>
                      <div 
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-white border-l border-gray-300/30 relative group cursor-default" 
                        style={{ backgroundColor: '#E6885F' }}
                        title="Readers"
                      >
                        <div className="relative">
                          <User className="h-4 w-4" />
                          <BookOpen className="h-2.5 w-2.5 absolute -bottom-0.5 -right-0.5" />
                        </div>
                        <span className="text-sm font-medium">78</span>
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          Readers
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
            })}
          </div>

          {popularBooks.length === 0 && (
            <div className="text-center py-12 text-gray-500">No books available yet. Check back soon!</div>
          )}
        </div>
      </section>

      <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} shareUrl={shareUrl} title={shareTitle} />

      {/* Mobile unified CTA */}
      <div className="px-4 sm:px-6 lg:px-8 md:hidden pb-16" data-aos="fade-up">
        <button onClick={() => onNavigate('library')} className="w-full cta-gradient py-4 rounded-xl font-semibold text-white shadow-lg active:scale-[0.99]">
          Browse All Library
        </button>
      </div>
    </div>
  );
}
