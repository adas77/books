db:
	sudo docker compose run db bash -c "psql -h booksdb -d postgres -U postgres"

up:
	sudo docker compose up

seed:
	npx prisma db seed

drop:
	npx prisma db push --force-reset
