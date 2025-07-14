
run-backend:
	cd api && docker compose up

run-frontend:
	cd client/private && gulp dwb

run-project:
	(cd api && docker compose up -d) && (cd client/private && gulp dwb)