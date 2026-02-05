import { Plugin, Notice } from 'obsidian';
import { DEFAULT_SETTINGS, FormPluginSettings, FormSettingTab } from './settings';
import { DebugLogger } from './utils/logger';
import { CommandManager } from './commands';

/**
 * Form 插件主类
 * 负责插件生命周期管理和核心功能注册
 */
export default class FormPlugin extends Plugin {
  settings: FormPluginSettings;
  logger: DebugLogger;
  commandManager: CommandManager;

  /**
   * 插件加载时的初始化
   */
  async onload() {
    // 加载设置
    await this.loadSettings();

    // 初始化日志器
    this.initializeLogger();

    // 注册命令
    this.registerCommands();

    // 注册 UI 元素
    this.registerUI();

    // 注册事件监听器
    this.registerEventListeners();

    // 注册设置标签页
    this.addSettingTab(new FormSettingTab(this.app, this));

    this.logger.info('Form plugin loaded successfully');
  }

  /**
   * 插件卸载时的清理
   */
  onunload() {
    this.logger.info('Form plugin unloading');
  }

  /**
   * 加载插件设置
   */
  private async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<FormPluginSettings>);
  }

  /**
   * 保存插件设置
   */
  async saveSettings() {
    await this.saveData(this.settings);
  }

  /**
   * 初始化日志器
   */
  private initializeLogger() {
    this.logger = new DebugLogger(this.settings, this.manifest.name);
  }

  /**
   * 注册所有命令
   */
  private registerCommands() {
    this.commandManager = new CommandManager(this, this.logger);
    this.commandManager.registerAll();
  }

  /**
   * 注册 UI 元素
   */
  private registerUI() {
    // 左侧功能区的测试按钮
    this.addRibbonIcon('dice', 'Greet', () => {
      new Notice('这是一段用于测试的文字内容！');
    });

    // 左侧功能区的示例按钮
    this.addRibbonIcon('dice', 'Sample', () => {
      new Notice('This is a notice!');
    });

    // 底部状态栏项目
    const statusBarItemEl = this.addStatusBarItem();
    statusBarItemEl.setText('Status bar text');
  }

  /**
   * 注册事件监听器
   */
  private registerEventListeners() {
    // 注册全局 DOM 事件（插件禁用时会自动移除）
    this.registerDomEvent(document, 'click', () => {
      this.logger.debug('Document click event detected');
    });
  }
}
