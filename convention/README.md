# Welcome to Teamradio frontend convention

**NOTE: This section only for Intellij Editors, we will update for other editors later.**

### TSLint and Prettier
- Go to Settings or Preference of IntelliJ

- Choose Tools -> External Tools

- Add new Tool with following options:

> - Name:         `Prettier`
> - Description: 
> - Program:      `$ContentRoot$/node_modules/.bin/prettier.cmd`
> - Arguments:    `--single-quote --trailing-comma all --print-width 80 --tab-width 2 --write $FilePathRelativeToProjectRoot$`
> - Working dir:  `$ProjectFileDir$`
> - Advanced Options: Choose `Synchronize files after execution`.

- Then OK.

- You can add a keymap for this action with the following

  - Go to Keymap:
  
    - Search for "Prettier" then assign a key you want (Alt + Shift + D)
    - Search for "Fix TSLint Problems" then assign a key you want (Alt + D)

- Then OK/Apply to save the configs. From now, each time writing code, you can press two hot keys above to format your Component (js, jsx, ts, tsx, css, scss, html). 

- After finish configuring TSLint and Prettier, you can start enjoying coding process without pains. 

### Components template:
- Use file template to create index file easily
New -> Edit file templates.
Create new file template. Ex: index.ts/tsx. Copy content of template file and paste to template. Apply.
When create index.tsx: New -> index.tsx -> enter file name = index, COMPONENT = {component name}
