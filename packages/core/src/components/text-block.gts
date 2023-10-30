import { eq } from 'ember-truth-helpers';

<template>
  {{! @glint-nocheck: not typesafe yet }}
  {{#if (eq @tagName "h1")}}
    <h1 ...attributes>
      {{yield}}
    </h1>
  {{else if (eq @tagName "h2")}}
    <h2 ...attributes>
      {{yield}}
    </h2>
  {{else if (eq @tagName "h3")}}
    <h3 ...attributes>
      {{yield}}
    </h3>
  {{else if (eq @tagName "h4")}}
    <h4 ...attributes>
      {{yield}}
    </h4>
  {{else if (eq @tagName "h5")}}
    <h5 ...attributes>
      {{yield}}
    </h5>
  {{else if (eq @tagName "h6")}}
    <h6 ...attributes>
      {{yield}}
    </h6>
  {{else if (eq @tagName "p")}}
    <p ...attributes>
      {{yield}}
    </p>
  {{else if (eq @tagName "legend")}}
    <legend ...attributes>
      {{yield}}
    </legend>
  {{/if}}
</template>
