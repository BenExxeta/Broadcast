import { CATEGORY_IMAGES } from '@/lib/category-images';
import { t } from '@/lib/i18n';
import type { Article, Lang } from '@/lib/types';

/**
 * Large picture for the article page: the article's own photo with its credit line,
 * or the section picture when the article has none.
 */
export function ArticleImage({ article, lang }: { article: Article; lang: Lang }) {
  const sectionImage = CATEGORY_IMAGES[article.analysis.category];
  const photo = article.image ?? sectionImage;

  return (
    <figure>
      {/* Plain img: the pictures are static files in public/images, no optimiser needed. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        className="aspect-video w-full border border-ink object-cover"
      />
      {article.image && (
        <figcaption className="mt-1 text-xs text-ink-soft">
          {t().symbolPhoto} ·{' '}
          <a href={article.image.creditUrl} target="_blank" rel="noopener noreferrer" className="underline">
            {article.image.credit}
          </a>
        </figcaption>
      )}
    </figure>
  );
}
