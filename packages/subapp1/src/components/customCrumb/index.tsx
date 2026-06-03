import { sdk } from '@zxiaosi/sdk';
import { type BreadcrumbProps } from 'antd';

/**
 * 主应用中 CustomCrumb
 */
const CustomCrumb: React.FC = (props: BreadcrumbProps) => {
  return sdk.components.renderComponent('CustomCrumb', props);
};

export default CustomCrumb;
