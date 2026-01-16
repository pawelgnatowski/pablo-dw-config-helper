# Pablo's DW Chad

A powerful browser extension that enhances the DataWalk experience with advanced tools, AI assistance, and productivity features. Built with modern Svelte 5 and TypeScript.

![Version](https://img.shields.io/badge/version-0.1.523-blue)
![Chrome](https://img.shields.io/badge/Chrome-Extension-green)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 📥 Installation Guide

### Option 1: Install from GitHub Releases (Recommended)

1. **Download the latest release**
   - Go to [GitHub Releases](https://github.com/pawelgnatowski/pablo-dw-config-helper/releases)
   - Download the latest `.zip` file

2. **Extract the files**
   - Unzip the downloaded file to a permanent location on your computer
   - Remember this location - you'll need it for the next step

3. **Load the extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable **Developer mode** (toggle in the top-right corner)
   - Click **"Load unpacked"** button
   - Select the folder where you extracted the extension files
   - The extension icon should appear in your browser toolbar


### Updating the Extension

1. Download the new release from [GitHub Releases](https://github.com/pawelgnatowski/pablo-dw-config-helper/releases)
2. Go to `chrome://extensions/`
3. Click the **refresh** icon on the Pablo's DW Chad extension card
4. Reload any open DataWalk tabs

---

## 🚀 Features Overview

### 🔍 SuperSearch
**Powerful metadata search and exploration tool**

- **Universal Search**: Search across all DataWalk metadata types (attributes, sets, link types, analyses) with a single query
- **Type Filtering**: Filter search results by specific metadata types
- **Detail Views**: Click on any result to see comprehensive details including:
  - Attribute configurations, data types, and usage statistics
  - Set structures, member counts, and configurations
  - Link type relationships and connection patterns
  - Analysis definitions and execution contexts
- **Selection & Groups**: Select multiple items to create groups for bulk operations
- **Bulk Operations**: Apply operations to multiple items at once using the bulk tools panel

### 🤖 AI Assistant
**Gemini AI-powered assistant for DataWalk development (ALPHA VERSION)**

- **Contextual Conversations**: Chat with AI that understands your DataWalk context
- **Metadata Integration**: Attach metadata (attributes, sets, analyses) to conversations for context-aware assistance
- **Conversation History**: Save and manage multiple conversation threads
- **Prompt Builder**: Build structured prompts with templates for common tasks
- **README Integration**: Pull in documentation and README files for AI reference
- **Settings Management**: Configure API keys and AI behavior preferences

### 🔧 SQL Config Converter
**Bidirectional SQL configuration tool**

- **SQL → JSON Conversion**: Convert raw SQL configurations to DataWalk-compatible JSON format
- **JSON → SQL Conversion**: Reverse convert JSON configurations back to SQL
- **Comment Handling**: Option to remove comments during conversion
- **Minification**: Compact JSON output for production use
- **Validation**: Real-time validation with clear error messages

### 📡 Context Retrieval Tool
**Capture and analyze DataWalk API context**

- **Automatic Context Sniffing**: Intercepts DataWalk API calls to capture runtime context
- **Multiple View Modes**: View context as original, formatted, or escaped JSON
- **Jinja Placeholder Support**: Generate context with Jinja template placeholders
- **Custom Context Input**: Paste and analyze custom JSON context
- **One-Click Copy**: Quickly copy context data for use in other tools

### 🚀 Deployed Apps Monitor
**Track and manage deployed DataWalk applications**

- **Application List**: View all deployed applications in your DataWalk instance
- **Status Monitoring**: See application status at a glance
- **Quick Navigation**: One-click navigation to any deployed application
- **Search & Filter**: Find applications by name, ID, or configuration
- **Endpoint Management**: Unregister dynamic endpoints when needed

### 🔗 Quick Links
**Fast navigation to common DataWalk resources**

- **Swagger API Docs**: Direct link to API documentation
- **Grafana/Monitoring**: Quick access to monitoring dashboards
- **DW Manager**: Navigate to the DataWalk Manager
- **Local Documentation**: Access instance documentation
- **DokuWiki**: Link to official DataWalk documentation

### 📢 App Notifications
**Version updates and changelog information**

- **Update Alerts**: Red badge notification when new versions are available
- **What's New**: View changelog and new feature descriptions
- **Version Info**: See current and latest available versions
- **One-Click Update**: Link to download the latest release

### 🛠️ Minor Tools (SuperSearch Bulk Operations)

#### Virtual Path Editor
- Create and modify virtual paths for data connections
- Visual path builder with drag-and-drop support
- Path validation and preview

#### Create Set View
- Generate new set configurations from templates
- Bulk set creation from selected attributes
- Configuration export and import

#### Change Attribute Data Type
- Modify attribute data types across sets
- Bulk data type changes with validation
- Preview changes before applying

#### DW to Sandbox
- Export configurations to sandbox environments
- Selective export of metadata components
- Configuration comparison tools

#### Structure Config
- View and edit structure configurations
- JSON configuration editor with syntax highlighting
- Configuration validation

#### Truncate Set
- Safely truncate set data
- Preview affected records
- Batch truncation support

## ⚙️ Configuration

### AI Assistant Setup

To use the AI Assistant feature, you need a Google Gemini API key:

1. Get an API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Open the AI Assistant in the extension
3. Click the **Settings** icon
4. Enter your API key and save

### Troubleshooting

| Issue | Solution |
|-------|----------|
| Extension icon not visible | Click the puzzle icon in Chrome toolbar and pin Pablo's Config Helper |
| Floating toolbar not appearing | Refresh the DataWalk page; check that you're on a DataWalk instance |
| AI Assistant not responding | Verify your API key is correct in Settings |
| Metadata not loading | Click the Refresh button in SuperSearch; check network connectivity |

---

## 📝 Contributing
## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🤝 Support

- **Issues**: [GitHub Issues](https://github.com/pawelgnatowski/pablo-dw-config-helper/issues)
- **Releases**: [GitHub Releases](https://github.com/pawelgnatowski/pablo-dw-config-helper/releases)

---

**Made with ❤️ for the DataWalk community**
