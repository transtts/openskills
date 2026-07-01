# Agent Introspection Debugging

This skill enables an AI agent to systematically debug its own failures before retrying or escalating to a human.

## Features

- Capture failure state before retrying
- Diagnose common agent failure patterns
- Apply small, contained recovery actions
- Generate structured self-debug reports
- Detect retry loops and prompt drift
- Reduce context bloat and reasoning degradation
- Verify environment assumptions before acting
- Escalate only when recovery is blocked

## When to Use

Use this skill when the agent experiences:

- Maximum tool-call or loop-limit failures
- Repeated retries without forward progress
- Context overflow or prompt drift
- File-system or environment mismatches
- Recoverable tool failures
- Long-running sessions that stop making progress
  Workflow

## 1. Failure Capture

Record the current failure before attempting recovery.

Capture:

- Session or task
- Goal in progress
- Error message
- Stack trace (if available)
- Last successful step
- Last failed tool or command
- Repeated failure pattern
- Environment assumptions

## 2. Root Cause Diagnosis

Identify the most likely failure category before changing anything.

Common patterns:

- Retry loops
- Context overflow
- Environment mismatch
- Service unavailable
- Rate limiting (429)
- Wrong working directory
- Incorrect debugging hypothesis

Determine whether the issue is:

- Logic failure
- State failure
- Environment failure
- Policy failure

## 3. Contained Recovery

Recover using the smallest safe action.

Examples:

- Stop repeated retries
- Restate the active objective
- Remove low-signal context
- Verify filesystem and process state
- Narrow the failing scope
- Replace speculation with observation
- Escalate when externally blocked

## 4. Introspection Report

Generate a structured report containing:

- Session
- Failure
- Root cause
- Recovery action
- Recovery result
- Remaining risks
- Recommended follow-up
- Preventive improvements

## 5. Recovery Strategy

Follow this order:

- Restate the objective.
- Verify the current environment.
- Reduce the failing scope.
- Perform one validating check.
- Retry only if evidence supports the diagnosis.

Avoid repeating the same action without new evidence.

## Integration

Works well with:

- verification-loop
- continuous-learning-v2
council
workspace-surface-audit