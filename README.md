# HomeTestApp

#### Instructions
Please read the instructions below carefully and submit your solution by the deadline.

This assignment is designed to be short and practical. You may use AI tools to help you, but we are especially interested in your understanding of the problem and your approach to solving it.

The Task
Build a small web UI that simulates a file upload and status tracking flow. Use long-running mocked
tasks (e.g. 5–10 seconds) to allow testing of polling, cancellation, and error handling features.

Requirements
- [x] 1. Use React + TypeScript
- [ ] 2. Allow selecting and submitting a file (no actual upload needed)
- [ ] 3. Simulate an API call that returns a `task_id`
- [ ] 4. Poll a mocked `/status/{task_id}` endpoint every few seconds until the task completes
- [ ] 5. Show status and final success/failure result
- [ ] 6. Include a mobile-friendly layout
- [ ] 7. Show error and loading states appropriately
- [ ] 8. Reject files that aren’t PDFs or images under 2MB
- [ ] 9. Retry polling on network failure up to 3 times
- [ ] 10. Cancel polling if the component unmounts or the user navigates away
- [ ] 11. Display a visible list of all submitted tasks and their current statuses in the UI
- [ ] 12. Allow the user to manually cancel a task

Mocking
You may use `msw`, `axios-mock-adapter`, `setTimeout`, or your own mock logic to simulate the API.
Simulated tasks should run for several seconds to test polling and cancellation.

Submission
- Push your code to a public GitHub repo
- Use commits as you normally would during development
- Include a brief write-up (e.g. README.md or PDF) answering the reflection questions below
- Submit the completion form at https://tally.so/r/nGbMyZ: please make sure you do not miss this step,
  otherwise we won't be able to assess your test.
  Reflection Questions (include with submission in the repo as a
  README.md or PDF)
- What did you choose to mock the API and why?
- If you used an AI tool, what parts did it help with?
- What tradeoffs or shortcuts did you take?
- What would you improve or add with more time?
- What was the trickiest part and how did you debug it?

Optional Bonus
- Include a simple test (unit or integration)
- Use React Query or a custom hook for polling
- Handle polling cancellation and retries
- If you finish early, feel free to add one small feature you think would make the UI more useful or
  polished. Mention it in your write-up.

Time Expectation
We expect this to take 2–3 hours max. Don’t overthink—focus on clarity and completeness.