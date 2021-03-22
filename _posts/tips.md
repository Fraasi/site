---
title: 'Tips'
excerpt: ''
coverImage: '/assets/blog/dynamic-routing/cover.jpg'
date: '2020-03-22T05:35:07.322Z'
author:
  name: Fraasi
  picture: '/assets/blog/authors/jj.jpeg'
# ogImage:
  # url: '/assets/blog/dynamic-routing/cover.jpg'
---

### Table of contents

<!-- toc -->

- [Git](#git)
- [Bash](#bash)
- [JS one-liners](#js-one-liners)

<!-- tocstop -->

## Git

Get some overview of changes
```sh
$ git log --stat --summary
$ git log -p

# Lists version history for a file, including renames
$ git log --follow [file]

# Outputs metadata and content changes of the specified commit
$ git show [commit]

```
---
You could use `git add -p` instead, which will give you chance to review all of the introduced changes one by one, and decide whether to include them in the commit or not.

---
```sh
$ git fetch upstream
$ git rebase -i upstream/master

$ git checkout <branchname>
$ git rebase -i --autosquash develop
```
----
To get a commit count for a revision (HEAD, master, a commit hash):
`$ git rev-list --count <revision>`

To get the commit count across all branches:
`$ git rev-list --all --count`

---
This will generate commit count for each committer
`$ git shortlog -s -n`

---
`git diff` — displays the not staged changes in your working tree
`git diff dev` — display changes between the working tree and the dev branch. 
`git diff --staged` — display the staged changes
`git diff master..dev` — display changes between branches master and dev.
If you only want to inspect the file names use the `--name-only` switch. If you need to know which files were modified, added, or deleted — use the `--name-status` switch.

---
To fetch a remote PR into your local repo,
`$ git fetch origin pull/ID/head:BRANCHNAME`

where ID is the pull request id and BRANCHNAME is the name of the new branch that you want to create. Once you have created the branch, then simply git checkout BRANCHNAME
See [https://help.github.com/en/articles/checking-out-pull-requests-locally](https://help.github.com/en/articles/checking-out-pull-requests-locally) for more.

---
Undo your last commit, but don't throw away your changes
`$ git reset --soft HEAD^`

Undoes all commits after [commit], preserving changes locally
`$ git reset [commit]`

Discards all history and changes back to the specified commit
`$ git reset --hard [commit]`

---
Delete branch locally and on the origin remote.

`$ git branch -D <branch>`
`$ git push origin :<branch>`

---
Show the diffstat of everything you haven't pushed yet.
```sh
branch=$(git rev-parse --abbrev-ref HEAD)
count=$(git rev-list --count HEAD origin/$branch...HEAD)

git diff --stat origin/$branch..HEAD
echo " $count commits total"
```

## Bash

\* See also [The art of command line](https://github.com/jlevy/the-art-of-command-line)
\* [My dotfiles](https://github.com/fraasi/dotfiles)

---
-In Bash scripts, subshells (written with parentheses) are convenient ways to group commands. A common example is to temporarily move to a different working directory, e.g.
```sh
# do something in current dir
(cd /some/other/dir && other-command)
# continue in original dir
```
---
## JS one-liners

```js
// It's the JS version of the sleep commands
const sleep = (ms) => (new Promise(resolve => setTimeout(resolve, ms)));
await sleep(2000); 

// Mini jQuery.
const $ = document.querySelector.bind(document);

// Shuffle an array.
const shuffle = n => n.sort(() => 0.5 - Math.random());

//Initializes a 2D array of given width and height and value.
const initialize2DArray = (w, h, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));
```
---
```js
let isRequired = () => {
 throw new Error('This is a mandatory parameter.');
}
let greetings = (name=isRequired(), message='Hello,') => {
    return `${message} ${name}`;
}
console.log(greetings());
```

