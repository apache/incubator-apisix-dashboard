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
package e2e

import (
	"bytes"
	"io/ioutil"
	"net/http"
	"testing"
	"time"

	"github.com/gavv/httpexpect/v2"
	"github.com/tidwall/gjson"
)

var token string

func init() {
	//login to get auth token
	requestBody := []byte(`{
		"username": "admin",
		"password": "admin"
	}`)

	url := "http://127.0.0.1:8080/apisix/admin/user/login"
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
}

func MangerApiExpect(t *testing.T) *httpexpect.Expect {
	return httpexpect.New(t, "http://127.0.0.1:8080")
}

func APISIXExpect(t *testing.T) *httpexpect.Expect {
	return httpexpect.New(t, "http://127.0.0.1:9080")
}

var sleepTime = time.Duration(100) * time.Millisecond

type HttpTestCase struct {
	caseDesc      string
	Object        *httpexpect.Expect
	Method        string
	Path          string
	Body          string
	Headers       map[string]string
	ExpectStatus  int
	ExpectCode    int
	ExpectMessage string
	ExpectBody    string
	ExpectHeaders map[string]string
	Sleep         time.Duration //ms
}

func testCaseCheck(tc HttpTestCase) {
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
	default:
	}

	if req == nil {
		panic("fail to init request")
	}

	if tc.Sleep != 0 {
		time.Sleep(tc.Sleep)
	}

	//set header
	for key, val := range tc.Headers {
		req.WithHeader(key, val)
	}

	//set body
	if tc.Body != "" {
		req.WithText(tc.Body)
	}

	//respond check
	resp := req.Expect()

	//match http status
	if tc.ExpectStatus != 0 {
		resp.Status(tc.ExpectStatus)
	}

	//match headers
	if tc.ExpectHeaders != nil {
		for key, val := range tc.ExpectHeaders {
			resp.Header(key).Equal(val)
		}
	}

	//match body
	if tc.ExpectBody != "" {
		resp.Body().Contains(tc.ExpectBody)
	}

}
