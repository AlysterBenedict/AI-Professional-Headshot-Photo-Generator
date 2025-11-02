
import { HeadshotStyle } from './types';

export const STYLES: HeadshotStyle[] = [
  {
    id: 'corporate-grey',
    name: 'Corporate Grey',
    prompt: 'Generate a professional corporate headshot of the person in the image. They should be wearing professional business attire against a solid, neutral grey backdrop. Maintain the person\'s likeness and facial features accurately.',
    thumbnailUrl: 'https://picsum.photos/seed/corporate/200'
  },
  {
    id: 'tech-office',
    name: 'Modern Tech Office',
    prompt: 'Generate a professional headshot of the person in the image, set in a modern, brightly lit tech office with a slightly blurred background. The person should be wearing smart-casual business attire. Maintain the person\'s likeness and facial features accurately.',
    thumbnailUrl: 'https://picsum.photos/seed/tech/200'
  },
  {
    id: 'outdoor-natural',
    name: 'Outdoor Natural',
    prompt: 'Generate an approachable, professional headshot of the person in the image, taken outdoors with soft, natural light. The background should be a pleasant, slightly blurred natural setting (e.g., park, foliage). The person should be wearing business-casual attire. Maintain the person\'s likeness and facial features accurately.',
    thumbnailUrl: 'https://picsum.photos/seed/outdoor/200'
  },
  {
    id: 'black-and-white',
    name: 'Classic B&W',
    prompt: 'Generate a classic, professional black and white headshot of the person in the image. The lighting should be dramatic and flattering, with a simple, dark backdrop. The person should wear simple, elegant attire. Maintain the person\'s likeness and facial features accurately.',
    thumbnailUrl: 'https://picsum.photos/seed/bw/200'
  },
  {
    id: 'studio-light',
    name: 'Studio Light',
    prompt: 'Generate a clean, professional studio headshot of the person in the image with perfect studio lighting. The backdrop should be a seamless off-white color. The person should be wearing professional attire. Maintain the person\'s likeness and facial features accurately.',
    thumbnailUrl: 'https://picsum.photos/seed/studio/200'
  },
  {
    id: 'cafe-meeting',
    name: 'Casual Cafe',
    prompt: 'Generate a warm and approachable headshot of the person in the image, set in a cozy, modern cafe with a softly blurred background. The person should be wearing smart-casual clothing. Maintain the person\'s likeness and facial features accurately.',
    thumbnailUrl: 'https://picsum.photos/seed/cafe/200'
  }
];
