import type { DocCategory, DocTopic } from "../docs/types.js";

const BASE = "https://www.construct.net/{lang}/make-games/manuals/construct-3";

function url(path: string): string {
  return `${BASE}/${path}`;
}

function topic(
  slug: string,
  title: string,
  category: DocCategory,
  path: string,
  description: string,
  tags: string[] = []
): DocTopic {
  return { slug, title, category, sourceUrl: url(path), description, tags };
}

// ─── PLUGINS ─────────────────────────────────────────────────
const plugins: DocTopic[] = [
  topic("sprite", "Sprite", "plugins", "plugin-reference/sprite", "2D image object with animations", ["image", "animation", "visual"]),
  topic("tiled-background", "Tiled Background", "plugins", "plugin-reference/tiled-background", "Repeating tiled image", ["tile", "background", "image"]),
  topic("9-patch", "9-Patch", "plugins", "plugin-reference/9-patch", "Resizable UI panel with 9-slice scaling", ["ui", "panel", "scale"]),
  topic("text", "Text", "plugins", "plugin-reference/text", "Display text with formatting", ["font", "string", "display"]),
  topic("spritefont", "SpriteFont", "plugins", "plugin-reference/sprite-font", "Bitmap font text display", ["font", "bitmap", "text"]),
  topic("tilemap", "Tilemap", "plugins", "plugin-reference/tilemap", "Tile-based level maps", ["tiles", "level", "map", "grid"]),
  topic("audio", "Audio", "plugins", "plugin-reference/audio", "Play sound effects and music", ["sound", "music", "sfx"]),
  topic("keyboard", "Keyboard", "plugins", "plugin-reference/keyboard", "Keyboard input", ["input", "key", "controls"]),
  topic("mouse", "Mouse", "plugins", "plugin-reference/mouse", "Mouse input and cursor", ["input", "click", "cursor"]),
  topic("touch", "Touch", "plugins", "plugin-reference/touch", "Touch and gesture input", ["input", "mobile", "gesture", "tap"]),
  topic("gamepad", "Gamepad", "plugins", "plugin-reference/gamepad", "Controller/gamepad input", ["input", "controller", "joystick"]),
  topic("function", "Function", "plugins", "plugin-reference/function", "Call and define functions in events", ["call", "event", "reuse"]),
  topic("array", "Array", "plugins", "plugin-reference/array", "Multi-dimensional data array", ["data", "storage", "grid"]),
  topic("dictionary", "Dictionary", "plugins", "plugin-reference/dictionary", "Key-value data storage", ["data", "map", "json"]),
  topic("json", "JSON", "plugins", "plugin-reference/json", "Parse and manipulate JSON data", ["data", "parse", "api"]),
  topic("ajax", "AJAX", "plugins", "plugin-reference/ajax", "HTTP requests and web APIs", ["http", "request", "fetch", "api"]),
  topic("browser", "Browser", "plugins", "plugin-reference/browser", "Browser interaction and info", ["window", "url", "fullscreen"]),
  topic("local-storage", "Local Storage", "plugins", "plugin-reference/local-storage", "Persistent local data storage", ["save", "load", "persist"]),
  topic("particles", "Particles", "plugins", "plugin-reference/particles", "Particle effect system", ["effect", "visual", "emission"]),
  topic("video", "Video", "plugins", "plugin-reference/video", "Video playback", ["media", "playback", "mp4"]),
  topic("drawing-canvas", "Drawing Canvas", "plugins", "plugin-reference/drawing-canvas", "Programmatic 2D drawing", ["draw", "canvas", "render"]),
  topic("html-element", "HTML Element", "plugins", "plugin-reference/html-element", "Embed HTML in the game", ["dom", "ui", "web"]),
  topic("button", "Button", "plugins", "plugin-reference/button", "Clickable HTML button", ["ui", "click", "input"]),
  topic("text-input", "Text Input", "plugins", "plugin-reference/text-input", "Text entry field", ["ui", "form", "input"]),
  topic("list", "List", "plugins", "plugin-reference/list", "Dropdown/list selection", ["ui", "select", "form"]),
  topic("slider-bar", "Slider Bar", "plugins", "plugin-reference/slider-bar", "Slider control", ["ui", "range", "input"]),
  topic("progress-bar", "Progress Bar", "plugins", "plugin-reference/progress-bar", "Progress indicator", ["ui", "loading", "bar"]),
  topic("shadow-light", "Shadow Light", "plugins", "plugin-reference/shadow-light", "2D shadow casting lights", ["light", "shadow", "visual"]),
  // Line of Sight is covered as a behavior; plugin page URL not available
  topic("geolocation", "Geolocation", "plugins", "plugin-reference/geolocation", "GPS location data", ["gps", "location", "mobile"]),
  topic("speech-recognition", "Speech Recognition", "plugins", "plugin-reference/speech-recognition", "Voice input recognition", ["voice", "speech", "input"]),
  topic("speech-synthesis", "Speech Synthesis", "plugins", "plugin-reference/speech-synthesis", "Text to speech output", ["voice", "tts", "speech"]),
  topic("multiplayer", "Multiplayer", "plugins", "plugin-reference/multiplayer", "Real-time multiplayer via signalling", ["network", "online", "peer"]),
  topic("timeline-controller", "Timeline Controller", "plugins", "plugin-reference/timeline-controller", "Control timeline animations", ["animation", "timeline", "tween"]),
  topic("camera-3d", "3D Camera", "plugins", "plugin-reference/3d-camera", "3D camera control", ["3d", "camera", "perspective"]),
  topic("shape-3d", "3D Shape", "plugins", "plugin-reference/3d-shape", "3D primitive shapes", ["3d", "cube", "mesh"]),
  topic("advanced-random", "Advanced Random", "plugins", "plugin-reference/advanced-random", "Advanced random number generation", ["random", "noise", "procedural"]),
  topic("date", "Date", "plugins", "plugin-reference/date", "Date and time functions", ["time", "clock", "calendar"]),
];

// ─── BEHAVIORS ───────────────────────────────────────────────
const behaviors: DocTopic[] = [
  topic("platform", "Platform", "behaviors", "behavior-reference/platform", "Platform movement (run, jump)", ["movement", "jump", "platformer"]),
  topic("solid", "Solid", "behaviors", "behavior-reference/solid", "Solid collision behavior", ["collision", "physics", "wall"]),
  topic("jumpthru", "Jump-thru", "behaviors", "behavior-reference/jump-thru", "One-way platform", ["platform", "collision"]),
  topic("bullet", "Bullet", "behaviors", "behavior-reference/bullet", "Move at speed in angle", ["movement", "projectile", "speed"]),
  topic("8-direction", "8 Direction", "behaviors", "behavior-reference/8-direction", "8-directional movement", ["movement", "topdown", "controls"]),
  topic("car", "Car", "behaviors", "behavior-reference/car", "Car-style steering movement", ["movement", "vehicle", "driving"]),
  topic("scroll-to", "Scroll To", "behaviors", "behavior-reference/scroll-to", "Camera follows object", ["camera", "follow", "viewport"]),
  // Bound to Layout and Destroy Outside Layout are simple behaviors without dedicated pages
  topic("fade", "Fade", "behaviors", "behavior-reference/fade", "Fade opacity over time", ["opacity", "alpha", "transition"]),
  topic("flash", "Flash", "behaviors", "behavior-reference/flash", "Flash visibility on/off", ["blink", "visible", "effect"]),
  topic("tween", "Tween", "behaviors", "behavior-reference/tween", "Animate properties over time", ["animation", "ease", "interpolate"]),
  topic("timer", "Timer", "behaviors", "behavior-reference/timer", "Schedule delayed events", ["delay", "wait", "schedule"]),
  topic("line-of-sight-behavior", "Line of Sight", "behaviors", "behavior-reference/line-of-sight", "Raycasting visibility checks", ["raycast", "ai", "vision"]),
  topic("pathfinding", "Pathfinding", "behaviors", "behavior-reference/pathfinding", "A* pathfinding navigation", ["ai", "navigation", "path"]),
  topic("drag-and-drop", "Drag & Drop", "behaviors", "behavior-reference/drag-drop", "Drag objects with mouse/touch", ["input", "drag", "interaction"]),
  topic("pin", "Pin", "behaviors", "behavior-reference/pin", "Pin object to another", ["attach", "follow", "parent"]),
  topic("anchor", "Anchor", "behaviors", "behavior-reference/anchor", "Anchor to viewport edges", ["ui", "responsive", "position"]),
  topic("sine", "Sine", "behaviors", "behavior-reference/sine", "Oscillate properties with sine wave", ["wave", "oscillate", "motion"]),
  topic("wrap", "Wrap", "behaviors", "behavior-reference/wrap", "Wrap around layout edges", ["loop", "boundary", "teleport"]),
  topic("turret", "Turret", "behaviors", "behavior-reference/turret", "Auto-aim and shoot at targets", ["ai", "aim", "weapon"]),
  topic("orbit", "Orbit", "behaviors", "behavior-reference/orbit", "Orbit around a point", ["rotation", "circle", "motion"]),
  topic("physics", "Physics", "behaviors", "behavior-reference/physics", "Box2D physics simulation", ["physics", "gravity", "collision"]),
  topic("shadow-caster", "Shadow Caster", "behaviors", "behavior-reference/shadow-caster", "Cast shadows from lights", ["shadow", "light", "visual"]),
  topic("no-save", "No Save", "behaviors", "behavior-reference/no-save", "Exclude from savegame", ["save", "persist", "exclude"]),
  topic("persist", "Persist", "behaviors", "behavior-reference/persist", "Keep between layouts", ["save", "layout", "persist"]),
];

// ─── PROJECT ─────────────────────────────────────────────────
const project: DocTopic[] = [
  topic("project-structure", "Project Structure", "project", "project-primitives/projects", "Overview of project organization", ["project", "structure", "overview"]),
  topic("layouts", "Layouts", "project", "project-primitives/layouts", "Game scenes/levels", ["scene", "level", "room"]),
  topic("layers", "Layers", "project", "project-primitives/layers", "Drawing and organization layers", ["render", "order", "parallax"]),
  topic("object-types", "Object Types", "project", "project-primitives/objects/object-types", "Object type definitions", ["instance", "type", "class"]),
  topic("instances", "Instances", "project", "project-primitives/objects/instances", "Object instances in layouts", ["object", "create", "spawn"]),
  topic("instance-variables", "Instance Variables", "project", "project-primitives/objects/instance-variables", "Per-instance data storage", ["variable", "data", "property"]),
  topic("families", "Families", "project", "project-primitives/objects/families", "Group object types together", ["group", "inheritance", "shared"]),
  topic("behaviors-overview", "Behaviors", "project", "project-primitives/objects/behaviors", "Adding behaviors to objects", ["behavior", "component"]),
  topic("effects-overview", "Effects", "project", "project-primitives/objects/effects", "Adding visual effects to objects", ["shader", "blend", "visual"]),
  topic("event-sheets", "Event Sheets", "project", "project-primitives/events/event-sheets", "Event-driven programming sheets", ["events", "logic", "programming"]),
  // Events overview is covered by event-sheets topic
  topic("actions", "Actions", "project", "project-primitives/events/actions", "Actions in event sheets", ["action", "do", "execute"]),
  topic("conditions", "Conditions", "project", "project-primitives/events/conditions", "Conditions in event sheets", ["if", "check", "test"]),
  topic("expressions", "Expressions", "project", "project-primitives/events/expressions", "Expressions for dynamic values", ["math", "value", "formula"]),
  topic("sub-events", "Sub-events", "project", "project-primitives/events/sub-events", "Nested event blocks", ["nested", "child", "branch"]),
  topic("groups", "Groups", "project", "project-primitives/events/groups", "Organize events in groups", ["organize", "folder", "toggle"]),
  topic("comments", "Comments", "project", "project-primitives/events/comments", "Comments in event sheets", ["note", "documentation"]),
  topic("variables", "Variables", "project", "project-primitives/events/variables", "Global and local variables", ["global", "local", "data"]),
  topic("functions", "Functions", "project", "project-primitives/events/functions", "Event functions and parameters", ["function", "call", "parameter"]),
  topic("timelines", "Timelines", "project", "project-primitives/timelines", "Timeline-based animations", ["animation", "keyframe", "sequence"]),
  topic("sounds-music", "Sounds & Music", "project", "project-primitives/sounds-and-music", "Audio assets management", ["audio", "sound", "music"]),
  topic("files", "Files", "project", "project-primitives/files", "Project file management", ["import", "asset", "resource"]),
];

// ─── SCRIPTING ───────────────────────────────────────────────
const scripting: DocTopic[] = [
  // scripting-overview redirects, covered by using-scripting
  topic("using-scripting", "Using Scripting", "scripting", "scripting/using-scripting", "How to use scripts in projects", ["setup", "getting-started", "javascript"]),
  topic("scripting-reference", "Scripting Reference", "scripting", "scripting/scripting-reference", "Complete scripting API reference", ["api", "reference"]),
  topic("script-runtime", "IRuntime", "scripting", "scripting/scripting-reference/iruntime", "Main runtime interface", ["runtime", "api", "core"]),
  topic("script-objectclass", "IObjectClass", "scripting", "scripting/scripting-reference/object-interfaces/iobjectclass", "Object class scripting interface", ["object", "type", "class"]),
  topic("script-instance", "IInstance", "scripting", "scripting/scripting-reference/object-interfaces/iinstance", "Instance scripting interface", ["instance", "object", "api"]),
  topic("script-worldinstance", "IWorldInstance", "scripting", "scripting/scripting-reference/object-interfaces/iworldinstance", "World instance interface with position/size", ["position", "size", "visible"]),
];

// ─── INTERFACE ───────────────────────────────────────────────
const interfaceTopics: DocTopic[] = [
  // start-page URL not found on construct.net
  topic("layout-view", "Layout View", "interface", "interface/layout-view", "Visual layout editor", ["editor", "design", "visual"]),
  topic("event-sheet-view", "Event Sheet View", "interface", "interface/event-sheet-view", "Event sheet editor", ["events", "editor", "logic"]),
  topic("project-bar", "Project Bar", "interface", "interface/bars/project-bar", "Project structure panel", ["panel", "tree", "navigate"]),
  topic("properties-bar", "Properties Bar", "interface", "interface/bars/properties-bar", "Object properties editor", ["properties", "edit", "panel"]),
  topic("animations-editor", "Animations Editor", "interface", "interface/animations-editor", "Sprite animation editor", ["animation", "frames", "edit"]),
  topic("tilemap-bar", "Tilemap Bar", "interface", "interface/bars/tilemap-bar", "Tilemap editing panel", ["tilemap", "tiles", "paint"]),
  topic("z-order-bar", "Z Order Bar", "interface", "interface/bars/z-order-bar", "Layer and Z order panel", ["zorder", "sort", "layers"]),
  topic("debugger", "Debugger", "interface", "interface/debugger", "Runtime debugger tool", ["debug", "inspect", "watch"]),
];

// ─── EFFECTS ─────────────────────────────────────────────────
// Effects and publishing URLs need different URL patterns on construct.net
// Placeholder arrays — can be populated when correct URLs are found
const effects: DocTopic[] = [];
const publishing: DocTopic[] = [];

/** All documentation topics */
export const ALL_TOPICS: DocTopic[] = [
  ...plugins,
  ...behaviors,
  ...project,
  ...scripting,
  ...interfaceTopics,
  ...effects,
  ...publishing,
];

/** Get topics filtered by category */
export function getTopicsByCategory(category: DocCategory): DocTopic[] {
  return ALL_TOPICS.filter((t) => t.category === category);
}

/** Find a topic by slug */
export function findTopic(slug: string): DocTopic | undefined {
  return ALL_TOPICS.find((t) => t.slug === slug);
}

/** Resolve the full URL for a topic in a specific language */
export function resolveUrl(topic: DocTopic, lang: string): string {
  return topic.sourceUrl.replace("{lang}", lang);
}
