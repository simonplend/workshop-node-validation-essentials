valid-request:
	@echo "Sending cURL request with body:\n"
	@cat request-data/valid.json
	@echo
	curl --verbose \
		--request POST \
		--url http://localhost:3000/recipes \
		--header 'Content-Type: application/json' \
		--data @request-data/valid.json;

invalid-request:
	@echo "Sending cURL request with body:\n"
	@cat request-data/invalid.json
	@echo
	curl --verbose \
		--request POST \
		--url http://localhost:3000/recipes \
		--header 'Content-Type: application/json' \
		--data @request-data/invalid.json;
