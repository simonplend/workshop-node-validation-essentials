valid-request:

	curl --verbose \
		--request POST \
		--url http://localhost:3000/recipes \
		--header 'Content-Type: application/json' \
		--data '{ \
			"name": "Tabbouleh", \
			"ingredients": ["parsley", "2 lemons", "cucumber", "bulgur"] \
		}'

invalid-request:

	curl --verbose \
		--request POST \
		--url http://localhost:3000/recipes \
		--header 'Content-Type: application/json' \
		--data '{ \
			"name": "Tabbouleh", \
			"ingredients": "parsley, 2 lemons, cucumber, bulgur" \
		}'
