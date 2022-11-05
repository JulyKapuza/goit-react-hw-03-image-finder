import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const MyLoader = props => (
  <ThreeDots
    height="80"
    width="80"
    radius="12"
    color="#5ac8fa"
    ariaLabel="three-dots-loading"
    wrapperStyle={{
      justifyContent: 'center',
      alignItems: 'flex-end',
      alignContent: 'flex-end',
    }}
    wrapperClassName=""
    visible={true}
  />
);

export default MyLoader;
