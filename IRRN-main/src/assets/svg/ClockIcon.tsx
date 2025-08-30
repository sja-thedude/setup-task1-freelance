import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const SVGComponent = (props: SvgProps) => (
    <Svg
        width={props.width || 24}
        height={props.height || 24}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
    >
        <Path
            d='M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z'
            stroke={props.stroke || '#B5B268'}
            strokeWidth={2}
            strokeLinecap='round'
            strokeLinejoin='round'
        />
        <Path
            d='M12 6v6l4 2'
            stroke={props.stroke || '#B5B268'}
            strokeWidth={2}
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </Svg>
);
export default SVGComponent;
