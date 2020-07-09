dist: src/*.js package*.json
	npm i && npm run package

update:
	npm update

dev-update:
	npm update --dev

lint:
	npm run lint

.PHONY: dev-update update lint