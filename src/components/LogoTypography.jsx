import clsx from 'clsx'

const LogoTypography = ({ className, children }) => {
  return (
    <h3
      className={clsx(
        'mt-6 text-2xl font-extrabold text-blue-950 sm:mt-0 md:text-4xl lg:mt-8',
        className
      )}
    >
      {children}
    </h3>
  )
}

export default LogoTypography
