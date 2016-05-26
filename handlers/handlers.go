package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/eogile/agilestack-utils/auth"
)

const loginPath = "/login"

var messageMap = map[string]string{
	"NO_INPUT":"Please provide a username and a password",
	"INVALID_INPUT":"Invalid username/password",
	"TECHNICAL":"A technical error was encountered. Please try again later",
	"INACTIVE_ACCOUNT":"The account is inactive",
	"BLOCKED_ACCOUNT":"The account is blocked",
}

func Login(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Cache-Control", "no-cache")

	username := r.FormValue("username")
	password := r.FormValue("password")

	if username == "" || password == "" {
		sendError(w, http.StatusBadRequest, "NO_INPUT")
		return
	}

	log.Println("trying to log with username : ", username)
	token, err := hydraClient.Login(username, password)
	if err != nil {
		sendError(w, http.StatusBadRequest, "INVALID_INPUT")
		return
	}

	tokenInfo, err := auth.EncodeTokenInfo(token)
	if err != nil {
		log.Println("Error while encoding token:" + err.Error())
		sendError(w, http.StatusInternalServerError, "TECHNICAL")
		return
	}

	// We do not care about the Hydra response code.
	// If there is an error, this is not because the user does not exist (it was
	// found in login call).
	user, err, _ := hydraClient.GetUser(tokenInfo)
	if err != nil {
		log.Println("Error while getting the user: ", err)
		sendError(w, http.StatusInternalServerError, "TECHNICAL")
		return
	}

	if !user.IsActive() {
		sendError(w, http.StatusBadRequest, "INACTIVE_ACCOUNT")
		return
	}

	if user.IsBlocked() {
		sendError(w, http.StatusBadRequest, "BLOCKED_ACCOUNT")
		return
	}

	w.Header().Set("Location", loginPath)
	w.WriteHeader(http.StatusOK)
	// Return the token
	json.NewEncoder(w).Encode(&LoginResponse{
		User:    user,
		Token:   token,
		Success: true,
	})
}

func sendError(w http.ResponseWriter, responseCode int, errorCode string) {
	response := &LoginResponse{
		Success: false,
		Error: &Error{
			Code:           errorCode,
			DefaultMessage: messageMap[errorCode],
		},
	}
	w.WriteHeader(responseCode)
	json.NewEncoder(w).Encode(response)
}

func CurrentUser(w http.ResponseWriter, r *http.Request) {
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
