# HomeTestApp

#### Instructions

Please read the instructions below carefully and submit your solution by the deadline.

This assignment is designed to be short and practical. You may use AI tools to help you, but we are especially
interested in your understanding of the problem and your approach to solving it.

The Task
Build a small web UI that simulates a file upload and status tracking flow. Use long-running mocked
tasks (e.g. 5–10 seconds) to allow testing of polling, cancellation, and error handling features.

Requirements

- [x] 
    1. Use React + TypeScript
- [x] 
    2. Allow selecting and submitting a file (no actual upload needed)
- [x] 
    3. Simulate an API call that returns a `task_id`
- [x] 
    4. Poll a mocked `/status/{task_id}` endpoint every few seconds until the task completes
- [x] 
    5. Show status and final success/failure result
- [ ] 
    6. Include a mobile-friendly layout
- [x] 
    7. Show error and loading states appropriately
- [x] 
    8. Reject files that aren’t PDFs or images under 2MB
- [x] 
    9. Retry polling on network failure up to 3 times
- [x] 
    10. Cancel polling if the component unmounts or the user navigates away
- [x] 
    11. Display a visible list of all submitted tasks and their current statuses in the UI
- [x] 
    12. Allow the user to manually cancel a task

Mocking
You may use `msw`, `axios-mock-adapter`, `setTimeout`, or your own mock logic to simulate the API.
Simulated tasks should run for several seconds to test polling and cancellation.

Submission

- [x] Push your code to a public GitHub repo
- [x] Use commits as you normally would during development
- [x] Include a brief write-up (e.g. README.md or PDF) answering the reflection questions below
- Submit the completion form at https://tally.so/r/nGbMyZ: please make sure you do not miss this step,
  otherwise we won't be able to assess your test.
  Reflection Questions (include with submission in the repo as a
  README.md or PDF)

- [x] What did you choose to mock the API and why?
  I used msw because it allows for easy mocking of API calls and provides a clean way to simulate different responses.
  I have used msw before, and I did not know the other libraries. `msw` was a familiar library to use, and in the past
  it proved to be a good choice for mocking APIs. I did not have much time to evaluate others.
-
- If you used an AI tool, what parts did it help with?
  I used AI (chatgpt) for almost everything today. I have not written a line of since 2019, given I have been
  using Vue 2 and Vue 3 lately. The concepts are similar, but the syntax is different.
  I know there might be things that are not properly organised. I did not use redux, because I think it is overkill for
  this
  small job, but I usually prefer to use global state management libraries like redux or pinia (vue equivalent).


- What tradeoffs or shortcuts did you take?
  Believe it or not, I spent 40 minutes dealing with tailwind. I know is a popular library and also I have not used it
  before.
  I thought it will take me 5 minutes to put it in place, but I spent 40 minutes trying to make it work.
  This was my worst mistake today, also considering that the UI look & feel was the less important part of the test.
  I wanted to include tailwind to demonstrate that I could also abstract between pure components (UI components) and
  parent/container components, which read to the state, etc, but I failed to do so.

- What would you improve or add with more time?
  I think I was mostly prototyping. Given the non familiarity with the sintaxis, I grab lots of the AI code as it is,
  and tweaked.
  It is usually not a good practice, but within a few days I can pick up react and now what are good/bad practices, and
  ask the right things/questions

- What was the trickiest part and how did you debug it?
  I did not have much time to stuck on much of the functionality. 
  I know there is a bug that if you cancel, it is still putting the task in pending.
  Again, being my first 3 hours with React in 7 years, I did not even had the React dev tools installed. 
  On my last commit I was starting to refactor some functions into pure functions, to start writing unit tests.

Optional Bonus

- Include a simple test (unit or integration)
- Use React Query or a custom hook for polling
- Handle polling cancellation and retries
- If you finish early, feel free to add one small feature you think would make the UI more useful or
  polished. Mention it in your write-up.

Time Expectation
We expect this to take 2–3 hours max. Don’t overthink—focus on clarity and completeness.