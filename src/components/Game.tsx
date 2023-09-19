//import { IconButton, Stack } from "@mui/material"
import { Card, Typography, List, ListItem, ListItemButton, ListItemText, Stack, IconButton} from "@mui/material"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useQuestionsStore } from "../store/questions"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { qtcreatorDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { type Question as QuestionType } from "../types/types"
import { ArrowBackIosNew } from "@mui/icons-material"
import { Footer } from "./Footer";


const Question = ({ info }: {info: QuestionType}) => {

    const selectAnswer = useQuestionsStore(state => state.selectAnswer)

    const handleClickAnswer = (answerIndex:number) => () => {
        selectAnswer(info.id, answerIndex)
    }

    const getBackgroundColor = (info: QuestionType, index:number) => {
        const { userSelectedAnswer, correctAnswer } =  info
        if(userSelectedAnswer == null) return 'transparent'
        if(index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
        if(index === correctAnswer) return 'green'
        if(index === userSelectedAnswer) return 'red'

        return 'transparent'
    }

    return(
        <Card variant="outlined" sx={{textAlign:'left', bgcolor:'#222222', padding: 2, color: 'white', marginTop: 5}}>
            <Typography variant="h5" sx={{textAlign:'center'}}>
                {info.question}
            </Typography>

            <SyntaxHighlighter language="javascript" style={qtcreatorDark}>
                {info.code}
            </SyntaxHighlighter>

            <List sx={{ bgcolor: '#333'}} disablePadding>
                {info.answers.map((answer, index) => (
                    <ListItem key={index} divider>
                        <ListItemButton disabled={info.userSelectedAnswer != null} onClick={handleClickAnswer(index)} sx={{backgroundColor: getBackgroundColor(info, index)}}>
                            <ListItemText primary={answer} sx={{ textAlign:'center'}}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Card>
    )
}

export const Game = ( ) => {

    const questions =  useQuestionsStore(state => state.questions)
    const currentQuestion = useQuestionsStore(state => state.currentQuestion)
    const questionInfo = questions[currentQuestion]
    const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
    const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion)

    return(
        <>
        <Stack direction='row' gap={2} alignItems='center' justifyContent='center' >
            <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
                <ArrowBackIosNew/>
            </IconButton>

                {currentQuestion + 1} / {questions.length}

            <IconButton onClick={goNextQuestion} disabled={currentQuestion > questions.length -1 }>
                <ArrowForwardIosIcon/>
            </IconButton>
        </Stack>
            <Question info={questionInfo}/>
            <Footer/>
        </>
    )
}