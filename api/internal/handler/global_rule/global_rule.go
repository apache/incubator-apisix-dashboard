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
package global_rule

import (
	"reflect"

	"github.com/gin-gonic/gin"
	"github.com/shiningrush/droplet"
	"github.com/shiningrush/droplet/wrapper"
	wgin "github.com/shiningrush/droplet/wrapper/gin"

	"github.com/apisix/manager-api/internal/core/entity"
	"github.com/apisix/manager-api/internal/core/store"
	"github.com/apisix/manager-api/internal/handler"
)

type Handler struct {
	globalRuleStore store.Interface
}

func NewHandler() (handler.RouteRegister, error) {
	return &Handler{
		globalRuleStore: store.GetStore(store.HubKeyGlobalRule),
	}, nil
}

func (h *Handler) ApplyRoute(r *gin.Engine) {
	// global plugins
	r.GET("/apisix/admin/global_rules/:id", wgin.Wraps(h.Get,
		wrapper.InputType(reflect.TypeOf(GetInput{}))))
	r.GET("/apisix/admin/global_rules", wgin.Wraps(h.List,
		wrapper.InputType(reflect.TypeOf(ListInput{}))))
	r.PUT("/apisix/admin/global_rules/:id", wgin.Wraps(h.Set,
		wrapper.InputType(reflect.TypeOf(entity.GlobalPlugins{}))))
	r.PUT("/apisix/admin/global_rules", wgin.Wraps(h.Set,
		wrapper.InputType(reflect.TypeOf(entity.GlobalPlugins{}))))
	r.DELETE("/apisix/admin/global_rules/:id", wgin.Wraps(h.BatchDelete,
		wrapper.InputType(reflect.TypeOf(BatchDeleteInput{}))))
}

type GetInput struct {
	ID string `auto_read:"id,path" validate:"required"`
}

func (h *Handler) Get(c droplet.Context) (interface{}, error) {
	input := c.Input().(*GetInput)

	r, err := h.globalRuleStore.Get(input.ID)
	if err != nil {
		return handler.SpecCodeResponse(err), err
	}
	return r, nil
}

type ListInput struct {
	store.Pagination
}

// swagger:operation GET /apisix/admin/global_rules getGlobalRuleList
//
// Return the global rule list according to the specified page number and page size.
//
// ---
// produces:
// - application/json
// parameters:
// - name: page
//   in: query
//   description: page number
//   required: false
//   type: integer
// - name: page_size
//   in: query
//   description: page size
//   required: false
//   type: integer
// responses:
//   '0':
//     description: list response
//     schema:
//       type: array
//       items:
//         "$ref": "#/definitions/GlobalPlugins"
//   default:
//     description: unexpected error
//     schema:
//       "$ref": "#/definitions/ApiError"
func (h *Handler) List(c droplet.Context) (interface{}, error) {
	input := c.Input().(*ListInput)

	ret, err := h.globalRuleStore.List(store.ListInput{
		PageSize:   input.PageSize,
		PageNumber: input.PageNumber,
	})
	if err != nil {
		return nil, err
	}

	return ret, nil
}

func (h *Handler) Set(c droplet.Context) (interface{}, error) {
	input := c.Input().(*entity.GlobalPlugins)

	if err := h.globalRuleStore.Create(c.Context(), input); err != nil {
		return handler.SpecCodeResponse(err), err
	}

	return nil, nil
}

type BatchDeleteInput struct {
	ID string `auto_read:"id,path"`
}

func (h *Handler) BatchDelete(c droplet.Context) (interface{}, error) {
	input := c.Input().(*BatchDeleteInput)

	if err := h.globalRuleStore.BatchDelete(c.Context(), []string{input.ID}); err != nil {
		return handler.SpecCodeResponse(err), err
	}

	return nil, nil
}
