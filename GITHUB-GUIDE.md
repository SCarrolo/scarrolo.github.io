# GitHub Guide for This Website

This guide covers the normal workflow for editing, testing, and publishing the
Astro website from this folder.

## How Publishing Works

The local folder is connected to:

- Repository: `SCarrolo/scarrolo.github.io`
- Branch: `main`
- Website: <https://scarrolo.github.io>

Every push to `main` starts the GitHub Actions workflow in
`.github/workflows/deploy.yml`. The workflow compiles the Astro project and
publishes the result to GitHub Pages.

## Everyday Workflow

### 1. Review your changes

```bash
git status
git diff
```

`git status` lists changed files. `git diff` shows the exact edits that have not
yet been committed.

### 2. Compile the website locally

```bash
npm run build
```

Do not publish until this command finishes successfully. The generated website
is placed in `dist/`, which is ignored by Git and should not be committed.

For a live local preview instead, run:

```bash
npm run dev
```

Then open <http://localhost:4321>. Stop the server with `Control-C` in the
terminal where it is running.

### 3. Stage your changes

Stage one specific file:

```bash
git add src/content/publications/example.md
```

Or stage all current changes:

```bash
git add -A
```

Check the staged files before committing:

```bash
git status
git diff --staged
```

### 4. Create a commit

```bash
git commit -m "Update publication description"
```

Use a short message that describes the change. A commit is a saved snapshot in
the local Git history; it is not online until it is pushed.

### 5. Upload to GitHub

```bash
git push origin main
```

GitHub Actions will then compile and deploy the website automatically.

## Complete Short Version

For a normal update, the whole sequence is:

```bash
git status
git diff
npm run build
git add -A
git commit -m "Describe the update"
git push origin main
```

## Check the Deployment

List recent GitHub Actions runs:

```bash
gh run list --limit 5
```

Watch the newest run until it finishes:

```bash
gh run watch
```

A successful run has both a `build` job and a `deploy` job marked as complete.
The public website may take a short time to refresh because of browser or CDN
caching.

## Download Changes Made on GitHub

Before starting local work, you can synchronize with GitHub:

```bash
git pull --rebase origin main
```

Do this while the working tree is clean. Check with `git status` first.

## If a Push Is Rejected

If GitHub reports `fetch first` or `non-fast-forward`, another commit exists on
GitHub that is not in this folder. Preserve both histories with:

```bash
git pull --rebase origin main
git push origin main
```

If Git reports a conflict, open each conflicted file and resolve the marked
sections. Then continue with:

```bash
git add path/to/resolved-file
git rebase --continue
git push origin main
```

Avoid editing the same file locally and through the GitHub website at the same
time; this is the most common source of conflicts.

## Useful Inspection Commands

Show the last ten commits:

```bash
git log --oneline -10
```

Show the configured GitHub repository:

```bash
git remote -v
```

Show changes included in the latest commit:

```bash
git show --stat
```

Show the current branch and synchronization status:

```bash
git status --short --branch
```

## Editing Website Content

The main content files are:

- `src/content/bio.md`: homepage biography and profile information
- `src/content/cv.md`: CV page
- `src/content/publications/`: one Markdown file per publication
- `src/content/talks/`: one Markdown file per talk
- `src/config/social.ts`: INSPIRE, email, and other social links
- `src/config/navigation.ts`: navigation links
- `src/config/themes.ts`: theme colors

Keep the YAML frontmatter between the opening and closing `---` lines valid.
Text containing colons or other YAML punctuation is safest inside quotes.
