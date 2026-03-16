---
title: "Speech synthesis"
category: plugins
url: "https://www.construct.net/en/make-games/manuals/construct-3/plugin-reference/speech-synthesis"
lang: en
lastScraped: "2026-03-16T06:08:11.348Z"
---
# Speech synthesis

# Speech synthesis

The Speech synthesis object can automatically speak some text using a synthetic voice, also known as text-to-speech (TTS).

Speech synthesis may not be supported by all browsers or platforms. Use the Supports speech synthesis condition to check if speech synthesis can be used.

Starting speech synthesis is treated similarly to audio playback by some browsers. This means in order to avoid annoying the user it may not be able to autoplay on startup. It may also only be allowed to start in a user input trigger, such as
*On button clicked*
or
*On touch started*
.

### Scripting

This object has no script interface, because when using JavaScript or TypeScript coding you can use the browser built-in Web Speech API.

[]()

## Speech synthesis conditions

Is speaking
True if the speech synthesis engine is currently reading out some text.
On speech ended
Triggered when the speech started by
*Speak text*
finishes being read out.
On speech error
Triggered if an error occurs during speech synthesis.
Supports speech synthesis
True if the current browser/platform supports speech synthesis, so the
*Speak text*
action can be used
[]()

## Speech synthesis actions

Pause speaking
Resume speaking
Pause or resume text being read out by speech synthesis from the
*Speak text*
action.
Speak text
Read out some text using speech synthesis. The language, volume, rate and pitch of the voice that reads out the text can be customised. The
*Voice URI*
can be used to select a different kind of voice (e.g. male vs. female) from a list of the supported voices, if any alternatives are available. The list of possible voices can be retrieved using the
*VoiceCount*
and
*VoiceURIAt*
expressions.
Stop speaking
Stop reading out text from a previous
*Speak text*
action. The speech cannot be resumed.
[]()

## Speech synthesis expressions

VoiceCount
Return the number of voices available for use with speech synthesis.
VoiceLangAt(index)
VoiceNameAt(index)
VoiceURIAt(index)
Return the language, name, or URI of the voice at the given zero-based index. This can be used to show the user a list of possible voices to choose. To select a different voice, pass the appropriate voice URI to the
*Speak text*
action.
[Construct 3 Manual](https://www.construct.net/en/make-games/manuals/construct-3)
Construct.net
2018-11-16
2024-02-16
![image]

#### You are here:

- Online Manuals
- Construct 3 Documentation
- Plugin reference
- Speech synthesis

#### Search this manual:

![Search this manual]
[Community Help](/en/forum)
[Contact Us](/en/contact)
This manual entry was last updated on 16 Feb, 2024 at 16:55