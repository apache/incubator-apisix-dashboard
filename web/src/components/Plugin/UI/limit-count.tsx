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
import React, { useState } from 'react';
import type { FormInstance } from 'antd/es/form';
import { Form, Input, InputNumber, Select } from 'antd';

type Props = {
  form: FormInstance;
};

type PolicyProps = "local" | "redis" | "redis-cluster"

const FORM_ITEM_LAYOUT = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 10
  },
};

const RedisForm: React.FC = () => {
  return (<>
    <Form.Item
      label="redis_host"
      name="redis_host"
      tooltip='When using the redis policy, this property specifies the address of the Redis server.'
      required
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="redis_port"
      name="redis_port"
      tooltip='When using the redis policy, this property specifies the port of the Redis server.'
    >
      <InputNumber defaultValue={6379} min={1} />
    </Form.Item>
    <Form.Item
      label="redis_password"
      name="redis_password"
      tooltip='When using the redis policy, this property specifies the password of the Redis server.'
      required
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="redis_database"
      name="redis_database"
      tooltip='When using the redis policy, this property specifies the database you selected of the Redis server, and only for non Redis cluster mode (single instance mode or Redis public cloud service that provides single entry).'
    >
      <InputNumber defaultValue={0} min={0} />
    </Form.Item>
    <Form.Item
      label="redis_timeout"
      name="redis_timeout"
      tooltip='When using the redis policy, this property specifies the timeout in milliseconds of any command submitted to the Redis server.'
    >
      <InputNumber defaultValue={1000} />
    </Form.Item>
  </>)
}

const RedisClusterForm: React.FC = () => {
  return (<>
    <Form.Item
      label="redis_cluster_name"
      name="redis_cluster_name"
      tooltip='When using redis-cluster policy, this property is the name of Redis cluster service nodes.'
      required
    >
      <Input />
    </Form.Item>
    {/* TODO: redis_cluster_nodes field */}
  </>)
}

const LimitCount: React.FC<Props> = ({ form }) => {
  const [policy, setPoicy] = useState<PolicyProps>('local');

  return (
    <Form
      form={form}
      {...FORM_ITEM_LAYOUT}
    >
      <Form.Item
        label="count"
        name="count"
        tooltip='the specified number of requests threshold.'
        required
      >
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item
        label="time_window"
        name="time_window"
        tooltip='the time window in seconds before the request count is reset.'
        required
      >
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item
        label="key"
        name="key"
      >
        <Select defaultValue={'remote_addr'}>
          {["remote_addr", "server_addr", "http_x_real_ip", "http_x_forwarded_for", "consumer_name", "service_id"].map(item => (<Select.Option value={item}>{item}</Select.Option>))}
        </Select>
      </Form.Item>
      <Form.Item
        label="rejected_code"
        name="rejected_code"
        tooltip='The HTTP status code returned when the request exceeds the threshold is rejected, default 503.'
      >
        <InputNumber min={200} max={599} />
      </Form.Item>
      <Form.Item
        label="policy"
        name="policy"
      >
        <Select defaultValue={policy} onChange={setPoicy}>
          {["local", "redis", "redis-cluster"].map(item => (<Select.Option value={item}>{item}</Select.Option>))}
        </Select>
      </Form.Item>
      { Boolean(policy === 'redis') && <RedisForm />}
      { Boolean(policy === 'redis-cluster') && <RedisClusterForm />}
    </Form>
  );
}

export default LimitCount;
