import { concat } from '@ember/helper';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import uniqueId from '../helpers/unique-id';
import useState from '@ember-eui/core/helpers/use-state';

import optional from 'ember-composable-helpers/helpers/optional';
import queue from 'ember-composable-helpers/helpers/queue';
import { and } from 'ember-truth-helpers';

import argOrDefault from '../helpers/arg-or-default';
import classNames from '../helpers/class-names';
import EuiBadge from './eui-badge';
import EuiButtonIcon from './eui-button-icon';
import EuiIcon from './eui-icon';
import EuiPopover from './eui-popover';

<template>
  {{! @glint-nocheck: not typesafe yet }}
  {{#let
    (and (argOrDefault @hasDefaultBlock true) (has-block))
    as |hasDefaultBlock|
  }}
    <div
      class={{classNames
        "euiNotificationEventMeta"
        (if hasDefaultBlock "euiNotificationEventMeta--hasContextMenu")
      }}
      ...attributes
    >
      <div class="euiNotificationEventMeta__section">

        {{#if @iconType}}
          <EuiIcon
            @iconClasses="euiNotificationEventMeta__icon"
            @type={{@iconType}}
            @color={{@iconColor}}
            {{! TODO only add one of the following html attributes }}
            aria-label={{@iconAriaLabel}}
            aria-hidden={{if @iconAriaLabel false true}}
          />
        {{/if}}

        {{#if @type}}
          <EuiBadge
            class="euiNotificationEventMeta__badge"
            @color={{@badgeColor}}
          >
            {{#if @severity}}
              {{@type}}:
              {{@severity}}
            {{else}}
              {{@type}}
            {{/if}}
          </EuiBadge>
        {{/if}}

      </div>

      <div class="euiNotificationEventMeta__section">
        <span class="euiNotificationEventMeta__time">{{@time}}</span>
      </div>

      {{#if hasDefaultBlock}}
        {{#let (uniqueId) (useState false) as |randomPopoverId isPopoverOpen|}}
          <div class="euiNotificationEventMeta__contextMenuWrapper">
            <EuiPopover
              id={{randomPopoverId}}
              @ownFocus={{true}}
              @repositionOnScroll={{true}}
              @isOpen={{isPopoverOpen.value}}
              @panelPaddingSize="none"
              @anchorPosition="leftUp"
              @closePopover={{fn isPopoverOpen.setState false}}
            >

              <:button>
                <EuiButtonIcon
                  {{! aria-label={contextMenuButton} }}
                  aria-controls={{randomPopoverId}}
                  aria-expanded={{this.isPopoverOpen}}
                  aria-haspopup="true"
                  @iconType="boxesVertical"
                  @color="text"
                  data-test-subj={{concat @id "-notificationEventMetaButton"}}
                  {{on
                    "click"
                    (if
                      isPopoverOpen.value
                      (fn isPopoverOpen.setState false)
                      (fn isPopoverOpen.setState true)
                    )
                  }}
                />
              </:button>

              {{! The EuiContextMenu is wrapped with a div so it closes after an item is clicked }}
              <:content>
                <div
                  {{on
                    "click"
                    (queue
                      (optional @onOpenContextMenu)
                      (fn isPopoverOpen.setState false)
                    )
                  }}
                  role="button"
                >
                  {{yield}}
                </div>
              </:content>

            </EuiPopover>
          </div>
        {{/let}}
      {{/if}}

    </div>
  {{/let}}
</template>
