package handlers

import (
	"log"
	"os"

	"github.com/eogile/agilestack-utils/auth"
)

const (
	defaultAuthorizationServer = "http://hydra-host.agilestacknet:9090"
	defaultClientID            = "app"
	defaultClientSecret        = "secret"
)

var hydraClient *auth.HydraClient

func init() {
	log.SetFlags(log.Lshortfile | log.Ldate | log.Ltime)
	hydraClient = NewHydraClient()
}

func NewHydraClient() *auth.HydraClient {
	authorizationServer := os.Getenv("AUTHORIZATION_SERVER")
	if authorizationServer == "" {
		authorizationServer = defaultAuthorizationServer
	}
	clientID := os.Getenv("CLIENT_ID")
	if clientID == "" {
		clientID = defaultClientID
	}
	clientSecret := os.Getenv("CLIENT_SECRET")
	if clientSecret == "" {
		clientSecret = defaultClientSecret
	}

	return auth.NewClient(authorizationServer, clientID, clientSecret)
}

func SetHydraClient(newClient *auth.HydraClient) {
	hydraClient = newClient
}
