import React, { useState } from 'react';
import { Card as AntdCard, Steps, Button, Select, Statistic, Upload, message, Empty } from 'antd';
import { 
  UploadOutlined, 
  BarChartOutlined, 
  ExperimentOutlined, 
  RocketOutlined, 
  DownloadOutlined 
} from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ModelType } from '../types';

// Fix for JSX element type 'Card' error
const Card = AntdCard as any;

const Step1DataPrep: React.FC = () => {
  const dummyData = [
    { name: 'Sample A', value: 400 },
    { name: 'Sample B', value: 300 },
    { name: 'Sample C', value: 500 },
    { name: 'Sample D', value: 200 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 区块 A：⽂件上传区 (Card 1) */}
      <Card title="数据导入" className="shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <Upload showUploadList={false}>
             <Button icon={<UploadOutlined />} type="primary" size="large">
              上传 CSV 文件
            </Button>
          </Upload>
          <p className="mt-4 text-gray-500 text-sm">
            本工具目前仅支持 CSV 格式，请确认第一行为字段名。
          </p>
        </div>
      </Card>

      {/* 区块 B：数据概览区 (Card 2) */}
      <Card title="数据概览" className="shadow-sm hover:shadow-md transition-shadow">
        <div className="space-y-4 font-medium text-gray-700 h-40 flex flex-col justify-center">
          <div className="flex justify-between border-b pb-2">
            <span>字段数量：</span>
            <span className="text-blue-600">12</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span>样本数量：</span>
            <span className="text-blue-600">1000</span>
          </div>
          <div className="flex justify-between">
            <span>缺失值检查结果：</span>
            <span className="text-amber-600">未发现明显缺失值</span>
          </div>
        </div>
      </Card>

      {/* 区块 C：图表占位区 (Card 3) */}
      <Card title="数据分布" className="shadow-sm hover:shadow-md transition-shadow md:col-span-1">
        <div className="h-64 flex flex-col">
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dummyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" hide />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center text-gray-500 text-sm bg-gray-50 p-2 rounded">
            此处未来可放折线图或直方图，目前只展示占位内容。<br/>
            示例图类型：样本分布直方图。
          </div>
        </div>
      </Card>

      {/* 区块 D：数据说明区 (Card 4) */}
      <Card title="处理日志与说明" className="shadow-sm hover:shadow-md transition-shadow md:col-span-1">
        <div className="text-gray-700 leading-relaxed text-sm h-64 overflow-y-auto p-2">
          <p>
            Step 1 的⽬标是确认数据格式并检查基本状况。
            本步骤会检查字段格式是否规范。
            需要特别注意是否存在大量缺失值。
            目标变量（label）在数据集中明确存在。
            在正式建模之前，应先完成基本的数据清洗。
            如果数据格式不符，请返回重新整理后再上传。
          </p>
        </div>
      </Card>
    </div>
  );
};

const Step2ModelSetup: React.FC<{ onTrain: () => void }> = ({ onTrain }) => {
  const [loading, setLoading] = useState(false);

  const handleTrain = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onTrain();
      message.success('模型训练完成！');
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* 区块 A：模型选择 */}
      <Card title="Step 2.1 模型选择" className="shadow-sm">
        <div className="flex flex-col gap-2">
          <label className="text-gray-600 font-medium">选择算法模型</label>
          <Select 
            defaultValue={ModelType.LOGISTIC_REGRESSION} 
            size="large" 
            className="w-full"
            options={[
              { value: ModelType.LOGISTIC_REGRESSION, label: '逻辑回归 (Logistic Regression)' },
              { value: ModelType.LINEAR_REGRESSION, label: '线性回归 (Linear Regression)' },
              { value: ModelType.RANDOM_FOREST, label: '随机森林 (Random Forest)' }
            ]}
          />
        </div>
      </Card>

      {/* 区块 B：参数说明 */}
      <Card title="Step 2.2 参数配置说明" className="shadow-sm">
        <div className="space-y-4">
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
            <span className="font-bold text-blue-800 block mb-1">参数名称： 学习率 (Learning Rate)</span>
            <span className="text-blue-600">作⽤说明：控制模型在每次迭代中更新权重的步长，过大可能导致震荡，过小收敛缓慢。</span>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
            <span className="font-bold text-blue-800 block mb-1">参数名称： 迭代次数 (Epochs)</span>
            <span className="text-blue-600">作⽤说明：决定整个训练数据集被模型反复学习的次数。</span>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
            <span className="font-bold text-blue-800 block mb-1">参数名称： 正则化系数 (Regularization)</span>
            <span className="text-blue-600">作⽤说明：用于防止模型过拟合，通常通过L1或L2范数惩罚项来实现。</span>
          </div>
        </div>
      </Card>

      {/* 区块 C：训练按钮 */}
      <Card className="shadow-sm border-t-4 border-t-indigo-500">
        <div className="flex flex-col items-center py-6">
          <Button 
            type="primary" 
            size="large" 
            icon={<ExperimentOutlined />} 
            onClick={handleTrain}
            loading={loading}
            className="w-48 h-12 text-lg"
          >
            开始训练模型
          </Button>
          <p className="mt-3 text-gray-500 text-sm">
            点击后将根据所选模型与参数进行训练（目前为示意功能）。
          </p>
        </div>
      </Card>
    </div>
  );
};

const Step3Prediction: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {/* 区块 A：预测分数展⽰ */}
      <Card className="shadow-sm md:col-span-2 bg-gradient-to-r from-white to-blue-50">
        <div className="text-center py-6">
          <Statistic
            title="模型评估指标 (F1-Score)"
            value={0.8942}
            precision={4}
            valueStyle={{ color: '#3f8600', fontSize: '3rem', fontWeight: 'bold' }}
            prefix={<RocketOutlined />}
            suffix="%"
          />
          <p className="text-gray-500 mt-2">基于当前测试集的加权平均 F1 分数</p>
        </div>
      </Card>

      {/* 区块 B：导出按钮 */}
      <Card title="结果导出" className="shadow-sm flex flex-col justify-center items-center text-center">
        <div className="py-8">
          <Button type="default" size="large" icon={<DownloadOutlined />} className="border-green-600 text-green-600 hover:text-green-500 hover:border-green-500">
            导出预测报告（CSV）
          </Button>
        </div>
      </Card>

      {/* 区块 C：说明⽂字 */}
      <Card title="免责声明" className="shadow-sm">
        <div className="flex items-center justify-center h-full py-8 text-gray-500 italic">
          报告内容为示意，不包含真实计算逻辑。
        </div>
      </Card>

       {/* Extra Visual Filler */}
      <Card title="混淆矩阵 (示意)" className="shadow-sm md:col-span-2">
         <Empty description="矩阵图表生成中..." image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </Card>
    </div>
  );
};

export const Workflow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => setCurrentStep(currentStep + 1);
  const prev = () => setCurrentStep(currentStep - 1);

  const steps = [
    {
      title: 'Step 1',
      description: '数据准备',
      content: <Step1DataPrep />,
    },
    {
      title: 'Step 2',
      description: '模型设置',
      content: <Step2ModelSetup onTrain={next} />,
    },
    {
      title: 'Step 3',
      description: '预测结果',
      content: <Step3Prediction />,
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
        <Steps 
          current={currentStep}
          items={steps.map(item => ({
            key: item.title,
            title: item.title,
            description: item.description
          }))}
        />
      </div>

      <div className="min-h-[500px]">
        {steps[currentStep].content}
      </div>

      <div className="mt-8 flex justify-between">
        {currentStep > 0 && (
          <Button size="large" onClick={prev}>
            上一步
          </Button>
        )}
        {currentStep < steps.length - 1 && currentStep !== 1 && (
          <Button type="primary" size="large" onClick={next} className="ml-auto">
            下一步
          </Button>
        )}
      </div>
    </div>
  );
};