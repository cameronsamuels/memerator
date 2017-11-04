# Contributing Guidelines
This file shows guidelines and information about contributing to the Memerator.
# Issues
Issues are a great way to keep track of what we need to accomplish and what is currently being worked on.
### Creating Issues
You can create an issue at <https://git.io/vdv6V>.
This lets us know that there is a bug, something that be improved, or a new feature suggestion.
### Issue Guidelines
When creating an issue, there are a few rules to follow. They are the following:
- When someone is working on fixing the issue, assign it to them directly before they start working on it
- The issue needs labels, but should be added by [@CameronSamuels](https://github.com/cameronsamuels) unless if it's a "requires review" or "help wanted" label
- The issue should have a detailed description
- When there is a pr that solves an issue, the issue should contain the "has pr" label and be closed
# Pull Requests
PR's (pull requests) are a way to submit changed code to be reviewed before shipping it to production.
### PR Guidelines
When creating pull requests, there are a few rules to follow. They are the following:
- The pull request must always be reviewed by the project manager ([@CameronSamuels](https://github.com/cameronsamuels)) and should be reviewed by another person
- The pull request must have the "requires review" label when it hasn't been reviewed by all the requested reviewers
- The pull request must be merged using a "squash and merge" commit
- The pull request must be assigned to the person who will merge (usually [@CameronSamuels](https://github.com/cameronsamuels))
# Coding
Contributing to the Memerator will be very appreciative and we will add your name and GitHub profile link to the readme file.
### Coding Guidelines
- Every line of code should have a comment explaining it in the line above (only line 2, 4, 6, etc will have real code)
- Code should be very neat, clean, beutified, and easily legible
- Scope constructors (`if`, `function`, etc) should have the `{` on the same line
### Setting up
To set up your coding environment, follow these steps:
1. Clone the repo to your computer
2. When ready to commit, create a branch with the appropriate name
   - `issue-#` for a commit resolving an issue (`#` is the issue number)
   - `fix-#` for a bug fix (`#` would be `1` if there no active fix branches, `2` if it's the 2nd active fix branches, etc)
   - `feature-#` for a new feature (`#` would be `1` if there no active feature branches, `2` it's the 2nd active feature branches, etc)
   - `improvement-#` for an improvement (`#` would be `1` if there no active improvement branches, `2` it's the 2nd active improvement branches, etc)
   - `misc-#` for a misc change (`#` would be `1` if there no active misc branches, `2` it's the 2nd active misc branches, etc)
3. Commit the files with an appropriate commit title
   - `(issue)Commit title` for a commit resolving an issue
   - `(fix)Commit title` for a fix commit
   - etc
4. Push to the fork or repo and then submit a pull request
