import { Editor, MarkdownView } from 'obsidian';
import { DebugLogger } from '../utils/logger';
import FormPlugin from '../main';
import { FormModal } from '../ui/modals/form-modal';

/**
 * 命令管理器类
 * 负责注册和管理插件的所有命令
 */
export class CommandManager {
  private plugin: FormPlugin;
  private logger: DebugLogger;

  constructor(plugin: FormPlugin, logger: DebugLogger) {
    this.plugin = plugin;
    this.logger = logger;
  }

  /**
   * 注册所有命令
   */
  registerAll(): void {
    this.registerSimpleModalCommand();
    this.registerReplaceSelectedCommand();
    this.registerComplexModalCommand();
    this.logger.debug('All commands registered');
  }

  /**
   * 注册简单模态框命令
   */
  private registerSimpleModalCommand(): void {
    this.plugin.addCommand({
      id: 'open-modal-simple',
      name: 'Open modal (simple)',
      callback: () => {
        new FormModal(this.plugin.app).open();
        this.logger.debug('Simple modal opened');
      }
    });
  }

  /**
   * 注册替换选中内容命令
   */
  private registerReplaceSelectedCommand(): void {
    this.plugin.addCommand({
      id: 'replace-selected',
      name: 'Replace selected content',
      editorCallback: (editor: Editor, view: MarkdownView) => {
        editor.replaceSelection('Sample editor command');
        this.logger.debug('Selected content replaced');
      }
    });
  }

  /**
   * 注册复杂模态框命令（带条件检查）
   */
  private registerComplexModalCommand(): void {
    this.plugin.addCommand({
      id: 'open-modal-complex',
      name: 'Open modal (complex)',
      checkCallback: (checking: boolean) => {
        const markdownView = this.plugin.app.workspace.getActiveViewOfType(MarkdownView);
        if (markdownView) {
          if (!checking) {
            new FormModal(this.plugin.app).open();
            this.logger.debug('Complex modal opened');
          }
          return true;
        }
        return false;
      }
    });
  }
}
