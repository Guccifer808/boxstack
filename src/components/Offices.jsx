import { dictionary } from '@/dictionary'
import clsx from 'clsx'

function Office({ name, children, invert = false }) {
  return (
    <address
      className={clsx(
        'text-sm not-italic',
        invert ? 'text-neutral-300' : 'text-neutral-600'
      )}
    >
      <strong className={invert ? 'text-white' : 'text-neutral-950'}>
        {name}
      </strong>
      <br />
      {children}
    </address>
  )
}

export function Offices({ invert = false, params, ...props }) {
  return (
    <ul role="list" {...props}>
      <li>
        <Office name={dictionary[params?.lang]?.header.city} invert={invert}>
          {dictionary[params?.lang]?.header.officeAddress}
        </Office>
      </li>
    </ul>
  )
}
