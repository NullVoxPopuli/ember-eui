import { and, not } from 'ember-truth-helpers';

import argOrDefault from '../helpers/arg-or-default';
import classNames from '../helpers/class-names';
import uniqueId from '../helpers/unique-id';

<template>
  {{! @glint-nocheck: not typesafe yet }}
  {{#let (argOrDefault @id (uniqueId)) as |id|}}
    {{#if (and @href (not @disabled))}}
      <a
        id={{id}}
        role="tab"
        aria-selected={{not (not @isSelected)}}
        class={{classNames
          "euiTab"
          (if @isSelected "euiTab-isSelected")
          (if @disabled "euiTab-isDisabled")
        }}
        href={{@href}}
        disabled={{@disabled}}
        ...attributes
      >
        {{#if (has-block "prepend")}}
          <span class="euiTab__prepend">
            {{yield to="prepend"}}
          </span>
        {{/if}}

        <span class="euiTab__content">
          {{yield}}
        </span>

        {{#if (has-block "append")}}
          <span class="euiTab__append">
            {{yield to="append"}}
          </span>
        {{/if}}
      </a>
    {{else}}
      <button
        id={{id}}
        role="tab"
        aria-selected={{not (not @isSelected)}}
        type="button"
        class={{classNames
          "euiTab"
          (if @isSelected "euiTab-isSelected")
          (if @disabled "euiTab-isDisabled")
        }}
        disabled={{@disabled}}
        ...attributes
      >
        {{#if (has-block "prepend")}}
          <span class="euiTab__prepend">
            {{yield to="prepend"}}
          </span>
        {{/if}}

        <span class="euiTab__content">
          {{yield}}
        </span>

        {{#if (has-block "append")}}
          <span class="euiTab__append">
            {{yield to="append"}}
          </span>
        {{/if}}
      </button>
    {{/if}}
  {{/let}}
</template>
