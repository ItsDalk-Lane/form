import { App, Modal } from 'obsidian';

/**
 * 表单模态框类
 * 用于显示简单的模态对话框
 */
export class FormModal extends Modal {
  constructor(app: App) {
    super(app);
  }

  /**
   * 模态框打开时的处理
   */
  onOpen(): void {
    const { contentEl } = this;
    contentEl.setText('Woah!');
  }

  /**
   * 模态框关闭时的处理
   * 清理内容元素，防止内存泄漏
   */
  onClose(): void {
    const { contentEl } = this;
    contentEl.empty();
  }
}
