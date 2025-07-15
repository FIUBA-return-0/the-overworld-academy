
run-backend:
	cd api && docker compose up

run-frontend:
	cd client/private && npm i && npx gulp dwb

run-project:
	(cd api && docker compose up -d) && (cd client/private && npm i && npx gulp dwb)