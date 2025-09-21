import { Post, PostAsset, Provider, PostStatus, MediaType } from './models';

export const sampleImage: PostAsset = {
  id: 'media-1',
  type: MediaType.Image,
  url: 'https://picsum.photos/400/300',
  name: 'Sample Image',
};

export const sampleVideo: PostAsset = {
  id: 'media-2',
  type: MediaType.Video,
  url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
  name: 'Sample Video',
};

export const samplePost: Post = {
  id: 'post-1',
  title: 'Sample post',
  content: 'This is a sample post used for developing UI components and fixtures.',
  network: Provider.Facebook,
  status: PostStatus.Draft,
  createdAt: new Date().toISOString(),
  assets: [sampleImage],
};
