This project is made using Next.JS frontend and Fastapi backend.

Here are the requirements to setup the project:
1. python
2. node.js
3. postgreSQL

Here are the steps to run the project:
1. Initialize and activate venv in the backend folder
2. Install the following python libraries:
   - fastapi
   - uvicorn
   - psycopg2
   - sqlalchemy
   - pydantic
   - pydantic-settings
   - python-jose
   - passlib
3. Run uvicorn app.main:app --reload on backend folder
4. Set .env in frontend folder, the following is an example of the env file:
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_URL=http://localhost:3000
SESSION_PASSWORD=0pw7VCtCiaBLA2TotsYC7rTdgCJpH3Mx
NODE_ENV=development
6. make sure that api url and url is equals to the url you are serving your backend and frontend
7. Run "npm install && npm run dev" on frontend folder
8. Run npx next dev
9. Add a user manually to be able to use the program

Here are some notes on the project:
- CRUD pages should have been made fully client side, in the code you'll see some weird workarounds I made to handle rendering issues.
- Topbar should be server component, only each single links should be client component to promote smoother interface
- Error handling is still funny
