NAME		= login-ui
IMAGE_NAME	= agilestack-$(NAME)

GO_FILES=*.go
JS_FILE=js/* js/*/* js/*/*/*


############################
#          BUILD           #
############################

install : docker-build

docker-build : node_modules webpack lib go-build
		docker build -t $(IMAGE_NAME) .

webpack:
		npm run build

node_modules : package.json
		npm update
		touch node_modules

lib: $(JS_FILE)
		npm run build:lib
		touch lib

go-build : $(NAME)

$(NAME) : $(GO_FILES)
		env GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o $(NAME)


############################
#          SETUP           #
############################

setup: go-deps

go-deps :
		go get -t $(shell go list ./... | grep -v /vendor/)


############################
#           TEST           #
############################

test :
		# in test
		go test -v -p 1 $(shell go list ./... | grep -v /vendor/)


############################
#          DEPLOY          #
############################

docker-deploy :
		docker tag $(IMAGE_NAME) eogile/$(IMAGE_NAME):latest && docker push eogile/$(IMAGE_NAME):latest


############################
#          CLEAN           #
############################

clean :
		$(RM) -r $(NAME) lib

.PHONY : install docker-build webpack go-build setup go-deps test docker-deploy clean
