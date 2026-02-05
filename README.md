# Form

An Obsidian plugin that allows you to create simple, one-action workflows — with ease.

## Features

- **Modal Commands**: Open simple modal dialogs for quick actions
- **Editor Commands**: Replace selected content in your notes
- **Customizable Settings**: Configure plugin behavior through Obsidian settings
- **Debug Mode**: Built-in logging for troubleshooting and development
- **UI Elements**: Ribbon icons and status bar integration
- **Multi-language Support**: Built with TypeScript for type safety

## Installation

### Manual Installation

1. Download the latest release
2. Extract the files to your Obsidian vault's plugins folder: `vault/.obsidian/plugins/form/`
3. Enable the plugin in Obsidian under Settings → Community Plugins

## Usage

### Commands

The plugin provides the following commands (accessible via Command Palette `Ctrl/Cmd + P`):

- **Open modal (simple)**: Opens a simple modal dialog
- **Replace selected content**: Replaces the currently selected text in your note with "Sample editor command"
- **Open modal (complex)**: Opens a modal dialog (only available when a markdown view is active)

### UI Elements

- **Ribbon Icons**: Click the dice icons in the left sidebar to trigger test actions
- **Status Bar**: View status information at the bottom of the Obsidian window

## Configuration

Access plugin settings via Settings → Community Plugins → Form → Options

### Settings

- **Debug mode**: Enable debug logging for troubleshooting
- **Debug level**: Select the minimum level of debug messages to log (Debug, Info, Warning, Error)
- **Settings #1**: A custom setting for user preferences

## Development

### Prerequisites

- Node.js 16+
- npm or yarn
- Obsidian app

### Setup

```bash
# Install dependencies
npm install
```

### Build

```bash
# Development build with watch mode
npm run dev

# Production build
npm run build
```

### Lint

```bash
# Run ESLint
npm run lint
```

### Version Bump

```bash
# Update version numbers in manifest.json and versions.json
npm version patch/minor/major
```

## Project Structure

```
form/
├── src/
│   ├── commands/
│   │   └── index.ts          # Command registration and management
│   ├── ui/
│   │   └── modals/
│   │       └── form-modal.ts # Modal dialog implementation
│   ├── utils/
│   │   └── logger.ts         # Debug logging utilities
│   ├── main.ts               # Plugin main class
│   └── settings.ts           # Plugin settings and configuration
├── esbuild.config.mjs        # Build configuration
├── manifest.json             # Obsidian plugin manifest
├── package.json              # Node.js dependencies
└── tsconfig.json             # TypeScript configuration
```

## License

[BSD 0-Clause License](LICENSE)

## Author

vran

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
