import { BaseComponent } from 'BaseComponent';
import { ISkipRule, SkipRuleType } from 'Models';
import * as React from 'react';
import {
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import { StationServices } from 'Services/Http';
import './ConfigurationButton.scss';

export interface ISkipRuleRadio extends ISkipRule {
  checked: boolean;
}

interface IProps {
  onSkipRuleChange: (skipRuleType: SkipRuleType) => void;
  currentSkipRule: ISkipRuleRadio;
  stationId: string;
}

interface IStates {
  modal: boolean;
  rules: ISkipRuleRadio[];
  selectedRule: ISkipRuleRadio;
}

const RULES: ISkipRuleRadio[] = [
  {
    skipRuleType: SkipRuleType.BASIC,
    description: 'Rule: More than 50% down votes can skip the song',
    checked: true,
  },
  {
    skipRuleType: SkipRuleType.ADVANCE,
    description: 'Rule: Only you can skip the song',
    checked: false,
  },
];

export class ConfigurationButton extends BaseComponent<IProps, IStates> {
  private stationServices: StationServices;

  constructor(props: any) {
    super(props);

    this.state = {
      modal: false,
      rules: RULES,
      selectedRule: null,
    };

    this.stationServices = new StationServices();
  }

  public _onModalToggle = () => {
    const { stationId } = this.props;
    this.setState({ modal: !this.state.modal }, () => {
      if (this.state.modal) {
        // Update configuration when opening configuration modal
        this.stationServices
          .getStationById(stationId)
          .subscribe((response: any) => {
            this.setState(
              {
                rules: this._getNewSkipRules(
                  this.state.rules,
                  response.stationConfiguration.skipRule.skipRuleType,
                ),
              });
          });
      }
    });
  };

  public _onOptionChange = (changeEvent: any) => {
    const value = changeEvent.target.value;
    const { onSkipRuleChange } = this.props;
    const { rules } = this.state;

    const updatedRules = this._getNewSkipRules(rules, value);

    this.setState({ rules: [...updatedRules] }, () => {
      onSkipRuleChange(this.state.selectedRule.skipRuleType);
    });
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
            Skip rule configuration
          </ModalHeader>
          <ModalBody>
            {rules.map((rule: ISkipRuleRadio) => (
              <FormGroup check key={rule.skipRuleType}>
                <Label check>
                  <Input
                    type="radio"
                    name="ruleOption"
                    value={rule.skipRuleType}
                    checked={rule.checked}
                    onChange={this._onOptionChange}
                  />
                  {rule.skipRuleType}
                  {rule.checked ? (
                    <p>
                      <i>{rule.description}</i>
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

  private _getNewSkipRules = (
    rules: ISkipRuleRadio[],
    ruleType: SkipRuleType,
  ) => {
    return rules.map((rule: ISkipRuleRadio) => {
      if (rule.skipRuleType === ruleType) {
        this.setState({
          selectedRule: rule,
        });
        return { ...rule, checked: true };
      }
      return { ...rule, checked: false };
    });
  };
}
