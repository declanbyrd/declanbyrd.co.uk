---
title: Using variables in VS Code snippets
description: Writing custom VS Code snippets to auto-fill front matter in markdown files.
tags: [Snippets]
date: 2023-02-16
---

The posts on my site are all written in Markdown and have some front matter at the top of each file. I get bored of having to copy and paste the front matter from a previous post and then change the values for the post I want to write.

For example, once I've finished reading a book and I want to add my notes, I have to create a Markdown file with the book's ISBN as the file name and then add some front matter to the top of the file. The front matter looks like below:
```yaml
---
isbn: '9781804910252'
date: 2023-01-19
pages: 164
---
```

My first thoughts were to write a [custom snippet for VS Code](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_create-your-own-snippets) so that I could create a template for the front matter. I'd previously written snippets that used [tabstops](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_tabstops) which would set the cursor position each time the tab key was pressed. Using tabstops resulted in the snippet below: 

```json
// in Code/User/snippets/markdown.json
{
	"newBook": {
		"prefix": "nbk",
		"body": [
			"---",
			"isbn: $1",
			"date: $2",
            "pages: $3",
			"---",
			"",
			"$4"
		],
		"description": "Add template for new book notes"
	}
}
```

The problem with this snippet is that each tabstop requires me to enter the data. I'd rather not.

VS Code lets you include variables in snippets. Those variables can't be anything you want though, there's a limited [list of possible variables](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_variables) that can be used.

From that list, I looked for something that would read the file name. The `TM_FILENAME_BASE` variable is the filename of the current document without its extensions. So if I have a file named `9781804911136.md` this is going to return `9781804911136`.

There's also a section of variables specifically for returning the date and time. By combining `CURRENT_YEAR`, `CURRENT_MONTH` and `CURRENT_DATE` I can create a date to be automatically inserted in the frontmatter.

Using these variables I can replace some of the tabstops and this resulted in the snippet below:

```json
// in Code/User/snippets/markdown.json
{
	"newBook": {
		"prefix": "nbk",
		"body": [
			"---",
			"isbn: '$TM_FILENAME_BASE'",
			"date: $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE",
            "pages: $1",
			"---",
			"",
			"$2"
		],
		"description": "Add template for new book notes"
	}
}
```

Now, when I type `nbk` and press <kbd>tab</kbd> in a Markdown file that has an ISBN of `9781804911136` as its filename, I get the following inserted into the file contents:

```yaml
---
isbn: '9781804911136'
date: 2023-02-16
pages: 
---
```

Pages is only needed if the API doesn't return the number of pages, but more often than not I delete that line so having a tabstop here makes sense. Most importantly though, no more copy and pasting from other files!

You can view the snippet file in full [on GitHub](https://github.com/declanbyrd/declanbyrd.co.uk/blob/main/.vscode/markdown.code-snippets).
