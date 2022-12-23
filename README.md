# Welcome to bibil69_telegram_bot !

everything starts in server.js !

# how to build your Telegram bot in 2mn

1. Go to https://web.telegram.org/ and log in.

2. Search for BotFather.

3. Type /newbot.

4. Type a name (display name) for your bot.

5. Type a username (id) for your bot.

=> It gives you an auth_token that you must keep secret. This token gives ANYONE absolute access to your bot. So keep it safe.

6. Add to your glitch project .env the BOT_TOKEN variable filled with this auth_token

7. Retrieve the telegram userid of the user who will receive logs from the bot. To do so, find on telegram @userinfobot, and just foward any message to this bot... it will answer with your (user)Id (+ first and last name + lang). the userid should look like this (example) : 2053222162

8. Add to your glitch project .env the TELEGRAM_LOG_ACCOUNT_USER_ID variable filled with the telegram user account ID which will receive the bot logs. 

=> That’s it. You can search for your bot now. Type your bot’s name in Telegram’s search and your bot should show up. Press on start and now you can send messages to the bot. But where will these messages go?

# You are all set!

Your bot is ready.

# How to sync with glitch gist and visual studio (to be tested again)

1. enter project terminal on glitch

2. git config receive.denyCurrentBranch updateInstead

3. git reset --hard

4. git merge dev

5. refresh

-> Now, from VSCode, if you export to the Glitch Git, your project code will be updated (you may have to type refresh each time in the terminal after each push from VSCode)

-> WARNING : from Glitch, the modif you made may take 10mn before they are available in the git glitch repo