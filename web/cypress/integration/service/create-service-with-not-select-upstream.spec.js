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
/* eslint-disable no-undef */

context('Edit Service with not select Upstream', () => {
  beforeEach(() => {
    cy.login();

    cy.fixture('selector.json').as('domSelector');
    cy.fixture('data.json').as('data');
  });

  it('should create a test service', function () {
    cy.visit('/');
    cy.contains('Service').click();
    cy.contains('Create').click();
    cy.get(this.domSelector.name).type(this.data.serviceName);
    cy.get(this.domSelector.description).type(this.data.description);
    cy.get(this.domSelector.nodes_0_host).click();
    cy.get(this.domSelector.nodes_0_host).type(this.data.ip1);
    cy.get(this.domSelector.nodes_0_port).clear().type('7000');
    cy.get(this.domSelector.nodes_0_weight).clear().type(1);
    cy.contains('Next').click();
    cy.contains('Next').click();
    cy.get(this.domSelector.nodes_0_host).should('be.disabled','true');
    cy.get(this.domSelector.nodes_0_port).should('be.disabled','true');
    cy.get(this.domSelector.nodes_0_weight).should('be.disabled','true');
    cy.get('#timeout_connect').should('be.disabled','true');
    cy.get('#timeout_send').should('be.disabled','true');
    cy.get('#timeout_read').should('be.disabled','true');
    cy.get('#custom_checks_active').should('be.disabled','true');
    cy.get('#custom_checks_passive').should('be.disabled','true');
    cy.contains('Submit').click();
    cy.get(this.domSelector.notification).should('contain', this.data.createServiceSuccess);
  });

  it('should edit the service', function () {
    cy.visit('/service/list');

    cy.get(this.domSelector.nameSearch).type(this.data.serviceName);
    cy.contains('Search').click();
    cy.contains(this.data.serviceName).siblings().contains('Configure').click();
    cy.wait(500);
    cy.get(this.domSelector.nodes_0_host).should('not.be.disabled').clear().type(this.data.ip2);
    cy.get(this.domSelector.nodes_0_port).type(this.data.port);
    cy.get(this.domSelector.nodes_0_weight).type(this.data.weight);
    cy.contains('Next').click();
    cy.contains('Next').click();
    cy.get(this.domSelector.input).should('be.disabled');
    cy.contains('Submit').click();
    cy.get(this.domSelector.notification).should('contain', this.data.editServiceSuccess);
  });

  it('should delete this service and upstream', function () {
    cy.visit('/service/list');
    cy.get(this.domSelector.nameSearch).type(this.data.serviceName);
    cy.contains('Search').click();
    cy.contains(this.data.serviceName).siblings().contains('Delete').click();
    cy.contains('button', 'Confirm').click();
    cy.get(this.domSelector.notification).should('contain', this.data.deleteServiceSuccess);
  });
});
