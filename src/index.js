import { BasePlugin, BaseComponent } from "vatom-spaces-plugins";

export default class MyPlugin extends BasePlugin {
  /** Plugin info */
  static id = "avataranimations";
  static name = "avataranimations";

  /** Called on load */
  onLoad() {
    const animationFiles = [
      "anim_angry.glb",
      // 'anim_fallflat.glb',
      "anim_happy.glb",
      "anim_mma_kick.glb",
      "anim_wave.glb",
      "anim_playing_guitar.glb",      
      "anim_salute.glb",
      "anim_silly_dance.glb",
      "anim_sitting_laughing.glb",
      "anim_standing_up.glb",
      "anim_standing_arguing.glb",
      "anim_standing_talking_on_phone.glb",
      // "anim_walking.glb",
      // "anim_standard_walk.glb",
      // "anim_running.glb",
    ];

    // Loop through the files
    for (const fileName of animationFiles) {
      // Register the animation
      this.objects.registerAnimations(this.paths.absolute(fileName));

      // use the animation name
      const name = fileName.replace("anim_", "").replace(".glb", "");
      const textName = name.replace("_"," ");
      // Create a button in the toolbar for each of them
      this.menus.register({
        icon: this.paths.absolute("button-icon.svg"),
        text: textName,
        action: () => this.onButtonPress(name),
      });
    }
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
