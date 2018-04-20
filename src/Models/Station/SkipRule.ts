export enum SkipRuleType {
  BASIC,
  ADVANCE,
}

export class SkipRule {
  public skipRuleType: SkipRuleType;
  public description: string;
  public checked: boolean;
}
