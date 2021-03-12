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
package route

import (
	"io/ioutil"
	"net/http"
	"path/filepath"
	"strings"
	"time"

	"github.com/onsi/ginkgo"
	"github.com/onsi/ginkgo/extensions/table"
	"github.com/onsi/gomega"
	"github.com/tidwall/gjson"

	"e2enew/base"
)

var _ = ginkgo.Describe("import default tests", func() {
	path, err := filepath.Abs("../../testdata/import/default.yaml")
	gomega.Expect(err).To(gomega.BeNil())

	headers := map[string]string{
		"Authorization": base.GetToken(),
	}
	files := []base.UploadFile{
		{Name: "file", Filepath: path},
	}

	base.HttpPostFile(base.ManagerAPIHost+"/apisix/admin/import/routes", nil, files, headers)

	// sleep for data sync
	time.Sleep(base.SleepTime)

	respBody, _, err := base.HttpGet(base.ManagerAPIHost+"/apisix/admin/routes", headers)
	gomega.Expect(err).To(gomega.BeNil())
	list := gjson.Get(string(respBody), "data.rows").Value().([]interface{})

	var entries []table.TableEntry

	for _, item := range list {
		route := item.(map[string]interface{})
		entries = append(entries,
			table.Entry("route patch for update status(online)", base.HttpTestCase{
				Object:       base.ManagerApiExpect(),
				Method:       http.MethodPatch,
				Path:         "/apisix/admin/routes/" + route["id"].(string),
				Body:         `{"status":1}`,
				Headers:      map[string]string{"Authorization": base.GetToken()},
				ExpectStatus: http.StatusOK,
				Sleep:        base.SleepTime,
			}))
	}

	table.DescribeTable("tests route patch for update status(online)",
		func(tc base.HttpTestCase) {
			base.RunTestCase(tc)
		},
		entries...,
	)

	//verify route
	ginkgo.It("verify the route just imported", func() {
		base.RunTestCase(base.HttpTestCase{
			Object:       base.ManagerApiExpect(),
			Method:       http.MethodGet,
			Path:         "/hello",
			ExpectStatus: http.StatusOK,
			ExpectBody:   "hello world",
			Sleep:        base.SleepTime,
		})
	})

	//delete test data
	entries = entries[:0]
	for _, item := range list {
		route := item.(map[string]interface{})
		entries = append(entries, table.Entry("delete route", base.HttpTestCase{
			Object:       base.ManagerApiExpect(),
			Method:       http.MethodDelete,
			Path:         "/apisix/admin/routes/" + route["id"].(string),
			Headers:      map[string]string{"Authorization": base.GetToken()},
			ExpectStatus: http.StatusOK,
		}))
	}

	table.DescribeTable("tests delete route",
		func(tc base.HttpTestCase) {
			base.RunTestCase(tc)
		},
		entries...,
	)

})

var _ = ginkgo.Describe("import json tests", func() {
	path, err := filepath.Abs("../../testdata/import/default.json")
	gomega.Expect(err).To(gomega.BeNil())

	headers := map[string]string{
		"Authorization": base.GetToken(),
	}
	files := []base.UploadFile{
		{Name: "file", Filepath: path},
	}

	base.HttpPostFile(base.ManagerAPIHost+"/apisix/admin/import/routes", nil, files, headers)

	// sleep for data sync
	time.Sleep(base.SleepTime)

	respBody, _, err := base.HttpGet(base.ManagerAPIHost+"/apisix/admin/routes", headers)
	gomega.Expect(err).To(gomega.BeNil())
	list := gjson.Get(string(respBody), "data.rows").Value().([]interface{})

	var entries []table.TableEntry

	for _, item := range list {
		route := item.(map[string]interface{})
		entries = append(entries,
			table.Entry("route patch for update status(online)", base.HttpTestCase{
				Object:       base.ManagerApiExpect(),
				Method:       http.MethodPatch,
				Path:         "/apisix/admin/routes/" + route["id"].(string),
				Body:         `{"status":1}`,
				Headers:      map[string]string{"Authorization": base.GetToken()},
				ExpectStatus: http.StatusOK,
				Sleep:        base.SleepTime,
			}))
	}

	table.DescribeTable("tests route patch for update status(online)",
		func(tc base.HttpTestCase) {
			base.RunTestCase(tc)
		},
		entries...,
	)

	//verify route
	ginkgo.It("verify the route just imported", func() {
		base.RunTestCase(base.HttpTestCase{
			Object:       base.ManagerApiExpect(),
			Method:       http.MethodGet,
			Path:         "/hello",
			ExpectStatus: http.StatusOK,
			ExpectBody:   "hello world",
			Sleep:        base.SleepTime,
		})
	})

	//delete test data
	entries = entries[:0]
	for _, item := range list {
		route := item.(map[string]interface{})
		entries = append(entries, table.Entry("delete route", base.HttpTestCase{
			Object:       base.ManagerApiExpect(),
			Method:       http.MethodDelete,
			Path:         "/apisix/admin/routes/" + route["id"].(string),
			Headers:      map[string]string{"Authorization": base.GetToken()},
			ExpectStatus: http.StatusOK,
		}))
	}

	table.DescribeTable("tests delete route",
		func(tc base.HttpTestCase) {
			base.RunTestCase(tc)
		},
		entries...,
	)
})

var _ = ginkgo.Describe("import tests with plugins", func() {
	path, err := filepath.Abs("../../testdata/import/with-plugins.yaml")
	gomega.Expect(err).To(gomega.BeNil())

	headers := map[string]string{
		"Authorization": base.GetToken(),
	}
	files := []base.UploadFile{
		{Name: "file", Filepath: path},
	}

	base.HttpPostFile(base.ManagerAPIHost+"/apisix/admin/import/routes", nil, files, headers)

	// sleep for data sync
	time.Sleep(base.SleepTime)

	respBody, _, err := base.HttpGet(base.ManagerAPIHost+"/apisix/admin/routes", headers)
	gomega.Expect(err).To(gomega.BeNil())
	list := gjson.Get(string(respBody), "data.rows").Value().([]interface{})

	var entries []table.TableEntry
	for _, item := range list {
		route := item.(map[string]interface{})
		entries = append(entries, table.Entry("route patch for update status(online)", base.HttpTestCase{
			Object:       base.ManagerApiExpect(),
			Method:       http.MethodPatch,
			Path:         "/apisix/admin/routes/" + route["id"].(string),
			Body:         `{"status":1}`,
			Headers:      map[string]string{"Authorization": base.GetToken()},
			ExpectStatus: http.StatusOK,
			Sleep:        base.SleepTime,
		}))
	}

	table.DescribeTable("tests route patch for update status(online)",
		func(tc base.HttpTestCase) {
			base.RunTestCase(tc)
		},
		entries...,
	)

	// verify route
	table.DescribeTable("tests verify the route just imported",
		func(tc base.HttpTestCase) {
			base.RunTestCase(tc)
		},
		table.Entry("verify the route just imported", base.HttpTestCase{
			Object:       base.ManagerApiExpect(),
			Method:       http.MethodPost,
			Path:         "/hello",
			Body:         `{}`,
			ExpectStatus: http.StatusBadRequest,
			ExpectBody:   `property "id" is required`,
			Sleep:        base.SleepTime,
		}),
		table.Entry("verify the route just imported", base.HttpTestCase{
			Object:       base.ManagerApiExpect(),
			Method:       http.MethodPost,
			Path:         "/hello",
			Headers:      map[string]string{"id": "1"},
			Body:         `{}`,
			ExpectStatus: http.StatusBadRequest,
			ExpectBody:   `property "status" is required`,
			Sleep:        base.SleepTime,
		}),
		table.Entry("verify the route just imported", base.HttpTestCase{
			Object:       base.ManagerApiExpect(),
			Method:       http.MethodPost,
			Path:         "/hello",
			Headers:      map[string]string{"id": "1"},
			Body:         `{"status": "1"}`,
			ExpectStatus: http.StatusUnauthorized,
			ExpectBody:   `{"message":"Missing authorization in request"}`,
			Sleep:        base.SleepTime,
		}),
	)

	// delete test data
	entries = entries[:0]
	for _, item := range list {
		route := item.(map[string]interface{})
		entries = append(entries, table.Entry("delete route", base.HttpTestCase{
			Object:       base.ManagerApiExpect(),
			Method:       http.MethodDelete,
			Path:         "/apisix/admin/routes/" + route["id"].(string),
			Headers:      map[string]string{"Authorization": base.GetToken()},
			ExpectStatus: http.StatusOK,
		}))
	}

	table.DescribeTable("tests for delete route",
		func(tc base.HttpTestCase) {
			base.RunTestCase(tc)
		},
		entries...,
	)
})

var _ = ginkgo.Describe("import tests with multi routes", func() {
	path, err := filepath.Abs("../../testdata/import/multi-routes.yaml")
	gomega.Expect(err).To(gomega.BeNil())

	headers := map[string]string{
		"Authorization": base.GetToken(),
	}
	files := []base.UploadFile{
		{Name: "file", Filepath: path},
	}

	base.HttpPostFile(base.ManagerAPIHost+"/apisix/admin/import/routes", nil, files, headers)

	// sleep for data sync
	time.Sleep(base.SleepTime)

	respBody, _, err := base.HttpGet(base.ManagerAPIHost+"/apisix/admin/routes", headers)
	gomega.Expect(err).To(gomega.BeNil())
	list := gjson.Get(string(respBody), "data.rows").Value().([]interface{})
	gomega.Expect(list).Should(gomega.HaveLen(2))

	var entries []table.TableEntry
	for _, item := range list {
		route := item.(map[string]interface{})
		entries = append(entries, table.Entry("route patch for update status(online)", base.HttpTestCase{
			Object:       base.ManagerApiExpect(),
			Method:       http.MethodPatch,
			Path:         "/apisix/admin/routes/" + route["id"].(string),
			Body:         `{"status":1}`,
			Headers:      map[string]string{"Authorization": base.GetToken()},
			ExpectStatus: http.StatusOK,
			Sleep:        base.SleepTime,
		}))
		uris := route["uris"].([]interface{})
		isGet := false
		for _, uri := range uris {
			if uri == "/get" {
				isGet = true
			}
		}
		// verify route data
		if isGet {
			entries = append(entries, table.Entry("verify data of route", base.HttpTestCase{
				Object:       base.ManagerApiExpect(),
				Method:       http.MethodGet,
				Path:         "/apisix/admin/routes/" + route["id"].(string),
				Headers:      map[string]string{"Authorization": base.GetToken()},
				ExpectStatus: http.StatusOK,
				ExpectBody: []string{`"methods":["GET","POST","HEAD","PUT","PATCH","DELETE"]`,
					`"proxy-rewrite":{"disable":false,"scheme":"https"}`,
					`"labels":{"API_VERSION":"v2","dev":"test"}`,
					`"upstream":{"nodes":[{"host":"httpbin.org","port":443,"weight":1}],"timeout":{"connect":6000,"read":6000,"send":6000},"type":"roundrobin","pass_host":"node"}`,
				},
				Sleep: base.SleepTime,
			}))
		} else {
			entries = append(entries, table.Entry("verify data of route2", base.HttpTestCase{
				Object:       base.ManagerApiExpect(),
				Method:       http.MethodGet,
				Path:         "/apisix/admin/routes/" + route["id"].(string),
				Headers:      map[string]string{"Authorization": base.GetToken()},
				ExpectStatus: http.StatusOK,
				ExpectBody: []string{`"methods":["POST"]`,
					`"proxy-rewrite":{"disable":false,"scheme":"https"}`,
					`"labels":{"API_VERSION":"v1","version":"v1"}`,
					`"upstream":{"nodes":[{"host":"httpbin.org","port":443,"weight":1}],"timeout":{"connect":6000,"read":6000,"send":6000},"type":"roundrobin","pass_host":"node"}`,
				},
				Sleep: base.SleepTime,
			}))
		}
	}

	// verify route
	entries = append(entries,
		table.Entry("verify the route just imported", base.HttpTestCase{
			Object:       base.ManagerApiExpect(),
			Method:       http.MethodGet,
			Path:         "/get",
			ExpectStatus: http.StatusOK,
			ExpectBody:   `"url": "https://127.0.0.1/get"`,
			Sleep:        base.SleepTime,
		}),
		table.Entry("verify the route just imported", base.HttpTestCase{
			Object:       base.ManagerApiExpect(),
			Method:       http.MethodPost,
			Path:         "/post",
			ExpectStatus: http.StatusOK,
			ExpectBody:   `"url": "https://127.0.0.1/post"`,
			Sleep:        base.SleepTime,
		}))

	// delete test data
	for _, item := range list {
		route := item.(map[string]interface{})
		entries = append(entries, table.Entry("delete route", base.HttpTestCase{
			Object:       base.ManagerApiExpect(),
			Method:       http.MethodDelete,
			Path:         "/apisix/admin/routes/" + route["id"].(string),
			Headers:      map[string]string{"Authorization": base.GetToken()},
			ExpectStatus: http.StatusOK,
		}))
	}

	table.DescribeTable("multi route import tests",
		func(tc base.HttpTestCase) {
			base.RunTestCase(tc)
		},
		entries...,
	)
})

var _ = ginkgo.Describe("import export route tests", func() {
	table.DescribeTable("tests for create route",
		func(tc base.HttpTestCase) {
			base.RunTestCase(tc)
		},
		table.Entry("Create a route", base.HttpTestCase{
			Object: base.ManagerApiExpect(),
			Method: http.MethodPut,
			Path:   "/apisix/admin/routes/r1",
			Body: `{
					"uris": ["/test-test1"],
					"name": "route_all",
					"desc": "所有",
					"methods": ["GET"],
					"hosts": ["test.com"],
					"status": 1,
					"upstream": {
						"nodes": {
							"172.16.238.20:1980": 1
						},
						"type": "roundrobin"
					}
			}`,
			Headers:      map[string]string{"Authorization": base.GetToken()},
			ExpectStatus: http.StatusOK,
			Sleep:        base.SleepTime,
		}),
		table.Entry("Create a route2", base.HttpTestCase{
			Object: base.ManagerApiExpect(),
			Method: http.MethodPut,
			Path:   "/apisix/admin/routes/r2",
			Body: `{
					"uris": ["/test-test2"],
					"name": "route_all",
					"desc": "所有1",
					"methods": ["GET"],
					"hosts": ["test.com"],
					"status": 1,
					"upstream": {
						"nodes": {
							"172.16.238.20:1980": 1
						},
						"type": "roundrobin"
					}
			}`,
			Headers:      map[string]string{"Authorization": base.GetToken()},
			ExpectStatus: http.StatusOK,
			Sleep:        base.SleepTime,
		}),
		table.Entry("Create a route3", base.HttpTestCase{
			Object: base.ManagerApiExpect(),
			Method: http.MethodPut,
			Path:   "/apisix/admin/routes/r3",
			Body: `{
					"uris": ["/test-test3"],
					"name": "route_all",
					"desc": "所有2",
					"methods": ["GET"],
					"hosts": ["test.com"],
					"status": 1,
					"upstream": {
						"nodes": {
							"172.16.238.20:1980": 1
						},
						"type": "roundrobin"
					}
			}`,
			Headers:      map[string]string{"Authorization": base.GetToken()},
			ExpectStatus: http.StatusOK,
			Sleep:        base.SleepTime,
		}),
	)

	// export routes
	time.Sleep(base.SleepTime)
	tmpPath := "/tmp/export.json"
	headers := map[string]string{
		"Authorization": base.GetToken(),
	}

	body, status, err := base.HttpGet(base.ManagerAPIHost+"/apisix/admin/export/routes", headers)
	gomega.Expect(err).To(gomega.BeNil())
	gomega.Expect(status).To(gomega.Equal(http.StatusOK))

	content := gjson.Get(string(body), "data")
	err = ioutil.WriteFile(tmpPath, []byte(content.Raw), 0644)
	gomega.Expect(err).To(gomega.BeNil())

	// import routes (should failed -- duplicate)
	files := []base.UploadFile{
		{Name: "file", Filepath: tmpPath},
	}
	respBody, status, err := base.HttpPostFile(base.ManagerAPIHost+"/apisix/admin/import/routes", nil, files, headers)
	gomega.Expect(err).To(gomega.BeNil())
	gomega.Expect(status).To(gomega.Equal(http.StatusBadRequest))

	gomega.Expect(strings.Contains(string(respBody), "duplicate")).To(gomega.BeTrue())
	time.Sleep(base.SleepTime)

	// delete routes
	table.DescribeTable("delete just created route",
		func(tc base.HttpTestCase) {
			base.RunTestCase(tc)
		},
		table.Entry("delete the route1 just created", base.HttpTestCase{
			Object:       base.ManagerApiExpect(),
			Method:       http.MethodDelete,
			Path:         "/apisix/admin/routes/r1",
			Headers:      map[string]string{"Authorization": base.GetToken()},
			ExpectStatus: http.StatusOK,
		}),
		table.Entry("delete the route2 just created", base.HttpTestCase{
			Object:       base.ManagerApiExpect(),
			Method:       http.MethodDelete,
			Path:         "/apisix/admin/routes/r2",
			Headers:      map[string]string{"Authorization": base.GetToken()},
			ExpectStatus: http.StatusOK,
		}),
		table.Entry("delete the route3 just created", base.HttpTestCase{
			Object:       base.ManagerApiExpect(),
			Method:       http.MethodDelete,
			Path:         "/apisix/admin/routes/r3",
			Headers:      map[string]string{"Authorization": base.GetToken()},
			ExpectStatus: http.StatusOK,
		}),
	)

	// import again
	time.Sleep(base.SleepTime)
	respBody, status, err = base.HttpPostFile(base.ManagerAPIHost+"/apisix/admin/import/routes", nil, files, headers)
	gomega.Expect(err).To(gomega.BeNil())
	gomega.Expect(status).To(gomega.Equal(http.StatusOK))
	gomega.Expect(strings.Contains(string(respBody), `"data":{"paths":3,"routes":3}`)).To(gomega.BeTrue())
	time.Sleep(base.SleepTime)

	// sleep for data sync
	time.Sleep(base.SleepTime)

	respBody, _, err = base.HttpGet(base.ManagerAPIHost+"/apisix/admin/routes", headers)
	gomega.Expect(err).To(gomega.BeNil())
	list := gjson.Get(string(respBody), "data.rows").Value().([]interface{})

	gomega.Expect(list).Should(gomega.HaveLen(3))

	var entries []table.TableEntry

	// verify route data
	for _, item := range list {
		route := item.(map[string]interface{})
		entries = append(entries, table.Entry("verify data of route2", base.HttpTestCase{
			Object:       base.ManagerApiExpect(),
			Method:       http.MethodGet,
			Path:         "/apisix/admin/routes/" + route["id"].(string),
			Headers:      map[string]string{"Authorization": base.GetToken()},
			ExpectStatus: http.StatusOK,
			ExpectBody: []string{`"methods":["GET"]`,
				`"desc":"所有`,
				`"hosts":["test.com"]`,
				`"upstream":{"nodes":[{"host":"172.16.238.20","port":1980,"weight":1}],"type":"roundrobin"}`,
			},
			Sleep: base.SleepTime,
		}))
	}

	// delete test data
	for _, item := range list {
		route := item.(map[string]interface{})
		entries = append(entries, table.Entry("delete route", base.HttpTestCase{
			Object:       base.ManagerApiExpect(),
			Method:       http.MethodDelete,
			Path:         "/apisix/admin/routes/" + route["id"].(string),
			Headers:      map[string]string{"Authorization": base.GetToken()},
			ExpectStatus: http.StatusOK,
		}))
	}

	table.DescribeTable("verify and delete route data",
		func(tc base.HttpTestCase) {
			base.RunTestCase(tc)
		},
		entries...,
	)

})
