import EuiBadge from '@ember-eui/components/eui-combo-box/eui-badge';
import classNames from '../helpers/class-names';
import { optional } from 'ember-composable-helpers';
import { hash } from '@ember/helper';
import { fn } from '@ember/helper';

<template>
  {{#let
    (classNames
      "euiComboBoxPill" (if @asPlainText "euiComboBoxPill--plainText")
    )
    (optional @onClose)
    as |classes onClose|
  }}
    {{#if @onClose}}
      <EuiBadge
        class={{classes}}
        @closeButtonProps={{hash
          tabIndex=-1
          dataSelectedIconIndex=@dataSelectedIconIndex
        }}
        @color={{@color}}
        @iconOnClick={{fn onClose @option}}
        @iconOnClickAriaLabel={{@iconOnClickAriaLabel}}
        @iconSide="right"
        @iconType="cross"
        ...attributes
      >
        {{yield}}
      </EuiBadge>
    {{else if @asPlainText}}
      <span class={{classes}}>
        {{yield}}
      </span>
    {{else}}
      <EuiBadge
        class={{classes}}
        @color={{@color}}
        @closeButtonProps={{hash dataSelectedIconIndex=@dataSelectedIconIndex}}
        ...attributes
      >
        {{yield}}
      </EuiBadge>
    {{/if}}
  {{/let}}
</template>
