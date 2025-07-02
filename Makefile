# run-api:
# 	cd api && npm run start 

# start-db:
# 	cd api && docker-compose up -d 

# stop-db:
# 	cd api && docker-compose down

# run-backend:
# 	make run-api && make start-db

run-backend:
	cd api && docker compose up