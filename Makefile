# dockerを立ち上げる
up:
	docker-compose up -d
# dockerを落とす
down:
	docker-compose down
start:
	npx prisma migrate dev --name init
	npx prisma generate
	npx prisma studio
