import  { useState } from 'react';

const TruncatedText = ({ text, maxLength = 25 }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncated = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <div>
      <p className="text-gray-900">
        {isTruncated ? `${text.slice(0, maxLength)}...` : text}
        {text.length > maxLength && (
          <span
            onClick={toggleTruncated}
            className="text-indigo-600 cursor-pointer ml-1"
          >
            {isTruncated ? 'See More' : 'See Less'}
          </span>
        )}
      </p>
    </div>
  );
};

export default TruncatedText;
