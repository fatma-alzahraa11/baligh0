import { Video, Music, FileText, Book, BookOpen, Search, Play, Clock, Share2, Eye, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { supabase, LibraryItem } from '../lib/supabase';

export default function Library() {
  const [items, setItems] = useState<LibraryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<LibraryItem[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'video' | 'audio' | 'article' | 'book'>('video');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const pageSize = 12;
  // UI pagination over filtered items (1-based for the UI)
  const [uiPage, setUiPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    // initial load
    void loadLibraryItems(0, true);
  }, []);

  useEffect(() => {
    // Extract unique categories from items when tab changes
    if (activeTab !== 'all') {
      const typeItems = items.filter((item) => item.type === activeTab);
      const uniqueCategories = ['All', ...new Set(typeItems.map((item) => item.category).filter(Boolean))];
      setCategories(uniqueCategories);
      // Reset category filter when switching tabs
      setSelectedCategory('All');
    } else {
      setCategories([]);
      setSelectedCategory('All');
    }
  }, [activeTab, items]);

  useEffect(() => {
    filterItems();
    setUiPage(1);
  }, [activeTab, searchTerm, selectedCategory, items]);

  const loadLibraryItems = async (pageToLoad: number, replace: boolean = false) => {
    if (isLoading) return;
    setIsLoading(true);
    const from = pageToLoad * pageSize;
    const to = from + pageSize - 1;
    const { data, error } = await supabase
      .from('library_items')
      // fetch only fields needed for the grid; url can be heavy, keep but it's okay if required for controls
      .select('id,title,description,type,author,url,thumbnail_url,duration,category,tags,view_count,created_at,updated_at')
      .order('created_at', { ascending: false })
      .range(from, to);

    if (!error && data) {
      setItems((prev) => (replace ? data : [...prev, ...data]));
      setHasMore(data.length === pageSize);
      setPage(pageToLoad);
    }
    setIsLoading(false);
  };

  const filterItems = () => {
    let filtered = items;

    if (activeTab !== 'all') {
      filtered = filtered.filter((item) => item.type === activeTab);
    }

    if (selectedCategory !== 'All' && activeTab !== 'all') {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term) ||
          item.author.toLowerCase().includes(term) ||
          item.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    }

    setFilteredItems(filtered);
  };

  const tabs = [
    { id: 'video' as const, label: 'Videos', icon: Video },
    { id: 'audio' as const, label: 'Audios', icon: Music },
    { id: 'article' as const, label: 'Articles', icon: FileText },
    { id: 'book' as const, label: 'Books', icon: Book },
  ];

  // Lazy load helper for media using IntersectionObserver
  function useInView<T extends HTMLElement>(): [React.RefObject<T>, boolean] {
    const ref = useRef<T>(null);
    const [isInView, setIsInView] = useState(false);
    useEffect(() => {
      const element = ref.current;
      if (!element) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              setIsInView(true);
              obs.disconnect();
            }
          });
        },
        { rootMargin: '200px 0px', threshold: 0.01 }
      );
      obs.observe(element);
      return () => obs.disconnect();
    }, []);
    return [ref, isInView];
  }

  function LazyVideo({ src, poster, className }: { src: string; poster?: string; className?: string }) {
    const [ref, inView] = useInView<HTMLDivElement>();
    return (
      <div ref={ref} className="relative">
        {inView ? (
          <video
            src={src}
            poster={poster}
            controls
            preload="metadata"
            className={className}
          />
        ) : (
          <img src={poster || '/images/hero2.jpg'} alt="preview" className={className} loading="lazy" />
        )}
      </div>
    );
  }

  function LazyAudio({ src, className }: { src: string; className?: string }) {
    const [ref, inView] = useInView<HTMLDivElement>();
    return (
      <div ref={ref}>
        {inView ? (
          <audio src={src} controls preload="none" className={className} />
        ) : (
          <div className={className} />
        )}
      </div>
    );
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Video;
      case 'audio':
        return Music;
      case 'article':
        return FileText;
      case 'book':
        return Book;
      default:
        return Book;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-red-100 text-red-700';
      case 'audio':
        return 'bg-blue-100 text-blue-700';
      case 'article':
        return 'bg-green-100 text-green-700';
      case 'book':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="relative text-white py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero2.jpg" alt="Background" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-brandBlue/90 to-brandGold/90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Islamic Library</h1>
          <p className="text-xl text-white/80">
            Explore our collection of videos, audios, articles, and books
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content area */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-md p-4 mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search library..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-brandBlue text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter - Mobile: shown below tabs, Desktop: in sidebar */}
            {activeTab !== 'all' && categories.length > 1 && (
              <div className="lg:hidden bg-white rounded-xl shadow-md mb-8">
                <div className="bg-brandBlue text-white px-4 py-3 rounded-t-xl">
                  <h2 className="text-lg font-semibold">Categories</h2>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  <div className="p-4">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left py-2 px-3 mb-1 rounded transition-colors flex items-center gap-2 ${
                          selectedCategory === category
                            ? 'bg-brandBlue/10 text-brandBlue font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          selectedCategory === category ? 'bg-brandBlue' : 'bg-brandBlue/60'
                        }`}></span>
                        <span>{category}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar for category filter on large screens */}
          {activeTab !== 'all' && categories.length > 1 && (
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-md sticky top-24">
                <div className="bg-brandBlue text-white px-4 py-3 rounded-t-xl">
                  <h2 className="text-lg font-semibold">Categories</h2>
                </div>
                <div className="max-h-[600px] overflow-y-auto">
                  <div className="p-4">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left py-2 px-3 mb-1 rounded transition-colors flex items-center gap-2 ${
                          selectedCategory === category
                            ? 'bg-brandBlue/10 text-brandBlue font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          selectedCategory === category ? 'bg-brandBlue' : 'bg-brandBlue/60'
                        }`}></span>
                        <span>{category}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-4 text-gray-600">
          Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
        </div>

        {(() => {
          const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
          const currentPage = Math.min(uiPage, totalPages);
          const start = (currentPage - 1) * pageSize;
          const end = start + pageSize;
          const pageItems = filteredItems.slice(start, end);
          return (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pageItems.map((item) => {
            const TypeIcon = getTypeIcon(item.type);
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden group"
              >
                {item.type === 'video' ? (
                  <>
                    <div className="relative bg-black overflow-hidden transition-all duration-300 group-hover:ring-2 group-hover:ring-brandBlue/30">
                      {item.url ? (
                        <LazyVideo
                          src={item.url}
                          poster={item.thumbnail_url || undefined}
                          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                        />
                      ) : (
                        <div className="relative h-56 bg-gradient-to-br from-brandBlue/60 to-brandBlue overflow-hidden">
                          {item.thumbnail_url ? (
                            <img
                              src={item.thumbnail_url}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <TypeIcon className="h-16 w-16 text-white opacity-70" />
                            </div>
                          )}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-white/95 rounded-full p-4 shadow-md">
                              <Play className="h-8 w-8 text-brandBlue" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-base font-semibold text-gray-800 line-clamp-1 transition-colors duration-200 group-hover:text-brandBlue" title={item.title}>
                        {item.title}
                      </h3>
                    </div>
                  </>
                ) : item.type === 'audio' ? (
                  <>
                    <div className="p-6 transition-colors duration-200 group-hover:bg-gray-50">
                      <div className="flex items-center gap-5">
                        {item.thumbnail_url ? (
                          <img
                            src={item.thumbnail_url}
                            alt={item.title}
                            className="h-16 w-16 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-brandBlue/60 to-brandBlue flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                            <Music className="h-7 w-7 text-white" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 transition-colors duration-200 group-hover:text-brandBlue" title={item.title}>
                            {item.title}
                          </h3>
                          <div className="mt-3 flex items-center gap-2 text-base text-gray-700">
                            <span className="h-3.5 w-3.5 rounded-full bg-amber-400 inline-block"></span>
                            <span>Listen Now</span>
                          </div>
                        </div>
                      </div>
                      {item.url && <LazyAudio src={item.url} className="w-full mt-4" />}
                    </div>
                  </>
                ) : item.type === 'article' ? (
                  <>
                    <div className="relative h-56 bg-gradient-to-br from-brandBlue/60 to-brandBlue overflow-hidden transition-transform duration-300 group-hover:shadow-xl group-hover:ring-2 group-hover:ring-brandBlue/30">
                      {item.thumbnail_url ? (
                        <img
                          src={item.thumbnail_url}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <FileText className="h-16 w-16 text-white opacity-70" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-base font-semibold text-gray-800 line-clamp-2 transition-colors duration-200 group-hover:text-brandBlue" title={item.title}>
                        {item.title}
                      </h3>
                    </div>
                  </>
                ) : item.type === 'book' ? (
                  <>
                    <div className="group [perspective:1000px]">
                      <div className="relative h-64 bg-gray-100 overflow-hidden rounded-none transition-transform duration-300 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(-7deg)] group-hover:shadow-xl">
                        {item.thumbnail_url ? (
                          <img
                            src={item.thumbnail_url}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <Book className="h-16 w-16 text-gray-400" />
                          </div>
                        )}
                        <div className="pointer-events-none absolute inset-0 ring-0 group-hover:ring-2 group-hover:ring-brandBlue/40 transition-all duration-300" />
                        <div className="pointer-events-none absolute top-0 right-0 h-full w-0 group-hover:w-6 bg-gradient-to-l from-white/70 to-transparent transition-all duration-300" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-base font-semibold text-gray-800 line-clamp-2 transition-colors duration-200 group-hover:text-brandBlue mb-3" title={item.title}>
                        {item.title}
                      </h3>
                      
                      {/* Action Buttons Bar */}
                      <div className="flex items-center rounded-lg overflow-hidden divide-x divide-gray-300/30" style={{ backgroundColor: '#E6885F' }}>
                        <button 
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-white transition-colors relative group" 
                          style={{ backgroundColor: '#E6885F' }} 
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D77A52'} 
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E6885F'}
                          title="Share"
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
                          <span className="text-sm font-medium">{item.view_count || 0}</span>
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
                  </>
                ) : (
                  <>
                    <div className="relative h-48 bg-gradient-to-br from-brandBlue/60 to-brandBlue overflow-hidden">
                      {item.thumbnail_url ? (
                        <img
                          src={item.thumbnail_url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <TypeIcon className="h-16 w-16 text-white opacity-50" />
                        </div>
                      )}
                      {/* media overlay not needed for articles/books */}
                      <div className="absolute top-2 right-2">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getTypeColor(item.type)}`}>
                          {item.type}
                        </span>
                      </div>
                      {item.duration && (
                        <div className="absolute bottom-2 right-2">
                          <span className="bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.duration}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-brandBlue font-semibold">{item.category}</span>
                        <span className="text-xs text-gray-500">{item.view_count} views</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">By {item.author}</p>
                      <p className="text-gray-600 line-clamp-2 text-sm mb-4">{item.description}</p>
                      {item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {item.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <button className="w-full bg-brandBlue text-white py-2 rounded-lg hover:bg-brandBlue/90 transition-colors font-medium">
                        View Content
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {filteredItems.length > 0 && (
          <div className="mt-8 flex items-center justify-center gap-3 select-none">
            {/* Prev */}
            <button
              onClick={() => setUiPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`h-10 min-w-10 px-3 rounded-lg border text-brandGold hover:bg-brandGold/10 border-brandGold disabled:opacity-40 disabled:pointer-events-none`}
              aria-label="Previous page"
            >
              «
            </button>

            {/* Page numbers */}
            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              const pageNumber = i + 1; // show first up to 5 pages for simplicity
              const isActive = pageNumber === currentPage;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setUiPage(pageNumber)}
                  className={`h-10 min-w-10 px-3 rounded-lg border transition-colors ${
                    isActive
                      ? 'bg-brandGold text-white border-brandGold'
                      : 'text-brandGold hover:bg-brandGold/10 border-brandGold'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {pageNumber}
                </button>
              );
            })}

            {/* Next */}
            <button
              onClick={() => setUiPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`h-10 min-w-10 px-3 rounded-lg border text-brandGold hover:bg-brandGold/10 border-brandGold disabled:opacity-40 disabled:pointer-events-none`}
              aria-label="Next page"
            >
              »
            </button>
          </div>
        )}
        </>
          );
        })()}

        {/* Load More + Skeletons */}
        <div className="mt-8 flex flex-col items-center">
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-xl shadow p-4 h-64">
                  <div className="h-40 bg-gray-200 rounded mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-100 rounded w-1/2" />
                </div>
              ))}
            </div>
          )}
          {hasMore && !isLoading && (
            <button
              onClick={() => void loadLibraryItems(page + 1)}
              className="mt-4 px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              Load more
            </button>
          )}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
