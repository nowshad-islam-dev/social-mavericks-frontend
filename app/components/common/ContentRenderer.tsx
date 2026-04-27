import type { StrapiRichText } from '@/lib/types';

export const ContentRenderer = ({ content }: { content: StrapiRichText }) => {
  if (!content) return null;

  return content.map((block, index) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={index} className='mb-4 text-gray-800'>
            {block.children?.map((child, childIndex) => (
              <span key={childIndex}>{child.text}</span>
            ))}
          </p>
        );

      // Add cases for 'heading', 'image', 'list' as CMS expands
      default:
        return null;
    }
  });
};
