

const Button :React.FC<{children: React.ReactNode, onClick?: () => void, type: 'submit' | 'button'}> = ({children, onClick, type}) => {

  return (
    <button
      onClick={onClick}
      type={type}
      className="px-6 py-3 bg-blue-900 rounded text-white"
    >
      {
        children
      }
    </button>
  );
}

export default Button;