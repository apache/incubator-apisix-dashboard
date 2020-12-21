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
import React, { useState, useRef, useEffect } from 'react'
import { useIntl, history } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { omit, pick } from 'lodash';

import ActionBar from '@/components/ActionBar';
import PluginPage from '@/components/Plugin';
import { Card, Steps, Form, notification } from 'antd';
import Preview from './components/Preview';
import Step1 from "./components/Step1";
import styles from './Create.less';
import { create, update, fetchItem } from './service';

const { Step } = Steps;
const Page: React.FC = (props) => {
    const { formatMessage } = useIntl();
    const [form] = Form.useForm();
    const upstreamRef = useRef<any>();
    const [plugins, setPlugins] = useState<PluginComponent.Data>({});

    const STEP_HEADER = [
        formatMessage({ id: 'page.service.steps.stepTitle.basicInformation' }),
        formatMessage({ id: 'page.service.steps.stepTitle.pluginConfig' }),
        formatMessage({ id: 'component.global.steps.stepTitle.preview' }),
    ]

    const [stepHeader] = useState(STEP_HEADER);
    const [step, setStep] = useState(1);

    useEffect(() => {
        const { serviceId } = (props as any).match.params;
        if (serviceId) {
            fetchItem(serviceId).then(({ data }) => {
                form.setFieldsValue(data);
                setPlugins(data.plugins);
            });
        }
    }, []);

    const onSubmit = () => {
        let data: ServiceModule.Entity;
        const formData = form.getFieldsValue();
        if (formData.upstream_id === '') {
            data = {
                plugins,
                name: formData.name,
                desc: formData.desc,
                upstream: omit(formData, ['name', 'desc', 'upstream_id'])
            } as ServiceModule.Entity
        } else {
            data = {
                plugins,
                ...pick(formData, ['name', 'desc', 'upstream_id'])
            } as ServiceModule.Entity
        }

        const { serviceId } = (props as any).match.params;
        (serviceId ? update(serviceId, data) : create(data))
            .then(() => {
                notification.success({
                    message: `${serviceId
                        ? formatMessage({ id: 'component.global.edit' })
                        : formatMessage({ id: 'component.global.create' })
                        } ${formatMessage({ id: 'menu.service' })} ${formatMessage({
                            id: 'component.status.success',
                        })}`,
                });
                history.push('/service/list');
            })
            .catch(() => {
                setStep(3);
            });
    };

    const onStepChange = (nextStep: number) => {
        if (nextStep === 2) {
            form.validateFields().then(() => {
                setStep(nextStep);
            })
            return;
        }
        if (nextStep === 4) {
            onSubmit();
            return;
        };
        setStep(nextStep);
    }

    return (<>
        <PageHeaderWrapper
            title={`${(props as any).match.params.rid
                ? formatMessage({ id: 'component.global.edit' })
                : formatMessage({ id: 'component.global.create' })
                } ${formatMessage({ id: 'menu.service' })}`}
        >
            <Card bordered={false}>
                <Steps current={step - 1} className={styles.steps}>
                    {stepHeader.map((item) => (
                        <Step title={item} key={item} />
                    ))}
                </Steps>
                {step === 1 && <Step1
                    form={form}
                    upstreamRef={upstreamRef}
                />}
                {step === 2 && (
                    <PluginPage initialData={plugins} onChange={setPlugins} schemaType="route" />
                )}
                {step === 3 && <Preview form={form} plugins={plugins} />}
            </Card>
        </PageHeaderWrapper>
        <ActionBar step={step} lastStep={3} onChange={onStepChange} withResultView />
    </>)
}

export default Page;
