export class Validator {
  fieldName: string;
  fieldValue: any;
  rules: any;

  constructor(fieldName: string, fieldValue: any, rules: any) {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    this.rules = rules;
  }

  validate() {
    for(let rule of this.rules) {
      if(!rule.test(this.fieldValue)) {
        return rule.message(this.fieldName);
      }
    }
  }

  static removeUndefinedError(object: Object) {
    return JSON.parse(JSON.stringify(object));
  }

}