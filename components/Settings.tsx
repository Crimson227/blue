import React from 'react';
import { Card as AntdCard, Slider, InputNumber, Select, Row, Col } from 'antd';
import { ModelType } from '../types';

// Fix for JSX element type 'Card' error
const Card = AntdCard as any;

export const Settings: React.FC = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 px-1">系统偏好设置</h2>

      {/* Setting 1 */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <Row align="middle" gutter={[16, 16]}>
          <Col span={24} md={8}>
            <span className="text-lg font-medium text-gray-700">训练集 / 测试集⽐例</span>
          </Col>
          <Col span={24} md={16}>
             <div className="flex items-center gap-4">
               <Slider 
                  defaultValue={80} 
                  min={50} 
                  max={95} 
                  className="flex-1"
                  marks={{ 50: '50%', 80: '80%', 95: '95%' }}
                />
             </div>
             <p className="text-gray-500 text-sm mt-4">
               调整模型训练时用于学习的数据与用于验证效果的数据比例，通常建议 8:2。
             </p>
          </Col>
        </Row>
      </Card>

      {/* Setting 2 */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <Row align="middle" gutter={[16, 16]}>
          <Col span={24} md={8}>
            <span className="text-lg font-medium text-gray-700">随机种⼦（random seed）</span>
          </Col>
          <Col span={24} md={16}>
            <InputNumber 
              defaultValue={42} 
              className="w-full" 
              size="large"
            />
            <p className="text-gray-500 text-sm mt-2">
              设置固定的随机数种子以确保每次实验结果的可复现性，默认值为 42。
            </p>
          </Col>
        </Row>
      </Card>

      {/* Setting 3 */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <Row align="middle" gutter={[16, 16]}>
          <Col span={24} md={8}>
            <span className="text-lg font-medium text-gray-700">默认模型选择</span>
          </Col>
          <Col span={24} md={16}>
            <Select 
              defaultValue={ModelType.RANDOM_FOREST} 
              size="large" 
              className="w-full"
              options={[
                { value: ModelType.LOGISTIC_REGRESSION, label: '逻辑回归' },
                { value: ModelType.LINEAR_REGRESSION, label: '线性回归' },
                { value: ModelType.RANDOM_FOREST, label: '随机森林' },
              ]}
            />
            <p className="text-gray-500 text-sm mt-2">
              设置进入 Step 2 时系统自动预选的算法模型，可减少重复操作。
            </p>
          </Col>
        </Row>
      </Card>
    </div>
  );
};