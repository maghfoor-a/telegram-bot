import axios from 'axios';
import { Telegraf } from 'telegraf'
import getBotTokenOrQuit from './util/getBotToken';

const botToken = getBotTokenOrQuit();

const bot = new Telegraf(botToken)

bot.start((ctx) => ctx.reply("Hello!  Let's talk!"))
bot.help((ctx) => ctx.reply('Hmm i am not programmed to be helpful, yet!'))
bot.hears('hello', (ctx) => ctx.reply('Ok, I heard you say hello'))
bot.command('sing', (ctx) => ctx.reply('La la la!  I got your command.'))
bot.command('secret', async (ctx) => {
    const name = ctx.message.from.first_name
    const number = Math.floor(Math.random()*100000)
    ctx.reply(`Wow ${name}! you unlocked my secret command!😳 here's a cute cat picture as your prize😎`)
    ctx.replyWithPhoto(`https://cataas.com/cat?x=${number}`)
}
)

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
