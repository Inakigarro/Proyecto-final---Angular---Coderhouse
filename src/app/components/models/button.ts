export interface BasicButtonDefinition {
  buttonType: 'normal' | 'submit' | 'warning';
  type: 'basic' | 'submit' | 'reset';
  kind: 'basic' | 'raised' | 'fab';
}

export interface ExtendedButtonDefinition {
  buttonDefinition: BasicButtonDefinition;
  label?: string;
  icon?: string;
  url?: string;
}

export interface ListButtonDefinition {
  buttonDefinition: BasicButtonDefinition;
  label?: string;
  icon?: string;
  itemId?: number;
}
