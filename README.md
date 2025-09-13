# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.

    1. The CSV parser should ask whether there are column headers.
    2. It should ignore commas within double quotes when splitting.
    3. It should throw a validation error when an entry is not the expected type.
    4. It should throw a validation error when a row is invalid (doesn't have the expected number of entries).

- #### Step 2: Use an LLM to help expand your perspective.

    Prompt 1 (provided): I’m working on a CSV parser in TypeScript that currently accepts a filename as input and converts rows into strings or objects. What are some missing features or edge cases that I should consider? What improvements would make it easier for other developers to use in different kinds of apps?

    The LLM noted many missing features:
    - Customizable delimiters/quotes
    - Streaming support
    - Header handling options
    - Type conversion/inference
    - Error handling and validation
    - Encoding support
    - Comment skipping
    - CSV writing
    - Multi-threading/workers

    Edge cases:
    - Quoted fields with embedded delimiters or newlines
    - Escaped quotes inside fields
    - Unbalanced or malformed quotes
    - Inconsistent column counts
    - Empty files or rows
    - Comments in files
    - Different line endings
    - BOM (Byte Order Mark)
    - Non-standard delimiters
    - Large files
    - Invalid or mixed encodings
    - Multiline headers or data
    - Leading/trailing whitespace
    - Numeric edge cases
    - Locale-specific issues

    And improvements:
    - Flexible input sources
    - Async/sync APIs
    - Type safety with generics
    - Configurable options object
    - Browser compatibility
    - Modular and lightweight
    - Performance optimizations
    - Documentation and examples
    - Cross-app adaptability

    There is some overlap with what I thought of, such as features involving quotes and delimiters and validation issues involving type erorrs and inconsistent column counts. However, the LLM expanded on these in more detail than I did and added some nuances I hadn't thought of, such as allowing the user to specify the delimiter to be used and handling quotes within quotes. Of course, it also included many other features, edge cases, and improvements I hadn't immediately thought of. It might have missed the point by discussing use cases that might not be necessary for our goals with this parser.

    Prompt 2: I’m working on a CSV parser in TypeScript that currently accepts a filename as input and converts rows into strings or objects. What are the most critical features to include in the implementation of this parser, given it needs to be easy to use for diverse developers?

    This prompt emphasizes ease of use by other developers.

    The LLM noted several categories to consider:

    Configuration options
    - Delimiter
    - Quote character
    - Escape character
    - Newline
    - Encoding

    Header and data structure support
    - Header parsing
    - Type casting

    Performance and scalability
    - Streaming mode
    - Chunking and preview

    Error handling and robustness
    - Graceful error recovery
    - Skipping features
    - Whitespace trimming

    API design for usability
    - Async-first API
    - Transform hooks
    - BOM detection

    Additional consideration
    - TypeScript ergonomics
    - Minimal dependencies
    - Testing and validation

    The results from Prompt 2 differed by carefully structuring the different needs developers might have into categories, which makes sense due to the prompt's emphasize on ease of use for diverse developers. Another differences was its emphasis on graceful error handling and over neatness of results Otherwise, it includes many of the same features, edge cases, and improvements as the result from Prompt 1 did.

    Prompt 3: What should I include in a CSV parser implementation to handle edges cases and optimize for use by other developers?

    This prompt aims to be simpler, causing the LLM to make more guesses about what the user is asking for.

    The LLM noted the following categories (with many features in each):
    - Core parsing functionality
    - Edge case handling
    - Performance optimizations
    - Developer-friendly features
    - Testing and robustness
    - Standards compliance
    - Language-specific features
    - Error reporting
    - Logging
    - Output formats

    It also showed edge case examples, gave optimization tips, described how to improve usability for other developers, gave a comprehensive testing strategy, and mentioned additional considerations (security, internationalization, custom parsers).

    The results from Prompt 3 differed by being much more exhaustive than the other two. It seems the reduced context provided in the prompt caused the LLM to give a plethora of suggestions to try to cover whatever needs the user might have--so much so that it would have taken up way too much space for me to include all the suggestions listed under each category. The results are broader and less useful. Plus, they waste more of the reader's time by including irrelevant topics, such as language-specific features, which would have been omitted had the prompt specified the use of TypeScript. Nonetheless, many of the suggestions remain the same and could leader the user in the right direction, particularly if they ask the LLM follow-up questions.

- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    These 4 enhancements came from me:

    1. Extensibility: As a user, I can parse a CSV with entries that contain commas, using double quotes or a custom delimiter to distinguish between these entries, so I can have data that includes commas.
    2. Extensibility: As a user, I can parse CSVs with or without column headers, being able to specify this to the parser, so either CSVs with or without headers will not break the parser.
    3. Functionality: As a user, I know whether my CSV does not match my schema because the parser throws a validation error.
    4. Functionality: As a user, I know whether my CSV has an invalid number of entries in a row because the parser throws an error to specify that.

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.)

    My initial ideas included 

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
