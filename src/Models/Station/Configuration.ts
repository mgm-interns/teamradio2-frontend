export enum SkipRuleType {
  BASIC = 'BASIC',
  ADVANCE = 'ADVANCE',
}

export interface ISkipRule {
  skipRuleType: SkipRuleType;
  description: string;
}

export class StationConfiguration {
  public skipRule: ISkipRule;
}
