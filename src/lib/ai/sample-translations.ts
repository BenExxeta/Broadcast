import type { Lang } from '../types';

type Fields = { title: string; summary: string; whyItMatters: string };

/** Spanish (Mexico), French and Swedish translations for the demo articles, keyed by article URL. */
export const SAMPLE_TRANSLATIONS: Record<string, Partial<Record<Lang, Fields>>> = {
  'https://example.com/demo/marcha-centro': {
    es: {
      title: 'Marcha de maestros bloquea calles en el Centro Histórico',
      summary:
        'Maestros realizan una marcha que cierra varias calles alrededor de la Plaza de Armas y la Avenida Juárez entre las 16:00 y las 20:00 horas. El tráfico se desviará y se espera congestión en el centro. Si vas al centro, planea una ruta alternativa.',
      whyItMatters:
        'Si estás en el centro esta tarde, cuenta con trayectos más largos. Las marchas suelen ser pacíficas, pero mantén distancia de las multitudes.',
    },
    fr: {
      title: "Une manifestation d'enseignants bloque des rues du centre-ville",
      summary:
        "Une marche d'enseignants ferme plusieurs rues autour de la Plaza de Armas et de l'avenue Juárez, entre 16 h et 20 h aujourd'hui. La circulation sera déviée et le centre-ville devrait être encombré. Prévois un itinéraire alternatif si tu te rends au centre.",
      whyItMatters:
        'Si tu es au centre ce soir, prévois des trajets plus longs. Les manifestations sont généralement pacifiques, mais reste à distance des grands rassemblements.',
    },
    sv: {
      title: 'Lärarnas demonstration blockerar gator i centrum',
      summary:
        'En lärardemonstration stänger flera gator runt Plaza de Armas och Avenida Juárez mellan klockan 16 och 20 idag. Trafiken leds om och det kan bli stopp i city. Planera en alternativ väg om du ska in till centrum.',
      whyItMatters:
        'Om du är i centrum i kväll kan resan ta längre tid. Demonstrationer är oftast fredliga, men håll avstånd till stora folksamlingar.',
    },
  },
  'https://example.com/demo/linea-3': {
    es: {
      title: 'La Línea 3 del Tren Ligero no opera en el tramo central por obras',
      summary:
        'Por trabajos de mantenimiento, la Línea 3 del Tren Ligero no circulará este fin de semana entre dos estaciones céntricas. Autobuses de reemplazo cubrirán el trayecto, pero los viajes pueden tardar más.',
      whyItMatters:
        'Calcula más tiempo para este fin de semana o usa los autobuses de reemplazo. Revisa antes dónde están las paradas.',
    },
    fr: {
      title: 'Ligne 3 du Tren Ligero : tronçon central fermé ce week-end',
      summary:
        'En raison de travaux d\'entretien, la ligne 3 du Tren Ligero ne circulera pas ce week-end entre deux stations du centre. Des bus de remplacement assureront le trajet, mais les trajets peuvent être plus longs.',
      whyItMatters:
        "Prévois plus de temps ce week-end ou prends les bus de remplacement. Vérifie à l'avance l'emplacement des arrêts.",
    },
    sv: {
      title: 'Tren Ligero linje 3: centrala sträckan stängd i helgen',
      summary:
        'På grund av underhållsarbete kör inte linje 3 på Tren Ligero mellan två centrala stationer i helgen. Ersättningsbussar går sträckan, men resorna kan ta längre tid.',
      whyItMatters: 'Planera extra tid i helgen eller ta ersättningsbussarna. Kolla innan var hållplatserna finns.',
    },
  },
  'https://example.com/demo/lluvias': {
    es: {
      title: 'Alerta por lluvias intensas y granizo en la zona metropolitana',
      summary:
        'Protección Civil emitió una alerta amarilla para la tarde y la noche por tormentas fuertes, granizo y posibles inundaciones en zonas bajas. Evita los pasos a desnivel y conduce con precaución.',
      whyItMatters: 'Los pasos a desnivel pueden inundarse rápido. Planea tu regreso a casa con tiempo.',
    },
    fr: {
      title: 'Alerte aux fortes pluies et à la grêle dans la zone métropolitaine',
      summary:
        "La protection civile a émis une alerte jaune pour ce soir. Des orages violents, de la grêle et des inondations locales dans les zones basses sont possibles. Évite les passages souterrains et conduis prudemment.",
      whyItMatters: 'Les passages souterrains peuvent se remplir d\'eau très vite. Prévois ton retour à la maison tôt.',
    },
    sv: {
      title: 'Varning för kraftigt regn och hagel i storstadsområdet',
      summary:
        'Civilskyddet har utfärdat en gul varning för ikväll. Kraftiga åskväder, hagel och lokala översvämningar i lågt liggande områden väntas. Undvik underfarter och kör försiktigt.',
      whyItMatters: 'Underfarter kan snabbt fyllas med vatten. Planera hemresan i god tid.',
    },
  },
  'https://example.com/demo/tramite-residencia': {
    es: {
      title: 'Nuevo trámite en línea para citas de residencia temporal',
      summary:
        'La oficina migratoria habilitó un sistema para agendar citas en línea. Los nuevos solicitantes deben reservar su cita en línea, y los acuerdos presenciales anteriores ya no aplican para ellos. Consulta la página oficial para ver los pasos exactos.',
      whyItMatters:
        'Si necesitas renovar tu permiso de residencia, reserva tu cita en línea con tiempo y lleva copias escaneadas de tus documentos.',
    },
    fr: {
      title: 'Nouvelle prise de rendez-vous en ligne pour le titre de séjour temporaire',
      summary:
        "Le bureau de l'immigration a mis en place un système de prise de rendez-vous en ligne. Les nouveaux demandeurs doivent réserver leur créneau en ligne, et les anciens arrangements sur place ne s'appliquent plus à eux. Consulte la page officielle pour les démarches exactes.",
      whyItMatters:
        'Si tu dois renouveler ton titre de séjour, réserve ton rendez-vous en ligne tôt et apporte des copies numérisées de tes documents.',
    },
    sv: {
      title: 'Nytt onlinebokningssystem för tider för tillfälligt uppehållstillstånd',
      summary:
        'Migrationsmyndigheten har infört ett system för att boka tider online. Nya sökande måste nu boka sin tid digitalt, och tidigare överenskommelser på plats gäller inte längre för dem. Se den officiella sidan för exakta steg.',
      whyItMatters:
        'Om du behöver förnya ditt uppehållstillstånd, boka tiden online i god tid och ta med skannade kopior av dina handlingar.',
    },
  },
  'https://example.com/demo/tarifa-camion': {
    es: {
      title: 'Sube la tarifa de la ruta de camión por Periférico',
      summary:
        'A partir del próximo mes sube la tarifa de la ruta que circula por el Periférico. Las tarjetas prepagadas siguen funcionando y el nuevo cobro se aplica al subir. Quienes paguen en efectivo deben contar con gastar más.',
      whyItMatters:
        'Si usas esta ruta todos los días, conviene una tarjeta prepagada, y puedes presupuestar el costo mensual más alto.',
    },
    fr: {
      title: 'Hausse du tarif du bus sur la ligne du Périphérique',
      summary:
        'À partir du mois prochain, le tarif de la ligne de bus qui longe le Périphérique augmente. Les cartes prépayées restent valables et le nouveau tarif est prélevé à la montée. Les personnes qui paient en espèces devront prévoir des montants plus élevés.',
      whyItMatters:
        'Si tu prends cette ligne tous les jours, une carte prépayée vaut le coup, et tu peux intégrer le coût mensuel plus élevé dans ton budget.',
    },
    sv: {
      title: 'Bussbiljetten på Periférico-linjen blir dyrare',
      summary:
        'Från nästa månad höjs priset på busslinjen längs Periférico. Förbetalda kort fungerar fortfarande och det nya priset dras när du stiger på. Den som betalar kontant måste räkna med att betala mer.',
      whyItMatters:
        'Om du åker den här linjen varje dag lönar sig ett förbetalt kort, och du kan räkna in den högre månadskostnaden i budgeten.',
    },
  },
  'https://example.com/demo/robo-metro': {
    es: {
      title: 'Alertan por robos de celulares en los andenes del Metro',
      summary:
        'Las autoridades advierten de un aumento de robos de celulares en los andenes del Metro. En horas pico recomiendan no usar el teléfono cerca de las puertas del vagón y llevar los objetos de valor sobre el cuerpo.',
      whyItMatters: 'En horas pico guarda el teléfono en un bolsillo interior, sobre todo en andenes llenos de gente.',
    },
    fr: {
      title: 'Alerte aux vols de téléphones sur les quais du métro',
      summary:
        'Les autorités signalent une hausse des vols de téléphones sur les quais du métro. Aux heures de pointe, elles conseillent de ne pas utiliser son téléphone près des portes et de garder les objets de valeur sur soi.',
      whyItMatters: 'Aux heures de pointe, range ton téléphone dans une poche intérieure, surtout sur les quais bondés.',
    },
    sv: {
      title: 'Varning för mobilstölder på tunnelbanans perronger',
      summary:
        'Myndigheterna varnar för fler mobilstölder på tunnelbanans perronger. Under rusningstid rekommenderas att man inte använder telefonen nära dörrarna och bär värdesaker på kroppen.',
      whyItMatters: 'Ha telefonen i en innerficka under rusningstid, särskilt på trånga perronger.',
    },
  },
  'https://example.com/demo/feria-navidena': {
    es: {
      title: 'Feria navideña en el centro: fechas y accesos',
      summary:
        'Del 1 al 24 de diciembre, la feria navideña instalará puestos y escenarios en el centro, con música y actividades. Por las tardes habrá cierres parciales de calles. La entrada es gratuita.',
      whyItMatters: 'Una buena oportunidad para conocer la cultura local. Planea un desvío por las tardes.',
    },
    fr: {
      title: 'Marché de Noël au centre-ville : dates et accès',
      summary:
        "Du 1er au 24 décembre, une foire de Noël installera des stands et des scènes au centre-ville, avec de la musique et des animations. Certaines rues seront partiellement fermées l'après-midi. L'entrée est gratuite.",
      whyItMatters: "Une bonne occasion de découvrir la culture locale. Prévois un détour l'après-midi.",
    },
    sv: {
      title: 'Julmarknad i centrum: datum och åtkomst',
      summary:
        'Från 1 till 24 december blir det julmarknad i centrum med stånd, scener och musik. På eftermiddagarna är vissa gator delvis avstängda. Inträdet är gratis.',
      whyItMatters: 'Ett bra tillfälle att uppleva lokal kultur. Planera en omväg på eftermiddagarna.',
    },
  },
  'https://example.com/demo/liga-local': {
    es: {
      title: 'Resumen de la jornada de la liga local de fútbol',
      summary:
        'Los equipos de la liga regional sumaron puntos en el fin de semana. Varios partidos se decidieron en los últimos minutos.',
      whyItMatters: 'Poca relevancia práctica para tu día a día.',
    },
    fr: {
      title: 'Résumé de la journée du championnat régional de football',
      summary:
        "Les équipes du championnat régional ont pris des points importants ce week-end. Plusieurs matchs se sont joués dans les dernières minutes.",
      whyItMatters: "Peu d'intérêt pratique pour ton quotidien.",
    },
    sv: {
      title: 'Sammanfattning av helgens omgång i den lokala fotbollsligan',
      summary:
        'Lagen i den regionala ligan tog viktiga poäng under helgen. Flera matcher avgjordes i de sista minuterna.',
      whyItMatters: 'Har knappt någon praktisk betydelse för din vardag.',
    },
  },
  'https://example.com/demo/entrevista-cantante': {
    es: {
      title: 'Entrevista con una cantante local sobre su nuevo disco',
      summary:
        'En una entrevista, la artista habla de su proceso creativo y de los conciertos previstos para el próximo año. No se mencionan fechas concretas.',
      whyItMatters: 'Contexto cultural, pero sin relación directa con tu día a día.',
    },
    fr: {
      title: "Interview d'une chanteuse locale sur son nouvel album",
      summary:
        "Dans un entretien, l'artiste évoque son processus créatif et les concerts prévus l'année prochaine. Aucune date précise n'est mentionnée.",
      whyItMatters: 'Un contexte culturel, mais sans lien direct avec ton quotidien.',
    },
    sv: {
      title: 'Intervju med en lokal sångerska om hennes nya album',
      summary:
        'I en intervju berättar artisten om sin kreativa process och om konserter som planeras nästa år. Inga konkreta datum nämns.',
      whyItMatters: 'Kulturell bakgrund, men utan direkt koppling till din vardag.',
    },
  },
};
