import Component from '@glimmer/component';
import { cached, tracked } from '@glimmer/tracking';
import { isArray } from '@ember/array';
import { action } from '@ember/object';
import { isEqual } from '@ember/utils';

import optional from 'ember-composable-helpers/helpers/optional';
import  pipe from 'ember-composable-helpers/helpers/pipe';
import queue from 'ember-composable-helpers/helpers/queue';
import PowerSelectMultiple from 'ember-power-select/components/power-select-multiple';
import { emberPowerSelectIsGroup } from 'ember-power-select/helpers/ember-power-select-is-group';
import { and, not } from 'ember-truth-helpers';

import argOrDefault from '../helpers/arg-or-default';
import classNames from '../helpers/class-names';
import EuiComboBoxCreateOption from './eui-combo-box/create-option';
import EuiComboBoxGroup from './eui-combo-box/group';
import EuiComboBoxNoMatchesMessage from './eui-combo-box/no-matches-message';
import EuiComboBoxOptions from './eui-combo-box/options';
import EuiComboBoxTrigger from './eui-combo-box/trigger';

interface PromiseProxy<T> extends Promise<T> {
  content: any;
}

interface EuiComboBoxArgs {
  singleSelection: boolean;
  onCreateOption?: (search: string) => boolean | undefined;
  options: any[];
  search?: (term: string, select: Select) => any[] | PromiseProxy<any[]>;
}

interface Select {
  selected: any;
  actions: {
    search: (str: string) => void;
  };
}

interface Sliceable<T> {
  slice(): T[];
}

const isSliceable = <T,>(coll: any): coll is Sliceable<T> => {
  return isArray(coll);
};

export const toPlainArray = <T,>(collection: T[] | Sliceable<T>): T[] => {
  if (isSliceable<T>(collection)) {
    return collection.slice();
  } else {
    return collection;
  }
};

export default class EuiComboBoxComponent extends Component<EuiComboBoxArgs> {
  @tracked select: any = null;
  @tracked private _resolvedOptions?: any[];
  @tracked searchText = '';
  @tracked private _searchResult?: any[];
  private _filterResultsCache: {
    results: any[];
    options: any[];
    searchText: string;
  } = { results: [], options: [], searchText: this.searchText };

  <template>
    {{! @glint-nocheck: not typesafe yet }}
    <PowerSelectMultiple
      ...attributes
      @onChange={{pipe this.onChange @onChange}}
      @onFocus={{@onFocus}}
      @onBlur={{@onBlur}}
      @onOpen={{@onOpen}}
      @onClose={{@onClose}}
      @placeholderComponent={{@placeholderComponent}}
      @searchMessage={{@searchMessage}}
      @noMatchesMessage={{@noMatchesMessage}}
      @matchTriggerWidth={{@matchTriggerWidth}}
      @options={{this.options}}
      @selected={{@selectedOptions}}
      @closeOnSelect={{@closeOnSelect}}
      @defaultHighlighted={{@defaultHighlighted}}
      @searchField={{@searchField}}
      @searchEnabled={{argOrDefault @searchEnabled true}}
      @tabindex={{@tabindex}}
      @initiallyOpened={{and (not @isDisabled) @autoFocus}}
      @triggerComponent={{component
        EuiComboBoxTrigger
        fullWidth=@fullWidth
        compressed=@compressed
        isInvalid=@isInvalid
        singleSelection=@singleSelection
        onClose=@removeTag
        onCreateOption=(if @onCreateOption this.onCreateOption)
        isLoading=@isLoading
        autoFocus=(and (not @isDisabled) @autoFocus)
        icon=@triggerIcon
      }}
      @matcher={{@matcher}}
      @initiallyOpen={{@initiallyOpen}}
      @typeAheadOptionMatcher={{@typeAheadOptionMatcher}}
      @buildSelection={{this.buildSelection}}
      @search={{@search}}
      @onInput={{@onInput}}
      @onKeydown={{@onKeydown}}
      @scrollTo={{this.scrollTo}}
      @registerAPI={{queue this.registerAPI (optional @registerApi)}}
      @horizontalPosition={{@horizontalPosition}}
      @destination={{@destination}}
      @preventScroll={{@preventScroll}}
      @renderInPlace={{@renderInPlace}}
      @verticalPosition={{@verticalPosition}}
      @disabled={{@isDisabled}}
      @calculatePosition={{@calculatePosition}}
      @eventType={{@eventType}}
      @ariaLabel={{@ariaLabel}}
      @ariaLabelledBy={{@ariaLabelledBy}}
      @required={{@required}}
      @triggerRole={{@triggerRole}}
      @title={{@title}}
      @triggerId={{@triggerId}}
      @allowClear={{and (argOrDefault @isClearable true) (not @isDisabled)}}
      @loadingMessage={{@loadingMessage}}
      @selectedItemComponent={{@selectedItemComponent}}
      @beforeOptionsComponent={{@beforeOptionsComponent}}
      @placeholder={{@placeholder}}
      @searchPlaceholder={{@searchPlaceholder}}
      @optionsComponent={{component
        EuiComboBoxOptions
        rowHeight=@rowHeight
        class=@optionsClass
      }}
      @extra={{@extra}}
      @groupComponent={{component EuiComboBoxGroup}}
      @triggerClass={{classNames
        "euiComboBox"
        (if @compressed "euiComboBox--compressed")
        (if @fullWidth "euiComboBox--fullWidth")
        (if @isDisabled "euiComboBox-isDisabled")
        (if @isInvalid "euiComboBox-isInvalid")
        (if this.select.isOpen "euiComboBox-isOpen")
      }}
      @noMatchesMessageComponent={{if
        @onCreateOption
        (component
          EuiComboBoxCreateOption
          customOptionText=@customOptionText
          onCreateOption=this.onCreateOption
          select=this.select
        )
        (component EuiComboBoxNoMatchesMessage)
      }}
      @dropdownClass="euiComboBoxOptionsList euiPanel euiPanel--borderRadiusMedium euiPanel--noShadow euiPanel--plain euiPopover__panel-isAttached euiPopover__panel euiPopover__panel-noArrow euiPopover__panel--bottom euiPopover__panel-isOpen euiComboBoxOptionsList__rowWrap {{@dropdownClass}}"
      as |option i|
    >
      {{yield option i}}
    </PowerSelectMultiple>
  </template>

  //This is to allow scrolling between virtualized groups
  @cached
  get opts() {
    return this.results.reduce((acc, curr) => {
      if (emberPowerSelectIsGroup([curr])) {
        acc.push(curr, ...curr.options);
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);
  }

  @cached
  get options(): any[] {
    if (this._resolvedOptions) return toPlainArray(this._resolvedOptions);
    if (this.args.options) {
      return toPlainArray(this.args.options);
    } else {
      return [];
    }
  }

  @cached
  get results(): any[] {
    if (this.searchText.length > 0) {
      if (this.args.search) {
        return toPlainArray(this._searchResult || this.options);
      } else {
        if (
          this._filterResultsCache.options === this.options &&
          this._filterResultsCache.searchText === this.searchText
        ) {
          // This is an optimization to avoid filtering several times, which may be a bit expensive
          // if there are many options, if neither the options nor the searchtext have changed
          return this._filterResultsCache.results;
        }
        //@ts-ignore
        let results = this._filter(this.options, this.searchText);
        //eslint-disable-next-line
        this._filterResultsCache = {
          results,
          options: this.options,
          searchText: this.searchText
        };
        return results;
      }
    } else {
      return this.options;
    }
  }

  @action
  scrollTo(option: any, select: { results: []; uniqueId: string }): void {
    let optionsList = document.querySelector(
      `[aria-controls="ember-power-select-trigger-${select.uniqueId}"]`
    ) as HTMLElement;
    if (!optionsList) {
      return;
    }

    let index = this.opts.indexOf(option);

    if (index === -1) {
      return;
    }

    let optionElement = optionsList.querySelector(
      `[data-option-index="${index}"]`
    ) as HTMLElement;

    if (!optionElement) {
      return;
    }

    let optionTopScroll = optionElement.offsetTop;
    let optionBottomScroll = optionTopScroll + optionElement.offsetHeight;

    if (optionBottomScroll > optionsList.offsetHeight + optionsList.scrollTop) {
      optionsList.scrollTop = optionBottomScroll - optionsList.offsetHeight;
    } else if (optionTopScroll < optionsList.scrollTop) {
      optionsList.scrollTop = optionTopScroll;
    }
  }

  @action
  registerAPI(select: Select) {
    this.select = select;
  }

  @action
  onChange(selected: any) {
    if (this.args.singleSelection) {
      return selected.length > 0 ? [selected[selected.length - 1]] : [];
    }
    return selected;
  }

  @action
  onCreateOption() {
    let option;
    if (
      this.args.onCreateOption &&
      typeof this.args.onCreateOption === 'function'
    ) {
      // The `onCreateOption` function can be used to sanitize the input or explicitly return `false` to reject the input
      option = this.args.onCreateOption(this.select.searchText);
      if (option === false) {
        return;
      }
    }
    let search = option || this.select.searchText;
    this.select.actions.search('');
    this.select.actions.close();
    return search;
  }

  @action
  buildSelection(option: any, select: Select) {
    let newSelection = (select.selected || []).slice(0);
    let idx = -1;
    for (let i = 0; i < newSelection.length; i++) {
      if (isEqual(newSelection[i], option)) {
        idx = i;
        break;
      }
    }
    if (idx > -1) {
      newSelection.splice(idx, 1);
    } else {
      newSelection.push(option);
    }

    if (this.args.singleSelection && newSelection.length === 0) {
      select.actions.search('');
    }
    if (select?.selected?.length < newSelection.length) {
      select.actions.search('');
    }
    return newSelection;
  }
}
