## Development setup
1. Make sure you have `docker` and `docker-compose` installed
2. Crate a `.env` file in the project root directory and populate it as follows:
```bash
  FRONTEND_BASE_URL=http://localhost:8080 # your frontend's url

  POSTGRES_HOST=db
  POSTGRES_PORT=5432
  POSTGRES_USER=postgres
  POSTGRES_PASSWORD=mypassword # any password you want
  POSTGRES_DB=postgres
  ```
3. Run `docker-compose up`
