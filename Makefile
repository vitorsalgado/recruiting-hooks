SHELL := /bin/bash
PROJECT := nodejs
DOCKER_IMAGE := $(PROJECT)
BUILD := $$TRAVIS_BUILD_NUMBER


# docker
# ##################################################################################################

docker: docker-build docker-push docker-cleanup

docker-build:
	docker build -t $(DOCKER_IMAGE):$(BUILD) . && \
	docker tag $(DOCKER_IMAGE):$(BUILD) $(DOCKER_IMAGE):latest && \
	docker tag $(DOCKER_IMAGE):$(BUILD) $(DOCKER_IMAGE):$(VERSION)

docker-push:
	docker login -u ${DOCKER_USER} -p ${DOCKER_PASSWORD} && \
	docker push $(DOCKER_IMAGE):latest && \
	docker push $(DOCKER_IMAGE):$(VERSION)

docker-cleanup:
	docker rmi -f $(DOCKER_IMAGE):$(VERSION) || true && \
	docker rmi -f $(DOCKER_IMAGE):latest || true


# node.js
# ##################################################################################################

nvm:
	[ -s "$$HOME/.nvm/nvm.sh" ] && . "$$HOME/.nvm/nvm.sh" && \
	nvm install $$(cat .nvmrc) && \
	nvm use
