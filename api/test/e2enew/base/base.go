/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package base

import (
	"bytes"
	"context"
	"crypto/tls"
	"fmt"
	"io/ioutil"
	"net"
	"net/http"
	"os/exec"
	"strings"
	"testing"
	"time"

	"github.com/gavv/httpexpect/v2"
	"github.com/onsi/ginkgo"
	"github.com/stretchr/testify/assert"
	"github.com/tidwall/gjson"
)

var (
	token string

	UpstreamIp             = "127.0.0.1"
	APISIXHost             = "http://127.0.0.1:9080"
	APISIXInternalUrl      = "http://172.16.238.30:9080"
	APISIXSingleWorkerHost = "http://127.0.0.1:9081"
	ManagerAPIHost         = "http://127.0.0.1:9000"
)

func GetToken() string {
	if token != "" {
		return token
	}

	requestBody := []byte(`{
		"username": "admin",
		"password": "admin"
	}`)

	url := ManagerAPIHost + "/apisix/admin/user/login"
	req, err := http.NewRequest(http.MethodPost, url, bytes.NewBuffer(requestBody))
	if err != nil {
		panic(err)
	}

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}

	respond := gjson.ParseBytes(body)
	token = respond.Get("data.token").String()

	return token
}

func getTestingHandle() httpexpect.LoggerReporter {
	return ginkgo.GinkgoT()
}

func ManagerApiExpect() *httpexpect.Expect {
	t := getTestingHandle()
	return httpexpect.New(t, ManagerAPIHost)
}

func APISIXExpect() *httpexpect.Expect {
	t := getTestingHandle()
	return httpexpect.New(t, APISIXHost)
}

func APISIXHTTPSExpect() *httpexpect.Expect {
	t := getTestingHandle()
	e := httpexpect.WithConfig(httpexpect.Config{
		BaseURL:  "https://www.test2.com:9443",
		Reporter: httpexpect.NewAssertReporter(t),
		Client: &http.Client{
			Transport: &http.Transport{
				TLSClientConfig: &tls.Config{
					// accept any certificate; for testing only!
					InsecureSkipVerify: true,
				},
				DialContext: func(ctx context.Context, network, addr string) (net.Conn, error) {
					if addr == "www.test2.com:9443" {
						addr = "127.0.0.1:9443"
					}
					dialer := &net.Dialer{}
					return dialer.DialContext(ctx, network, addr)
				},
			},
		},
	})

	return e
}

var SleepTime = time.Duration(300) * time.Millisecond

type HttpTestCase struct {
	Desc          string
	Object        *httpexpect.Expect
	Method        string
	Path          string
	Query         string
	Body          string
	Headers       map[string]string
	Headers_test  map[string]interface{}
	ExpectStatus  int
	ExpectCode    int
	ExpectMessage string
	ExpectBody    interface{}
	UnexpectBody  interface{}
	ExpectHeaders map[string]string
	Sleep         time.Duration //ms
}

func RunTestCase(tc HttpTestCase) {
	//init
	expectObj := tc.Object
	var req *httpexpect.Request
	switch tc.Method {
	case http.MethodGet:
		req = expectObj.GET(tc.Path)
	case http.MethodPut:
		req = expectObj.PUT(tc.Path)
	case http.MethodPost:
		req = expectObj.POST(tc.Path)
	case http.MethodDelete:
		req = expectObj.DELETE(tc.Path)
	case http.MethodPatch:
		req = expectObj.PATCH(tc.Path)
	case http.MethodOptions:
		req = expectObj.OPTIONS(tc.Path)
	default:
	}

	if req == nil {
		panic("fail to init request")
	}

	if tc.Sleep != 0 {
		time.Sleep(tc.Sleep)
	} else {
		time.Sleep(time.Duration(50) * time.Millisecond)
	}

	if tc.Query != "" {
		req.WithQueryString(tc.Query)
	}

	// set header
	for key, val := range tc.Headers {
		req.WithHeader(key, val)
	}

	// set body
	if tc.Body != "" {
		req.WithText(tc.Body)
	}

	// respond check
	resp := req.Expect()

	// match http status
	if tc.ExpectStatus != 0 {
		resp.Status(tc.ExpectStatus)
	}

	// match headers
	if tc.ExpectHeaders != nil {
		for key, val := range tc.ExpectHeaders {
			resp.Header(key).Equal(val)
		}
	}

	// match body
	if tc.ExpectBody != nil {
		//assert.Contains(t, []string{"string", "[]string"}, reflect.TypeOf(tc.ExpectBody).String())
		if body, ok := tc.ExpectBody.(string); ok {
			if body == "" {
				// "" indicates the body is expected to be empty
				resp.Body().Empty()
			} else {
				resp.Body().Contains(body)
			}
		} else if bodies, ok := tc.ExpectBody.([]string); ok && len(bodies) != 0 {
			for _, b := range bodies {
				resp.Body().Contains(b)
			}
		}
	}

	// match UnexpectBody
	if tc.UnexpectBody != nil {
		//assert.Contains(t, []string{"string", "[]string"}, reflect.TypeOf(tc.UnexpectBody).String())
		if body, ok := tc.UnexpectBody.(string); ok {
			// "" indicates the body is expected to be non empty
			if body == "" {
				resp.Body().NotEmpty()
			} else {
				resp.Body().NotContains(body)
			}
		} else if bodies, ok := tc.UnexpectBody.([]string); ok && len(bodies) != 0 {
			for _, b := range bodies {
				resp.Body().NotContains(b)
			}
		}
	}
}

func ReadAPISIXErrorLog(t *testing.T) string {
	cmd := exec.Command("pwd")
	pwdByte, err := cmd.CombinedOutput()
	pwd := string(pwdByte)
	pwd = strings.Replace(pwd, "\n", "", 1)
	pwd = pwd[:strings.Index(pwd, "/e2e")]
	bytes, err := ioutil.ReadFile(pwd + "/docker/apisix_logs/error.log")
	assert.Nil(t, err)
	logContent := string(bytes)

	return logContent
}

func CleanAPISIXErrorLog(t *testing.T) {
	cmd := exec.Command("pwd")
	pwdByte, err := cmd.CombinedOutput()
	pwd := string(pwdByte)
	pwd = strings.Replace(pwd, "\n", "", 1)
	pwd = pwd[:strings.Index(pwd, "/e2e")]
	cmd = exec.Command("sudo", "echo", " > ", pwd+"/docker/apisix_logs/error.log")
	_, err = cmd.CombinedOutput()
	if err != nil {
		fmt.Println("cmd error:", err.Error())
	}
	assert.Nil(t, err)
}

func CleanResource(resource string) {
	t := getTestingHandle()
	request, _ := http.NewRequest("GET", ManagerAPIHost+"/apisix/admin/"+resource, nil)
	request.Header.Add("Authorization", GetToken())
	resp, err := http.DefaultClient.Do(request)
	assert.Nil(t, err)
	defer resp.Body.Close()
	respBody, _ := ioutil.ReadAll(resp.Body)
	list := gjson.Get(string(respBody), "data.rows").Value().([]interface{})
	for _, item := range list {
		route := item.(map[string]interface{})
		tc := HttpTestCase{
			Desc:         "delete " + resource + "/" + route["id"].(string),
			Object:       ManagerApiExpect(),
			Method:       http.MethodDelete,
			Path:         "/apisix/admin/" + resource + "/" + route["id"].(string),
			Headers:      map[string]string{"Authorization": GetToken()},
			ExpectStatus: http.StatusOK,
		}
		RunTestCase(tc)
	}
}
