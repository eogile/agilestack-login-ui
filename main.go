package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/eogile/agilestack-utils/auth"
	"github.com/eogile/agilestack-utils/plugins"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	//"camlistore.org/pkg/blobserver/handlers"
)

const (
	defaultHttpPort            = "8080"
	defaultAuthorizationServer = "http://hydra-host.agilestacknet:9090"
	defaultClientID            = "app"
	defaultClientSecret        = "secret"

	loginPath = "/login"
)

var (
	rootDir     = "./build/"
	hydraClient *auth.HydraClient
)

/*
 * Run listening server
 */
func startHttp() {
	httpPort := os.Getenv("HTTP_PORT")
	if httpPort == "" {
		httpPort = defaultHttpPort
	}

	r := mux.NewRouter()
	r.HandleFunc("/status", plugins.HandleHttpStatusUrl).Methods("GET")
	r.HandleFunc("/", login).Methods("POST")
	r.HandleFunc("/user", currentUser).Methods("GET")
	r.PathPrefix("/").Handler(http.FileServer(http.Dir(rootDir))).Methods("GET")

	log.Println("Server started: http://localhost:" + httpPort)
	handler := cors.New(cors.Options{
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders: []string{"tokenInfo", "content-type"},
	}).Handler(r)
	//loggedRouter := handlers.LoggingHandler(os.Stdout, handler)
	err := http.ListenAndServe(":"+httpPort, handler)
	if err != nil {
		log.Fatal("HTTP start error", err)
	}
}

func login(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	username := r.FormValue("username")
	password := r.FormValue("password")

	if username == "" || password == "" {
		http.Error(w, "Please provide a username and a password", http.StatusBadRequest)
		return
	}
	log.Println("trying to log with username : ", username)
	token, err := hydraClient.Login(username, password)

	if err != nil {
		http.Error(w, "Invalid user: "+err.Error(), http.StatusBadRequest)
		return
	}
	log.Println("got token : ", token)
	//tokenInfo, errEncode := auth.EncodeTokenInfo(token)
	//if errEncode != nil {
	//	http.Error(w, "Server error: invalid Token : "+errEncode.Error(), http.StatusInternalServerError)
	//	return
	//}
	//log.Println("return : ", tokenInfo.TokenInfo)
	// Return the token
	w.Header().Set("Location", loginPath)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(token)
}

func currentUser(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	tokenInfo := r.Header.Get("tokenInfo")
	log.Printf("getUser - tokenInfo = %v", tokenInfo)
	user, err, respCode := hydraClient.GetUser(&auth.TokenInfo{TokenInfo: tokenInfo})
	if err != nil {
		log.Printf("Error getting user : %v", err)
		http.Error(w, err.Error(), respCode)
		return
	}

	// Return the users
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Cache-Control", "no-cache")
	json.NewEncoder(w).Encode(user)
}

func main() {
	plugins.ChangeBaseUrl(rootDir)
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
	hydraClient = auth.NewClient(authorizationServer, clientID, clientSecret)

	startHttp()

}
