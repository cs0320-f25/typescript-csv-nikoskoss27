# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.

    1. As a user, I can parse a CSV with entries that contain commas, using double quotes or a custom delimiter to distinguish between these entries, so I can have data that includes commas.
    2. As a user, I can parse CSVs with or without column headers, being able to specify this to the parser, so either CSVs with or without headers will not break the parser.
    3. As a user, I know whether my CSV does not match my schema because the parser throws a validation error.
    4. As a user, I know whether my CSV has an invalid number of entries in a row because the parser throws an error to specify that.

- #### Step 2: Use an LLM to help expand your perspective.

- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

### Design Choices

    My parser design takes in two parameters—-a Zod schema and a file path to parse. The schema can be undefined if the user chooses not to provide one. If there is no schema, the parser returns a string[][]. If there is a schema, it returns typed objects T[]. If the data in the CSV do not match the schema, it returns a "Row not valid" error and specifies which row contained the error.

### 1340 Supplement

- #### 1. Correctness

- #### 2. Random, On-Demand Generation

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs:
#### Tests:
#### How To…

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
#### Total estimated time it took to complete project:
#### Link to GitHub Repo:  
