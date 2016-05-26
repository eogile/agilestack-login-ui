package handlers

import (
	"github.com/eogile/agilestack-utils/secu"
	"golang.org/x/oauth2"
)

type (
	Error struct {
		Code           string `json:"code"`
		DefaultMessage string `json:"defaultMessage"`
	}

	LoginResponse struct {
		// Mandatory if success, nil otherwise
		Token *oauth2.Token `json:"token,omitempty"`

		// Mandatory if success, nil otherwise
		User *secu.User `json:"user,omitempty"`

		Success bool `json:"success"`

		// Mandatory if not success, nil otherwise
		Error *Error `json:"error,omitempty"`
	}
)
