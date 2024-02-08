// beta is weird !!!! :sob:
import { register } from "@tauri-apps/plugin-global-shortcut"; 

export async function init_keyboard_shortcuts() {
  await register('CommandOrControl+Shift+C', () => {
    console.log('Shortcut triggered');
  });
}