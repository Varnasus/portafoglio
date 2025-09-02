'use client';

import { Share2, Twitter, Linkedin, Facebook, Link as LinkIcon, Mail } from 'lucide-react';

interface SocialShareProps {
  url: string;
  title: string;
  description: string;
  image?: string;
  hashtags?: string[];
  className?: string;
}

export function SocialShareButtons({ 
  url, 
  title, 
  description, 
  image, 
  hashtags = ['AI', 'ProductManagement', 'LLM'],
  className = ''
}: SocialShareProps) {

  const shareData = {
    url,
    title,
    text: description,
    hashtags: hashtags.join(',')
  };

  const handleShare = async (platform: string) => {
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}&hashtags=${hashtags.join(',')}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\n${url}`)}`;
        break;
      case 'native':
        if (navigator.share) {
          try {
            await navigator.share(shareData);
            console.log('Shared via native API');
            return;
          } catch (error) {
            console.log('Native sharing cancelled or failed');
          }
        }
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      console.log(`Shared on ${platform}`);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      console.log('URL copied to clipboard');
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <button
        onClick={() => handleShare('native')}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        aria-label="Share"
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>
      
      <button
        onClick={() => handleShare('twitter')}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
        Twitter
      </button>
      
      <button
        onClick={() => handleShare('linkedin')}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-[#0077B5] text-white rounded-lg hover:bg-[#006097] transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
        LinkedIn
      </button>
      
      <button
        onClick={() => handleShare('facebook')}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-[#4267B2] text-white rounded-lg hover:bg-[#365899] transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
        Facebook
      </button>
      
      <button
        onClick={() => handleShare('email')}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        aria-label="Share via Email"
      >
        <Mail className="w-4 h-4" />
        Email
      </button>
      
      <button
        onClick={copyToClipboard}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        aria-label="Copy link"
      >
        <LinkIcon className="w-4 h-4" />
        Copy Link
      </button>
    </div>
  );
}

interface OpenGraphMetaProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

export function generateOpenGraphMeta({
  title,
  description,
  url,
  image,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  section,
  tags = []
}: OpenGraphMetaProps) {
  const baseUrl = 'https://zvarney.com';
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  const imageUrl = image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : `${baseUrl}/og-image.jpg`;

  const meta = [
    // Basic Open Graph
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: fullUrl },
    { property: 'og:type', content: type },
    { property: 'og:image', content: imageUrl },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: title },
    { property: 'og:site_name', content: 'Zach Varney Portfolio' },
    { property: 'og:locale', content: 'en_US' },

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: imageUrl },
    { name: 'twitter:creator', content: '@zvarney' },
    { name: 'twitter:site', content: '@zvarney' },

    // Additional Open Graph for articles
    ...(type === 'article' ? [
      { property: 'article:author', content: author || 'Zach Varney' },
      { property: 'article:published_time', content: publishedTime },
      { property: 'article:modified_time', content: modifiedTime },
      { property: 'article:section', content: section },
      ...tags.map(tag => ({ property: 'article:tag', content: tag }))
    ] : []),

    // Canonical URL
    { rel: 'canonical', href: fullUrl }
  ];

  return meta;
}

// Social media meta tag generator utility
export function generateSocialMetaTags(props: OpenGraphMetaProps) {
  const meta = generateOpenGraphMeta(props);
  
  return meta.map((tag, index) => {
    if ('property' in tag) {
      return <meta key={index} property={tag.property} content={tag.content} />;
    } else if ('name' in tag) {
      return <meta key={index} name={tag.name} content={tag.content} />;
    } else if ('rel' in tag) {
      return <link key={index} rel={tag.rel} href={tag.href} />;
    }
    return null;
  });
}
