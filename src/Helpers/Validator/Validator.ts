export class Validator {
  public fieldName: string;
  public fieldValue: string;
  public rules: any;

  constructor(fieldName: string, fieldValue: string, rules: any) {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    this.rules = rules;
  }

  public validate() {
    for (const rule of this.rules) {
      if (!rule.test(this.fieldValue)) {
        return rule.message(this.fieldName);
      }
    }
  }

  // tslint:disable-next-line
  public static removeUndefinedError(object: Object) {
    return JSON.parse(JSON.stringify(object));
  }
}
