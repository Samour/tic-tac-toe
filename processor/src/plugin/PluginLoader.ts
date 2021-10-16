import { PluginFactory } from '@tictactoe/interfaces';

const fs = require('fs/promises');
const path = require('path');
const remote = require('@electron/remote');

const PLUGIN_EXT = '.plugin.js';

export interface PluginLoader {
  loadPlugins(): Promise<PluginFactory[]>;
}

class PluginLoaderImpl implements PluginLoader {

  constructor(private readonly pluginsDir: string) { }

  private async findPluginFiles(): Promise<string[]> {
    let files: string[];
    try {
      files = await fs.readdir(this.pluginsDir);
    } catch (e: any) {
      if (e.code === 'ENOENT') {
        return [];
      } else {
        throw e;
      }
    }

    return files.filter((f) => f.endsWith(PLUGIN_EXT))
      .map((f) => path.join(this.pluginsDir, f));
  }

  async loadPlugins(): Promise<PluginFactory[]> {
    const files = await this.findPluginFiles();

    const pluginFactories = [];
    for (let pluginFile of files) {
      const factory = remote.require(pluginFile);
      pluginFactories.push(factory);
    }

    return pluginFactories;
  }
}

export const pluginLoader = (): PluginLoader => {
  // const pluginsDir = path.join(app.getPath('exe'), 'plugins');
  const pluginsDir = path.join(process.cwd(), 'build/plugins');

  return new PluginLoaderImpl(pluginsDir);
};
