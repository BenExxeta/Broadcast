import { shortDate, publishedAt } from '@/lib/dates';
import type { Lang, Article } from '@/lib/types';

/** "GUADALAJARA, 20 Nov –" in the newspaper style. The city name is the same in both languages. */
export function Dateline({ article, lang }: { article: Article; lang: Lang }) {
  return (
    <span className="text-xs font-bold tracking-widest uppercase">
      GUADALAJARA, {shortDate(new Date(article.publishedAt), lang)} –
    </span>
  );
}

/** Source and publication date, shown above each headline on the edition page. */
export function ArticleMeta({ article, lang }: { article: Article; lang: Lang }) {
  return (
    <p className="text-xs tracking-widest text-ink-soft uppercase">
      {article.source} · {publishedAt(new Date(article.publishedAt), lang)}
    </p>
  );
}
