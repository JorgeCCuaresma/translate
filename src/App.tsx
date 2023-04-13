import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './constants'
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'
import { useEffect } from 'react'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'

const App = () => {
  const {
    loading,
    fromLanguage,
    toLanguage,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage, setResult,
    setFromText,
    result,
    fromText
  } = useStore()

  const debounceFromText = useDebounce<string>(fromText, 500)

  useEffect(() => {
    if (debounceFromText === '') return
    translate(fromLanguage, toLanguage, debounceFromText)
      .then(result => {
        if (result == null) return
        setResult(result)
      })
      .catch((error) => {
        setResult('Error')
        console.log('El error es', error.message)
      })
  }, [debounceFromText, fromLanguage, toLanguage])

  const handleClipBoard = () => {
    navigator.clipboard.writeText(result).catch(() => { })
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = toLanguage
    speechSynthesis.speak(utterance)
  }

  return (
    <Container fluid>
      <h1>Translate</h1>
      <Row>

        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
            />
          </Stack>
        </Col>

        <Col xs='auto'>
          <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
            <ArrowsIcon />
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage} />
            <div style={{ position: 'relative' }}>
              <TextArea
                loading={loading}
                type={SectionType.To}
                value={result}
                onChange={setResult}
              />

              {result !== '' &&
                <div style={{ position: 'absolute', left: 0, bottom: 0 }}>
                  <Button
                    variant='link'
                    onClick={handleClipBoard}
                  >
                    <ClipboardIcon />
                  </Button>
                  <Button
                    variant='link'
                    onClick={handleSpeak}
                  >
                    <SpeakerIcon />
                  </Button>
                </div>}

            </div>
          </Stack>
        </Col>

      </Row>

    </Container>
  )
}

export default App
