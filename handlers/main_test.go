package handlers_test

import (
	"log"
	"os"
	"testing"

	"github.com/eogile/agilestack-login-ui/handlers"
	"github.com/eogile/agilestack-utils/auth"
	"github.com/eogile/agilestack-utils/dockerclient"
	"github.com/eogile/agilestack-utils/secu"
	"github.com/eogile/agilestack-utils/test"
)

const (
	network = "network-test"
)

var (
	user1 = &secu.User{
		Login:    "user1@eogile.com",
		Password: "user1_password",
		UserData: secu.UserData{
			FirstName: "User1 first name",
			LastName:  "User1 last name",
		},
	}

	user2 = &secu.User{
		Login:    "user2@eogile.com",
		Password: "user2_password",
		UserData: secu.UserData{
			FirstName: "User2 first name",
			LastName:  "User2 last name",
		},
	}

	user3 = &secu.User{
		Login:    "user3@eogile.com",
		Password: "user3_password",
		UserData: secu.UserData{
			FirstName: "User3 first name",
			LastName:  "User3 last name",
		},
	}
)

func TestMain(m *testing.M) {
	/*
		Docker client for test utilities
	*/
	dockerClient := dockerclient.NewClient()

	/*
		Creating the Docker network if it does not exist.
	*/
	dockerClient.CreateNetWorkIfNeeded(network)

	/*
	 * Bootstrap the PostgreSQL and the Hydra containers.
	 */
	if err := test.StartHydraContainer(dockerClient, network); err != nil {
		log.Fatalln("Error while starting PostgreSQL and Hydra containers", err)
	}

	/*
	Initializing data set
	 */
	initDataSet()

	exitCode := m.Run()

	if err := test.StopHydraContainer(dockerClient); err != nil {
		log.Fatalln("Error while stopping PostgreSQL and Hydra containers:", err)
	}

	os.Exit(exitCode)
}

func initDataSet() {
	client := handlers.NewHydraClient()
	token, err := client.Login("superadmin@eogile.com", "supersecret")
	if err != nil {
		log.Fatalln("Error while login to Hydra before tests", err)
	}
	tokenInfo, err := auth.EncodeTokenInfo(token)
	if err != nil {
		log.Fatalln("Error while encoding token before tests", err)
	}

	_, err = handlers.NewHydraClient().CreateDefaultPolicy(tokenInfo)
	if err != nil {
		log.Fatalln("Error while creating default policy", err)
	}

	for index, user := range []*secu.User{user1, user2, user3} {
		id, err := client.CreateUser(user, tokenInfo)
		if err != nil {
			log.Fatalln("Error while creating user", err)
		}
		user.Id = id

		if index == 1 {
			// user 2 is blocked
			user2.SetBlocked(true)
			if err := client.UpdateUserData(id, user2.UserData, tokenInfo); err != nil {
				log.Fatalln("Error while updating user2", err)
			}
		}
		if index == 2 {
			// user 3 is inactive
			user3.SetActive(false)
			if err := client.UpdateUserData(id, user3.UserData, tokenInfo); err != nil {
				log.Fatalln("Error while updating user3", err)
			}
		}
	}
}

func init() {
	log.SetFlags(log.Lshortfile | log.Ldate | log.Ltime)
	os.Setenv("AUTHORIZATION_SERVER", "http://localhost:9090")
	os.Setenv("CLIENT_ID", "superapp2")
	os.Setenv("CLIENT_SECRET", "supersecret2")
	handlers.SetHydraClient(handlers.NewHydraClient())
}
