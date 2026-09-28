import GalleryContent from '@/components/GalleryContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery | Health Root NGO',
  description: 'Explore the journey of Health Root NGO through images capturing our activities in health awareness, youth empowerment, and community development.',
};

export default function Gallery() {
  return <GalleryContent />;
}
