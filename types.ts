
export type Page = 'home' | 'create' | 'library' | 'history' | 'profile';

export const aspectRatios = ['9:16', '16:9', '1:1', '4:5', '3:2'] as const;
export type AspectRatio = typeof aspectRatios[number];

export const imageStyles = ['Realistic', 'Anime', '3D', 'Digital Art', 'Illustration', 'Cinematic'] as const;
export type ImageStyle = typeof imageStyles[number];

export interface GeneratedImage {
    id: string;
    prompt: string;
    style: ImageStyle;
    ratio: AspectRatio;
    imageUrl: string;
    createdAt: Date;
}
