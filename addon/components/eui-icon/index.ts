import Component from '@glimmer/component';
import { argOrDefaultDecorator as argOrDefault } from 'ember-eui/helpers/arg-or-default';
import { keysOf, CommonArgs } from '../common';
import {
  sizeToClassNameMap,
  colorToClassMap,
} from 'ember-eui/utils/css-mappings/eui-icon';
import { uniqueId } from 'ember-eui/helpers/unique-id';
import { htmlSafe } from '@ember/template';

const typeToPathMap = {
  accessibility: 'accessibility',
  addDataApp: 'app_add_data',
  advancedSettingsApp: 'app_advanced_settings',
  aggregate: 'aggregate',
  alert: 'alert',
  analyzeEvent: 'analyze_event',
  annotation: 'annotation',
  apmApp: 'app_apm',
  apmTrace: 'apm_trace',
  apps: 'apps',
  appSearchApp: 'app_app_search',
  arrowDown: 'arrow_down',
  arrowLeft: 'arrow_left',
  arrowRight: 'arrow_right',
  arrowUp: 'arrow_up',
  asterisk: 'asterisk',
  auditbeatApp: 'app_auditbeat',
  beaker: 'beaker',
  bell: 'bell',
  bellSlash: 'bellSlash',
  bolt: 'bolt',
  boxesHorizontal: 'boxes_horizontal',
  boxesVertical: 'boxes_vertical',
  branch: 'branch',
  broom: 'broom',
  brush: 'brush',
  bug: 'bug',
  bullseye: 'bullseye',
  calendar: 'calendar',
  canvasApp: 'app_canvas',
  codeApp: 'app_code',
  check: 'check',
  checkInCircleFilled: 'checkInCircleFilled',
  cheer: 'cheer',
  classificationJob: 'ml_classification_job',
  clock: 'clock',
  cloudDrizzle: 'cloudDrizzle',
  cloudStormy: 'cloudStormy',
  cloudSunny: 'cloudSunny',
  compute: 'compute',
  console: 'console',
  consoleApp: 'app_console',
  controlsHorizontal: 'controls_horizontal',
  controlsVertical: 'controls_vertical',
  copy: 'copy',
  copyClipboard: 'copy_clipboard',
  createAdvancedJob: 'ml_create_advanced_job',
  createMultiMetricJob: 'ml_create_multi_metric_job',
  createPopulationJob: 'ml_create_population_job',
  createSingleMetricJob: 'ml_create_single_metric_job',
  cross: 'cross',
  crossClusterReplicationApp: 'app_cross_cluster_replication',
  crosshairs: 'crosshairs',
  crossInACircleFilled: 'crossInACircleFilled',
  currency: 'currency',
  cut: 'cut',
  dashboardApp: 'app_dashboard',
  database: 'database',
  dataVisualizer: 'ml_data_visualizer',
  devToolsApp: 'app_devtools',
  discoverApp: 'app_discover',
  document: 'document',
  documentEdit: 'documentEdit',
  documents: 'documents',
  dot: 'dot',
  download: 'download',
  editorAlignCenter: 'editor_align_center',
  editorAlignLeft: 'editor_align_left',
  editorAlignRight: 'editor_align_right',
  editorBold: 'editor_bold',
  editorCodeBlock: 'editor_code_block',
  editorComment: 'editor_comment',
  editorDistributeHorizontal: 'editorDistributeHorizontal',
  editorDistributeVertical: 'editorDistributeVertical',
  editorHeading: 'editor_heading',
  editorItalic: 'editor_italic',
  editorItemAlignLeft: 'editorItemAlignLeft',
  editorItemAlignBottom: 'editorItemAlignBottom',
  editorItemAlignCenter: 'editorItemAlignCenter',
  editorItemAlignMiddle: 'editorItemAlignMiddle',
  editorItemAlignRight: 'editorItemAlignRight',
  editorItemAlignTop: 'editorItemAlignTop',
  editorLink: 'editor_link',
  editorOrderedList: 'editor_ordered_list',
  editorPositionBottomLeft: 'editorPositionBottomLeft',
  editorPositionBottomRight: 'editorPositionBottomRight',
  editorPositionTopLeft: 'editorPositionTopLeft',
  editorPositionTopRight: 'editorPositionTopRight',
  editorRedo: 'editor_redo',
  editorStrike: 'editor_strike',
  editorTable: 'editor_table',
  editorUnderline: 'editor_underline',
  editorUndo: 'editor_undo',
  editorUnorderedList: 'editor_unordered_list',
  email: 'email',
  empty: 'empty',
  emsApp: 'app_ems',
  exit: 'exit',
  expand: 'expand',
  expandMini: 'expandMini',
  exportAction: 'export',
  eye: 'eye',
  eyeClosed: 'eye_closed',
  faceHappy: 'face_happy',
  faceNeutral: 'faceNeutral',
  faceSad: 'face_sad',
  filebeatApp: 'app_filebeat',
  filter: 'filter',
  flag: 'flag',
  fold: 'fold',
  folderCheck: 'folder_check',
  folderClosed: 'folder_closed',
  folderExclamation: 'folder_exclamation',
  folderOpen: 'folder_open',
  fullScreen: 'full_screen',
  gear: 'gear',
  gisApp: 'app_gis',
  glasses: 'glasses',
  globe: 'globe',
  grab: 'grab',
  grabHorizontal: 'grab_horizontal',
  graphApp: 'app_graph',
  grid: 'grid',
  grokApp: 'app_grok',
  heart: 'heart',
  heartbeatApp: 'app_heartbeat',
  heatmap: 'heatmap',
  help: 'help',
  home: 'home',
  iInCircle: 'iInCircle',
  image: 'image',
  importAction: 'import',
  indexClose: 'index_close',
  indexEdit: 'index_edit',
  indexFlush: 'index_flush',
  indexManagementApp: 'app_index_management',
  indexMapping: 'index_mapping',
  indexOpen: 'index_open',
  indexPatternApp: 'app_index_pattern',
  indexRollupApp: 'app_index_rollup',
  indexSettings: 'index_settings',
  inputOutput: 'inputOutput',
  inspect: 'inspect',
  invert: 'invert',
  ip: 'ip',
  keyboardShortcut: 'keyboard_shortcut',
  kqlField: 'kql_field',
  kqlFunction: 'kql_function',
  kqlOperand: 'kql_operand',
  kqlSelector: 'kql_selector',
  kqlValue: 'kql_value',
  lensApp: 'app_lens',
  link: 'link',
  list: 'list',
  listAdd: 'list_add',
  lock: 'lock',
  lockOpen: 'lockOpen',
  logsApp: 'app_logs',
  logoAerospike: 'logo_aerospike',
  logoApache: 'logo_apache',
  logoAPM: 'logo_apm',
  logoAppSearch: 'logo_app_search',
  logoAWS: 'logo_aws',
  logoAWSMono: 'logo_aws_mono',
  logoAzure: 'logo_azure',
  logoAzureMono: 'logo_azure_mono',
  logoBeats: 'logo_beats',
  logoBusinessAnalytics: 'logo_business_analytics',
  logoCeph: 'logo_ceph',
  logoCloud: 'logo_cloud',
  logoCloudEnterprise: 'logo_cloud_ece',
  logoCode: 'logo_code',
  logoCodesandbox: 'logo_codesandbox',
  logoCouchbase: 'logo_couchbase',
  logoDocker: 'logo_docker',
  logoDropwizard: 'logo_dropwizard',
  logoElastic: 'logo_elastic',
  logoElasticsearch: 'logo_elasticsearch',
  logoElasticStack: 'logo_elastic_stack',
  logoEnterpriseSearch: 'logo_enterprise_search',
  logoEtcd: 'logo_etcd',
  logoGCP: 'logo_gcp',
  logoGCPMono: 'logo_gcp_mono',
  logoGithub: 'logo_github',
  logoGmail: 'logo_gmail',
  logoGolang: 'logo_golang',
  logoGoogleG: 'logo_google_g',
  logoHAproxy: 'logo_haproxy',
  logoIBM: 'logo_ibm',
  logoIBMMono: 'logo_ibm_mono',
  logoKafka: 'logo_kafka',
  logoKibana: 'logo_kibana',
  logoKubernetes: 'logo_kubernetes',
  logoLogging: 'logo_logging',
  logoLogstash: 'logo_logstash',
  logoMaps: 'logo_maps',
  logoMemcached: 'logo_memcached',
  logoMetrics: 'logo_metrics',
  logoMongodb: 'logo_mongodb',
  logoMySQL: 'logo_mysql',
  logoNginx: 'logo_nginx',
  logoObservability: 'logo_observability',
  logoOsquery: 'logo_osquery',
  logoPhp: 'logo_php',
  logoPostgres: 'logo_postgres',
  logoPrometheus: 'logo_prometheus',
  logoRabbitmq: 'logo_rabbitmq',
  logoRedis: 'logo_redis',
  logoSecurity: 'logo_security',
  logoSiteSearch: 'logo_site_search',
  logoSketch: 'logo_sketch',
  logoSlack: 'logo_slack',
  logoUptime: 'logo_uptime',
  logoWebhook: 'logo_webhook',
  logoWindows: 'logo_windows',
  logoWorkplaceSearch: 'logo_workplace_search',
  logstashFilter: 'logstash_filter',
  logstashIf: 'logstash_if',
  logstashInput: 'logstash_input',
  logstashOutput: 'logstash_output',
  logstashQueue: 'logstash_queue',
  machineLearningApp: 'app_ml',
  magnet: 'magnet',
  magnifyWithMinus: 'magnifyWithMinus',
  magnifyWithPlus: 'magnifyWithPlus',
  managementApp: 'app_management',
  mapMarker: 'map_marker',
  memory: 'memory',
  menu: 'menu',
  menuLeft: 'menuLeft',
  menuRight: 'menuRight',
  merge: 'merge',
  metricbeatApp: 'app_metricbeat',
  metricsApp: 'app_metrics',
  minimize: 'minimize',
  minusInCircle: 'minus_in_circle',
  minusInCircleFilled: 'minus_in_circle_filled',
  monitoringApp: 'app_monitoring',
  moon: 'moon',
  nested: 'nested',
  node: 'node',
  notebookApp: 'app_notebook',
  number: 'number',
  offline: 'offline',
  online: 'online',
  outlierDetectionJob: 'ml_outlier_detection_job',
  package: 'package',
  packetbeatApp: 'app_packetbeat',
  pageSelect: 'pageSelect',
  pagesSelect: 'pagesSelect',
  partial: 'partial',
  paperClip: 'paper_clip',
  pause: 'pause',
  pencil: 'pencil',
  pin: 'pin',
  pinFilled: 'pin_filled',
  pipelineApp: 'app_pipeline',
  play: 'play',
  plusInCircle: 'plus_in_circle',
  plusInCircleFilled: 'plus_in_circle_filled',
  popout: 'popout',
  push: 'push',
  questionInCircle: 'question_in_circle',
  quote: 'quote',
  recentlyViewedApp: 'app_recently_viewed',
  refresh: 'refresh',
  regressionJob: 'ml_regression_job',
  reporter: 'reporter',
  reportingApp: 'app_reporting',
  returnKey: 'return_key',
  save: 'save',
  savedObjectsApp: 'app_saved_objects',
  scale: 'scale',
  search: 'search',
  searchProfilerApp: 'app_search_profiler',
  securityAnalyticsApp: 'app_security_analytics',
  securityApp: 'app_security',
  securitySignal: 'securitySignal',
  securitySignalDetected: 'securitySignalDetected',
  securitySignalResolved: 'securitySignalResolved',
  shard: 'shard',
  share: 'share',
  snowflake: 'snowflake',
  sortable: 'sortable',
  sortDown: 'sort_down',
  sortLeft: 'sortLeft',
  sortRight: 'sortRight',
  sortUp: 'sort_up',
  spacesApp: 'app_spaces',
  sqlApp: 'app_sql',
  starEmpty: 'star_empty',
  starEmptySpace: 'star_empty_space',
  starFilled: 'star_filled',
  starFilledSpace: 'star_filled_space',
  starMinusEmpty: 'star_minus_empty',
  starMinusFilled: 'star_minus_filled',
  starPlusEmpty: 'starPlusEmpty',
  starPlusFilled: 'starPlusFilled',
  stats: 'stats',
  stop: 'stop',
  stopFilled: 'stop_filled',
  stopSlash: 'stop_slash',
  storage: 'storage',
  string: 'string',
  submodule: 'submodule',
  swatchInput: 'swatch_input', // Undocumented on purpose. Has an extra stroke for EuiColorPicker
  symlink: 'symlink',
  tableOfContents: 'tableOfContents',
  tableDensityExpanded: 'table_density_expanded',
  tableDensityCompact: 'table_density_compact',
  tableDensityNormal: 'table_density_normal',
  tag: 'tag',
  tear: 'tear',
  temperature: 'temperature',
  timeline: 'timeline',
  timelionApp: 'app_timelion',
  training: 'training',
  trash: 'trash',
  upgradeAssistantApp: 'app_upgrade_assistant',
  uptimeApp: 'app_uptime',
  unfold: 'unfold',
  unlink: 'unlink',
  user: 'user',
  users: 'users',
  usersRolesApp: 'app_users_roles',
  vector: 'vector',
  videoPlayer: 'videoPlayer',
  visArea: 'vis_area',
  visAreaStacked: 'vis_area_stacked',
  visBarHorizontal: 'vis_bar_horizontal',
  visBarHorizontalStacked: 'vis_bar_horizontal_stacked',
  visBarVertical: 'vis_bar_vertical',
  visBarVerticalStacked: 'vis_bar_vertical_stacked',
  visGauge: 'vis_gauge',
  visGoal: 'vis_goal',
  visLine: 'vis_line',
  visMapCoordinate: 'vis_map_coordinate',
  visMapRegion: 'vis_map_region',
  visMetric: 'vis_metric',
  visPie: 'vis_pie',
  visTable: 'vis_table',
  visTagCloud: 'vis_tag_cloud',
  visText: 'vis_text',
  visTimelion: 'vis_timelion',
  visualizeApp: 'app_visualize',
  visVega: 'vis_vega',
  visVisualBuilder: 'vis_visual_builder',
  watchesApp: 'app_watches',
  workplaceSearchApp: 'app_workplace_search',
  wrench: 'wrench',
  // Token Icon Imports
  tokenClass: 'tokens/tokenClass',
  tokenProperty: 'tokens/tokenProperty',
  tokenEnum: 'tokens/tokenEnum',
  tokenVariable: 'tokens/tokenVariable',
  tokenMethod: 'tokens/tokenMethod',
  tokenAnnotation: 'tokens/tokenAnnotation',
  tokenException: 'tokens/tokenException',
  tokenInterface: 'tokens/tokenInterface',
  tokenParameter: 'tokens/tokenParameter',
  tokenField: 'tokens/tokenField',
  tokenElement: 'tokens/tokenElement',
  tokenFunction: 'tokens/tokenFunction',
  tokenBoolean: 'tokens/tokenBoolean',
  tokenString: 'tokens/tokenString',
  tokenArray: 'tokens/tokenArray',
  tokenNumber: 'tokens/tokenNumber',
  tokenConstant: 'tokens/tokenConstant',
  tokenObject: 'tokens/tokenObject',
  tokenEvent: 'tokens/tokenEvent',
  tokenKey: 'tokens/tokenKey',
  tokenNull: 'tokens/tokenNull',
  tokenStruct: 'tokens/tokenStruct',
  tokenPackage: 'tokens/tokenPackage',
  tokenOperator: 'tokens/tokenOperator',
  tokenEnumMember: 'tokens/tokenEnumMember',
  tokenRepo: 'tokens/tokenRepo',
  tokenSymbol: 'tokens/tokenSymbol',
  tokenFile: 'tokens/tokenFile',
  tokenModule: 'tokens/tokenModule',
  tokenNamespace: 'tokens/tokenNamespace',
  tokenDate: 'tokens/tokenDate',
  tokenIP: 'tokens/tokenIP',
  tokenNested: 'tokens/tokenNested',
  tokenAlias: 'tokens/tokenAlias',
  tokenShape: 'tokens/tokenShape',
  tokenGeo: 'tokens/tokenGeo',
  tokenRange: 'tokens/tokenRange',
  tokenBinary: 'tokens/tokenBinary',
  tokenJoin: 'tokens/tokenJoin',
  tokenPercolator: 'tokens/tokenPercolator',
  tokenFlattened: 'tokens/tokenFlattened',
  tokenRankFeature: 'tokens/tokenRankFeature',
  tokenRankFeatures: 'tokens/tokenRankFeatures',
  tokenKeyword: 'tokens/tokenKeyword',
  tokenCompletionSuggester: 'tokens/tokenCompletionSuggester',
  tokenDenseVector: 'tokens/tokenDenseVector',
  tokenText: 'tokens/tokenText',
  tokenTokenCount: 'tokens/tokenTokenCount',
  tokenSearchType: 'tokens/tokenSearchType',
  tokenHistogram: 'tokens/tokenHistogram',
};

export const TYPES = keysOf(typeToPathMap);

export type EuiIconType = keyof typeof typeToPathMap;

export type IconType = EuiIconType | string;

export const COLORS: NamedColor[] = keysOf(colorToClassMap);

type NamedColor = keyof typeof colorToClassMap;

function isNamedColor(name: string): name is NamedColor {
  return colorToClassMap.hasOwnProperty(name);
}

// We accept arbitrary color strings, which are impossible to type.
type IconColor = string | NamedColor;

export type IconSize = keyof typeof sizeToClassNameMap;

export type EuiIconArgs = CommonArgs & {
  /**
   * `Enum` is any of the named icons listed in the docs, `string` is usually a URL to an SVG file, and `elementType` is any Ember Icon SVG component
   */
  type: IconType;

  /**
   * One of EUI's color palette or a valid CSS color value https://developer.mozilla.org/en-US/docs/Web/CSS/color_value.
   * Note that coloring only works if your SVG is removed of fill attributes.
   */
  color?: IconColor;
  /**
   * Note that every size other than `original` assumes the provided SVG sits on a square viewbox.
   */
  size?: IconSize;

  /**
   * Descriptive title for naming the icon based on its use
   */
  title?: string;
  /**
   * A unique identifier for the title element
   */
  titleId?: string;

  tabIndex?: unknown;

  /**
   * Its value should be one or more element IDs
   */
  'aria-labelledby'?: string;

  /**
   * Callback when the icon has been loaded & rendered
   */
  onIconLoad?: () => void;
};

function isEuiIconType(x: EuiIconArgs['type']): x is EuiIconType {
  return typeof x === 'string' && typeToPathMap.hasOwnProperty(x);
}

export default class EuiIcon extends Component<EuiIconArgs> {
  @argOrDefault('m') size!: IconSize;
  @argOrDefault('default') color!: IconColor;

  constructor(owner: unknown, args: EuiIconArgs) {
    super(owner, args);

    this.onIconLoad();
  }

  get useImage(): boolean {
    let { type } = this.args;
    return typeof type === 'string' && !isEuiIconType(type);
  }

  get icon(): IconType | void {
    let { type } = this.args;

    if (type === null) {
      return undefined;
    }

    if (isEuiIconType(type)) {
      return typeToPathMap[type];
    }

    return type;
  }

  onIconLoad() {
    const { onIconLoad } = this.args;

    if (onIconLoad) {
      onIconLoad();
    }
  }

  get classes(): string {
    const { size, isAppIcon } = this;
    const { className = '' } = this.args;

    return [
      'euiIcon',
      sizeToClassNameMap[size],
      this.optionalColorClass,
      isAppIcon ? 'euiIcon--app' : '',
      className,
    ].join(' ');
  }

  get isAppIcon() {
    const { type } = this.args;
    return (
      type &&
      typeof type === 'string' &&
      (/.+App$/.test(type) || /.+Job$/.test(type) || type === 'dataVisualizer')
    );
  }

  get focusable() {
    const { tabIndex } = this.args;
    return tabIndex == null || tabIndex === -1 ? 'false' : 'true';
  }

  get optionalCustomStyles() {
    let { color } = this;
    if (color) {
      if (!isNamedColor(color)) {
        return htmlSafe(`fill: ${color}`);
      }
    }
    return '';
  }

  get optionalColorClass() {
    let { color } = this;
    if (color) {
      if (isNamedColor(color)) {
        return colorToClassMap[color];
      }
    }
    return '';
  }

  // If it's an empty icon, or if there is no aria-label, aria-labelledby, or title it gets aria-hidden true
  get isAriaHidden(): boolean {
    const { icon } = this;

    return (
      icon === 'empty' ||
      !(this.args['aria-label'],
      this.args['aria-labelledby'],
      this.args['title'])
    );
  }

  get hideIconEmpty() {
    return this.isAriaHidden && { 'aria-hidden': true };
  }

  get titleId(): string {
    let { title } = this.args;
    let titleId: any;

    // If no aria-label or aria-labelledby is provided but there's a title, a titleId is generated
    //  The svg aria-labelledby attribute gets this titleId
    //  The svg title element gets this titleId as an id
    if (!this.args['aria-label'] && !this.args['aria-labelledby'] && title) {
      titleId = { titleId: uniqueId() };
    }
    return titleId;
  }
}
