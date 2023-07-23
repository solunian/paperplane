# paperplane (work in progress)

A extensible, multi-purpose tool/format for straightforward writing.

## Dev Notes

- run prettier before committing!
- i will definitely start this soon...

## Todos

- [ ] start!

## Description

- multi-platform writing editor
- meant for people who want more finetuned control over writing
  - more options than markdown, less black-magic, under-the-hood than word/docs/libreoffice-writer
- readable/editable even without the editor
- easily convertible to other formats
- writers, students, programmers, anyone can use this!
- customizable and hackable
- ever wanted to use vim or emacs for writing? Now you can! I don't know why you would want to though...
  - vim is far superior btw
- free?
- editing history with git, lol

## Features

- fast loading, autosaves, auto-formatting, auto-linefolding
- lf/crlf, spaces/tab (spaces better)
- Unicode w/ utf-8, emojis, show font availability, handpicked "best" fonts
- .papl convertible to google docs, Word's .doc(x), .odt, .pdf, .md, .html
- templates including writing formats (APA, MLA, Chicago/Turbian)
  - line spacing, margins, indentation level, print sizes, alignment
- customizable formatting: bold #, italic \*, underline |, crossthrough ~, superscript \_, subscript ^, code `
- slash blocks: /document, /contents, /section, /settings, /style
- at commands: @annotate[start:stop:step] annotation, @style[start:stop:step] styling, @raw[start:stop:step] @tofix[start:stop:step] message, etc.
- comments: //, /\* \*/, code blocks with ``` or /code
- links: \[\]\(\), images/videos: \!\[\]\(\)
- lists: - [ ] checklist, - unordered list, 1. ordered list
- find and replace, opt with regex
- extensions: grammar, autocomplete, custom slash blocks, custom at commands, coding syntax highlighting

## Tools Used

- Tauri: multi-platform app framework
- SvelteKit: brilliant web framework
- Tailwind CSS: utility class css styling
- Typescript: Javascript with types
- Prettier: code formatter for consistency
- Heroicons: amazingly, aesthetic icons
