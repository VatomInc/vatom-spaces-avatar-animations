import { BasePlugin, BaseComponent } from "vatom-spaces-plugins";

export default class MyPlugin extends BasePlugin {
  /** Plugin info */
  static id = "avataranimations";
  static name = "avataranimations";

  /** Called on load */
  onLoad() {
    const animationFiles = [
      "anim_happy.glb",
      "anim_angry.glb",
      "anim_mma_kick.glb",
      "anim_wave.glb",
      "anim_playing_guitar.glb",
      "anim_salute.glb",
      "anim_silly_dance.glb",
      "anim_sitting_laughing.glb",
      "anim_standing_up.glb",
      "anim_standing_arguing.glb",
      "anim_standing_talking_on_phone.glb",
    ];

    let htmlContent = "<!DOCTYPE html><html><head><style>button {color: #ffffff;background-color: #373737;font-size: 12px;border: 2px solid #2d63c8;border-radius: 5px;padding: 4px 12px;cursor: pointer}button:hover {color: #2d63c8;background-color: #ffffff;}</style></head><body>";

    for (const fileName of animationFiles) {
      // Register the animation
      this.objects.registerAnimations(this.paths.absolute(fileName));

      // use the animation name
      const name = fileName.replace("anim_", "").replace(".glb", "");
      const textName = name.replace("_", " ").replace("_", " ").replace("_", " ");
      // Add a button to the HTML content for each animation
      htmlContent += `<button onclick="parent.postMessage({ animationName: '${name}' }, '*')">${textName}</button>`;
    }

    htmlContent += "</body></html>";
    const iframeURL ="data:text/html;charset=utf-8," + encodeURIComponent(htmlContent);

    this.menus.register({
      id: "animation-chooser",
      // section: "controls",
      icon: this.paths.absolute("button-icon.svg"),
      text: "animations",
      inAccordion: true,
      panel: {
        iframeURL: iframeURL,
      },
    });

    // On load, ask the plugin to send us all it's messages
    parent.postMessage({ action: "panel-load" }, "*");

    // Add a listener for messages from the iframe
    window.addEventListener(
      "message",
      function (event) {
        if (event.data && event.data.animationName) {
          this.onButtonPress(event.data.animationName);
        }
      }.bind(this), // Bind the `this` context of the class
      false
    );
  }
  /** Called on message */
  async onMessage(data) {
    // console.log(data);
    if (data.animationName) this.onButtonPress(data.animationName);
  }
  /** Called when the user presses the action button */
  onButtonPress(name) {
    this.user.overrideAvatarAnimation({
      animation_start: name,
      fixed_movement: { x: 0, y: 0, z: 0 },
      loop: 4,
      cancel_mode: "smooth",
      merge: false,
    });
  }
}
