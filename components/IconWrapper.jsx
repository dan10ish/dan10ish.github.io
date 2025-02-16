"use client";

const IconWrapper = ({ icon: Icon, social = false, ...props }) => {
  if (social) {
    return <Icon {...props} />;
  }
  return <Icon strokeWidth={`var(--icon-stroke-width)`} {...props} />;
};

export default IconWrapper; 