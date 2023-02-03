export interface Configuration {
  slotsPerPage: number;
  cardCondition: boolean;
  language?: string;
}
export type ConfigurationContextType = {
  configuration: Configuration;
  setConfiguration: (configuration: Configuration) => void;
};