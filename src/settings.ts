import { App, PluginSettingTab, Setting } from 'obsidian';
import { DebugSettings, LogLevel, DebugLogger } from './utils/logger';
import FormPlugin from './main';

/**
 * 插件设置接口
 */
export interface FormPluginSettings extends DebugSettings {
  mySetting: string;
}

/**
 * 默认设置
 */
export const DEFAULT_SETTINGS: FormPluginSettings = {
  debugMode: false,
  debugLevel: 'info',
  mySetting: 'default'
};

/**
 * 插件设置标签页类
 */
export class FormSettingTab extends PluginSettingTab {
  plugin: FormPlugin;

  constructor(app: App, plugin: FormPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  /**
   * 显示设置界面
   */
  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    // 调试模式设置
    new Setting(containerEl)
      .setName('Debug mode')
      .setDesc('Enable debug logging for troubleshooting')
      .addToggle((toggle) => toggle
        .setValue(this.plugin.settings.debugMode)
        .onChange(async (value) => {
          this.plugin.settings.debugMode = value;
          this.plugin.logger.updateSettings(this.plugin.settings);
          await this.plugin.saveSettings();
        }));

    // 调试级别设置
    new Setting(containerEl)
      .setName('Debug level')
      .setDesc('Select the minimum level of debug messages to log')
      .addDropdown((dropdown) => dropdown
        .addOptions({
          debug: 'Debug',
          info: 'Info',
          warn: 'Warning',
          error: 'Error'
        })
        .setValue(this.plugin.settings.debugLevel)
        .onChange(async (value: LogLevel) => {
          this.plugin.settings.debugLevel = value;
          this.plugin.logger.updateSettings(this.plugin.settings);
          await this.plugin.saveSettings();
        }));

    // 用户自定义设置
    new Setting(containerEl)
      .setName('Settings #1')
      .setDesc('It\'s a secret')
      .addText((text) => text
        .setPlaceholder('Enter your secret')
        .setValue(this.plugin.settings.mySetting)
        .onChange(async (value) => {
          this.plugin.settings.mySetting = value;
          await this.plugin.saveSettings();
        }));
  }
}
