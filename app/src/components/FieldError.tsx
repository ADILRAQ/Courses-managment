
const FieldError :React.FC<{children: React.ReactNode}> = ({ children }) => {

  return (
    <i className="font-light text-sm text-red-600">
      { children }
    </i>
  );
}

export default FieldError;