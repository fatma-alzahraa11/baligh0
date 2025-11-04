import { Search, ChevronDown, ChevronUp, Tag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase, Question } from '../lib/supabase';

export default function Questions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    loadQuestions();
  }, []);

  useEffect(() => {
    filterQuestions();
  }, [searchTerm, selectedCategory, questions]);

  const loadQuestions = async () => {
    const { data } = await supabase
      .from('questions')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setQuestions(data);
      const uniqueCategories = ['All', ...new Set(data.map((q) => q.category))];
      setCategories(uniqueCategories);
    }
  };

  const filterQuestions = () => {
    let filtered = questions;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((q) => q.category === selectedCategory);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (q) =>
          q.question.toLowerCase().includes(term) ||
          q.answer.toLowerCase().includes(term) ||
          q.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    }

    setFilteredQuestions(filtered);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="relative text-white py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src="src/images/hero2.jpg" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-brandBlue/90 to-brandGold/90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Questions & Answers</h1>
          <p className="text-xl text-white/80">
            Find answers to common questions about Islam
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content area */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search questions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Category Filter - Mobile: shown below search, Desktop: in sidebar */}
            {categories.length > 1 && (
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

            <div className="mb-4 text-gray-600">
              Showing {filteredQuestions.length} {filteredQuestions.length === 1 ? 'question' : 'questions'}
            </div>

        <div className="space-y-4">
          {filteredQuestions.map((question) => (
            <div
              key={question.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div
                onClick={() => toggleExpand(question.id)}
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-brandBlue/10 text-brandBlue text-xs font-semibold px-3 py-1 rounded-full">
                        {question.category}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {question.view_count} views
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {question.question}
                    </h3>
                    {question.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {question.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    {expandedId === question.id ? (
                      <ChevronUp className="h-6 w-6 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {expandedId === question.id && (
                <div className="px-6 pb-6 pt-0 border-t border-gray-100">
                  <div className="mt-4 text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {question.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

            {filteredQuestions.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No questions found matching your search.</p>
              </div>
            )}
          </div>

          {/* Right sidebar for category filter on large screens */}
          {categories.length > 1 && (
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
      </div>
    </div>
  );
}
