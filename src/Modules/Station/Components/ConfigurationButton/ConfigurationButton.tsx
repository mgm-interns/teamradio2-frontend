import { BaseComponent } from 'BaseComponent';
import { LoadingIndicator } from 'Components';
import { Inject } from 'Configuration/DependencyInjection';
import { ISkipRule, SkipRuleType } from 'Models';
import * as React from 'react';
import {
  Button,
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
  isSave: boolean;
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
  @Inject('StationServices') private stationServices: StationServices;

  constructor(props: any) {
    super(props);

    this.state = {
      modal: false,
      rules: RULES,
      selectedRule: null,
      isSave: false
    };
  }

  public _onModalToggle = () => {
    const { stationId } = this.props;
    this.setState({ modal: !this.state.modal }, () => {
      if (this.state.modal) {
        this.stationServices
          .getStationById(stationId)
          .subscribe((response: any) => {
            this.setState({
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
    const { rules } = this.state;

    const updatedRules = this._getNewSkipRules(rules, value);

    this.setState({rules: [...updatedRules]});
  };

  public _onSaveConfiguration = () => {
    const {onSkipRuleChange} = this.props;
    this.setState({
      isSave: true
    }, () => {
      onSkipRuleChange(this.state.selectedRule.skipRuleType);
    })
  };

  public componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.currentSkipRule && this.state.selectedRule && nextProps.currentSkipRule.skipRuleType === this.state.selectedRule.skipRuleType && this.state.isSave) {
      this.setState({
        modal: false,
        isSave: false
      })
    }
  }

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
          className="modal-primary d-flex mt-0 mb-0 align-items-center config-modal disable-outline-modal">
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
            {this.state.isSave ? <span className="loading-icon"><LoadingIndicator/></span> :
              <Button className="button-save" color="primary" onClick={this._onSaveConfiguration}>SAVE</Button>
            }
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
