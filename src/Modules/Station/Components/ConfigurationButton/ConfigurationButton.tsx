import { BaseComponent } from 'BaseComponent';
import * as React from 'react';
import {
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import './ConfigurationButton.scss';

interface IRule {
  type: number;
  title: string;
  description: string;
  checked: boolean;
}

const RULES: IRule[] = [
  {
    type: 1,
    title: 'Basic',
    description: 'More than 50% downvotes can skip the song',
    checked: true,
  },
  {
    type: 2,
    title: 'Advanced',
    description: 'Only you can skip the song',
    checked: false,
  },
];

export class ConfigurationButton extends BaseComponent<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      modal: false,
      rules: RULES,
    };

    this._onModalToggle = this._onModalToggle.bind(this);
    this._onOptionChange = this._onOptionChange.bind(this);
  }

  public _onModalToggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  public _onOptionChange = (changeEvent: any) => {
    const value = changeEvent.target.value;
    const { rules } = this.state;

    const updatedRules = rules.map((rule: IRule) => {
      if (rule.type === Number(value)) {
        return { ...rule, checked: true };
      }
      return { ...rule, checked: false };
    });

    this.setState({ rules: [...updatedRules] });
  };

  public render() {
    const { modal, rules } = this.state;

    return (
      <div className="configuration-container">
        <div className="btn-icon" onClick={this._onModalToggle}>
          <i className="fa fa-cog" />
        </div>
        <Modal
          isOpen={modal}
          toggle={this._onModalToggle}
          className="d-flex mt-0 mb-0 align-items-center config-modal disable-outline-modal">
          <ModalHeader toggle={this._onModalToggle}>
            Configuration skip rule
          </ModalHeader>
          <ModalBody>
            {rules.map((rule: IRule) => (
              <FormGroup check key={rule.type}>
                <Label check>
                  <Input
                    type="radio"
                    name="ruleOption"
                    value={rule.type}
                    checked={rule.checked}
                    onChange={this._onOptionChange}
                  />
                  {rule.title}
                  {rule.checked ? (
                    <p>
                      <i>Rule: {rule.description}</i>
                    </p>
                  ) : (
                    <p />
                  )}
                </Label>
              </FormGroup>
            ))}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
