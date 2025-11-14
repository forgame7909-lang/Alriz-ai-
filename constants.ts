
import { GeneratedImage, ImageStyle, AspectRatio } from './types';

export const APP_NAME = "Alriz";

export const SAMPLE_IMAGES: GeneratedImage[] = [
    {
        id: 'sample-1',
        prompt: 'An astronaut riding a majestic white horse on the moon, with Earth visible in the star-studded sky, hyper-realistic, 8K, cinematic lighting.',
        style: 'Realistic',
        ratio: '16:9',
        imageUrl: 'https://picsum.photos/seed/moonhorse/1024/576',
        createdAt: new Date('2023-10-26T10:00:00Z'),
    },
    {
        id: 'sample-2',
        prompt: 'A vibrant cyberpunk city street at night, neon signs reflecting on wet pavement, flying cars whizzing by, detailed anime style.',
        style: 'Anime',
        ratio: '9:16',
        imageUrl: 'https://picsum.photos/seed/cyberpunk/576/1024',
        createdAt: new Date('2023-10-26T11:00:00Z'),
    },
    {
        id: 'sample-3',
        prompt: 'A cozy, magical library inside a giant tree, with glowing books and whimsical creatures, intricate illustration, warm and inviting atmosphere.',
        style: 'Illustration',
        ratio: '1:1',
        imageUrl: 'https://picsum.photos/seed/treelibrary/1024/1024',
        createdAt: new Date('2023-10-26T12:00:00Z'),
    },
    {
        id: 'sample-4',
        prompt: 'A highly detailed 3D render of a futuristic robot meditating in a serene Japanese garden, cherry blossoms falling around it.',
        style: '3D',
        ratio: '4:5',
        imageUrl: 'https://picsum.photos/seed/robotgarden/819/1024',
        createdAt: new Date('2023-10-26T13:00:00Z'),
    },
    {
        id: 'sample-5',
        prompt: 'A dramatic cinematic shot of a lone wolf howling at a full moon on a snowy mountain peak, powerful and epic.',
        style: 'Cinematic',
        ratio: '3:2',
        imageUrl: 'https://picsum.photos/seed/wolfmoon/1024/683',
        createdAt: new Date('2023-10-26T14:00:00Z'),
    },
    {
        id: 'sample-6',
        prompt: 'Surreal digital art of a giant jellyfish floating through clouds above a mountain range at sunset, dreamlike and colorful.',
        style: 'Digital Art',
        ratio: '16:9',
        imageUrl: 'https://picsum.photos/seed/jellyfishsky/1024/576',
        createdAt: new Date('2023-10-26T15:00:00Z'),
    },
];
