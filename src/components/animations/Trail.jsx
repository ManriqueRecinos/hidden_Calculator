import React from 'react';
import { useTrail, a } from '@react-spring/web';

const Trail = ({ open, children, ...props }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 1.2, tension: 1200, friction: 60 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 'auto' : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });

  return (
    <div className="w-full" {...props}>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} style={style}>
          {items[index]}
        </a.div>
      ))}
    </div>
  );
};

export default Trail;
