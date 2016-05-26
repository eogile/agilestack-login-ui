package handlers_test

import (
	"testing"
	"net/http"
	"github.com/eogile/agilestack-login-ui/handlers"
	"net/http/httptest"
	"net/url"
	"strings"
	"github.com/stretchr/testify/assert"
	"encoding/json"
	"github.com/stretchr/testify/require"
	"github.com/eogile/agilestack-utils/secu"
)

func TestLogin (t *testing.T) {
	form := url.Values{}
	form.Add("username", user1.Login)
	form.Add("password", user1.Password)
	writer := executeRequest(form)

	/*
	 * Checking the HTTP status.
	 */
	assert.Equal(t, 200, writer.Code, "Invalid HTTP status")

	/*
	* Checking the content type.
	 */
	contentType := writer.Header().Get("Content-Type")
	assert.Equal(t, "application/json", contentType, "Invalid Content-Type header")

	/*
	 * Checking the location header
	 */
	 locationHeader := writer.Header().Get("Location")
	assert.Equal(t, "/login", locationHeader, "Invalid Location header")

	var loginResponse handlers.LoginResponse
	require.Nil(t, json.NewDecoder(writer.Body).Decode(&loginResponse))
	validateUser(t, user1, loginResponse.User)
	require.NotNil(t, loginResponse.Token)
	require.NotNil(t, loginResponse.Token.AccessToken)
	require.Equal(t, true, loginResponse.Success)
	require.Nil(t, loginResponse.Error)
}

func TestLogin_NoInput(t *testing.T) {
	writer := executeRequest(url.Values{})

	/*
	 * Checking the HTTP status.
	 */
	assert.Equal(t, 400, writer.Code, "Invalid HTTP status")

	/*
	* Checking the content type.
	 */
	contentType := writer.Header().Get("Content-Type")
	assert.Equal(t, "application/json", contentType, "Invalid Content-Type header")

	validateErrorResponse(t, writer, "NO_INPUT", "Please provide a username and a password")
}

func TestLogin_InvalidInput(t *testing.T) {
	form := url.Values{}
	form.Add("username", user1.Login)
	form.Add("password", user1.Password+ "hello")
	writer := executeRequest(form)

	/*
	 * Checking the HTTP status.
	 */
	assert.Equal(t, 400, writer.Code, "Invalid HTTP status")

	/*
	* Checking the content type.
	 */
	contentType := writer.Header().Get("Content-Type")
	assert.Equal(t, "application/json", contentType, "Invalid Content-Type header")

	validateErrorResponse(t, writer, "INVALID_INPUT", "Invalid username/password")
}

func TestLogin_InactiveAccount(t *testing.T) {
	form := url.Values{}
	form.Add("username", user3.Login)
	form.Add("password", user3.Password)
	writer := executeRequest(form)

	/*
	 * Checking the HTTP status.
	 */
	assert.Equal(t, 400, writer.Code, "Invalid HTTP status")

	/*
	* Checking the content type.
	 */
	contentType := writer.Header().Get("Content-Type")
	assert.Equal(t, "application/json", contentType, "Invalid Content-Type header")

	validateErrorResponse(t, writer, "INACTIVE_ACCOUNT", "The account is inactive")
}

func TestLogin_BlockedAccount(t *testing.T) {
	form := url.Values{}
	form.Add("username", user2.Login)
	form.Add("password", user2.Password)
	writer := executeRequest(form)

	/*
	 * Checking the HTTP status.
	 */
	assert.Equal(t, 400, writer.Code, "Invalid HTTP status")

	/*
	* Checking the content type.
	 */
	contentType := writer.Header().Get("Content-Type")
	assert.Equal(t, "application/json", contentType, "Invalid Content-Type header")
	validateErrorResponse(t, writer, "BLOCKED_ACCOUNT", "The account is blocked")
}

func validateUser(t *testing.T, expected, result *secu.User) {
	require.Equal(t, expected.Id, result.Id)
	require.Equal(t, expected.Login, result.Login)
	require.Equal(t, "", result.Password)
	require.Equal(t, expected.FirstName, result.FirstName)
	require.Equal(t, expected.LastName, result.LastName)
	require.Equal(t, expected.Active, result.Active)
	require.Equal(t, expected.Blocked, result.Blocked)
}

func validateErrorResponse(t *testing.T, writer *httptest.ResponseRecorder, errorCode, errorMessage string) {
	var loginResponse handlers.LoginResponse
	require.Nil(t, json.NewDecoder(writer.Body).Decode(&loginResponse))
	require.Nil(t, loginResponse.User)
	require.Nil(t, loginResponse.Token)
	require.Equal(t, false, loginResponse.Success)
	require.NotNil(t, loginResponse.Error)
	require.Equal(t, errorCode, loginResponse.Error.Code)
	require.Equal(t, errorMessage, loginResponse.Error.DefaultMessage)
}

func executeRequest(form url.Values) *httptest.ResponseRecorder {
	mux := http.NewServeMux()
	mux.HandleFunc("/", handlers.Login)
	writer := httptest.NewRecorder()

	request, _ := http.NewRequest("POST", "/", strings.NewReader(form.Encode()))
	request.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	mux.ServeHTTP(writer, request)
	return writer
}