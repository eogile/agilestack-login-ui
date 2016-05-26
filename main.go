package main

import (
	"log"
	"net/http"
	"os"

	"github.com/eogile/agilestack-utils/plugins"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	//"camlistore.org/pkg/blobserver/handlers"
	"github.com/eogile/agilestack-login-ui/handlers"
)

const (
	defaultHttpPort = "8080"
)

var (
	rootDir = "./build/"
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
	r.HandleFunc("/", handlers.Login).Methods("POST")
	r.HandleFunc("/user", handlers.CurrentUser).Methods("GET")
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

func main() {
	plugins.ChangeBaseUrl(rootDir)
	startHttp()

}
