export interface Configuration {
  slotsPerPage: number;
  cardCondition: boolean;
  language?: string;
  showColors?: boolean;
}
export type ConfigurationContextType = {
  configuration: Configuration;
  setConfiguration: (configuration: Configuration) => void;
};