import sourcesConfig from '../../config/sources.json';

/**
 * Server-side configuration. Feed list and thresholds live in config/sources.json;
 * secrets and switches come from environment variables (see .env.example).
 */
export const config = {
  ...sourcesConfig,
  sources: sourcesConfig.sources.filter((s) => s.enabled),
  anthropicApiKey: process.env.ANTHROPIC_API_KEY ?? '',
  anthropicModel: process.env.ANTHROPIC_MODEL ?? 'claude-sonnet-5-5',
  refreshToken: process.env.REFRESH_TOKEN ?? '',
  visitorSalt: process.env.VISITOR_SALT ?? 'abroadcast-dev-salt',
  forceMock: process.env.MOCK_MODE === 'true',
};

/**
 * Mock mode is the default until an API key is provided. It uses built-in sample
 * articles and canned AI output, so the whole app runs without network or key.
 */
export function isMockMode(): boolean {
  return config.forceMock || !config.anthropicApiKey;
}
