import { create } from "zustand";
import { Question } from "../types/types";
import confetti from 'canvas-confetti'
import { persist } from "zustand/middleware";


interface State {
    questions: Question[],
    currentQuestion: number,
    fetchQuestion: (limit: number) => void
    selectAnswer: (questionId: number, answerIndex: number) => void
    goNextQuestion: () => void
    goPreviousQuestion: () => void
}

export const useQuestionsStore = create<State>()(persist((set, get ) => {

    return{
        loading: false,
        questions:[],
        currentQuestion: 0,

        fetchQuestion: async (limit: number) => {
           const res =  await fetch('http://localhost:5173/data.json')
           const json = await res.json() 
            
           const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
           set({ questions })
            
        },

        selectAnswer: (questionId: number, answerIndex: number) => {
            const { questions } = get()
            const newQuestions = structuredClone(questions)
            const questionIdex = newQuestions.findIndex(q => q.id === questionId)
            const questionInfo = newQuestions[questionIdex]
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
            if(isCorrectUserAnswer) confetti()
            newQuestions[questionIdex] = {
                ... questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answerIndex
            }

            set({ questions: newQuestions})
        },

        goNextQuestion: () => {
            const { currentQuestion, questions} = get()
            const nextQuestion = currentQuestion + 1

            if(nextQuestion < questions.length){
                set({ currentQuestion: nextQuestion})
            }
        },

        goPreviousQuestion: () => {
            const { currentQuestion } = get()
            const previousQuestion = currentQuestion - 1

            if(previousQuestion >= 0){
                set({ currentQuestion: previousQuestion})
            }
        },

        reset: () => {
            set({ currentQuestion: 0, questions: []})
        }
    }

    
},
    {
        name: 'questions',
    }
))