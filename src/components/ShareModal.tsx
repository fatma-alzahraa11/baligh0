import { X, Facebook, Twitter, Instagram, Linkedin, Youtube, Send, MessageCircle, Plus, Copy, Mail, Link, Share2, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
  title?: string;
}

export default function ShareModal({ isOpen, onClose, shareUrl, title }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (!isOpen) setCopied(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const url = encodeURIComponent(shareUrl);
  const text = encodeURIComponent(title || 'Check this out');

  const links: { label: string; color: string; icon: JSX.Element; href: string }[] = [
    { label: 'Facebook', color: '#1877F2', icon: <Facebook className="h-5 w-5" />, href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
    { label: 'Instagram', color: '#E4405F', icon: <Instagram className="h-5 w-5" />, href: `https://www.instagram.com/?url=${url}` },
    { label: 'Twitter', color: '#1DA1F2', icon: <Twitter className="h-5 w-5" />, href: `https://twitter.com/intent/tweet?url=${url}&text=${text}` },
    { label: 'WhatsApp', color: '#25D366', icon: <MessageCircle className="h-5 w-5" />, href: `https://wa.me/?text=${text}%20${url}` },
    { label: 'Telegram', color: '#229ED9', icon: <Send className="h-5 w-5" />, href: `https://t.me/share/url?url=${url}&text=${text}` },
    { label: 'LinkedIn', color: '#0A66C2', icon: <Linkedin className="h-5 w-5" />, href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
    { label: 'YouTube', color: '#FF0000', icon: <Youtube className="h-5 w-5" />, href: `https://www.youtube.com/` },
  ];

  const moreLinks: { label: string; color: string; icon: JSX.Element; href: string }[] = [
    { label: 'Email', color: '#6B7280', icon: <Mail className="h-5 w-5" />, href: `mailto:?subject=${text}&body=${url}` },
    { label: 'Reddit', color: '#FF4500', icon: <Share2 className="h-5 w-5" />, href: `https://www.reddit.com/submit?url=${url}&title=${text}` },
    { label: 'Pinterest', color: '#E60023', icon: <Globe className="h-5 w-5" />, href: `https://pinterest.com/pin/create/button/?url=${url}&description=${text}` },
    { label: 'Copy Link', color: '#111827', icon: <Link className="h-5 w-5" />, href: url },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const handleMoreClick = async () => {
    // Try native share first if available
    if ('share' in navigator && typeof (navigator as any).share === 'function') {
      try {
        await (navigator as any).share({ title: title || 'Share', url: shareUrl, text: title });
        return;
      } catch {
        // If user cancels or share fails, fall back to showing more options
      }
    }
    setShowMore((v) => !v);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-[90%] max-w-md rounded-xl shadow-2xl p-5">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={onClose} aria-label="Close share dialog">
          <X className="h-6 w-6" />
        </button>
        <h3 className="text-lg font-semibold mb-4">Share</h3>
        {title && <p className="text-sm text-gray-600 mb-3 line-clamp-2">{title}</p>}

        <div className="flex flex-wrap gap-3 mb-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: l.color }}
              aria-label={`Share on ${l.label}`}
            >
              {l.icon}
            </a>
          ))}
          <button
            onClick={handleMoreClick}
            className="h-10 w-10 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: '#F59E0B' }}
            aria-label="More share options"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {showMore && (
          <div className="flex flex-wrap gap-3 mb-4">
            {moreLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: l.color }}
                aria-label={l.label}
                onClick={l.label === 'Copy Link' ? (e) => { e.preventDefault(); void handleCopy(); } : undefined}
              >
                {l.icon}
              </a>
            ))}
            <button
              onClick={async () => {
                // Fallback manual share prompt if clipboard copy is not enough
                await handleCopy();
              }}
              className="h-10 px-3 rounded-full flex items-center justify-center gap-2 text-white bg-gray-800"
            >
              <Share2 className="h-4 w-4" /> Share
            </button>
          </div>
        )}

        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
          <input
            value={shareUrl}
            readOnly
            className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
          />
          <button onClick={handleCopy} className="px-3 py-1.5 bg-gray-900 text-white rounded-md text-sm inline-flex items-center gap-1">
            <Copy className="h-4 w-4" /> {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}


