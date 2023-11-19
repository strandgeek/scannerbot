APPLICATION_NAME ?= scannerbot
GIT_HASH ?= $(shell git log --format="%h" -n 1)

API_REPOSITORY = ${DOCKER_USERNAME}/${APPLICATION_NAME}-api
WEBAPP_REPOSITORY = ${DOCKER_USERNAME}/${APPLICATION_NAME}-webapp
NGINX_REPOSITORY = ${DOCKER_USERNAME}/${APPLICATION_NAME}-nginx

.PHONY: help
help:
	@grep -E '^[a-zA-Z0-9 -]+:.*#'  Makefile | sort | while read -r l; do printf "\033[1;32m$$(echo $$l | cut -f 1 -d':')\033[00m:$$(echo $$l | cut -f 2- -d'#')\n"; done

.PHONY: build
build: # Build the docker images
	cd api && docker build --tag ${API_REPOSITORY}:${GIT_HASH} . && cd ..  && \
	cd webapp && docker build --tag ${WEBAPP_REPOSITORY}:${GIT_HASH} . && cd .. && \
	cd nginx && docker build --tag ${NGINX_REPOSITORY}:${GIT_HASH} . && cd ..

.PHONY: push
push: # Push the builded docker images
	docker push ${API_REPOSITORY}:${GIT_HASH}
	docker push ${WEBAPP_REPOSITORY}:${GIT_HASH}
	docker push ${NGINX_REPOSITORY}:${GIT_HASH}


.PHONY: build-and-push
build-and-push: build push # Build and Push the docker images
