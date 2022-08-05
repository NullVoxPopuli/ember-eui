import type EuiI18n from 'core/services/eui-i18n';
import { DATE_MODES, getDateMode } from '.';
import { DurationRange, ShortDate } from '../types/global';

/**
 * Pretty duration i18n strings
 * Units should not be simply concatenated because different languages
 * will have different grammar/positions for time than English
 */

export const useRelativeDurationI18n = <T extends number = number>(
  duration: T,
  euiI18n: EuiI18n
) => {
  const lookupToken = euiI18n.lookupToken;
  return {
    s: lookupToken(
      'euiPrettyDuration.lastDurationSeconds',
      ({ duration }: { duration: T }) =>
        `Last ${duration} second${duration === 1 ? '' : 's'}`,
      { duration }
    ),
    's+': lookupToken(
      'euiPrettyDuration.nextDurationSeconds',
      ({ duration }: { duration: T }) =>
        `Next ${duration} second${duration === 1 ? '' : 's'}`,
      { duration }
    ),
    m: lookupToken(
      'euiPrettyDuration.lastDurationMinutes',
      ({ duration }: { duration: T }) =>
        `Last ${duration} minute${duration === 1 ? '' : 's'}`,
      { duration }
    ),
    'm+': lookupToken(
      'euiPrettyDuration.nextDurationMinutes',
      ({ duration }: { duration: T }) =>
        `Next ${duration} minute${duration === 1 ? '' : 's'}`,
      { duration }
    ),
    h: lookupToken(
      'euiPrettyDuration.lastDurationHours',
      ({ duration }: { duration: T }) =>
        `Last ${duration} hour${duration === 1 ? '' : 's'}`,
      { duration }
    ),
    'h+': lookupToken(
      'euiPrettyDuration.nextDurationHours',
      ({ duration }: { duration: T }) =>
        `Next ${duration} hour${duration === 1 ? '' : 's'}`,
      { duration }
    ),
    d: lookupToken(
      'euiPrettyDuration.lastDurationDays',
      ({ duration }: { duration: T }) =>
        `Last ${duration} day${duration === 1 ? '' : 's'}`,
      { duration }
    ),
    'd+': lookupToken(
      'euiPrettyDuration.nexttDurationDays',
      ({ duration }: { duration: T }) =>
        `Next ${duration} day${duration === 1 ? '' : 's'}`,
      { duration }
    ),
    w: lookupToken(
      'euiPrettyDuration.lastDurationWeeks',
      ({ duration }: { duration: T }) =>
        `Last ${duration} week${duration === 1 ? '' : 's'}`,
      { duration }
    ),
    'w+': lookupToken(
      'euiPrettyDuration.nextDurationWeeks',
      ({ duration }: { duration: T }) =>
        `Next ${duration} week${duration === 1 ? '' : 's'}`,
      { duration }
    ),
    M: lookupToken(
      'euiPrettyDuration.lastDurationMonths',
      ({ duration }: { duration: T }) =>
        `Last ${duration} month${duration === 1 ? '' : 's'}`,
      { duration }
    ),
    'M+': lookupToken(
      'euiPrettyDuration.nextDurationMonths',
      ({ duration }: { duration: T }) =>
        `Next ${duration} month${duration === 1 ? '' : 's'}`,
      { duration }
    ),
    y: lookupToken(
      'euiPrettyDuration.lastDurationYears',
      ({ duration }: { duration: T }) =>
        `Last ${duration} year${duration === 1 ? '' : 's'}`,
      { duration }
    ),
    'y+': lookupToken(
      'euiPrettyDuration.nextDurationYears',
      ({ duration }: { duration: T }) =>
        `Next ${duration} year${duration === 1 ? '' : 's'}`,
      { duration }
    )
  };
};

const hasRangeMatch = (
  timeFrom: ShortDate,
  timeTo: ShortDate,
  ranges: DurationRange[]
) => {
  return ranges.find(({ start, end }) => timeFrom === start && timeTo === end);
};

const isRelativeToNow = (timeFrom: ShortDate, timeTo: ShortDate): boolean => {
  const fromDateMode = getDateMode(timeFrom);
  const toDateMode = getDateMode(timeTo);
  const isLast =
    fromDateMode === DATE_MODES.RELATIVE && toDateMode === DATE_MODES.NOW;
  const isNext =
    fromDateMode === DATE_MODES.NOW && toDateMode === DATE_MODES.RELATIVE;
  return isLast || isNext;
};

export const showPrettyDuration = (
  timeFrom: ShortDate,
  timeTo: ShortDate,
  quickRanges: DurationRange[]
): boolean => {
  if (hasRangeMatch(timeFrom, timeTo, quickRanges)) {
    return true;
  }
  return isRelativeToNow(timeFrom, timeTo);
};
