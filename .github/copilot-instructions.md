# Copilot Instructions

## Plan Mode → Implementation Workflow

Whenever we are in **plan mode** and are about to transition to implementing something:

1. **Always invoke the `plannotator-last` skill** on the generated plan before starting implementation.
   This opens the interactive annotation UI so the plan can be reviewed, annotated, and confirmed before any code is written.

2. Only proceed with implementation after the plan has been reviewed through plannotator.

## Feature Spec Workflow

Whenever we start working on the specs of a new feature (e.g. creating or updating files under `openspec/changes/`):

1. **Create a GitHub issue** in `RubenDelgadoPareja/inspectra` using `gh issue create` with:
   - Title: `feat: <feature-name>` (matching the OpenSpec change name)
   - Label: `enhancement`
   - Body: brief description of the feature, the OpenSpec path, and a checklist with: spec written, implementation complete, PR merged.
2. Reference the issue number in the OpenSpec `proposal.md` if it exists.

This keeps every feature tracked from the moment specs begin.

## General Preferences

- Language: Respond in Spanish unless code or technical terms require English.
- Be concise in explanations but thorough in implementation.
