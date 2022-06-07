import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { classMap } from 'lit/directives/class-map.js';
import { PfeModal } from '@patternfly/pfe-modal';
import { RHDSScreenSizeController } from '../../lib/RHDSScreenSizeController.js';

import './rh-context-provider.js';

import styles from './rh-dialog.css';

/**
 * Dialog
 */
@customElement('rh-dialog')
export class RhDialog extends PfeModal {
  static readonly version = '{{version}}';

  static readonly styles = [...PfeModal.styles, styles];

  protected static closeOnOutsideClick = true;

  #screenSize = new RHDSScreenSizeController(this);

  @property({ reflect: true }) type?: 'video';

  @property({ reflect: true, type: Boolean }) open = false;

  render() {
    const { mobile } = this.#screenSize;
    return html`
      <div id="rhds-wrapper" class=${classMap({ mobile })}>
        ${super.render()}
      </div>
    `;
  }

  protected override renderHeaderSlot() {
    return html`
      <rh-context-provider color-palette="lightest">
        <slot name="header"></slot>
      </rh-context-provider>
    `;
  }

  protected override renderContentSlot() {
    return html`
      <rh-context-provider color-palette="lightest">
        <slot></slot>
      </rh-context-provider>
    `;
  }

  protected override renderFooterSlot() {
    return html`
      <rh-context-provider color-palette="lightest">
        <slot name="footer"></slot>
      </rh-context-provider>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rh-dialog': RhDialog;
  }
}