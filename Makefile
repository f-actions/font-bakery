dist: src/*.js package*.json
	npm i --legacy-peer-deps && NODE_OPTIONS=--openssl-legacy-provider npm run package

update:
	npm update

dev-update:
	npm update --dev

lint:
	npm run lint

.PHONY: dev-update update lint