import './App.css'
import { Container, Stack, Typography } from '@mui/material'
import { JavascriptLogo } from './components/JavascriptLogo'
import { Start } from './components/Start'
import { useQuestionsStore } from './store/questions'
import { Game } from './components/Game'
import js from './assets/js.png'

function App() {
  const questions = useQuestionsStore(state => state.questions)
  console.log(questions);
  

  return (
    <main>
      <Container>
          <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
            {/* <JavascriptLogo/> */}
            <div id='js' className='cube'>
        <div id='jsTop' className='top'> <img src={js} /></div>
        <div>
          <img style={{ '--i': 0 }} src={js} alt="" />
          <img style={{ '--i': 1 }} src={js} alt="" />
          <img style={{ '--i': 2 }} src={js} alt="" />
          <img style={{ '--i': 3 }} src={js} alt="" />
        </div>
      </div>
          <Typography variant='h2' component='h1'>
            Javascript Quizz
          </Typography>
          </Stack>


          {questions.length === 0 && <Start/>}
          {questions.length > 0 && <Game/>}
      </Container>
    </main>
  )
}

export default App
