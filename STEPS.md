1. Mocking backend:
- Data seemed corrupted as performance/countries/company/[id] seemed uncomplete.
There were many countries with the same name, but without a name of the company.
So, I looked at the given data carefully and noticed a pattern.
Well, I just connected company_1 to its id, and mapped to the name of the company.
I did the same for company_2, and so on.
Honestly, it might be not the best decision,
but in the reality as a developer I'd go to the backend to fix the data,
or I'd ask for the correct one.
But as it's a test task, I decided to do it this way.

2. I've moved the formula in a library to make it reusable and testable.
So, if business logic changes, it's easy to change it in one place.

3. Also, I document my each step as it's important to understand what I'm doing.
And then I can easily explain it to others.

Architecture might be built so differently,
but it depends on the requirements of the real project.

The list of the libraries I used:
- NX (React, Webpack, Jest, Vitest)
- Styled component
- D3 (Had to reject using chart.js as it led to a lot of issues)
- React table (Had to reject using prime react as it led to a lot of issues)
- Zustand

Would be nice to have in the future (if it's a real project):
- System design, setup backend (handlers, middlewares, loggers)
- Design system
- Localization
- Cypress
- Husky
- Prettier
- Eslint
- Docker
- CI/CD
- Responsive design
