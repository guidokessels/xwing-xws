export interface Integration {
  matches: (url: string) => boolean;
  getXWSUrl: (url: string) => string;
}
