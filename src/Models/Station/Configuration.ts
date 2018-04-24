export enum SkipRuleType {
  BASIC,
  ADVANCE,
}

export interface ISkipRule {
  skipRuleType: SkipRuleType;
  description: string;
}

export class StationConfiguration {
  public skipRule: ISkipRule;
}
