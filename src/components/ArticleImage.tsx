import { categoryLabel, t } from '@/lib/i18n';
import type { Article, Lang } from '@/lib/types';

/**
 * Photo for an article with its credit line. Without a photo it shows a
 * newspaper-style placeholder with the section name, so layouts stay aligned.
 */
export function ArticleImage({
  article,
  lang,
  thumb = false,
}: {
  article: Article;
  lang: Lang;
  thumb?: boolean;
}) {
  const aspect = thumb ? 'aspect-[4/3]' : 'aspect-video';

  if (!article.image) {
    return (
      <div
        aria-hidden="true"
        className={`${aspect} flex items-center justify-center border border-ink bg-paper-dark px-2 text-center`}
      >
        <span className="font-display text-sm font-bold tracking-widest uppercase text-ink-soft">
          {categoryLabel(article.analysis.category, lang)}
        </span>
      </div>
    );
  }

  const { image } = article;
  return (
    <figure>
      {/* Plain img: the photos are static files in public/images, no optimiser needed. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className={`${aspect} w-full border border-ink object-cover`}
      />
      {!thumb && (
        <figcaption className="mt-1 text-xs text-ink-soft">
          {t(lang).symbolPhoto} ·{' '}
          <a href={image.creditUrl} target="_blank" rel="noopener noreferrer" className="underline">
            {image.credit}
          </a>
        </figcaption>
      )}
    </figure>
  );
}
