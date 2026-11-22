import type { Analysis, Localized, RawArticle } from '../types';
import { SAMPLE_TRANSLATIONS } from './sample-translations';

/**
 * Sample articles for mock mode. Headlines are invented and the sources are
 * fictional demo outlets, so nothing here is real news. Publish times are
 * generated relative to "now" so the edition always looks fresh.
 */

interface SampleEntry {
  hoursAgo: number;
  raw: Omit<RawArticle, 'publishedAt'>;
  /** English and German are written here; the other languages come from sample-translations.ts. */
  analysis: Omit<Analysis, 'title' | 'summary' | 'whyItMatters'> & {
    title: Partial<Localized>;
    summary: Partial<Localized>;
    whyItMatters: Partial<Localized>;
  };
}

const ENTRIES: SampleEntry[] = [
  {
    hoursAgo: 2,
    raw: {
      url: 'https://example.com/demo/marcha-centro',
      image: {
        src: '/images/plaza.jpg',
        alt: 'Plaza Liberación mit dem Teatro Degollado',
        credit: 'Foto: Encogua · CC BY-SA 4.0 · Wikimedia Commons',
        creditUrl: 'https://commons.wikimedia.org/wiki/File:Plaza_Liberaci%C3%B3n_y_Teatro_Degollado_en_Guadalajara.jpg',
      },
      source: 'Demo: Jalisco Desk',
      title: 'Marcha de maestros bloquea vialidades en el Centro Histórico',
      excerpt:
        'Un contingente de maestros anunció el cierre de varias calles alrededor de Plaza de Armas y Av. Juárez entre las 16:00 y las 20:00 horas. Se recomienda usar rutas alternas.',
    },
    analysis: {
      relevance: 9,
      category: 'Safety',
      title: {
        en: "Teachers' march blocks streets in the city centre",
        de: 'Lehrer-Demo blockiert Straßen im Stadtzentrum',
      },
      summary: {
        en: 'Teachers are holding a march that closes several streets around Plaza de Armas and Avenida Juárez between 16:00 and 20:00 today. Traffic will be diverted and the centre should be expected to be congested. Plan an alternative route if you are heading downtown.',
        de: 'Eine Lehrer-Demonstration sperrt heute zwischen 16 und 20 Uhr mehrere Straßen rund um die Plaza de Armas und die Avenida Juárez. Der Verkehr wird umgeleitet, und im Zentrum ist mit Staus zu rechnen. Plane eine Alternativroute ein, wenn du in die Innenstadt fährst.',
      },
      whyItMatters: {
        en: 'If you are downtown this evening, expect longer trips. Protests are usually peaceful, but keep your distance from large crowds.',
        de: 'Wenn du heute Abend im Zentrum bist, kann die Fahrt länger dauern. Demos verlaufen meist friedlich, halte aber Abstand zu großen Menschenmengen.',
      },
    },
  },
  {
    hoursAgo: 5,
    raw: {
      url: 'https://example.com/demo/linea-3',
      source: 'Demo: Jalisco Desk',
      title: 'Línea 3 del Tren Ligero sin servicio en tramo central por obras',
      excerpt:
        'Por trabajos de mantenimiento, el tramo entre dos estaciones céntricas permanecerá cerrado durante el fin de semana. Habrá transporte de paso en autobuses.',
    },
    analysis: {
      relevance: 9,
      category: 'Transport & Traffic',
      title: {
        en: 'Light rail Line 3: central section closed this weekend',
        de: 'Tren Ligero Linie 3: zentraler Abschnitt am Wochenende gesperrt',
      },
      summary: {
        en: 'Maintenance work means Line 3 of the Tren Ligero will not run between two central stations this weekend. Replacement buses will operate, but journeys may take longer.',
        de: 'Wegen Wartungsarbeiten fährt die Linie 3 des Tren Ligero am Wochenende nicht zwischen zwei zentralen Stationen. Ersatzbusse übernehmen die Strecke, die Fahrten können sich aber verlängern.',
      },
      whyItMatters: {
        en: 'Allow extra time this weekend, or use the replacement buses. Check the stop locations before you travel.',
        de: 'Plane am Wochenende mehr Zeit ein oder nutze die Ersatzbusse. Prüfe vorher die Haltestellen.',
      },
    },
  },
  {
    hoursAgo: 8,
    raw: {
      url: 'https://example.com/demo/lluvias',
      image: {
        src: '/images/skyline.jpg',
        alt: 'Hochhäuser der Skyline von Guadalajara',
        credit: 'Foto: Isacdaavid · CC BY-SA 4.0 · Wikimedia Commons',
        creditUrl: 'https://commons.wikimedia.org/wiki/File:Skyline_Guadalajara_Americas_IMG_20210910_185500.jpg',
      },
      source: 'Demo: Weather Wire',
      title: 'Alerta por lluvias intensas y granizo en la zona metropolitana',
      excerpt:
        'Protección Civil emitió una alerta amarilla para la tarde y noche por tormentas fuertes, granizo y posibles inundaciones en zonas bajas.',
    },
    analysis: {
      relevance: 8,
      category: 'Weather',
      title: {
        en: 'Warning: heavy rain and hail across the metro area',
        de: 'Warnung vor starkem Regen und Hagel im Großraum',
      },
      summary: {
        en: 'Civil protection has issued a yellow alert for this evening. Strong storms, hail and local flooding in low-lying areas are expected. Avoid underpasses and drive carefully.',
        de: 'Der Zivilschutz hat für den Abend eine gelbe Warnstufe ausgegeben. Starke Gewitter, Hagel und lokale Überschwemmungen in tief gelegenen Gebieten sind möglich. Meide Unterführungen und fahre vorsichtig.',
      },
      whyItMatters: {
        en: 'Underpasses can flood quickly. Plan your way home early.',
        de: 'Unterführungen können sich schnell mit Wasser füllen. Plane den Heimweg früh.',
      },
    },
  },
  {
    hoursAgo: 14,
    raw: {
      url: 'https://example.com/demo/tramite-residencia',
      image: {
        src: '/images/cathedral.jpg',
        alt: 'Kathedrale von Guadalajara aus der Luft',
        credit: 'Foto: ProtoplasmaKid · CC BY-SA 4.0 · Wikimedia Commons',
        creditUrl: 'https://commons.wikimedia.org/wiki/File:Catedral_metropolitana_de_Guadalajara_01.jpg',
      },
      source: 'Demo: Civic Notes',
      title: 'Nuevo trámite en línea para citas de residencia temporal',
      excerpt:
        'La oficina migratoria habilitó un sistema para agendar citas en línea. Los acuerdos presenciales anteriores ya no aplican para nuevos solicitantes.',
    },
    analysis: {
      relevance: 8,
      category: 'Politics & Administration',
      title: {
        en: 'New online booking for temporary residence appointments',
        de: 'Neues Online-Verfahren für Termine zur befristeten Aufenthaltserlaubnis',
      },
      summary: {
        en: 'The immigration office has launched an online system for booking appointments. New applicants must now reserve a slot digitally, and earlier in-person arrangements no longer apply to them. Check the official page for the exact steps.',
        de: 'Die Migrationsbehörde hat ein Online-System für Terminbuchungen eingeführt. Neue Antragsteller müssen ihren Termin jetzt digital reservieren; frühere Absprachen vor Ort gelten für sie nicht mehr. Die genauen Schritte stehen auf der offiziellen Seite.',
      },
      whyItMatters: {
        en: 'If you need to renew your residence permit, book your slot online early and bring scanned copies of your documents.',
        de: 'Wenn du deine Aufenthaltserlaubnis verlängern musst, buche den Termin früh online und bring Scans deiner Unterlagen mit.',
      },
    },
  },
  {
    hoursAgo: 11,
    raw: {
      url: 'https://example.com/demo/tarifa-camion',
      image: {
        src: '/images/metrobus.jpg',
        alt: 'Mi-Macro-Bus an der Station Periférico Sur',
        credit: 'Foto: SistemaRayoXP · CC0 · Wikimedia Commons',
        creditUrl: 'https://commons.wikimedia.org/wiki/File:Mi_Macro_Perif%C3%A9rico_estaci%C3%B3n_Perif%C3%A9rico_Sur.jpg',
      },
      source: 'Demo: Economy Desk',
      title: 'Aumenta la tarifa de la ruta de camión por Periférico',
      excerpt:
        'A partir del próximo mes la tarifa de la ruta subirá. Las tarjetas de prepago seguirán funcionando con el nuevo cobro.',
    },
    analysis: {
      relevance: 7,
      category: 'Economy',
      title: {
        en: 'Bus fare on the Periférico route is going up',
        de: 'Busticket auf der Periférico-Linie wird teurer',
      },
      summary: {
        en: 'From next month the fare on the bus route along the Periférico rises. Prepaid cards stay valid and the new fare is charged on boarding. Cash payers should expect to pay more.',
        de: 'Ab dem nächsten Monat steigt der Fahrpreis auf der Buslinie entlang des Periférico. Prepaid-Karten bleiben gültig, der neue Tarif wird beim Einsteigen abgebucht. Wer bar zahlt, muss mit höheren Beträgen rechnen.',
      },
      whyItMatters: {
        en: 'If you ride this route daily, a prepaid card is worth it, and you can budget for the higher monthly cost.',
        de: 'Wenn du diese Linie täglich nutzt, lohnt sich eine Prepaid-Karte. Plane die höheren Monatskosten mit ein.',
      },
    },
  },
  {
    hoursAgo: 16,
    raw: {
      url: 'https://example.com/demo/robo-metro',
      source: 'Demo: Jalisco Desk',
      title: 'Alertan por robos de celulares en andenes del Metro',
      excerpt:
        'Autoridades pidieron a los usuarios no usar el teléfono cerca de las puertas del vagón durante horas pico.',
    },
    analysis: {
      relevance: 7,
      category: 'Safety',
      title: {
        en: 'Warning about phone thefts on metro platforms',
        de: 'Warnung vor Handydiebstählen auf U-Bahn-Bahnsteigen',
      },
      summary: {
        en: 'Authorities warn of a rise in phone thefts on metro platforms. During rush hour they advise not using your phone near the doors and keeping valuables on your body.',
        de: 'Die Behörden warnen vor mehr Handydiebstählen auf den Metro-Bahnsteigen. Zu Stoßzeiten sollte man das Telefon nicht an den Türen benutzen und Wertsachen am Körper tragen.',
      },
      whyItMatters: {
        en: 'In rush hour keep your phone in an inside pocket, especially on crowded platforms.',
        de: 'Halte dein Handy zu Stoßzeiten in der Innentasche, besonders auf vollen Bahnsteigen.',
      },
    },
  },
  {
    hoursAgo: 20,
    raw: {
      url: 'https://example.com/demo/feria-navidena',
      source: 'Demo: Culture Desk',
      title: 'Feria navideña en el centro: fechas y accesos',
      excerpt:
        'La feria instalará puestos y escenarios en el centro del 1 al 24 de diciembre. Habrá cierres parciales de calles por las tardes.',
    },
    analysis: {
      relevance: 6,
      category: 'Events & Culture',
      title: {
        en: 'Christmas fair downtown: dates and access',
        de: 'Weihnachtsmarkt im Zentrum: Termine und Zugänge',
      },
      summary: {
        en: 'From 1 to 24 December a Christmas fair with stalls, stages and music takes place downtown. Some streets will be partly closed in the afternoons. Entry is free.',
        de: 'Vom 1. bis 24. Dezember findet im Zentrum ein Weihnachtsmarkt mit Ständen, Bühnen und Musik statt. Am Nachmittag sind einige Straßen teilweise gesperrt. Der Eintritt ist frei.',
      },
      whyItMatters: {
        en: 'A good chance to experience local culture. Plan a detour for the afternoons.',
        de: 'Eine gute Gelegenheit, lokale Kultur zu erleben. Plane nachmittags einen Umweg ein.',
      },
    },
  },
  {
    hoursAgo: 3,
    raw: {
      url: 'https://example.com/demo/liga-local',
      source: 'Demo: Sports Wire',
      title: 'Resumen de la jornada de la liga local de fútbol',
      excerpt:
        'Los equipos de la liga regional sumaron puntos en la jornada del fin de semana, con goles en los últimos minutos.',
    },
    analysis: {
      relevance: 2,
      category: 'Events & Culture',
      title: {
        en: 'Local football league matchday round-up',
        de: 'Zusammenfassung des Spieltags in der Regionalliga',
      },
      summary: {
        en: 'Teams in the regional league picked up important points at the weekend. Several matches were decided in the final minutes.',
        de: 'Die Vereine der Regionalliga haben am Wochenende wichtige Punkte geholt. Mehrere Spiele fielen in den letzten Minuten.',
      },
      whyItMatters: {
        en: 'Little practical relevance for your daily life.',
        de: 'Für deinen Alltag kaum relevant.',
      },
    },
  },
  {
    hoursAgo: 6,
    raw: {
      url: 'https://example.com/demo/entrevista-cantante',
      source: 'Demo: Culture Desk',
      title: 'Entrevista con cantante local sobre su nuevo disco',
      excerpt:
        'La artista habló sobre su proceso creativo y sobre los conciertos previstos para el próximo año.',
    },
    analysis: {
      relevance: 3,
      category: 'Events & Culture',
      title: {
        en: 'Interview with a local singer about her new album',
        de: 'Interview mit einer lokalen Sängerin über ihr neues Album',
      },
      summary: {
        en: 'In an interview the artist talks about her creative process and concerts planned for next year. No specific dates are mentioned.',
        de: 'In einem Interview spricht die Künstlerin über ihren kreativen Prozess und geplante Konzerte im nächsten Jahr. Konkrete Termine werden nicht genannt.',
      },
      whyItMatters: {
        en: 'Cultural background, but no direct link to your daily life.',
        de: 'Kultureller Hintergrund, aber ohne direkten Bezug zu deinem Alltag.',
      },
    },
  },
];

/** Raw feed-style items for mock mode, dated relative to `now`. */
export function sampleRawArticles(now: Date = new Date()): RawArticle[] {
  return ENTRIES.map(({ hoursAgo, raw }) => ({
    ...raw,
    publishedAt: new Date(now.getTime() - hoursAgo * 3_600_000).toISOString(),
  }));
}

/** Canned AI output for mock mode, keyed by article URL. Adds the Spanish, French and Swedish texts. */
export const SAMPLE_ANALYSES: Record<string, Analysis> = Object.fromEntries(
  ENTRIES.map(({ raw, analysis }) => {
    const extra = SAMPLE_TRANSLATIONS[raw.url] ?? {};
    const merge = (key: 'title' | 'summary' | 'whyItMatters'): Localized => ({
      ...analysis[key],
      ...Object.fromEntries(Object.entries(extra).map(([lang, fields]) => [lang, fields[key]])),
    }) as Localized;
    return [raw.url, { ...analysis, title: merge('title'), summary: merge('summary'), whyItMatters: merge('whyItMatters') }];
  }),
);
