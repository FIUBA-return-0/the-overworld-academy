run-backend-dev:
	cd api && docker compose up

run-backend-prod:
	cd api && docker compose up -d

run-frontend-dev:
	cd client/private && npm i && npx gulp dwb

run-frontend-prod:
	cd client/private && npm i && npx gulp full_clean && npx gulp prod_build

run-project:
	make run-backend-prod && make run-frontend-prod
