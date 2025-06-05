// This should be your Template.ts file in app/(data)/Template.ts
// Note: Make sure the filename matches exactly

export interface TEMPLETE {
  name: string;
  desc: string;
  category: string;
  icon: string;
  aiprompt: string;
  slugs: string;
  form: Array<{
    label: string;
    field: string;
    name: string;
    required: boolean;
  }>;
}

const Templete: TEMPLETE[] = [
  {
    name: 'Blog Title Generator',
    desc: 'An AI tool that generates catchy blog titles based on your blog content.',
    category: 'Blog',
    icon: 'https://cdn-icons-png.flaticon.com/128/6463/6463648.png',
    aiprompt: 'Give me 5 blog title ideas in bullet points based on the content:',
    slugs: 'generate-blog-title',
    form: [
      {
        label: "Enter your blog niche",
        field: "input",
        name: "niche",
        required: true
      },
      {
        label: "Enter your blog content",
        field: "textarea",
        name: "content",
        required: true
      }
    ]
  },
  {
    name: 'Blog Topic Ideas',
    desc: 'Generate blog topic ideas based on your niche and audience.',
    category: 'Blog',
    icon: 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png',
    aiprompt: 'Suggest 5 trending blog topic ideas for this niche:',
    slugs: 'blog-topic-ideas',
    form: [
      {
        label: "Enter your blog niche",
        field: "input",
        name: "niche",
        required: true
      }
    ]
  },
  {
    name: 'Blog Content Generator',
    desc: 'Create engaging blog content from your title and keywords.',
    category: 'Blog',
    icon: 'https://cdn-icons-png.flaticon.com/128/2991/2991148.png',
    aiprompt: 'Write a blog post on the following topic with engaging content:',
    slugs: 'generate-blog-content',
    form: [
      {
        label: "Enter blog title",
        field: "input",
        name: "title",
        required: true
      },
      {
        label: "Enter keywords (comma-separated)",
        field: "input",
        name: "keywords",
        required: false
      }
    ]
  },
  {
    name: 'YouTube SEO Title',
    desc: 'Generate optimized YouTube video titles that boost search visibility.',
    category: 'YouTube',
    icon: 'https://cdn-icons-png.flaticon.com/128/1384/1384060.png',
    aiprompt: 'Generate an SEO-friendly YouTube video title for:',
    slugs: 'youtube-seo-title',
    form: [
      {
        label: "Enter video topic or content",
        field: "textarea",
        name: "content",
        required: true
      }
    ]
  },
  {
    name: 'YouTube Description Generator',
    desc: 'Create YouTube descriptions with hashtags and keywords.',
    category: 'YouTube',
    icon: 'https://cdn-icons-png.flaticon.com/128/733/733646.png',
    aiprompt: 'Write a YouTube description for this video:',
    slugs: 'youtube-description',
    form: [
      {
        label: "Enter video title or summary",
        field: "textarea",
        name: "summary",
        required: true
      }
    ]
  },
  {
    name: 'YouTube Tags Generator',
    desc: 'Generate relevant tags for your YouTube videos.',
    category: 'YouTube',
    icon: 'https://cdn-icons-png.flaticon.com/128/1828/1828919.png',
    aiprompt: 'Suggest best YouTube tags for:',
    slugs: 'youtube-tags',
    form: [
      {
        label: "Enter video topic or title",
        field: "input",
        name: "title",
        required: true
      }
    ]
  },
  {
    name: 'Add Emoji to Text',
    desc: 'Enhance your plain text by adding relevant emojis.',
    category: 'Utility',
    icon: 'https://cdn-icons-png.flaticon.com/128/742/742751.png',
    aiprompt: 'Add relevant emojis to the following text:',
    slugs: 'emoji-text-enhancer',
    form: [
      {
        label: "Enter your text",
        field: "textarea",
        name: "text",
        required: true
      }
    ]
  },
  {
    name: 'Instagram Caption Generator',
    desc: 'Create engaging Instagram captions with hashtags.',
    category: 'Instagram',
    icon: 'https://cdn-icons-png.flaticon.com/128/2111/2111463.png',
    aiprompt: 'Write an engaging Instagram caption for this post idea:',
    slugs: 'instagram-caption-generator',
    form: [
      {
        label: "Enter your post description or idea",
        field: "textarea",
        name: "idea",
        required: true
      }
    ]
  },
  {
    name: 'Twitter Thread Generator',
    desc: 'Generate Twitter threads based on your idea or blog content.',
    category: 'Twitter',
    icon: 'https://cdn-icons-png.flaticon.com/128/733/733579.png',
    aiprompt: 'Create a Twitter thread from this blog or idea:',
    slugs: 'twitter-thread-generator',
    form: [
      {
        label: "Enter your idea or blog summary",
        field: "textarea",
        name: "content",
        required: true
      }
    ]
  },
  {
    name: 'YouTube Video Hook Generator',
    desc: 'Create attention-grabbing opening lines for YouTube videos.',
    category: 'YouTube',
    icon: 'https://cdn-icons-png.flaticon.com/128/732/732212.png',
    aiprompt: 'Generate a powerful YouTube video hook (first 10 seconds) for this topic:',
    slugs: 'youtube-hook-generator',
    form: [
      {
        label: "Enter video topic or script idea",
        field: "textarea",
        name: "topic",
        required: true
      }
    ]
  }
];

export default Templete;