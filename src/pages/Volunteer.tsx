import { MessageCircle, Send } from 'lucide-react';
import { useMemo, useState } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

type VolunteerFormData = {
  fullName: string;
  email: string;
  hoursPerWeek: string;
  phone: string;
  periodDate: string; // ISO date string (YYYY-MM-DD)
  nationality: string | null;
  message: string;
};

export default function Volunteer() {
  const [formData, setFormData] = useState<VolunteerFormData>({
    fullName: '',
    email: '',
    hoursPerWeek: '',
    phone: '',
    periodDate: '',
    nationality: null,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const nationalityOptions = useMemo(() => countryList().getData(), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      // No backend specified for volunteer submissions; provide optimistic UX only
      await new Promise((r) => setTimeout(r, 800));
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        hoursPerWeek: '',
        phone: '',
        periodDate: '',
        nationality: null,
        message: '',
      });
      setTimeout(() => setSubmitStatus('idle'), 4000);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="relative text-white py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero2.jpg" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-brandBlue/90 to-brandGold/90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Volunteer</h1>
          <p className="text-xl text-white/80">Join us by volunteering your time and skills.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="h-8 w-8 text-brandBlue" />
                <h2 className="text-2xl font-bold text-gray-800">Volunteer Form</h2>
              </div>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 font-medium">Thank you! We will contact you soon.</p>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 font-medium">Submission failed. Please try again.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue focus:border-transparent outline-none"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue focus:border-transparent outline-none"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="hoursPerWeek" className="block text-sm font-medium text-gray-700 mb-2">The Average Number of Hours Per Week</label>
                    <input
                      type="number"
                      id="hoursPerWeek"
                      name="hoursPerWeek"
                      min={0}
                      step={1}
                      value={formData.hoursPerWeek}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue focus:border-transparent outline-none"
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <PhoneInput
                      country={undefined}
                      enableSearch
                      value={formData.phone || ''}
                      onChange={(value) => setFormData({ ...formData, phone: value || '' })}
                      inputClass="!w-full !py-3 !pl-12 !pr-4 !border !border-gray-300 !rounded-lg !focus:ring-2 !focus:ring-brandBlue !focus:border-transparent !outline-none"
                      containerClass="!w-full"
                      buttonClass="!border-gray-300 !rounded-l-lg"
                      searchPlaceholder="Search for a country"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="periodDate" className="block text-sm font-medium text-gray-700 mb-2">The Period In Which I Would Like To Volunteer</label>
                    <input
                      type="date"
                      id="periodDate"
                      name="periodDate"
                      value={formData.periodDate}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
                    <Select
                      options={nationalityOptions}
                      classNamePrefix="nationality-select"
                      isSearchable
                      placeholder="Select a nationality..."
                      value={nationalityOptions.find((o: any) => o.label === formData.nationality) || null}
                      onChange={(option: any) =>
                        setFormData((prev) => ({ ...prev, nationality: option ? option.label : null }))
                      }
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message Content</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue focus:border-transparent outline-none resize-none"
                    placeholder="Tell us more about your interests and availability..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brandBlue text-white py-3 px-6 rounded-lg font-semibold hover:bg-brandBlue/90 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-brandBlue to-brandBlue/90 rounded-xl shadow-md p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Why Volunteer?</h3>
              <p className="text-white/80">
                Volunteering helps our global community projects and spreads authentic knowledge.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


