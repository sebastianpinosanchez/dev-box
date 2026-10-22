# Codex configuration

The project configuration belongs at `.codex/config.toml`. Codex reads it only for a trusted project; higher-priority managed policies still apply. Use workspace-write with sandbox network disabled, and enable network only for dependency setup through the host's approval mechanism.

The exact keys and path were checked against [official config basics](https://developers.openai.com/codex/config-basic/) and the [configuration reference](https://developers.openai.com/codex/config-reference/) on 2026-10-21. The documented sandbox_mode and sandbox_workspace_write.network_access keys are used together; the newer permissions-profile syntax is not mixed with them.

This directory retains the reviewed configuration and prompt sources for environments that mount `.codex` or `.agents` read-only. The intended installed files are `.codex/config.toml` and `.agents/prompts/*.md`.
