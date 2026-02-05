/**
 * 调试日志级别
 */
export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

/**
 * 插件设置接口（包含调试配置）
 */
export interface DebugSettings {
  debugMode: boolean;
  debugLevel: LogLevel;
}

/**
 * 调试日志器类
 * 用于控制插件的调试输出，所有日志输出必须通过此类进行
 */
export class DebugLogger {
  private settings: DebugSettings;
  private pluginName: string;

  /**
   * 日志级别优先级（数字越大优先级越高）
   */
  private readonly levelPriority: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
  };

  constructor(settings: DebugSettings, pluginName: string) {
    this.settings = settings;
    this.pluginName = pluginName;
  }

  /**
   * 更新日志器设置
   */
  updateSettings(settings: DebugSettings): void {
    this.settings = settings;
  }

  /**
   * 记录日志
   * @param message 日志消息
   * @param level 日志级别
   */
  log(message: string, level: LogLevel = 'info'): void {
    if (this.shouldLog(level)) {
      const timestamp = new Date().toLocaleTimeString();
      console[level](`[${this.pluginName}] ${timestamp} [${level.toUpperCase()}] ${message}`);
    }
  }

  /**
   * 记录信息级别日志
   */
  info(message: string): void {
    this.log(message, 'info');
  }

  /**
   * 记录警告级别日志
   */
  warn(message: string): void {
    this.log(message, 'warn');
  }

  /**
   * 记录错误级别日志
   */
  error(message: string): void {
    this.log(message, 'error');
  }

  /**
   * 记录调试级别日志
   */
  debug(message: string): void {
    this.log(message, 'debug');
  }

  /**
   * 判断是否应该输出该级别的日志
   */
  private shouldLog(level: LogLevel): boolean {
    if (!this.settings.debugMode) {
      return false;
    }
    const currentLevelPriority = this.levelPriority[this.settings.debugLevel];
    const messageLevelPriority = this.levelPriority[level];
    return messageLevelPriority >= currentLevelPriority;
  }
}
