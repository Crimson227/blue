export enum AppRoute {
  WORKFLOW = 'workflow',
  DOCS = 'docs',
  SETTINGS = 'settings'
}

export enum ModelType {
  LOGISTIC_REGRESSION = 'logistic_regression',
  LINEAR_REGRESSION = 'linear_regression',
  RANDOM_FOREST = 'random_forest'
}

export interface ModelConfig {
  model: ModelType;
  params: Record<string, string>;
}

export interface SettingsState {
  splitRatio: number;
  randomSeed: number;
  defaultModel: ModelType;
}