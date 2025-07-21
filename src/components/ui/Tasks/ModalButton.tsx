const ModalButton = ({
  content,
  variant,
  onClick,
}: {
  content: string | React.ReactNode
  variant: string
  onClick?: () => void
}) => {
  return (
    <button
      className={`text-sm h-[1.5rem] min-w-[1.5rem] px-1 hover:bg-[var(--color-dark-grey)] transition duration-250 hover:text-white cursor-pointer flex justify-center items-center rounded ${
        variant === 'bordered' ? 'border border-[var(--color-dark-grey)]' : ''
      }`}
      onClick={onClick}
    >
      {content}
    </button>
  )
}

export default ModalButton
