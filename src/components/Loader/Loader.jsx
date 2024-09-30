import { Oval } from 'react-loader-spinner';
import s from './Loader.module.css';

export const Loader = () => {
  return (
    <Oval
      height={75}
      width={75}
      color="black"
      wrapperStyle={{}}
      wrapperClass={s.loader}
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#f27e34"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};
