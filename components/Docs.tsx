import React from 'react';
import { Card as AntdCard, Typography, Divider, Alert } from 'antd';
import { FileText, List, AlertTriangle } from 'lucide-react';

const { Title, Text } = Typography;

// Fix for JSX element type 'Card' error
const Card = AntdCard as any;

export const Docs: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {/* Card 1: 数据格式说明 */}
      <Card 
        title={<div className="flex items-center gap-2"><FileText size={18}/> <span>数据格式说明</span></div>}
        className="shadow-sm hover:shadow-md transition-shadow h-full"
      >
        <ul className="list-decimal pl-5 space-y-2 text-gray-700">
          <li>CSV 格式</li>
          <li>字段名在第⼀⾏</li>
          <li>⽬标变量 label</li>
          <li>编码格式 UTF-8</li>
          <li>不可含有合并单元格</li>
        </ul>
      </Card>

      {/* Card 2: 操作流程说明 */}
      <Card 
        title={<div className="flex items-center gap-2"><List size={18}/> <span>操作流程说明</span></div>}
        className="shadow-sm hover:shadow-md transition-shadow h-full"
      >
        <div className="space-y-4">
          <div>
            <Text strong className="block text-indigo-600 mb-1">Step 1</Text>
            <ul className="list-disc pl-5 text-gray-600 text-sm">
              <li>上传符合规范的CSV文件以初始化项目。</li>
              <li>检查系统生成的数据概览报告，确认样本量无误。</li>
            </ul>
          </div>
          <Divider className="my-2" />
          <div>
             <Text strong className="block text-indigo-600 mb-1">Step 2</Text>
            <ul className="list-disc pl-5 text-gray-600 text-sm">
              <li>从下拉菜单中选择适合任务的算法模型（如逻辑回归）。</li>
              <li>根据业务需求调整超参数，点击开始训练按钮。</li>
            </ul>
          </div>
           <Divider className="my-2" />
          <div>
             <Text strong className="block text-indigo-600 mb-1">Step 3</Text>
            <ul className="list-disc pl-5 text-gray-600 text-sm">
              <li>查看模型评估分数，分析模型性能表现。</li>
              <li>点击导出按钮下载最终的预测结果文件。</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Card 3: 常⻅错误 */}
      <Card 
        title={<div className="flex items-center gap-2"><AlertTriangle size={18}/> <span>常⻅错误</span></div>}
        className="shadow-sm hover:shadow-md transition-shadow h-full"
      >
        <div className="space-y-4">
          <Alert
            message="1. 缺失值"
            description={
              <div className="text-xs mt-1">
                <div><span className="font-semibold">错误原因：</span>数据中存在空字段。</div>
                <div><span className="font-semibold">解决⽅式：</span>使用均值填充或删除。</div>
              </div>
            }
            type="warning"
            showIcon
          />
          
          <Alert
            message="2. ⽬标变量"
            description={
              <div className="text-xs mt-1">
                <div><span className="font-semibold">错误原因：</span>缺少名为 label 的列。</div>
                <div><span className="font-semibold">解决⽅式：</span>重命名目标列为 label。</div>
              </div>
            }
            type="error"
            showIcon
          />

          <Alert
             message="3. ⽂件格式不符"
             description={
               <div className="text-xs mt-1">
                 <div><span className="font-semibold">错误原因：</span>上传了 Excel (.xlsx)。</div>
                 <div><span className="font-semibold">解决⽅式：</span>另存为 .csv 格式。</div>
               </div>
             }
             type="info"
             showIcon
           />

           <Alert
             message="4. 数据量过⼩"
             description={
               <div className="text-xs mt-1">
                 <div><span className="font-semibold">错误原因：</span>样本少于 50 条。</div>
                 <div><span className="font-semibold">解决⽅式：</span>采集更多数据样本。</div>
               </div>
             }
             type="warning"
             showIcon
           />
        </div>
      </Card>
    </div>
  );
};