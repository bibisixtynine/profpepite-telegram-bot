// Client.js
// v221113 - 1224 from VS

import { help } from "./data.js"
import { getRandomInt } from "./utils.js"

/*
import { Keyboard } from "grammy"

const keyboard = new Keyboard()
.text("7").text("8").text("9").text("*").row()
.text("4").text("5").text("6").text("/").row()
.text("1").text("2").text("3").text("-").row()
.text("0").text(".").text("=").text("+");*/

export class Clients {
    static list = {}
    static bestScore = 0
    static bestScoreFirstName = NaN
    expectedAnswer = NaN
    score = 0
    counter = 0
    maxQuestions = 10
    quizzQuestion = NaN
    first_name = NaN
    bot = NaN
    keyboard = NaN
  
    static findById(id) {
      return Clients.list[id]
    }
  
    constructor(ctx, bot) {
      if (Clients.count) Clients.count++
      else Clients.count = 1
      this.first_name = ctx.update.message.from.first_name
      this.bot = bot
    } 
  
    get count() {
      return Clients.count
    }
  
    async message(ctx) {
      console.log(`message received from ${ctx.update.message.from.first_name}`)
      console.log(`ctx.message.text = ${ctx.message.text}`)
      //console.log(ctx)
  
      let message = ctx.message.text
  
      if (message == '/aide') {
        ctx.reply(help)
      } else if ( (message == '/stop') && (this.expectedAnswer) ) {
        this.bot.api.sendMessage(process.env.TELEGRAM_LOG_ACCOUNT_USER_ID,`π«ππ ${ctx.update.message.from.first_name}, id<${ctx.update.message.from.id}>, vient de d'abandonner un </test> avec un score de ${this.score} / ${this.counter}`)
        await ctx.reply('π')
        await ctx.reply('test annulΓ© !')
        this.score = 0
        this.expectedAnswer = NaN
        this.quizz = NaN
        return
      } else if (this.expectedAnswer) {
        if (message == this.expectedAnswer) {
          await ctx.reply(`β ${this.quizz.question} = ${this.quizz.answer}`)
          this.score = this.score + 100
          this.counter ++
          this.quizz = this.newQuestion()
          await ctx.reply(`(${this.counter}) : ${this.quizz.question} = ?` )
          this.expectedAnswer = this.quizz.answer
        } else {
          await ctx.reply(`β ${this.quizz.question} = ?`)
          this.score = this.score - 100
        }
      } else if (message == '/test') {
        this.bot.api.sendMessage(process.env.TELEGRAM_LOG_ACCOUNT_USER_ID,`π«ππ ${ctx.update.message.from.first_name}, id<${ctx.update.message.from.id}>, vient de dΓ©marrer un </test>`)
        await ctx.reply('π')
        await ctx.reply(`C'est parti pour un new test d'1mn ${this.first_name} !` )
        await ctx.reply(` le score est augmentΓ© de 100 pour une bonne rΓ©ponse` )
        await ctx.reply(` le score est diminuΓ© de 100 si la rΓ©ponse n'est pas la bonne` )


        this.quizz = this.newQuestion()
        await ctx.reply(`(1) ${this.quizz.question} = ?` )
        this.expectedAnswer = this.quizz.answer
        this.counter = 1
        setTimeout(()=> {
            this.endOfTest(ctx)
        }, 60000)
      } else {
        await ctx.reply('π€')
      }
    }

    async endOfTest(ctx) {
        this.bot.api.sendMessage(process.env.TELEGRAM_LOG_ACCOUNT_USER_ID,`π«ππ ${ctx.update.message.from.first_name}, id<${ctx.update.message.from.id}>, vient de terminer un </test> avec un score de ${this.score} `)
        await ctx.reply('π₯³')
        await ctx.reply(`π« game over π !
π― ton score : ${this.score} pΓ©pites !`)
        if (Clients.bestScore<this.score) {
            Clients.bestScore = this.score
            Clients.bestScoreFirstName = ctx.update.message.from.first_name
            await ctx.reply('π₯')
            await ctx.reply(`${ctx.update.message.from.first_name} ππ» ! tu es en tΓͺte du podium π€©`)
        } else {
            await ctx.reply(`π«${Clients.bestScoreFirstName}π est toujours en tΓͺte avec ${Clients.bestScore} pΓ©pites !`)
        }
        this.score = 0
        this.expectedAnswer = NaN
    }
  
    newQuestion() {
      let a = getRandomInt(10)
      let b = getRandomInt(10)
      let question = `${a} + ${b}`
      let answer = a+b
      return {question: question, answer: answer}
    }
  
  }