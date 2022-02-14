
<h1 id="title" align="center">Welcome to Matches Manager App 👋</h1>


> It's a matches manager app helps to make things easier

### 🔖 Table Of Contents

- 🤔 [How To Use](#how-to-use)
- 🤔 [What Are The APIs](#what-are-the-apis)
- 🚀 [Technologies](#technologies)
- 🌱 [Minimal Requirements](#minimal-requirements)
- 🎊 [Features](#features)
- 🎇 [On Progress](#features-progress)
- 💡 [How To Contribute](#how-to-contribute)
- 🤗 [Contributors](#contributors)
- 👤 [Author](#author)
- 🔏 [License](#license)

---

<h2 id="how-to-use">🤔 How To Use</h2>

#### 💻 Desktop

You should download the repo 

```sh
git clone https://github.com/NourMaherT/matches-manager-sql.git
```

Then install the modules 

```sh
npm install
```

- Prepare your DB by openning XXAMP Control Panel and starting Apache and MySQL
- Create a db and user account on PhpMyAdmin page to match the settings in ormconfig.json file
- Disable SSL on your postman


Run the server 

```sh
npm start
```

Open Postman and type 

```sh
http://localhost:3000/
```
OR
```sh
https://localhost:3443/
```
Insert into db manualy the first user record with isAdmin: true to be able to manage the app

Enjoy exploring the APIs!

[Back To The Top](#title)

---

<h2 id="what-are-the-apis">🤔 What Are The APIs</h2>

- '/api/users' Get<b>(no auth)</b> Update-Delete<b>(auth with admin)</b>
- 'api/users/me' Get<b>(auth)</b>
- 'api/users/register' Post<b>(auth with admin)</b>
- 'api/users/login'<b>(no auth)</b>

- 'api/positions' Get<b>(auth)</b> Post-Update-Delete<b>(auth with admin)</b>
- 'api/positions/:id' Get<b>(auth)</b> Post-Update-Delete<b>(auth with admin)</b>

- 'api/players' Get<b>(auth)</b> Post-Update-Delete<b>(auth with admin)</b>
- 'api/players/:id' Get<b>(auth)</b> Post-Update-Delete<b>(auth with admin)</b>

- 'api/matches' Get<b>(auth)</b> Post-Update-Delete<b>(auth with admin)</b>
- 'api/matches/:id' Get<b>(auth)</b> Post-Update-Delete<b>(auth with admin)</b>

- 'api/matchDetailes' Get<b>(auth)</b> Post-Update-Delete<b>(auth with admin)</b>
- 'api/matchDetailes/:id' Get<b>(auth)</b> Post-Update-Delete<b>(auth with admin)</b>
- 'api/matchDetailes/match/:matchId Get<b>(auth)</b> <b><i>to Get Players participated in a particuler match</i></b>
- 'api/matchDetailes/player/:playerId Get<b>(auth)</b> <i>to Get Matches a particuler player participated in</i>
- 'api/matchDetailes/position/:matchId/:playerId Get<b>(auth)</b> <i>Get one player Positions in a particuler match and change time</i>


[Back To The Top](#title)

---

<h2 id="technologies">🚀 Technologies</h2>

- TypeScript
- Node
- Express
- Typeorm

[Back To The Top](#title)

---

<h2 id="minimal-requirements">🌱 Minimal Requirements</h2>

- NPM/Yarn LTS
- NodeJs
- XXAMP App
- Postman

[Back To The Top](#title)

---

<h2 id="features">🎊 Features</h2>

<h4 id="features-progress">🎇 ...</h4>

- Working on a secure channel 'https'
- Store logs localy
- Strict data validation
- Strong error handling system

[Back To The Top](#title)

---

<h2 id="how-to-contribute">💡 How To Contribute</h2>

- Make a fork of this repository
- Clone to you machine and entry on respective paste
- Create a branch with your resource: `git checkout -b my-feature`
- Commit your changes: `git commit -m 'feat: My new feature'`
- Push your branch: `git push origin my-feature`
- A green button will appear at the beginning of this repository
- Click to open and fill in the pull request information

<p align="center">
<i>Contributions, issues and features requests are so welcome!</i><br />
<i>Your contributions encourage me to continue <3</i><br />
<i>📮 Submit PRs to help solve issues or add features</i><br />
<i>🐛 Find and report issues</i><br />
<i>🌟 Star the project</i><br />
</p>

[Back To The Top](#title)

---

<h2 id="contributors">🤗 Contributors</h2>

<p>

<a href="https://github.com/NourMaherT">ME!

</p>

[Back To The Top](#title)

---

<h2 id="author">👤 Author</h2>

🤓 **Nour Taha <noortaha725@gmail.com>**

- Github: [@NourMaherT](https://github.com/NourMaherT)
- LinkedIn: [@NourMaherTaha](https://www.linkedin.com/in/nour-taha-)

[Back To The Top](#title)

---

<h2 id="license">🔏 License</h2>

Copyright (c) 2022 [NourMaherT <noortaha725@gmail.com>](https://github.com/NourMaherT)

This project is licensed by [MIT License](https://api.github.com/licenses/mit).

[Back To The Top](#title)

---

_This README inspired by 💟 by [readme-template-generator](https://github.com/Mikael-R/readme-template-generator)_
