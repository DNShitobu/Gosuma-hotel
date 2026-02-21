import { useState } from 'react';

const Image = ({ src, alt, className, ...props }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  const fallbackSrc = 'data:image/svg+xml,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect fill="#E9ECEF" width="400" height="300"/>
      <text fill="#6C757D" font-family="Arial" font-size="16" x="50%" y="50%" text-anchor="middle" dy=".3em">Image not available</text>
    </svg>
  `);

  return (
    <img
      src={hasError ? fallbackSrc : src}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
};

export default Image;
