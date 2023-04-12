import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'
import { type FC } from 'react'

interface Props {
  type: SectionType
  loading?: boolean
  onChange: (value: string) => void
  value: string
}
const commonStyles = { border: 0, height: '200px' }

const getPlaceHolder = (type: SectionType, loading?: boolean) => {
  if (type === SectionType.From) return 'Introducir texto'
  if (loading === true) return 'Cargando...'
  return 'Traducción'
}

export const TextArea: FC<Props> = ({ type, loading, onChange, value }) => {
  const styles = type === SectionType.To
    ? { ...commonStyles, backgroundColor: '#e9e7e7' }
    : commonStyles

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
        <Form.Control
        autoFocus={type === SectionType.From}
        as='textarea'
        placeholder={getPlaceHolder(type, loading)}
        style={styles}
        value={value}
        onChange={handleChange}
        />
  )
}
